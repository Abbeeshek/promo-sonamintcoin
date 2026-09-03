import React from 'react';
import { Card } from '../ui/Card';
import { UserSettings } from '../../types/settings';
import { Send } from 'lucide-react';

interface PublishingSettingsSectionProps {
  publishing: UserSettings['publishing'];
  onChange: (updated: UserSettings['publishing']) => void;
}

export const PublishingSettingsSection: React.FC<PublishingSettingsSectionProps> = ({
  publishing,
  onChange,
}) => {
  return (
    <Card className="p-6 border border-white/10 space-y-4">
      <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider flex items-center gap-2">
        <Send className="w-4 h-4 text-[#F3D068]" /> Publishing & Timezone Defaults
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Default Application Timezone
          </label>
          <input
            type="text"
            value={publishing.defaultTimezone}
            onChange={(e) => onChange({ ...publishing, defaultTimezone: e.target.value })}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-[#181A22] border border-white/5">
          <div>
            <span className="text-xs font-bold text-[#F9FAFB] block">Confirmation Before Publishing</span>
            <span className="text-[11px] text-[#9CA3AF]">Display modal review step before executing post creation</span>
          </div>

          <button
            type="button"
            onClick={() => onChange({ ...publishing, confirmBeforePublishing: !publishing.confirmBeforePublishing })}
            role="switch"
            aria-checked={publishing.confirmBeforePublishing}
            aria-label="Toggle confirmation step before publishing"
            className={`w-11 h-6 rounded-full p-1 transition-colors ${
              publishing.confirmBeforePublishing ? 'bg-[#D4AF37]' : 'bg-[#14161D] border border-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-neutral-950 transition-transform ${
                publishing.confirmBeforePublishing ? 'translate-x-5' : 'translate-x-0 bg-[#9CA3AF]'
              }`}
            />
          </button>
        </div>
      </div>
    </Card>
  );
};
