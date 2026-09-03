export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface RegisteredAccount extends User {
  passwordHash: string; // Isolated dev authentication storage representation
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}
