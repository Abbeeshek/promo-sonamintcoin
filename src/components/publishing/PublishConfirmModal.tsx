import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SocialAccount, PublishResult } from '../../types/publishing';
import { executeDemoPublish } from '../../services/publishingService';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PublishConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetTitle: string;
  caption: string;
  selectedAccounts: SocialAccount[];
}

export const PublishConfirmModal: React.FC<PublishConfirmModalProps> = ({
  isOpen,
  onClose,
  assetTitle,
  caption,
  selectedAccounts,
}) => {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);

  const handleExecutePublish = async () => {
    setIsPublishing(true);
    const result = await executeDemoPublish({
      id: `draft-${Date.now()}`,
      assetId: 'demo-asset',
      assetTitle,
      assetType: 'media',
      assetPath: '',
      caption,
      hashtags: [],
      selectedPlatformIds: selectedAccounts.map((a) => a.id),
      createdAt: new Date().toISOString(),
    });
    setIsPublishing(false);
    setPublishResult(result);
  };

  const handleFinish = () => {
    setPublishResult(null);
    onClose();
    navigate('/app');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish Social Post" maxWidth="md">
      {!publishResult ? (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-[#181A22] border border-white/10 space-y-2">
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Publishing Summary</h4>
            <div className="text-sm font-bold text-[#F9FAFB]">{assetTitle}</div>
            <div className="text-xs text-[#9CA3AF] line-clamp-2">{caption}</div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Selected Destinations</h5>
            <div className="flex flex-wrap gap-2">
              {selectedAccounts.map((acc) => (
                <span
                  key={acc.id}
                  className="px-3 py-1 rounded-lg bg-[#181A22] border border-[#D4AF37]/30 text-xs font-medium text-[#F3D068]"
                >
                  {acc.platformName} ({acc.handle})
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gold-gradient/10 border border-[#D4AF37]/30 text-xs text-[#F3D068]">
            Note: Running in frontend demo publish mode. Post status will be simulated safely.
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isPublishing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleExecutePublish}
              disabled={isPublishing}
              icon={isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            >
              {isPublishing ? 'Publishing...' : 'Confirm & Publish Now'}
            </Button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 flex items-center justify-center mx-auto shadow-gold-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-bold font-display text-[#F9FAFB] mb-1">
              Demo Publish Completed
            </h4>
            <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto leading-relaxed">
              {publishResult.message}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#181A22] border border-white/5 text-left text-xs space-y-2">
            <div className="font-semibold text-[#F9FAFB]">Destination Status:</div>
            {selectedAccounts.map((acc) => (
              <div key={acc.id} className="flex items-center justify-between text-xs">
                <span className="text-[#9CA3AF]">{acc.platformName}</span>
                <span className="text-green-400 font-semibold font-mono">SIMULATED SUCCESS</span>
              </div>
            ))}
          </div>

          <Button variant="primary" size="md" className="w-full" onClick={handleFinish}>
            Return to Dashboard
          </Button>
        </div>
      )}
    </Modal>
  );
};
