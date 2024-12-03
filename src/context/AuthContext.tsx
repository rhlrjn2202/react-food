import { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User, LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';
import { storage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    mobile: '9876543210',
    name: 'Test User',
    password: 'password123',
    createdAt: new Date().toISOString(),
  }
];

// Mock API calls - Replace these with real API calls in production
const mockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - check if identifier matches email or mobile
  const user = MOCK_USERS.find(u => 
    (u.email === credentials.identifier || u.mobile === credentials.identifier) && 
    u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const { password, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token: 'mock-jwt-token'
  };
};

const mockSignup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Check if email or mobile already exists
  if (MOCK_USERS.some(u => u.email === credentials.email || u.mobile === credentials.mobile)) {
    throw new Error('Email or mobile number already registered');
  }

  const newUser = {
    id: String(MOCK_USERS.length + 1),
    email: credentials.email,
    mobile: credentials.mobile,
    name: credentials.name,
    createdAt: new Date().toISOString(),
  };

  return {
    user: newUser,
    token: 'mock-jwt-token'
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth state on mount
    const token = storage.get<string | null>('token', null);
    const user = storage.get<User | null>('user', null);
    
    setState({
      token,
      user,
      isLoading: false,
    });
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await mockLogin(credentials);
      
      setState({
        user: response.user,
        token: response.token,
        isLoading: false,
      });

      storage.set('token', response.token);
      storage.set('user', response.user);

      // Get the redirect path from storage or default to home
      const redirectPath = storage.get<string>('authRedirect', '/');
      storage.remove('authRedirect'); // Clear the redirect path
      navigate(redirectPath);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      const response = await mockSignup(credentials);
      
      setState({
        user: response.user,
        token: response.token,
        isLoading: false,
      });

      storage.set('token', response.token);
      storage.set('user', response.user);

      // Get the redirect path from storage or default to home
      const redirectPath = storage.get<string>('authRedirect', '/');
      storage.remove('authRedirect'); // Clear the redirect path
      navigate(redirectPath);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setState({
      user: null,
      token: null,
      isLoading: false,
    });
    storage.remove('token');
    storage.remove('user');
    navigate('/');
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    isAuthenticated: !!state.token && !!state.user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}