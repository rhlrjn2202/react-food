export interface User {
  id: string;
  email: string;
  mobile?: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

// Base type for common fields
export interface BaseCredentials {
  password: string;
}

export interface LoginCredentials extends BaseCredentials {
  identifier: string;
}

export interface SignupCredentials extends BaseCredentials {
  name: string;
  email: string;
  mobile: string;
  confirmPassword: string;
}

export type AuthFormData = LoginCredentials | SignupCredentials;

export interface AuthResponse {
  user: User;
  token: string;
}