import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { useAppStore } from '../store/useAppStore';

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
};

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout } = useAppStore();

  // Get current user profile
  const { data: user, isLoading: userLoading, error: userError, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data.user;
    },
    retry: false,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth-token'),
  });

  // Login mutation
  const { mutate: login, isPending: loginLoading, error: loginError } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('refresh-token', data.refreshToken);
      storeLogin(data.user);
    },
  });

  // Signup mutation
  const { mutate: signup, isPending: signupLoading, error: signupError } = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const response = await api.post<AuthResponse>('/auth/register', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('refresh-token', data.refreshToken);
      storeLogin(data.user);
    },
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('refresh-token');
    storeLogout();
  };

  return {
    user,
    userLoading,
    userError,
    login,
    loginLoading,
    loginError,
    signup,
    signupLoading,
    signupError,
    logout,
    refetchUser,
  };
};
