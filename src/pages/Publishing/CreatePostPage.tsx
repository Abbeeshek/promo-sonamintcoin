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
import {
  Send,
  Calendar,
  Globe,
  AlertCircle,
  Sparkles,
  UploadCloud,
  Plus,
  Check,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedAssetId = searchParams.get('assetId');

  // Approved Content Data
  const officialApproved = OFFICIAL_ASSETS;
  const userApproved = getStoredUploads().filter((u) => u.verificationStatus === 'approved');

  // Media Source Selection state: null = initial dual choice view, 'platform' = platform catalog, 'user' = own uploads
  const [sourceType, setSourceType] = useState<'platform' | 'user' | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<ContentAsset | UserUpload | null>(null);

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

  // Auto-detect preselected asset from query params (e.g. returning from My Uploads page after verification)
  useEffect(() => {
    if (preselectedAssetId) {
      const userMatch = userApproved.find((a) => a.id === preselectedAssetId);
      if (userMatch) {
        setSourceType('user');
        setSelectedAsset(userMatch);
        return;
      }
      const officialMatch = officialApproved.find((a) => a.id === preselectedAssetId);
      if (officialMatch) {
        setSourceType('platform');
        setSelectedAsset(officialMatch);
        return;
      }
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
            <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider mb-4">
              1. Select Approved Media Asset
            </h3>

            {sourceType === null ? (
              /* Dual Choice Options: Platform Content vs Upload Own Content */
              <div className="space-y-3">
                <p className="text-xs text-[#9CA3AF]">
                  Choose where you would like to select your promotional media asset from:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Official Platform Media */}
                  <button
                    type="button"
                    onClick={() => {
                      setSourceType('platform');
                      if (officialApproved.length > 0) {
                        setSelectedAsset(officialApproved[0]);
                      }
                    }}
                    className="group relative p-5 rounded-2xl bg-[#181A22]/80 border border-white/10 hover:border-[#D4AF37] hover:shadow-gold-glow transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068] group-hover:scale-105 transition-transform">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#F3D068]">
                          {officialApproved.length} Assets
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors mb-1">
                        Select Content from Platform
                      </h4>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">
                        Browse Sona Mint Coin official marketing posters, videos, and presentations.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Browse Platform Media</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  {/* Option 2: Upload Own Content */}
                  <button
                    type="button"
                    onClick={() => {
                      setSourceType('user');
                      if (userApproved.length > 0) {
                        setSelectedAsset(userApproved[0]);
                      }
                    }}
                    className="group relative p-5 rounded-2xl bg-[#181A22]/80 border border-white/10 hover:border-[#D4AF37] hover:shadow-gold-glow transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-blue-400">
                          {userApproved.length} Verified
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors mb-1">
                        Upload Own Content
                      </h4>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">
                        Use your personal uploaded videos & graphics after passing AI guideline verification.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Browse My Uploads</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Source View with Header Switcher and Asset Grid */
              <div className="space-y-4">
                {/* Source Switcher Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5 bg-[#14161D] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setSourceType('platform');
                        if (!selectedAsset || 'verificationStatus' in selectedAsset) {
                          setSelectedAsset(officialApproved[0] || null);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        sourceType === 'platform'
                          ? 'bg-[#181A22] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm'
                          : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Platform Media ({officialApproved.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSourceType('user');
                        if (!selectedAsset || !('verificationStatus' in selectedAsset)) {
                          setSelectedAsset(userApproved[0] || null);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        sourceType === 'user'
                          ? 'bg-[#181A22] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm'
                          : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      My Uploads ({userApproved.length})
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSourceType(null);
                        setSelectedAsset(null);
                      }}
                      className="text-[11px] text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5"
                    >
                      <RotateCcw className="w-3 h-3" /> Change Option
                    </button>

                    {sourceType === 'user' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/app/my-uploads')}
                        icon={<Plus className="w-3.5 h-3.5" />}
                      >
                        Upload New Content
                      </Button>
                    )}
                  </div>
                </div>

                {/* Platform Media Grid */}
                {sourceType === 'platform' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
                    {officialApproved.map((asset) => {
                      const isSelected = selectedAsset?.id === asset.id;
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
                            {isSelected && (
                              <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#F9FAFB] line-clamp-1">{asset.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* User Uploads Grid */}
                {sourceType === 'user' && (
                  <div>
                    {userApproved.length === 0 ? (
                      <div className="p-6 rounded-xl bg-[#181A22]/60 border border-dashed border-white/10 text-center space-y-3">
                        <UploadCloud className="w-8 h-8 text-[#D4AF37] mx-auto opacity-80" />
                        <div>
                          <h5 className="text-xs font-bold text-[#F9FAFB] mb-1">No Approved Custom Uploads</h5>
                          <p className="text-[11px] text-[#9CA3AF] max-w-xs mx-auto">
                            Upload your video or poster and run AI guideline verification. Once approved, it will automatically appear here!
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate('/app/my-uploads')}
                          icon={<Plus className="w-3.5 h-3.5" />}
                        >
                          Redirect to Upload Content Page
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
                        {userApproved.map((asset) => {
                          const isSelected = selectedAsset?.id === asset.id;
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
                                  asset.contentType === 'videos' ? (
                                    <video src={asset.path} className="w-full h-full object-cover" />
                                  ) : (
                                    <img src={asset.path} alt={asset.title} className="w-full h-full object-cover" />
                                  )
                                ) : null}
                                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-blue-500/80 text-[8px] font-bold text-white uppercase">
                                  My Upload
                                </span>
                                {isSelected && (
                                  <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-bold text-[#F9FAFB] line-clamp-1">{asset.title}</span>
                            </button>
                          );
                        })}

                        {/* Additional "+ Upload New" card tile in user grid */}
                        <button
                          type="button"
                          onClick={() => navigate('/app/my-uploads')}
                          className="p-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#D4AF37]/50 transition-all flex flex-col items-center justify-center text-center gap-2 group min-h-[100px]"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068] group-hover:scale-110 transition-transform">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-[#D4AF37]">Upload New Media</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
