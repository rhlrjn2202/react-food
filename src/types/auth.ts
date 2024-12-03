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

export interface LoginCredentials {
  identifier: string; // can be email or mobile
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  mobile: string; // Indian mobile number
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}