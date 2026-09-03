import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AutomationRule } from '../../types/automation';

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRule: (rule: AutomationRule) => void;
}

export const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({
  isOpen,
  onClose,
  onSaveRule,
}) => {
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('Weekly Schedule');
  const [action, setAction] = useState('Auto-Publish Poster');
  const [contentSource, setContentSource] = useState('Official Posters Catalog');
  const [frequency, setFrequency] = useState('Every Monday at 09:00 AM');

  const resetForm = () => {
    setName('');
    setTrigger('Weekly Schedule');
    setAction('Auto-Publish Poster');
    setContentSource('Official Posters Catalog');
    setFrequency('Every Monday at 09:00 AM');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRule: AutomationRule = {
      id: `auto-${Date.now()}`,
      name,
      enabled: true,
      trigger,
      action,
      contentSource,
      frequency,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSaveRule(newRule);
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { resetForm(); onClose(); }} title="Create Automation Rule" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Rule Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Weekly Promotional Video Blast"
            className="w-full bg-[#181A22] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Trigger Event
            </label>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            >
              <option value="Weekly Schedule">Weekly Schedule</option>
              <option value="Monthly Schedule">Monthly Schedule</option>
              <option value="New Asset Verified">New Asset Verified</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Target Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            >
              <option value="Auto-Publish Poster">Auto-Publish Poster</option>
              <option value="Post Video Reel">Post Video Reel</option>
              <option value="Share Presentation Link">Share Presentation Link</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Content Source
            </label>
            <input
              type="text"
              value={contentSource}
              onChange={(e) => setContentSource(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Frequency Pattern
            </label>
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gold-gradient/10 border border-[#D4AF37]/30 text-xs text-[#F3D068]">
          Note: Automation rules execute locally in demo workflow mode.
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" type="button" onClick={() => { resetForm(); onClose(); }}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={!name.trim()}>
            Enable Rule
          </Button>
        </div>
      </form>
    </Modal>
  );
};
