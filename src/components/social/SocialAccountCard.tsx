import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SocialAccount } from '../../types/publishing';
import { Share2, Link2, Unlink } from 'lucide-react';

interface SocialAccountCardProps {
  account: SocialAccount;
  onToggleConnect: (id: string) => void;
}

export const SocialAccountCard: React.FC<SocialAccountCardProps> = ({
  account,
  onToggleConnect,
}) => {
  const isConnected = account.status === 'connected';

  return (
    <Card hoverable className="flex flex-col justify-between p-5 border border-white/10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#181A22] border border-white/10 flex items-center justify-center text-[#F3D068]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-[#F9FAFB]">{account.platformName}</h3>
              <span className="text-xs text-[#9CA3AF]">{account.handle}</span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
              isConnected
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
          {isConnected
            ? `Connected on ${account.connectedAt || '2026-08-01'}. Ready for promotional post distribution.`
            : 'Connect this platform destination to enable multi-channel publishing.'}
        </p>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-[#6B7280]">
          {isConnected ? 'OAuth Demo Active' : 'OAuth Ready'}
        </span>

        <Button
          variant={isConnected ? 'ghost' : 'outline'}
          size="sm"
          onClick={() => onToggleConnect(account.id)}
          icon={isConnected ? <Unlink className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        >
          {isConnected ? 'Disconnect' : 'Connect Account'}
        </Button>
      </div>
    </Card>
  );
};
