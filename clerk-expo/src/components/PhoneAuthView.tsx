import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

export function PhoneAuthView() {
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: any;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendCode = async () => {
    const cleanNumber = phone.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const fullPhoneNumber = `+91${cleanNumber.slice(-10)}`;
    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    try {
      if (!isSignUpLoaded || !signUp || !isSignInLoaded || !signIn) {
        setErrorMessage('Clerk is initializing. Please try again in a moment.');
        setLoading(false);
        return;
      }

      // Try SignUp first
      try {
        await signUp.create({
          phoneNumber: fullPhoneNumber,
        });

        await signUp.preparePhoneNumberVerification({
          strategy: 'phone_code',
        });

        setAuthMode('signup');
        setInfoMessage(`SMS OTP sent to ${fullPhoneNumber}`);
        setStep(2);
        setCountdown(60);
      } catch (signUpErr: any) {
        console.log('SignUp error, checking if user already exists:', signUpErr);

        const isUserExists =
          signUpErr?.errors?.[0]?.code === 'form_identifier_exists' ||
          signUpErr?.message?.includes('already exists');

        if (isUserExists) {
          // Switch to SignIn flow
          const { supportedFirstFactors } = await signIn.create({
            identifier: fullPhoneNumber,
          });

          const phoneFactor = supportedFirstFactors?.find(
            (f: any) => f.strategy === 'phone_code'
          );

          if (phoneFactor && 'phoneNumberId' in phoneFactor) {
            await signIn.prepareFirstFactor({
              strategy: 'phone_code',
              phoneNumberId: (phoneFactor as any).phoneNumberId,
            });

            setAuthMode('signin');
            setInfoMessage(`SMS OTP sent to existing account: ${fullPhoneNumber}`);
            setStep(2);
            setCountdown(60);
          } else {
            setErrorMessage('Phone OTP factor not available for this account.');
          }
        } else {
          const detail =
            signUpErr?.errors?.[0]?.longMessage ||
            signUpErr?.errors?.[0]?.message ||
            signUpErr?.message ||
            'Failed to dispatch SMS OTP.';
          setErrorMessage(detail);
        }
      }
    } catch (err: any) {
      console.error('Phone SMS dispatch error:', err);
      setErrorMessage(err?.message || 'Error communicating with Clerk SMS gateway.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const cleanOtp = otpCode.trim();
    if (cleanOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP received via SMS.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    if (cleanOtp === '424242') {
      setLoading(false);
      return;
    }

    try {
      if (authMode === 'signup') {
        if (!isSignUpLoaded || !signUp) return;
        const completeSignUp = await signUp.attemptPhoneNumberVerification({
          code: cleanOtp,
        });

        if (completeSignUp.status === 'complete' && setSignUpActive) {
          await setSignUpActive({ session: completeSignUp.createdSessionId });
        } else {
          setErrorMessage(`Verification status: ${completeSignUp.status}`);
        }
      } else {
        if (!isSignInLoaded || !signIn) return;
        const completeSignIn = await signIn.attemptFirstFactor({
          strategy: 'phone_code',
          code: cleanOtp,
        });

        if (completeSignIn.status === 'complete' && setSignInActive) {
          await setSignInActive({ session: completeSignIn.createdSessionId });
        } else {
          setErrorMessage(`Verification status: ${completeSignIn.status}`);
        }
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);
      const detail =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        'Invalid OTP code. Please check your phone SMS.';
      setErrorMessage(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Brand Header */}
      <View style={styles.brandRow}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>JR</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>JobReels</Text>
          <Text style={styles.brandSubtitle}>Video Career Hub • 100% Free</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {step === 1 ? (
          <>
            <View style={styles.iconCircle}>
              <Ionicons name="phone-portrait-outline" size={28} color="#10b981" />
            </View>
            <Text style={styles.cardTitle}>Mobile Number Login</Text>
            <Text style={styles.cardSubtitle}>
              Candidate login via real SMS OTP (PRD Section 4)
            </Text>

            {/* Role Selector */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                onPress={() => setRole('candidate')}
                style={[
                  styles.roleButton,
                  role === 'candidate' && styles.roleButtonActiveCandidate,
                ]}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === 'candidate' && styles.roleTextActive,
                  ]}
                >
                  Job Seeker / Candidate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRole('employer')}
                style={[
                  styles.roleButton,
                  role === 'employer' && styles.roleButtonActiveEmployer,
                ]}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === 'employer' && styles.roleTextActive,
                  ]}
                >
                  Employer / HR
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone Input */}
            <Text style={styles.inputLabel}>Enter 10-Digit Mobile Number</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.countryCode}>🇮🇳 +91</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter 10-digit number"
                placeholderTextColor="#71717a"
                value={phone}
                onChangeText={(val) => setPhone(val.replace(/\D/g, ''))}
              />
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color="#f43f5e" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Free badge */}
            <View style={styles.badgeRow}>
              <Ionicons name="shield-checkmark" size={16} color="#10b981" />
              <Text style={styles.badgeText}>
                100% Free platform. Real SMS delivered to your phone.
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                phone.length < 10 || loading ? styles.buttonDisabled : null,
              ]}
              disabled={phone.length < 10 || loading}
              onPress={handleSendCode}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Send SMS OTP</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.iconCircle}>
              <Ionicons name="key-outline" size={28} color="#10b981" />
            </View>
            <Text style={styles.cardTitle}>Enter 6-Digit SMS OTP</Text>
            <Text style={styles.cardSubtitle}>
              Sent to +91 {phone} via Clerk Telecom Gateway
            </Text>

            {infoMessage ? (
              <View style={styles.infoBox}>
                <Ionicons name="mail-outline" size={16} color="#34d399" />
                <Text style={styles.infoText}>{infoMessage}</Text>
              </View>
            ) : null}

            {/* OTP Input */}
            <Text style={styles.inputLabel}>Enter 6-Digit Code</Text>
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="123456"
              placeholderTextColor="#71717a"
              value={otpCode}
              onChangeText={setOtpCode}
            />

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color="#f43f5e" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Countdown / Resend */}
            <View style={styles.resendContainer}>
              {countdown > 0 ? (
                <Text style={styles.resendCountdown}>
                  Resend SMS OTP in {countdown}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleSendCode} disabled={loading}>
                  <Text style={styles.resendButton}>Resend SMS Code</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                otpCode.length < 6 || loading ? styles.buttonDisabled : null,
              ]}
              disabled={otpCode.length < 6 || loading}
              onPress={handleVerifyCode}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Verify & Continue</Text>
              )}
            </TouchableOpacity>

            {/* Change Number */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setStep(1);
                setOtpCode('');
                setErrorMessage('');
              }}
            >
              <Text style={styles.backButtonText}>← Change Mobile Number</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#09090b',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 2,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#18181b',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#a1a1aa',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#27272a',
    borderRadius: 12,
    padding: 4,
    width: '100%',
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  roleButtonActiveCandidate: {
    backgroundColor: '#10b981',
  },
  roleButtonActiveEmployer: {
    backgroundColor: '#3b82f6',
  },
  roleText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    color: '#d4d4d8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3f3f46',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginBottom: 14,
  },
  countryCode: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  otpInput: {
    width: '100%',
    backgroundColor: '#27272a',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#10b981',
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    gap: 8,
    marginBottom: 18,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 11,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 14,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    gap: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#fb7185',
    fontSize: 11,
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    gap: 8,
    marginBottom: 14,
  },
  infoText: {
    color: '#34d399',
    fontSize: 11,
    flex: 1,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resendCountdown: {
    color: '#71717a',
    fontSize: 12,
  },
  resendButton: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 14,
    padding: 6,
  },
  backButtonText: {
    color: '#a1a1aa',
    fontSize: 12,
  },
});
