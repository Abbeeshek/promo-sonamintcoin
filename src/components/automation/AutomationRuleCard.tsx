import { Card } from '../ui/Card';
import { AutomationRule } from '../../types/automation';
import { Zap, Clock, Trash2 } from 'lucide-react';

interface AutomationRuleCardProps {
  rule: AutomationRule;
  onToggleEnable: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AutomationRuleCard: React.FC<AutomationRuleCardProps> = ({
  rule,
  onToggleEnable,
  onDelete,
}) => {
  return (
    <Card hoverable className="p-5 border border-white/10 flex flex-col justify-between space-y-4">
      <div>
        {/* Top Title & Toggle Switch */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#181A22] border border-white/10 flex items-center justify-center text-[#F3D068]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-[#F9FAFB] line-clamp-1">{rule.name}</h3>
              <span className="text-[10px] text-[#9CA3AF]">{rule.frequency}</span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => onToggleEnable(rule.id)}
            role="switch"
            aria-checked={rule.enabled}
            aria-label={`Toggle rule ${rule.name}`}
            className={`w-11 h-6 rounded-full p-1 transition-colors ${
              rule.enabled ? 'bg-[#D4AF37]' : 'bg-[#181A22] border border-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-neutral-950 transition-transform ${
                rule.enabled ? 'translate-x-5' : 'translate-x-0 bg-[#9CA3AF]'
              }`}
            />
          </button>
        </div>

        {/* Configuration Details */}
        <div className="space-y-2 p-3 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF]">
          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Trigger & Action</span>
            <span className="text-[#F9FAFB] font-medium">{rule.trigger} &rarr; {rule.action}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Content Source</span>
            <span className="text-[#F3D068] font-mono">{rule.contentSource}</span>
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#6B7280]">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#6B7280]" />
          {rule.lastExecution ? `Last run: ${rule.lastExecution}` : 'Configured locally'}
        </span>

        <button
          onClick={() => onDelete(rule.id)}
          aria-label="Delete rule"
          className="text-[#9CA3AF] hover:text-red-400 p-1 rounded transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
