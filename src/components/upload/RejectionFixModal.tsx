import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { UserUpload } from '../../types/upload';
import { Language, Category } from '../../types/assets';
import { getAvailableLanguages, getAvailableCategories } from '../../data/dashboardData';
import { Wrench } from 'lucide-react';

interface RejectionFixModalProps {
  upload: UserUpload | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveAndRetry: (updatedUpload: UserUpload) => void;
}

export const RejectionFixModal: React.FC<RejectionFixModalProps> = ({
  upload,
  isOpen,
  onClose,
  onSaveAndRetry,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [category, setCategory] = useState<Category>('Sonamintcoin Plan');

  const languages = getAvailableLanguages();
  const categories = getAvailableCategories();

  useEffect(() => {
    if (upload) {
      setTitle(upload.title);
      setDescription(upload.description || '');
      setLanguage(upload.language);
      setCategory(upload.category);
    }
  }, [upload]);

  if (!upload) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserUpload = {
      ...upload,
      title,
      description,
      language,
      category,
    };
    onSaveAndRetry(updated);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Correct Asset Metadata" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <Wrench className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Update metadata fields below and re-run rule checks.</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Asset Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
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
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl p-3 text-xs text-[#F9FAFB]"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Save & Re-verify
          </Button>
        </div>
      </form>
    </Modal>
  );
};
