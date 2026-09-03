import React, { useState } from 'react';
import { UserSettings } from '../../types/settings';
import { getUserSettings, updateUserSettings, clearDemoData } from '../../services/settingsService';
import { ProfileSettingsSection } from '../../components/settings/ProfileSettingsSection';
import { NotificationSettingsSection } from '../../components/settings/NotificationSettingsSection';
import { PublishingSettingsSection } from '../../components/settings/PublishingSettingsSection';
import { ClearDataModal } from '../../components/settings/ClearDataModal';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Save, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [saveSavedNotice, setSaveNotice] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleSaveAll = () => {
    updateUserSettings(settings);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  const handleConfirmClearData = () => {
    clearDemoData();
    navigate('/app');
    window.location.reload();
  };

  return (
    <div className="space-y-8 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Hub Preferences & Settings
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Manage profile details, notification preferences, publishing defaults, and local data persistence
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSavedNotice && (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved
            </span>
          )}
          <Button variant="primary" size="md" onClick={handleSaveAll} icon={<Save className="w-4 h-4" />}>
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Settings Sections Stack */}
      <div className="space-y-6 max-w-4xl">
        <ProfileSettingsSection
          profile={settings.profile}
          onChange={(p) => setSettings({ ...settings, profile: p })}
        />

        <NotificationSettingsSection
          notifications={settings.notifications}
          onChange={(n) => setSettings({ ...settings, notifications: n })}
        />

        <PublishingSettingsSection
          publishing={settings.publishing}
          onChange={(pub) => setSettings({ ...settings, publishing: pub })}
        />

        {/* Danger Zone */}
        <Card className="p-6 border border-red-500/20 bg-red-500/5 space-y-3">
          <h3 className="text-xs font-bold font-display text-red-400 uppercase tracking-wider">
            Danger Zone & Data Maintenance
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            Resetting local data will purge custom user uploads, scheduled posts, and publishing logs while preserving official catalog assets.
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClearModalOpen(true)}
            className="border-red-500/40 text-red-400 hover:bg-red-500/10"
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Reset Local Demo Data
          </Button>
        </Card>
      </div>

      {/* Modal */}
      <ClearDataModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirmClear={handleConfirmClearData}
      />
    </div>
  );
};
