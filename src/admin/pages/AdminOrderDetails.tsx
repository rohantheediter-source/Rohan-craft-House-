import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Save,
  Package,
  MapPin,
  CreditCard,
  User,
} from 'lucide-react';
import { ordersService } from '../../services/ordersService';
import { Order, OrderStatus, PaymentStatus } from '../../types';
import { formatCurrency, formatDate, formatDateTime } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminOrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { success, error } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState<OrderStatus>('placed');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!id) return;
      setIsLoading(true);
      try {
        const all = await ordersService.getAllAdminOrders();
        const found = all.find((o) => o.id === id);
        if (found) {
          setOrder(found);
          setStatus(found.status);
          setPaymentStatus(found.payment_status);
          setTrackingNumber(found.tracking_number || '');
          setCarrier(found.carrier || 'BlueDart Express / Delhivery Air');
        }
      } catch (err) {
        console.error('Failed to load order details:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsSaving(true);
    try {
      await ordersService.updateOrderStatus(order.id, status, trackingNumber.trim(), carrier.trim());
      await ordersService.updatePaymentStatus(order.id, paymentStatus);
      success('Consignment status and dispatch records updated');
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status,
              payment_status: paymentStatus,
              tracking_number: trackingNumber.trim(),
              carrier: carrier.trim(),
            }
          : null
      );
    } catch {
      error('Failed to update consignment details');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Accessing consignment vault..." />;
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-[#8E7356]">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#B69B7D]/35">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-xl bg-white text-[#56443E] hover:text-[#C87552] border border-[#B69B7D]/50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8E7356] font-mono">
              CONSIGNMENT DETAILS
            </span>
            <h1 className="font-display text-2xl font-bold text-[#30231F] flex items-center gap-2">
              <span>{order.order_number}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C87552]/12 text-[#B05E3D] border border-[#C87552]/35 capitalize font-sans">
                {order.status}
              </span>
            </h1>
          </div>
        </div>

        <span className="text-xs text-[#8E7356]">
          Placed on {formatDateTime(order.created_at)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Items & Customer Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Items Card */}
          <div className="bg-white border border-[#B69B7D]/45 rounded-2xl shadow-sm p-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#30231F] mb-4 pb-2 border-b border-[#B69B7D]/25">
              Ordered Artworks ({order.items?.length || 0})
            </h3>

            <div className="divide-y divide-[#B69B7D]/25">
              {order.items?.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {it.product_image && (
                      <img
                        src={it.product_image}
                        alt={it.product_name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F9F5EE] border border-[#B69B7D]/40 shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-bold text-[#30231F]">{it.product_name}</p>
                      <p className="text-[11px] text-[#8E7356]">
                        Qty: {it.quantity} × {formatCurrency(it.unit_price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#30231F] font-display">
                    {formatCurrency(it.total_price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-[#B69B7D]/25 space-y-1.5 text-xs text-[#8E7356]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-[#30231F] font-semibold">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Wooden Crate &amp; Shipping:</span>
                <span className="text-[#30231F] font-semibold">
                  {order.shipping_fee === 0 ? 'Free' : formatCurrency(order.shipping_fee)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#30231F] pt-2 border-t border-[#B69B7D]/25">
                <span>Total Amount:</span>
                <span className="text-[#30231F]">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Card */}
          <div className="bg-white border border-[#B69B7D]/45 rounded-2xl shadow-sm p-6 space-y-4 text-xs">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#30231F] pb-2 border-b border-[#B69B7D]/25">
              Patron & Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E7356] block mb-1">
                  Recipient Contact
                </span>
                <p className="font-bold text-[#30231F] text-sm">
                  {order.shipping_address?.fullName || order.guest_name}
                </p>
                <p className="text-[#56443E]">{order.guest_email}</p>
                <p className="text-[#56443E]">{order.shipping_address?.phone || order.guest_phone}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E7356] block mb-1">
                  Delivery Destination
                </span>
                <p className="text-[#56443E]">{order.shipping_address?.streetAddress}</p>
                {order.shipping_address?.apartment && (
                  <p className="text-[#8E7356]">{order.shipping_address?.apartment}</p>
                )}
                <p className="text-[#56443E]">
                  {order.shipping_address?.city}, {order.shipping_address?.state} - {order.shipping_address?.postalCode}
                </p>
                <p className="text-[#8E7356]">{order.shipping_address?.country}</p>
              </div>
            </div>

            {order.notes && (
              <div className="pt-3 border-t border-[#B69B7D]/25">
                <span className="text-[10px] uppercase font-bold text-[#8E7356] block mb-1">
                  Custom Inscription / Patron Notes
                </span>
                <p className="text-[#56443E] italic bg-[#F9F5EE] p-3 rounded-xl border border-[#B69B7D]/40">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Manage Order & Dispatch Form */}
        <div className="lg:col-span-5 bg-white border border-[#B69B7D]/45 rounded-2xl shadow-sm p-6 sm:p-8">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#30231F] mb-6 pb-2 border-b border-[#B69B7D]/25">
            Update Order Status & Dispatch
          </h3>

          <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5">
                Consignment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-[#30231F] focus:outline-none focus:border-[#C87552] capitalize cursor-pointer"
              >
                <option value="placed">Placed (Received in Atelier)</option>
                <option value="confirmed">Confirmed (Artisan Assigned)</option>
                <option value="crafting">Crafting & 72h Curing</option>
                <option value="dispatched">Dispatched in Crate</option>
                <option value="delivered">Delivered to Patron</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-[#30231F] focus:outline-none focus:border-[#C87552] capitalize cursor-pointer"
              >
                <option value="pending">Pending Verification</option>
                <option value="paid">Verified Paid</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5">
                Express Carrier Fleet
              </label>
              <input
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                placeholder="BlueDart Express / Delhivery Air"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-[#30231F] focus:outline-none focus:border-[#C87552]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5">
                Consignment Tracking Waybill #
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. BD-892348123"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-[#30231F] focus:outline-none focus:border-[#C87552] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Updating...' : 'Commit Dispatch Updates'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

