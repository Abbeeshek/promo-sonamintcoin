import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserUpload } from '../../types/upload';
import { ShieldCheck, ShieldAlert, Clock, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UploadCardProps {
  upload: UserUpload;
  onVerify: (upload: UserUpload) => void;
  onFix: (upload: UserUpload) => void;
  onDelete: (id: string) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  upload,
  onVerify,
  onFix,
  onDelete,
}) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (upload.verificationStatus) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-semibold">
            <ShieldCheck className="w-3 h-3" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold">
            <ShieldAlert className="w-3 h-3" /> Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
            <Clock className="w-3 h-3" /> Pending Verification
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-[10px] font-semibold">
            Draft
          </span>
        );
    }
  };

  return (
    <Card hoverable className="flex flex-col justify-between p-4 border border-white/10">
      <div>
        {/* Media Preview Container */}
        <div className="relative aspect-video rounded-xl bg-[#181A22] overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
          {upload.path ? (
            upload.contentType === 'videos' ? (
              <video src={upload.path} className="w-full h-full object-cover" />
            ) : (
              <img src={upload.path} alt={upload.title} className="w-full h-full object-cover" />
            )
          ) : (
            <div className="text-xs text-[#6B7280]">No preview</div>
          )}

          {/* Top Status Badge */}
          <div className="absolute top-2 left-2">{getStatusBadge()}</div>
        </div>

        {/* Title & Metadata */}
        <h3 className="text-sm font-bold font-display text-[#F9FAFB] line-clamp-1 mb-1">{upload.title}</h3>
        <p className="text-[11px] text-[#9CA3AF] line-clamp-1 mb-3">
          {upload.category} &bull; {upload.language} &bull; {upload.fileSizeFormatted}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <button
          onClick={() => onDelete(upload.id)}
          aria-label="Delete upload"
          className="text-[#6B7280] hover:text-red-400 p-1.5 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {upload.verificationStatus === 'approved' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/app/create-post?assetId=${upload.id}`)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Create Post
            </Button>
          )}

          {upload.verificationStatus === 'draft' && (
            <Button variant="outline" size="sm" onClick={() => onVerify(upload)}>
              Run Verification
            </Button>
          )}

          {upload.verificationStatus === 'rejected' && (
            <Button variant="outline" size="sm" onClick={() => onFix(upload)}>
              Review Issues
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
