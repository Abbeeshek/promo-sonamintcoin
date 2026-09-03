export interface AutomationRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: string;
  action: string;
  contentSource: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
  lastExecution?: string;
  nextExecution?: string;
}
