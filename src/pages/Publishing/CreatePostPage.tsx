import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { OFFICIAL_ASSETS } from '../../data/assetsCatalog';
import { getStoredUploads } from '../../services/uploadService';
import { getSocialAccounts } from '../../services/socialService';
import { saveScheduledPost } from '../../services/scheduleService';
import { isValidFutureDate, getBrowserTimezone } from '../../utils/dateTime';
import { ContentAsset } from '../../types/assets';
import { UserUpload } from '../../types/upload';
import { SocialAccount } from '../../types/publishing';
import { ScheduledPost } from '../../types/scheduling';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CaptionComposer } from '../../components/publishing/CaptionComposer';
import { PlatformSelector } from '../../components/publishing/PlatformSelector';
import { PostPreviewCard } from '../../components/publishing/PostPreviewCard';
import { PublishConfirmModal } from '../../components/publishing/PublishConfirmModal';
import { Send, Calendar, Globe, AlertCircle } from 'lucide-react';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedAssetId = searchParams.get('assetId');

  // Approved Content Data
  const officialApproved = OFFICIAL_ASSETS;
  const userApproved = getStoredUploads().filter((u) => u.verificationStatus === 'approved');
  const allEligibleAssets: (ContentAsset | UserUpload)[] = [...officialApproved, ...userApproved];

  const [selectedAsset, setSelectedAsset] = useState<ContentAsset | UserUpload | null>(
    allEligibleAssets[0] || null
  );

  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  // Social Accounts State
  const [socialAccounts] = useState<SocialAccount[]>(getSocialAccounts());
  const [selectedPlatformIds, setSelectedPlatformIds] = useState<string[]>([]);

  // Workflow Mode: 'publish_now' vs 'schedule'
  const [postMode, setPostMode] = useState<'publish_now' | 'schedule'>('publish_now');
  const todayStr = new Date().toISOString().split('T')[0];
  const [dateString, setDateString] = useState(todayStr);
  const [timeString, setTimeString] = useState('12:00');
  const [validationError, setValidationError] = useState('');

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (preselectedAssetId) {
      const match = allEligibleAssets.find((a) => a.id === preselectedAssetId);
      if (match) setSelectedAsset(match);
    }
  }, [preselectedAssetId]);

  const handleToggleHashtag = (tag: string) => {
    if (hashtags.includes(tag)) {
      setHashtags(hashtags.filter((t) => t !== tag));
    } else {
      setHashtags([...hashtags, tag]);
    }
  };

  const handleTogglePlatform = (id: string) => {
    if (selectedPlatformIds.includes(id)) {
      setSelectedPlatformIds(selectedPlatformIds.filter((p) => p !== id));
    } else {
      setSelectedPlatformIds([...selectedPlatformIds, id]);
    }
  };

  const handleExecuteAction = () => {
    setValidationError('');

    if (postMode === 'schedule') {
      if (!isValidFutureDate(dateString, timeString)) {
        setValidationError('Please select a future date and time for scheduling.');
        return;
      }

      const scheduledAt = new Date(`${dateString}T${timeString}`).toISOString();

      const newScheduledPost: ScheduledPost = {
        id: `sch-${Date.now()}`,
        assetId: selectedAsset?.id || 'asset-01',
        assetTitle: selectedAsset?.title || 'Promotional Asset',
        assetType: 'contentType' in (selectedAsset || {}) ? (selectedAsset as UserUpload).contentType : (selectedAsset as ContentAsset).type,
        assetPath: selectedAsset?.path || '',
        thumbnailPath: selectedAsset?.thumbnailPath || selectedAsset?.path,
        caption: `${caption} ${hashtags.join(' ')}`.trim(),
        hashtags,
        platformIds: selectedPlatformIds,
        scheduledAt,
        dateString,
        timeString,
        timezone: getBrowserTimezone(),
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveScheduledPost(newScheduledPost);
      navigate('/app/schedule');
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const selectedAccounts = socialAccounts.filter((a) => selectedPlatformIds.includes(a.id));
  const isActionReady = !!selectedAsset && caption.trim().length > 0 && selectedAccounts.length > 0;

  return (
    <div className="space-y-8 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Create & Schedule Social Post
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Select approved media, compose your caption, pick target platforms, and publish now or schedule for later
          </p>
        </div>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="lg"
          disabled={!isActionReady}
          onClick={handleExecuteAction}
          icon={postMode === 'publish_now' ? <Send className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
        >
          {postMode === 'publish_now' ? 'Publish Post Now' : 'Schedule Post'}
        </Button>
      </div>

      {/* 2-Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Content Selector, Caption, Platforms, Workflow Mode */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Asset Selector */}
          <Card className="p-5 border border-white/10">
            <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider mb-3">
              1. Select Approved Media Asset
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
              {allEligibleAssets.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                const isUserUpload = 'verificationStatus' in asset;

                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => setSelectedAsset(asset)}
                    className={`relative p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-[#181A22] border-[#D4AF37] shadow-gold-glow'
                        : 'bg-[#181A22]/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="aspect-video rounded-lg bg-black overflow-hidden mb-2 relative">
                      {asset.thumbnailPath || asset.path ? (
                        <img src={asset.thumbnailPath || asset.path} alt={asset.title} className="w-full h-full object-cover" />
                      ) : null}
                      {isUserUpload && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-blue-500/80 text-[8px] font-bold text-white uppercase">
                          My Upload
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#F9FAFB] line-clamp-1">{asset.title}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* 2. Caption Composer */}
          <CaptionComposer
            caption={caption}
            onChangeCaption={setCaption}
            hashtags={hashtags}
            onToggleHashtag={handleToggleHashtag}
          />

          {/* 3. Platform Selector */}
          <PlatformSelector
            accounts={socialAccounts}
            selectedPlatformIds={selectedPlatformIds}
            onTogglePlatform={handleTogglePlatform}
          />

          {/* 4. Action Mode Selection: Publish Now vs Schedule */}
          <Card className="p-5 border border-white/10 space-y-4">
            <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
              4. Select Publishing Action Mode
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPostMode('publish_now')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  postMode === 'publish_now'
                    ? 'bg-[#181A22] border-[#D4AF37] shadow-gold-glow'
                    : 'bg-[#181A22]/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-[#F9FAFB] mb-1">
                  <Send className="w-4 h-4 text-[#F3D068]" /> Publish Now
                </div>
                <p className="text-[11px] text-[#9CA3AF]">Dispatches post immediately to target platforms.</p>
              </button>

              <button
                type="button"
                onClick={() => setPostMode('schedule')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  postMode === 'schedule'
                    ? 'bg-[#181A22] border-[#D4AF37] shadow-gold-glow'
                    : 'bg-[#181A22]/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-[#F9FAFB] mb-1">
                  <Calendar className="w-4 h-4 text-[#F3D068]" /> Schedule Post
                </div>
                <p className="text-[11px] text-[#9CA3AF]">Saves post to calendar for automatic future publication.</p>
              </button>
            </div>

            {/* Schedule Inputs & Timezone Badge */}
            {postMode === 'schedule' && (
              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                      Schedule Date *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={dateString}
                      onChange={(e) => setDateString(e.target.value)}
                      className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                      Schedule Time *
                    </label>
                    <input
                      type="time"
                      value={timeString}
                      onChange={(e) => setTimeString(e.target.value)}
                      className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Timezone: {getBrowserTimezone()}</span>
                </div>
              </div>
            )}

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </Card>
        </div>

        {/* Right 5 Columns: Live Post Preview */}
        <div className="lg:col-span-5 sticky top-24">
          <PostPreviewCard
            asset={selectedAsset}
            caption={caption}
            hashtags={hashtags}
            selectedAccounts={selectedAccounts}
          />
        </div>
      </div>

      {/* Confirmation Modal for Immediate Publish */}
      <PublishConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        assetTitle={selectedAsset?.title || 'Promotional Asset'}
        caption={`${caption} ${hashtags.join(' ')}`}
        selectedAccounts={selectedAccounts}
      />
    </div>
  );
};
