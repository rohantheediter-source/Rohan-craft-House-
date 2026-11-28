import { timingSafeEqual } from 'node:crypto';

/**
 * Vercel Serverless Function: /api/whatsapp/webhook
 *
 * Endpoints:
 * - GET  /api/whatsapp/webhook  -> Meta WhatsApp Cloud API webhook verification handshake
 * - POST /api/whatsapp/webhook  -> Meta WhatsApp Cloud API incoming messages & delivery status events
 *
 * Environment Variables (configure in Vercel Project Settings -> Environment Variables):
 * 1. WHATSAPP_VERIFY_TOKEN:
 *    Secret verify token you choose and enter in the Meta App Dashboard
 *    ("Webhooks -> Verify Token"). Used strictly in GET requests to validate
 *    `hub.verify_token` before echoing `hub.challenge`.
 * 2. WHATSAPP_ACCESS_TOKEN:
 *    Meta WhatsApp Cloud API Bearer token used server-side for authenticated
 *    outbound Graph API requests (for example, marking incoming messages as read
 *    or sending automated replies). Never exposed to client code or logs.
 * 3. WHATSAPP_PHONE_NUMBER_ID:
 *    Your Meta WhatsApp Business Phone Number ID. Used to match incoming
 *    webhook `metadata.phone_number_id` events to this storefront number and
 *    to construct outbound Graph API endpoints when replying.
 */

interface WhatsAppWebhookConfig {
  /** Used in GET verification to compare against `hub.verify_token`. */
  verifyToken: string | undefined;
  /** Used on the server for authenticated Meta Graph API calls (never logged/exposed). */
  accessToken: string | undefined;
  /** Used to verify incoming event metadata and target Graph API message endpoints. */
  phoneNumberId: string | undefined;
}

interface WhatsAppWebhookErrorItem {
  code?: number;
  title?: string;
}

interface WhatsAppIncomingMessage {
  id?: string;
  from?: string;
  timestamp?: string;
  type?: string;
}

interface WhatsAppStatusUpdate {
  id?: string;
  status?: string;
  timestamp?: string;
  recipient_id?: string;
  errors?: WhatsAppWebhookErrorItem[];
}

interface WhatsAppChangeValue {
  messaging_product?: string;
  metadata?: {
    display_phone_number?: string;
    phone_number_id?: string;
  };
  contacts?: Array<{
    wa_id?: string;
    profile?: { name?: string };
  }>;
  messages?: WhatsAppIncomingMessage[];
  statuses?: WhatsAppStatusUpdate[];
}

interface WhatsAppWebhookPayload {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: WhatsAppChangeValue;
    }>;
  }>;
}

function readCleanEnv(key: string): string | undefined {
  const raw = process.env[key];
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getWebhookConfig(): WhatsAppWebhookConfig {
  return {
    verifyToken: readCleanEnv('WHATSAPP_VERIFY_TOKEN'),
    accessToken: readCleanEnv('WHATSAPP_ACCESS_TOKEN'),
    phoneNumberId: readCleanEnv('WHATSAPP_PHONE_NUMBER_ID'),
  };
}

/**
 * Helper showing how WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID are
 * combined server-side when sending replies or read receipts to Meta Graph API.
 */
export function buildMetaMessagesEndpoint(phoneNumberId: string, apiVersion = 'v21.0'): string {
  return `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(phoneNumberId)}/messages`;
}

function safeTokenCompare(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided, 'utf8');
  const expectedBuf = Buffer.from(expected, 'utf8');
  if (providedBuf.length !== expectedBuf.length) {
    return false;
  }
  return timingSafeEqual(providedBuf, expectedBuf);
}

