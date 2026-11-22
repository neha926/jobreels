import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { auth, isFirebaseConfigured } from '../../configs/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export const PhoneLogin = ({ onPhoneVerified, language = 'en', t }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const cleanDigits = phone.replace(/\D/g, '').slice(0, 10);
  const fullPhone = `+91${cleanDigits}`;

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) {}
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const sendOtp = async (e) => {
    e?.preventDefault();
    if (cleanDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    if (!isFirebaseConfigured || !auth) {
      setErrorMessage('Firebase Authentication is not configured. Please check Firebase settings.');
      setLoading(false);
      return;
    }

    try {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) {}
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });

      const confirmationResult = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setStep('otp');
      setInfoMessage(`✓ SMS OTP dispatched to ${fullPhone}. Check your phone messages.`);
    } catch (fbErr) {
      console.error('Firebase Phone Auth error:', fbErr);
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) {}
        window.recaptchaVerifier = null;
      }

      let friendlyMsg = 'Failed to dispatch SMS OTP. ';
      if (fbErr.code === 'auth/operation-not-allowed') {
        friendlyMsg = 'Firebase Phone Authentication is disabled. Please enable "Phone" in Firebase Console > Authentication > Sign-in method.';
      } else if (fbErr.code === 'auth/unauthorized-domain') {
        friendlyMsg = `Domain '${window.location.hostname}' is not authorized in Firebase. Add it to Firebase Console > Authentication > Settings > Authorized domains.`;
      } else if (fbErr.code === 'auth/invalid-phone-number') {
        friendlyMsg = 'Please enter a valid 10-digit Indian mobile number.';
      } else if (fbErr.code === 'auth/too-many-requests') {
        friendlyMsg = 'Too many OTP requests sent to this number. Please wait a few minutes before trying again.';
      } else if (fbErr.code === 'auth/quota-exceeded') {
        friendlyMsg = 'Daily SMS quota reached in Firebase project. Please check Firebase quota limits.';
      } else {
        friendlyMsg = fbErr.message || 'Error sending SMS OTP. Please check your connection and Firebase setup.';
      }

      // DO NOT advance to step 'otp' when SMS was not sent!
      setErrorMessage(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e?.preventDefault();
    const cleanOtp = otp.replace(/\D/g, '').slice(0, 6);

    if (cleanOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      return;
    }

    if (!window.confirmationResult) {
      setErrorMessage('No active OTP session. Please request a new OTP code.');
      setStep('phone');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await window.confirmationResult.confirm(cleanOtp);
      console.log('Firebase user successfully authenticated:', result.user);
      onPhoneVerified(cleanDigits);
    } catch (fbVerifyErr) {
      console.error('Firebase OTP verification error:', fbVerifyErr);
      if (fbVerifyErr.code === 'auth/invalid-verification-code') {
        setErrorMessage('Incorrect OTP. Please enter the valid 6-digit code received on your phone.');
      } else if (fbVerifyErr.code === 'auth/code-expired') {
        setErrorMessage('This OTP code has expired. Please go back and request a new code.');
      } else {
        setErrorMessage(fbVerifyErr.message || 'Invalid OTP code. Please enter the valid code received on your phone.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-pink-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse delay-700"></div>

      <div className="w-full max-w-sm relative z-10">
        {/* Invisible container for Firebase Phone Auth Recaptcha */}
        <div id="recaptcha-container"></div>

        {/* Brand Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-3 transform -rotate-6 shadow-purple-500/20">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
            JobReels
          </h1>
          <p className="text-zinc-400 text-xs font-normal">
            India's #1 Free Video Job Platform
          </p>
        </div>

        {/* Auth Glass Container */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-black/80">
          {step === 'phone' ? (
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-white mb-0.5">Welcome!</h2>
                <p className="text-zinc-400 text-xs font-normal leading-relaxed">
                  Enter your mobile number to sign in or create an account
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 ml-0.5 block">
                  Mobile Number (मोबाईल नंबर)
                </label>
                <div className="flex items-center bg-zinc-900/80 border border-zinc-700/80 rounded-2xl px-3.5 py-3 focus-within:border-purple-500/70 transition-all">
                  <span className="text-zinc-300 font-medium mr-2 text-sm shrink-0 whitespace-nowrap select-none">
                    +91
                  </span>
                  <span className="w-px h-4 bg-zinc-700 mr-3 shrink-0"></span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    value={cleanDigits}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent text-white w-full outline-none font-normal text-sm placeholder-zinc-500 tracking-wide"
                    autoFocus
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 text-rose-300 text-xs leading-relaxed">
                  {errorMessage}
                </div>
              )}

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free platform. Secure SMS OTP via Firebase.</span>
              </div>

              <button
                type="submit"
                disabled={cleanDigits.length < 10 || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-2xl text-white font-medium text-sm shadow-xl shadow-purple-900/30 hover:shadow-purple-900/50 active:scale-[0.98] transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending SMS OTP...</span>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-white mb-0.5">Verify OTP</h2>
                <p className="text-zinc-400 text-xs font-normal">
                  We sent a 6-digit code to <strong className="text-emerald-400 font-medium">+91 {cleanDigits}</strong>
                </p>
              </div>

              {infoMessage && (
                <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-2.5 text-emerald-300 text-xs leading-relaxed">
                  {infoMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 ml-0.5 block">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-zinc-900/80 border border-zinc-700/80 rounded-2xl p-3 text-white text-center text-xl font-medium tracking-[0.35em] outline-none focus:border-purple-500/70 transition-all placeholder-zinc-600"
                  autoFocus
                />
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-medium text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SMS Dispatched to +91 {cleanDigits}</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Please enter the 6-digit verification code received in your mobile SMS.
                </p>
              </div>

              {errorMessage && (
                <div className="bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 text-rose-300 text-xs leading-relaxed">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={otp.length < 6 || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-2xl text-white font-medium text-sm shadow-xl shadow-purple-900/30 active:scale-[0.98] transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying OTP...' : 'Verify & Continue'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setErrorMessage('');
                }}
                className="w-full text-zinc-400 hover:text-white font-medium text-xs transition cursor-pointer text-center py-1"
              >
                ← Change Mobile Number
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-zinc-500 text-[11px] mt-5 px-4 font-normal">
          By signing in, you agree to JobReels Free Platform terms & guidelines.
        </p>
      </div>
    </div>
  );
};
