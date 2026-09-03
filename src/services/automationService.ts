import { AutomationRule } from '../types/automation';
import { DEMO_AUTOMATION_RULES } from '../data/demoData';

const AUTOMATION_STORAGE_KEY = 'smc_automation_rules';

export const getAutomationRules = (): AutomationRule[] => {
  try {
    const raw = localStorage.getItem(AUTOMATION_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUTOMATION_STORAGE_KEY, JSON.stringify(DEMO_AUTOMATION_RULES));
      return DEMO_AUTOMATION_RULES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse automation rules:', e);
    return DEMO_AUTOMATION_RULES;
  }
};

export const saveAutomationRule = (rule: AutomationRule): AutomationRule[] => {
  const current = getAutomationRules();
  const updated = [rule, ...current];
  localStorage.setItem(AUTOMATION_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const toggleAutomationRule = (id: string): AutomationRule[] => {
  const current = getAutomationRules();
  const updated = current.map((r) =>
    r.id === id ? { ...r, enabled: !r.enabled, updatedAt: new Date().toISOString() } : r
  );
  localStorage.setItem(AUTOMATION_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteAutomationRule = (id: string): AutomationRule[] => {
  const current = getAutomationRules();
  const updated = current.filter((r) => r.id !== id);
  localStorage.setItem(AUTOMATION_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
