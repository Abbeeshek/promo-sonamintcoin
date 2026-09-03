import React, { useState } from 'react';
import { getAllPlatformConfigs, initiatePlatformOAuth } from '../../services/social/socialService';
import { SocialPlatformConfig } from '../../services/social/types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Share2, Lock, ExternalLink, ShieldCheck, Key } from 'lucide-react';

export const SocialAccountsPage: React.FC = () => {
  const [platformConfigs] = useState<SocialPlatformConfig[]>(getAllPlatformConfigs());

  const handleConnectClick = (platformId: string) => {
    initiatePlatformOAuth(platformId);
  };

  const getStatusBadge = (state: SocialPlatformConfig['state']) => {
    switch (state) {
      case 'connected':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-mono font-bold border border-green-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> CONNECTED
          </span>
        );
      case 'available':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F3D068] text-xs font-mono font-bold border border-[#D4AF37]/30">
            READY TO CONNECT
          </span>
        );
      case 'not_configured':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-[#9CA3AF] text-xs font-mono font-bold border border-white/10 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> NOT CONFIGURED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/30">
            UNAVAILABLE
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F9FAFB] flex items-center gap-2.5">
            <Share2 className="w-7 h-7 text-[#F3D068]" /> Connected Social Platforms
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Manage production OAuth platform connections & credentials. Zero client secrets stored in browser.
          </p>
        </div>
      </div>

      {/* Security Architecture Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181A22] via-[#1A1D27] to-[#181A22] border border-[#D4AF37]/40 flex items-start gap-3">
        <Key className="w-5 h-5 text-[#F3D068] shrink-0 mt-0.5" />
        <div className="text-xs text-[#9CA3AF] space-y-1">
          <span className="font-bold text-[#F9FAFB] block">Server-Side OAuth Security Guarantee</span>
          <p className="leading-relaxed">
            All OAuth tokens, client secrets, and refresh credentials remain securely stored in backend environment variables.
            When environment variables are unconfigured, platforms honestly display "Not Configured" instead of simulating fake authorizations.
          </p>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platformConfigs.map((platform) => (
          <Card
            key={platform.id}
            className="p-6 border border-[#D4AF37]/30 bg-gradient-to-b from-[#181A22] to-[#14161D] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold font-display text-[#F9FAFB]">{platform.name}</h3>
                {getStatusBadge(platform.state)}
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                {platform.statusMessage}
              </p>

              {/* Required Scopes */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider block mb-1.5">
                  Required OAuth Scopes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {platform.requiredScopes.map((scope) => (
                    <span
                      key={scope}
                      className="px-2 py-0.5 rounded bg-[#0A0B0E] border border-white/10 text-[10px] font-mono text-[#D4AF37]"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <a
                href={platform.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9CA3AF] hover:text-[#F3D068] flex items-center gap-1 font-medium"
              >
                API Docs <ExternalLink className="w-3 h-3" />
              </a>

              {platform.state === 'available' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleConnectClick(platform.id)}
                  icon={<Share2 className="w-3.5 h-3.5" />}
                >
                  Initiate OAuth Flow
                </Button>
              ) : platform.state === 'connected' ? (
                <Button variant="outline" size="sm" className="border-red-500/40 text-red-400">
                  Disconnect Account
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnectClick(platform.id)}
                  disabled={!platform.clientIdConfigured}
                  className="opacity-70"
                >
                  Connect (Requires Credentials)
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