function maskPhone(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length <= 4) return '****';
  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function extractWebhookSummaries(
  payload: WhatsAppWebhookPayload,
  configuredPhoneNumberId: string | undefined,
): Array<Record<string, unknown>> {
  const summaries: Array<Record<string, unknown>> = [];
  const entries = Array.isArray(payload.entry) ? payload.entry : [];

  for (const entry of entries) {
    const changes = Array.isArray(entry?.changes) ? entry.changes : [];

    for (const change of changes) {
      const value = change?.value;
      if (!value || typeof value !== 'object') continue;

      const eventPhoneNumberId =
        typeof value.metadata?.phone_number_id === 'string'
          ? value.metadata.phone_number_id
          : undefined;

      const phoneNumberIdMatch = configuredPhoneNumberId
        ? eventPhoneNumberId === configuredPhoneNumberId
        : 'not_configured';

      const messages = Array.isArray(value.messages) ? value.messages : [];
      for (const msg of messages) {
        summaries.push({
          eventType: 'message',
          field: change?.field ?? 'messages',
          entryId: entry?.id ?? null,
          eventPhoneNumberId: eventPhoneNumberId ?? null,
          phoneNumberIdMatch,
          messageId: typeof msg?.id === 'string' ? msg.id : null,
          messageType: typeof msg?.type === 'string' ? msg.type : 'unknown',
          timestamp: typeof msg?.timestamp === 'string' ? msg.timestamp : null,
          senderMasked: maskPhone(msg?.from) ?? null,
          contactCount: Array.isArray(value.contacts) ? value.contacts.length : 0,
        });
      }

      const statuses = Array.isArray(value.statuses) ? value.statuses : [];
      for (const st of statuses) {
        const errorList = Array.isArray(st?.errors)
          ? st.errors.map((err) => ({
              code: err?.code ?? null,
              title: typeof err?.title === 'string' ? err.title : null,
            }))
          : undefined;

        summaries.push({
          eventType: 'status',
          field: change?.field ?? 'messages',
          entryId: entry?.id ?? null,
          eventPhoneNumberId: eventPhoneNumberId ?? null,
          phoneNumberIdMatch,
          messageId: typeof st?.id === 'string' ? st.id : null,
          status: typeof st?.status === 'string' ? st.status : 'unknown',
          timestamp: typeof st?.timestamp === 'string' ? st.timestamp : null,
          recipientMasked: maskPhone(st?.recipient_id) ?? null,
          ...(errorList && errorList.length > 0 ? { errors: errorList } : {}),
        });
      }

      if (messages.length === 0 && statuses.length === 0) {
        summaries.push({
          eventType: 'other',
          field: change?.field ?? 'unknown',
          entryId: entry?.id ?? null,
          eventPhoneNumberId: eventPhoneNumberId ?? null,
          phoneNumberIdMatch,
        });
      }
    }
  }

  return summaries;
}

/**
 * GET /api/whatsapp/webhook
 * Meta WhatsApp Cloud API verification challenge handler.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const config = getWebhookConfig();
    const url = new URL(request.url);

    const mode = url.searchParams.get('hub.mode');
    const verifyToken = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    // Verify server configuration first so empty tokens can never validate
    if (!config.verifyToken) {
      console.error(
        '[whatsapp-webhook] GET verification failed: WHATSAPP_VERIFY_TOKEN environment variable is not set.',
      );
      return new Response('Forbidden: verify token not configured', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const isValidHandshake =
      mode === 'subscribe' &&
      typeof verifyToken === 'string' &&
      safeTokenCompare(verifyToken, config.verifyToken) &&
      typeof challenge === 'string' &&
      challenge.length > 0;

    if (!isValidHandshake) {
      console.warn('[whatsapp-webhook] GET verification rejected.', {
        mode: mode ?? null,
        hasVerifyToken: Boolean(verifyToken),
        hasChallenge: Boolean(challenge),
      });
      return new Response('Forbidden', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    console.info('[whatsapp-webhook] GET verification succeeded.');
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[whatsapp-webhook] Unexpected error during GET verification:', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
}

/**
 * POST /api/whatsapp/webhook
 * Receives Meta WhatsApp Cloud API messages and delivery status callbacks.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const config = getWebhookConfig();

    const rawBody = await request.text();
    if (!rawBody || !rawBody.trim()) {
      return jsonResponse(400, {
        received: false,
        error: 'Empty request body.',
      });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return jsonResponse(400, {
        received: false,
        error: 'Invalid JSON payload.',
      });
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return jsonResponse(400, {
        received: false,
        error: 'Webhook payload must be a JSON object.',
      });
    }

    const payload = parsed as WhatsAppWebhookPayload;

    if (payload.object && payload.object !== 'whatsapp_business_account') {
      console.info('[whatsapp-webhook] Ignored non-WhatsApp webhook object.', {
        object: payload.object,
      });
      return jsonResponse(200, {
        received: true,
        ignored: true,
        object: payload.object,
      });
    }

    const events = extractWebhookSummaries(payload, config.phoneNumberId);

    // Log strictly non-sensitive event metadata for debugging (no tokens/secrets)
    console.info('[whatsapp-webhook] POST event received.', {
      object: payload.object ?? null,
      eventCount: events.length,
      outboundApiReady: Boolean(config.accessToken && config.phoneNumberId),
      events,
    });

    return jsonResponse(200, {
      received: true,
      processed: events.length,
    });
  } catch (err) {
    console.error('[whatsapp-webhook] Error processing POST webhook:', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return jsonResponse(500, {
      received: false,
      error: 'Internal error processing WhatsApp webhook event.',
    });
  }
}
