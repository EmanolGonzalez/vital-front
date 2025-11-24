import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UXContextType {
  // Theme & Preferences
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  
  // Navigation & Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  breadcrumbs: Array<{ label: string; href?: string }>;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
  
  // Loading States
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
  
  // Onboarding
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  tourActive: boolean;
  setTourActive: (active: boolean) => void;
  
  // User Preferences
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const UXContext = createContext<UXContextType | undefined>(undefined);

export const UXProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ label: string; href?: string }>>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ux-preferences');
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setTheme(prefs.theme || 'system');
        setFontSize(prefs.fontSize || 'medium');
        setOnboardingCompleted(prefs.onboardingCompleted || false);
        setSidebarCollapsed(prefs.sidebarCollapsed || false);
        setSearchHistory(prefs.searchHistory || []);
      } catch (error) {
        console.error('Error loading UX preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const prefs = {
      theme,
      fontSize,
      onboardingCompleted,
      sidebarCollapsed,
      searchHistory
    };
    localStorage.setItem('ux-preferences', JSON.stringify(prefs));
  }, [theme, fontSize, onboardingCompleted, sidebarCollapsed, searchHistory]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    
    switch (fontSize) {
      case 'small':
        root.classList.add('text-sm');
        break;
      case 'medium':
        root.classList.add('text-base');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
    }
  }, [fontSize]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      
      // Escape to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const addToSearchHistory = (query: string) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory].slice(0, 10);
      setSearchHistory(newHistory);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Also show toast
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: UXContextType = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    searchOpen,
    setSearchOpen,
    searchHistory,
    addToSearchHistory,
    breadcrumbs,
    setBreadcrumbs,
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    unreadCount,
    loadingStates,
    setLoading,
    onboardingCompleted,
    setOnboardingCompleted,
    tourActive,
    setTourActive,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return <UXContext.Provider value={value}>{children}</UXContext.Provider>;
};

export const useUX = () => {
  const context = useContext(UXContext);
  if (context === undefined) {
    throw new Error('useUX must be used within a UXProvider');
  }
  return context;
};