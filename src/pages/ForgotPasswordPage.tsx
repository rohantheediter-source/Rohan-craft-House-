import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { error, success } = useToast();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: resetError } = await resetPassword(email.trim());
      if (resetError) {
        error(resetError.message || 'Failed to send reset link');
      } else {
        setIsSent(true);
        success('Password reset instructions dispatched to your email');
      }
    } catch (err: any) {
      error(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4EBDD] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#B69B7D]/45 shadow-luxury">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#8E7356] hover:text-[#C87552] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>

        <h1 className="font-display text-2xl font-bold text-[#30231F] mb-2">
          Reset Password
        </h1>
        <p className="font-serif-luxury text-sm text-[#56443E] mb-6">
          Enter the email associated with your Rohan Craft House account. We will transmit a secure password reset link.
        </p>

        {isSent ? (
          <div className="p-4 rounded-2xl bg-[#F4EBDD] border border-[#B69B7D]/50 text-[#30231F] text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#C87552] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Instructions Sent</p>
              <p className="mt-1">
                Check your inbox for <strong className="font-semibold">{email}</strong>. If you do not see it within a few minutes, check your spam or junk folder.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#B69B7D] focus:outline-none focus:border-[#C87552]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Transmitting Link...' : 'Send Reset Link'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

