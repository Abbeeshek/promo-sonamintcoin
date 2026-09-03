import React, { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { UserUpload, UPLOAD_LIMITS } from '../../types/upload';
import { ContentType, Language, Category } from '../../types/assets';
import { getAvailableLanguages, getAvailableCategories } from '../../data/dashboardData';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newUpload: UserUpload) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<ContentType>('posters');
  const [language, setLanguage] = useState<Language>('English');
  const [category, setCategory] = useState<Category>('Sonamintcoin Plan');
  const [tagInput, setTagInput] = useState('promo, custom');

  const languages = getAvailableLanguages();
  const categories = getAvailableCategories();

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setValidationError('');
    setTitle('');
    setDescription('');
    setContentType('posters');
    setLanguage('English');
    setCategory('Sonamintcoin Plan');
    setTagInput('promo, custom');
  };

  const handleFile = (file: File) => {
    setValidationError('');

    // Determine type
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
    const isVideo = ['mp4', 'mov', 'webm'].includes(ext);
    const isDoc = ['pdf', 'pptx'].includes(ext);

    if (!isImage && !isVideo && !isDoc) {
      setValidationError(`Unsupported file type (.${ext}). Supported: JPG, PNG, WEBP, MP4, MOV, PDF, PPTX.`);
      return;
    }

    // Size limit validation
    let limit = UPLOAD_LIMITS.IMAGE_MAX_SIZE;
    let inferredType: ContentType = 'posters';
    if (isVideo) {
      limit = UPLOAD_LIMITS.VIDEO_MAX_SIZE;
      inferredType = 'videos';
    } else if (isDoc) {
      limit = UPLOAD_LIMITS.DOCUMENT_MAX_SIZE;
      inferredType = 'presentations';
    }

    if (file.size > limit) {
      const maxMb = Math.round(limit / 1024 / 1024);
      setValidationError(`File size (${(file.size / 1024 / 1024).toFixed(1)} MB) exceeds maximum limit of ${maxMb} MB.`);
      return;
    }

    setSelectedFile(file);
    setContentType(inferredType);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const fileSizeFormatted = `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`;
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || 'png';
    const tags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newUpload: UserUpload = {
      id: `user-up-${Date.now()}`,
      title: title || selectedFile.name,
      description,
      contentType,
      path: previewUrl,
      thumbnailPath: contentType !== 'videos' ? previewUrl : undefined,
      fileSize: selectedFile.size,
      fileSizeFormatted,
      fileExtension: ext,
      language,
      category,
      tags,
      verificationStatus: 'draft',
      createdAt: new Date().toISOString(),
    };

    onUploadSuccess(newUpload);
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { resetForm(); onClose(); }} title="Upload Promotional Content" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drag and Drop Zone */}
        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                : 'border-white/20 bg-[#181A22] hover:border-white/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,.pdf,.pptx"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <UploadCloud className="w-12 h-12 text-[#F3D068] mx-auto mb-3" />
            <h4 className="text-sm font-bold font-display text-[#F9FAFB] mb-1">
              Drag & drop promotional file or <span className="text-[#F3D068] underline">browse</span>
            </h4>
            <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
              Supports Images (JPG, PNG, WEBP max 10MB), Videos (MP4, MOV max 100MB), Documents (PDF, PPTX max 25MB).
            </p>
          </div>
        ) : (
          /* File Selected Preview Banner */
          <div className="p-4 rounded-xl bg-[#181A22] border border-[#D4AF37]/40 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#14161D] border border-white/10 flex items-center justify-center shrink-0 text-[#F3D068]">
                <File className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#F9FAFB] truncate block">{selectedFile.name}</span>
                <span className="text-[10px] text-[#9CA3AF]">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB &bull; Ready for metadata
                </span>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={resetForm}>
              Change File
            </Button>
          </div>
        )}

        {/* Validation Error Message */}
        {validationError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Metadata Inputs */}
        {selectedFile && (
          <div className="space-y-4 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                Asset Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sona Mint Coin Special Campaign Banner"
                className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as ContentType)}
                  className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
                >
                  <option value="posters">Poster / Graphic</option>
                  <option value="videos">Video Reel</option>
                  <option value="presentations">Presentation Deck</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of promotional artwork..."
                className="w-full bg-[#181A22] border border-white/10 rounded-xl p-3 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="promo, custom, gold"
                className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F9FAFB]"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Button variant="ghost" size="sm" type="button" onClick={() => { resetForm(); onClose(); }}>
            Cancel
          </Button>

          <Button variant="primary" size="md" type="submit" disabled={!selectedFile || !!validationError}>
            Save as Draft Workspace Asset
          </Button>
        </div>
      </form>
    </Modal>
  );
};
