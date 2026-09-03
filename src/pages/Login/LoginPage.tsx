import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ParticleBackground } from '../../components/home/ParticleBackground';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { loginUser, getAuthState } from '../../services/auth/authService';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setLoading(true);

    setTimeout(() => {
      const res = loginUser({ email, password });
      setLoading(false);

      if (res.success) {
        navigate('/app', { replace: true });
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F9FAFB] flex flex-col justify-between relative overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#F3D068]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Radiant Gold Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-20 p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#F3D068] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      {/* Main Centered Login Box */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 sm:p-10 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] shadow-2xl shadow-gold-glow/20 relative overflow-hidden">
          {/* Gold Flare Corner */}
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Official Logo Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 p-0.5 shadow-gold-glow">
              <img
                src={logoPath}
                alt="Official Sona Mint Coin Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold font-display text-[#F9FAFB] tracking-tight">
                Sign In to <span className="text-gold-gradient">Promotional Hub</span>
              </h1>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Enter your promoter credentials to access the workspace dashboard
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Promoter Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="promoter@sonamintcoin.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0B0E] border border-white/10 text-xs font-mono text-[#F9FAFB] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-gold-glow mt-2"
              disabled={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          {/* Secondary Link to Signup */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-[#9CA3AF]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#F3D068] font-bold hover:underline">
              Sign up
            </Link>
          </div>

          {/* Security Guarantee Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF] font-mono">
            <ShieldCheck className="w-4 h-4 text-[#F3D068]" />
            <span>Secure Enterprise Session</span>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center text-[11px] text-[#6B7280] font-mono">
        © {new Date().getFullYear()} Sona Mint Coin. All Rights Reserved.
      </footer>
    </div>
  );
};
