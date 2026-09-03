import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ParticleBackground } from '../../components/home/ParticleBackground';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { signUpUser, getAuthState } from '../../services/auth/authService';
import { Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const logoPath = '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg';

  useEffect(() => {
    const auth = getAuthState();
    if (auth.isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = signUpUser({ name, email, password });
      setLoading(false);

      if (res.success) {
        navigate('/app', { replace: true });
      } else {
        setError(res.error || 'Failed to create account.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F9FAFB] flex flex-col justify-between relative overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#F3D068]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Radiant Gold Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="relative z-20 p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#F3D068] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      {/* Main Signup Form Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md p-8 sm:p-10 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] shadow-2xl shadow-gold-glow/20 relative overflow-hidden">
          {/* Gold Flare Corner */}
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Logo & Title */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 p-0.5 shadow-gold-glow">
              <img
                src={logoPath}
                alt="Official Sona Mint Coin Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold font-display text-[#F9FAFB] tracking-tight">
                Create <span className="text-gold-gradient">Promoter Account</span>
              </h1>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Register your credentials to access the Sona Mint Coin Promotional Hub
              </p>
            </div>
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-gold-glow mt-3"
              disabled={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? 'Creating Account...' : 'Create Account & Sign In'}
            </Button>
          </form>

          {/* Secondary Link to Login */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-[#9CA3AF]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F3D068] font-bold hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#6B7280] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F3D068]" />
            <span>Secure Registration</span>
          </div>
        </Card>
      </main>

      <footer className="relative z-20 py-4 text-center text-[11px] text-[#6B7280] font-mono">
        © {new Date().getFullYear()} Sona Mint Coin. All Rights Reserved.
      </footer>
    </div>
  );
};
