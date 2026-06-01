import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserProfile = {
  email: string;
  fullName: string;
  college: string;
  year: string;
  mobile: string;
  address: string;
  dob: string;
  isProfileComplete: boolean;
};

type AppContextType = {
  user: UserProfile;
  isMenuVisible: boolean;
  setMenuVisible: (v: boolean) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  resetUser: () => void;
};

const defaultUser: UserProfile = {
  email: '',
  fullName: '',
  college: '',
  year: '',
  mobile: '',
  address: '',
  dob: '',
  isProfileComplete: false,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const resetUser = () => {
    setUser(defaultUser);
    setMenuVisible(false);
  };

  return (
    <AppContext.Provider value={{ user, isMenuVisible, setMenuVisible, updateUser, resetUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
