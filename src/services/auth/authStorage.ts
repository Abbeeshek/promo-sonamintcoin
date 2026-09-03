import { RegisteredAccount, AuthState } from './authTypes';

const ACCOUNTS_STORAGE_KEY = 'smc_dev_user_accounts';
const SESSION_STORAGE_KEY = 'smc_dev_auth_session';

// Pre-populated default demo account so immediate login testing works out of the box
const defaultDemoAccount: RegisteredAccount = {
  id: 'usr-demo-01',
  name: 'Sona Mint Promoter',
  email: 'promoter@sonamintcoin.com',
  passwordHash: 'password123', // Development representation
  createdAt: '2026-08-01T10:00:00.000Z',
};

export const getRegisteredAccounts = (): RegisteredAccount[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      const initial = [defaultDemoAccount];
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse accounts storage:', e);
    return [defaultDemoAccount];
  }
};

export const saveRegisteredAccount = (account: RegisteredAccount): void => {
  const current = getRegisteredAccounts();
  const updated = [...current, account];
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
};

export const getStoredSession = (): AuthState => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      // Default to active session with demo account on fresh start
      const defaultSession: AuthState = {
        isAuthenticated: true,
        user: {
          id: defaultDemoAccount.id,
          name: defaultDemoAccount.name,
          email: defaultDemoAccount.email,
          createdAt: defaultDemoAccount.createdAt,
        },
        token: 'smc_dev_session_token',
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(defaultSession));
      return defaultSession;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse session storage:', e);
    return { isAuthenticated: false, user: null };
  }
};

export const saveStoredSession = (session: AuthState): void => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredSession = (): void => {
  const unauthSession: AuthState = { isAuthenticated: false, user: null };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(unauthSession));
};
