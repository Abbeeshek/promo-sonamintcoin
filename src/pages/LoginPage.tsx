import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigates into app shell foundation
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F9FAFB] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header Back Button */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-12 animate-hero-fade">
        <div className="bg-[#14161D] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-glow mb-4">
              <span className="text-sm font-black text-neutral-950 font-display">SMC</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-[#F9FAFB]">Sign In</h2>
            <p className="text-xs text-[#9CA3AF] mt-1">Access the Sona Mint Coin Hub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#9CA3AF] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@sonamintcoin.com"
                className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-xs font-medium text-[#9CA3AF] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                id="pass"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
            </div>

            <Button variant="primary" size="lg" className="w-full mt-2" icon={<Lock className="w-4 h-4" />}>
              Enter Application Shell
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-xs text-[#6B7280]">
        Sona Mint Coin Promotional Hub Foundation
      </div>
    </div>
  );
};
