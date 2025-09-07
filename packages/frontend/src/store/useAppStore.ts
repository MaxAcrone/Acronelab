import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  theme: 'light' | 'dark';
  // Actions
  login: (userData: { id: string; name: string; email: string }) => void;
  logout: () => void;
  toggleTheme: () => void;
};

// Используем any для обхода проблем типизации persist
type SetState = (partial: Partial<AppState> | ((state: AppState) => Partial<AppState>), replace?: boolean) => void;

export const useAppStore = create<AppState>(
  (persist as any)(
    (set: SetState) => ({
      isAuthenticated: false,
      user: null,
      theme: 'dark',
      
      login: (userData: { id: string; name: string; email: string }) => set({ 
        isAuthenticated: true, 
        user: userData 
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        user: null 
      }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'app-storage',
      partialize: (state: AppState) => ({
        theme: state.theme,
        // We don't persist authentication state here as it should be handled by JWT
      }),
    }
  )
);
