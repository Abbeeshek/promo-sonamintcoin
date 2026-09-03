import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { logoutUser } from '../../services/auth/authService';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logoutUser();
    onClose();
    navigate('/', { replace: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Logout" maxWidth="sm">
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#F9FAFB] block">Are you sure you want to log out?</span>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
              Logging out will end your current session. You will need to sign in again to access the Sona Mint Coin Promotional Hub.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleConfirmLogout}
            icon={<LogOut className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-500 text-white border-none shadow-none"
          >
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};
