import React from 'react';
import { Card } from '../ui/Card';
import { UserSettings } from '../../types/settings';
import { Bell } from 'lucide-react';

interface NotificationSettingsSectionProps {
  notifications: UserSettings['notifications'];
  onChange: (updated: UserSettings['notifications']) => void;
}

export const NotificationSettingsSection: React.FC<NotificationSettingsSectionProps> = ({
  notifications,
  onChange,
}) => {
  const toggles = [
    { key: 'publishingUpdates', label: 'Publishing Updates', desc: 'Receive alerts when demo publishing completes' },
    { key: 'verificationUpdates', label: 'Verification Alerts', desc: 'Receive alerts when user asset verification passes/fails' },
    { key: 'schedulingUpdates', label: 'Scheduling Alerts', desc: 'Receive alerts when posts are scheduled or modified' },
    { key: 'automationUpdates', label: 'Automation Alerts', desc: 'Receive alerts when automation rules run' },
  ];

  return (
    <Card className="p-6 border border-white/10 space-y-4">
      <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider flex items-center gap-2">
        <Bell className="w-4 h-4 text-[#F3D068]" /> Notification Preferences
      </h3>

      <div className="space-y-3">
        {toggles.map((item) => {
          const isChecked = notifications[item.key as keyof UserSettings['notifications']];
          return (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-[#181A22] border border-white/5">
              <div>
                <span className="text-xs font-bold text-[#F9FAFB] block">{item.label}</span>
                <span className="text-[11px] text-[#9CA3AF]">{item.desc}</span>
              </div>

              <button
                type="button"
                onClick={() => onChange({ ...notifications, [item.key]: !isChecked })}
                role="switch"
                aria-checked={isChecked}
                aria-label={`Toggle ${item.label}`}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  isChecked ? 'bg-[#D4AF37]' : 'bg-[#14161D] border border-white/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-neutral-950 transition-transform ${
                    isChecked ? 'translate-x-5' : 'translate-x-0 bg-[#9CA3AF]'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
