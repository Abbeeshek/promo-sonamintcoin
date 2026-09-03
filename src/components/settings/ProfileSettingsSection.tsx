import React from 'react';
import { Card } from '../ui/Card';
import { UserSettings } from '../../types/settings';
import { User } from 'lucide-react';

interface ProfileSettingsSectionProps {
  profile: UserSettings['profile'];
  onChange: (updated: UserSettings['profile']) => void;
}

export const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({ profile, onChange }) => {
  return (
    <Card className="p-6 border border-white/10 space-y-4">
      <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider flex items-center gap-2">
        <User className="w-4 h-4 text-[#F3D068]" /> Profile Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => onChange({ ...profile, displayName: e.target.value })}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => onChange({ ...profile, email: e.target.value })}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>
    </Card>
  );
};
