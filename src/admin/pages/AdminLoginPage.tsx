import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, ArrowRight, Lock, Mail, Loader2, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { GoogleLogo } from '../../components/auth/GoogleSignInButton';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signIn, signInWithGoogle, signOut, isLoading, verifyAdminStatus } = useAuth();
  const { error: showToastError, success: showToastSuccess } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);

  // Set page title and redirect if already logged in as verified admin
  useEffect(() => {
    document.title = 'Rohan Craft House | Admin Portal';
    if (!isLoading && user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleGoogleAdminLogin = async () => {
    if (isGoogleProcessing || isSubmitting) return;
    setIsGoogleProcessing(true);
    try {
      sessionStorage.setItem('resin_aura_auth_redirect', '/admin');
      // If currently signed in as a non-admin, clear session first to avoid token conflicts
      if (user && !isAdmin) {
        await signOut();
        sessionStorage.setItem('resin_aura_auth_redirect', '/admin');
      }

      const { error } = await signInWithGoogle('/admin');
      if (error) {
        showToastError(error.message || 'Google authentication could not be initiated.');
        setIsGoogleProcessing(false);
      }
    } catch (err: any) {
      showToastError(err?.message || 'Unexpected error during Google Sign-In.');
      setIsGoogleProcessing(false);
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToastError('Please enter both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        showToastError(signInError.message || 'Invalid administrator credentials.');
        setIsSubmitting(false);
        return;
      }

      // Live verification of administrative clearance on server
      const isAuthorizedAdmin = await verifyAdminStatus();
      if (isAuthorizedAdmin) {
        showToastSuccess('Administrative clearance verified. Console unlocked.');
        navigate('/admin');
      } else {
        // Authenticated credentials belong to a non-admin account
        await signOut();
        showToastError('Access Denied: This account is not registered as an administrator.');
      }
    } catch (err: any) {
      showToastError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EBDD] flex flex-col justify-between py-12 px-4 text-[#30231F] font-sans">
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7356] hover:text-[#C87552] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-[#8E7356] font-mono">
          SECURE_ADMIN_PORTAL
        </span>
      </div>

      {/* Main Admin Portal Login Card */}
      <div className="max-w-md w-full mx-auto bg-white border border-[#B69B7D]/50 rounded-3xl p-8 sm:p-10 shadow-luxury">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#30231F] border-2 border-[#B69B7D] text-[#F4EBDD] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Shield className="w-7 h-7 text-[#C87552]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E7356] font-bold font-mono">
            Rohan Craft House Management
          </span>
          <h1 className="font-display text-2xl font-bold text-[#30231F] mt-1">
            Admin Portal
          </h1>
          <p className="text-xs text-[#56443E] mt-2 leading-relaxed">
            Restricted to authorized studio curators and store administrators. Sign in with Google or administrator credentials.
          </p>
        </div>

        {/* Informational notice if current session is a customer */}
        {user && !isAdmin && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#F4EBDD] border border-[#B69B7D]/60 flex items-start gap-2.5 text-xs">
            <Info className="w-4 h-4 text-[#C87552] shrink-0 mt-0.5" />
            <p className="text-[#56443E] text-[11px] leading-relaxed">
              Currently signed in as customer (<strong className="text-[#30231F]">{user.email}</strong>). Use your authorized admin Google account or credentials below to access the Admin Portal.
            </p>
          </div>
        )}

        {/* METHOD 1: Google OAuth Sign-In */}
        <div>
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={isGoogleProcessing || isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-white hover:bg-[#F9F5EE] text-[#30231F] font-display text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-sm hover:shadow-md border border-[#B69B7D]/60 hover:border-[#C87552] disabled:opacity-60 disabled:cursor-not-allowed group active:scale-[0.99]"
          >
            {isGoogleProcessing ? (
              <>
                <Loader2 className="w-4 h-4 text-[#C87552] animate-spin shrink-0" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <GoogleLogo className="w-5 h-5 shrink-0" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Visual Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-[#B69B7D]/30" />
            <span className="flex-shrink mx-3 text-[10px] text-[#8E7356] uppercase tracking-widest font-mono">
              OR SIGN IN WITH ADMIN CREDENTIALS
            </span>
            <div className="flex-grow border-t border-[#B69B7D]/30" />
          </div>

          {/* METHOD 2: Existing Admin Email/Password Form */}
          <form onSubmit={handleEmailPasswordLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5 font-mono text-[11px]">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="Enter administrator email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#8E7356]/70 focus:outline-none focus:border-[#C87552] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5 font-mono text-[11px]">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#8E7356]/70 focus:outline-none focus:border-[#C87552] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isGoogleProcessing}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.16em] transition-all disabled:opacity-50 shadow-md hover:shadow-lg cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Administrator</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-[#B69B7D]/30 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#8E7356] font-mono">
            <Shield className="w-3.5 h-3.5 text-[#C87552]" />
            <span>Dual-Method Authentication</span>
          </div>
          <p className="text-[11px] text-[#56443E] leading-normal">
            Supports authorized Google Sign-In and direct administrator credentials. Non-authorized accounts are rejected by server-side authorization controls.
          </p>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#8E7356]">
        Rohan Craft House Security Engine • Server-Side Database RLS Enforcement
      </div>
    </div>
  );
};
