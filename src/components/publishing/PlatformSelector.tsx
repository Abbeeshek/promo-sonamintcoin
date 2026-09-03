import React from 'react';
import { SocialAccount } from '../../types/publishing';
import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformSelectorProps {
  accounts: SocialAccount[];
  selectedPlatformIds: string[];
  onTogglePlatform: (id: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  accounts,
  selectedPlatformIds,
  onTogglePlatform,
}) => {
  const connectedAccounts = accounts.filter((a) => a.status === 'connected');

  return (
    <div className="space-y-3 bg-[#14161D] border border-white/10 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
          Target Platforms
        </label>

        <Link
          to="/app/social-accounts"
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Manage Accounts
        </Link>
      </div>

      {connectedAccounts.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#181A22] border border-dashed border-white/10 text-center text-xs text-[#9CA3AF]">
          No social accounts connected. Connect your platforms first.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {connectedAccounts.map((acc) => {
            const isSelected = selectedPlatformIds.includes(acc.id);

            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => onTogglePlatform(acc.id)}
                className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-[#181A22] border-[#D4AF37] shadow-gold-glow'
                    : 'bg-[#181A22]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#F9FAFB] block truncate">{acc.platformName}</span>
                  <span className="text-[10px] text-[#9CA3AF] truncate block">{acc.handle}</span>
                </div>

                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-gold-gradient border-[#D4AF37] text-neutral-950' : 'border-white/20'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
