import React, { useState } from 'react';
import { AutomationRule } from '../../types/automation';
import {
  getAutomationRules,
  saveAutomationRule,
  toggleAutomationRule,
  deleteAutomationRule,
} from '../../services/automationService';
import { AutomationRuleCard } from '../../components/automation/AutomationRuleCard';
import { CreateAutomationModal } from '../../components/automation/CreateAutomationModal';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Plus, Zap } from 'lucide-react';

export const AutomationPage: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(getAutomationRules());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleEnable = (id: string) => {
    const updated = toggleAutomationRule(id);
    setRules(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteAutomationRule(id);
    setRules(updated);
  };

  const handleSaveRule = (newRule: AutomationRule) => {
    const updated = saveAutomationRule(newRule);
    setRules(updated);
  };

  const activeRulesCount = rules.filter((r) => r.enabled).length;

  return (
    <div className="space-y-6 animate-hero-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Promotional Automation Rules
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Automate recurring promotional publishing workflows and content distribution ({activeRulesCount} active rule(s))
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create Automation
        </Button>
      </div>

      {/* Grid or Empty State */}
      {rules.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-white/10 flex flex-col items-center">
          <Zap className="w-10 h-10 text-[#D4AF37] mb-3" />
          <h4 className="text-base font-bold font-display text-[#F9FAFB] mb-1">
            No Automation Rules Configured
          </h4>
          <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed mb-4">
            Create an automated rule to schedule recurring promotional posts automatically.
          </p>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} icon={<Plus className="w-3.5 h-3.5" />}>
            Create First Rule
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rules.map((rule) => (
            <AutomationRuleCard
              key={rule.id}
              rule={rule}
              onToggleEnable={handleToggleEnable}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateAutomationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveRule={handleSaveRule}
      />
    </div>
  );
};
