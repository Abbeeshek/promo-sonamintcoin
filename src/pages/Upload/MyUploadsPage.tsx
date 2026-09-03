import React, { useState } from 'react';
import { UserUpload, VerificationStatus, VerificationResult } from '../../types/upload';
import { getStoredUploads, saveUpload, updateUpload, deleteUpload } from '../../services/uploadService';
import { verifyUploadAsset } from '../../services/verificationService';
import { UploadCard } from '../../components/upload/UploadCard';
import { UploadModal } from '../../components/upload/UploadModal';
import { VerificationModal } from '../../components/upload/VerificationModal';
import { RejectionFixModal } from '../../components/upload/RejectionFixModal';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Plus, UploadCloud } from 'lucide-react';

export const MyUploadsPage: React.FC = () => {
  const [uploads, setUploads] = useState<UserUpload[]>(getStoredUploads());
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'all'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Verification modal state
  const [activeVerificationAsset, setActiveVerificationAsset] = useState<UserUpload | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  // Fix modal state
  const [fixAsset, setFixAsset] = useState<UserUpload | null>(null);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);

  const handleUploadSuccess = (newUpload: UserUpload) => {
    const updated = saveUpload(newUpload);
    setUploads(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteUpload(id);
    setUploads(updated);
  };

  const handleRunVerification = (upload: UserUpload) => {
    const result = verifyUploadAsset(upload);
    const updatedAsset: UserUpload = {
      ...upload,
      verificationStatus: result.status,
      verificationResult: result,
    };
    const updatedList = updateUpload(updatedAsset);
    setUploads(updatedList);

    setActiveVerificationAsset(updatedAsset);
    setVerificationResult(result);
    setIsVerificationModalOpen(true);
  };

  const handleFixSaveAndRetry = (updatedUpload: UserUpload) => {
    handleRunVerification(updatedUpload);
  };

  const filteredUploads = uploads.filter((u) => {
    if (statusFilter === 'all') return true;
    return u.verificationStatus === statusFilter;
  });

  const filterTabs: { key: VerificationStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All Uploads' },
    { key: 'approved', label: 'Approved' },
    { key: 'pending', label: 'Pending' },
    { key: 'draft', label: 'Draft' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            My Uploads Workspace
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Manage your personal promotional video, poster, and presentation uploads ({uploads.length} total)
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsUploadModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Upload New Asset
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-1.5 bg-[#14161D] border border-white/10 p-1.5 rounded-xl overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              statusFilter === tab.key
                ? 'bg-[#181A22] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm font-semibold'
                : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid or Empty State */}
      {filteredUploads.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-white/10">
          <UploadCloud className="w-12 h-12 text-[#D4AF37] mb-3" />
          <h3 className="text-base font-bold font-display text-[#F9FAFB] mb-1">No uploads in this view</h3>
          <p className="text-xs text-[#9CA3AF] max-w-sm mb-5">
            Upload your own promotional video or poster graphic to start verifying and publishing.
          </p>
          <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)} icon={<Plus className="w-3.5 h-3.5" />}>
            Upload Asset Now
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUploads.map((upload) => (
            <UploadCard
              key={upload.id}
              upload={upload}
              onVerify={handleRunVerification}
              onFix={(u) => { setFixAsset(u); setIsFixModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <VerificationModal
        upload={activeVerificationAsset}
        result={verificationResult}
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onFix={(u) => { setFixAsset(u); setIsFixModalOpen(true); }}
      />

      <RejectionFixModal
        upload={fixAsset}
        isOpen={isFixModalOpen}
        onClose={() => setIsFixModalOpen(false)}
        onSaveAndRetry={handleFixSaveAndRetry}
      />
    </div>
  );
};
