import { User, AuthState, SignUpPayload, LoginPayload, AuthResult, RegisteredAccount } from './authTypes';
import { getRegisteredAccounts, saveRegisteredAccount, getStoredSession, saveStoredSession, clearStoredSession } from './authStorage';

export const getAuthState = (): AuthState => {
  return getStoredSession();
};

export const signUpUser = (payload: SignUpPayload): AuthResult => {
  const { name, email, password } = payload;
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  if (!cleanName) {
    return { success: false, error: 'Full name is required.' };
  }

  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  // Check duplicate email
  const existingAccounts = getRegisteredAccounts();
  const emailTaken = existingAccounts.some((acc) => acc.email.toLowerCase() === cleanEmail);

  if (emailTaken) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  // Create new user account
  const newUser: User = {
    id: `usr-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    createdAt: new Date().toISOString(),
  };

  const newAccount: RegisteredAccount = {
    ...newUser,
    passwordHash: password, // Isolated dev storage representation
  };

  saveRegisteredAccount(newAccount);

  // Automatically sign in newly created account
  const session: AuthState = {
    isAuthenticated: true,
    user: newUser,
    token: `smc_sess_${Date.now()}`,
  };

  saveStoredSession(session);

  return { success: true, user: newUser };
};

export const loginUser = (payload: LoginPayload): AuthResult => {
  const { email, password } = payload;
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const existingAccounts = getRegisteredAccounts();
  const matchingAccount = existingAccounts.find(
    (acc) => acc.email.toLowerCase() === cleanEmail && acc.passwordHash === password
  );

  if (!matchingAccount) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const user: User = {
    id: matchingAccount.id,
    name: matchingAccount.name,
    email: matchingAccount.email,
    createdAt: matchingAccount.createdAt,
  };

  const session: AuthState = {
    isAuthenticated: true,
    user,
    token: `smc_sess_${Date.now()}`,
  };

  saveStoredSession(session);

  return { success: true, user };
};

export const logoutUser = (): void => {
  clearStoredSession();
};
