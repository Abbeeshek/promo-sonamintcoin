import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ClearDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClear: () => void;
}

export const ClearDataModal: React.FC<ClearDataModalProps> = ({
  isOpen,
  onClose,
  onConfirmClear,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Local Demo Data" maxWidth="md">
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-sm block mb-1">Confirm Local Data Reset</span>
            <span>
              This will clear all locally created user uploads, scheduled posts, publishing history logs, notifications, and custom settings. Official Sona Mint Coin catalog media assets will remain untouched.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => { onConfirmClear(); onClose(); }}
            className="border-red-500/40 text-red-400 hover:bg-red-500/10"
            icon={<Trash2 className="w-4 h-4" />}
          >
            Clear Local Data
          </Button>
        </div>
      </div>
    </Modal>
  );
};
