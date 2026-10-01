import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, AdminUser, AccessSummary } from '../types/index.ts';

const API_URL = ((import.meta.env.VITE_BACKEND_URL as string) || '').replace(/\/$/, '');

interface AuthContextType {
  user: User | null;
  admin: AdminUser | null;
  access: AccessSummary | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  adminLogin: (token: string, admin: AdminUser) => void;
  logout: () => Promise<void>;
  adminLogout: () => void;
  refreshAccess: () => Promise<void>;
  token: string | null;
  adminToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [access, setAccess] = useState<AccessSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('admin_token'));

  const refreshAccess = useCallback(async () => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      setAccess(null);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/access`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAccess(data);
      } else if (res.status === 401) {
        setUser(null);
        setAccess(null);
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (err) {
      console.error('Failed to refresh access:', err);
    }
  }, [token]);

  const loadUserData = useCallback(async () => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      setUser(null);
      setAccess(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await refreshAccess();
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setAccess(null);
      }
    } catch (err) {
      console.error('Error verifying user:', err);
    } finally {
      setLoading(false);
    }
  }, [token, refreshAccess]);

  useEffect(() => {
    loadUserData();
    const storedAdmin = localStorage.getItem('admin_profile');
    if (storedAdmin && adminToken) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('admin_profile');
      }
    }
  }, [loadUserData, adminToken]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    refreshAccess();
  };

  const adminLogin = (newAdminToken: string, newAdmin: AdminUser) => {
    localStorage.setItem('admin_token', newAdminToken);
    localStorage.setItem('admin_profile', JSON.stringify(newAdmin));
    setAdminToken(newAdminToken);
    setAdmin(newAdmin);
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAccess(null);
  };

  const adminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_profile');
    setAdminToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        access,
        loading,
        login,
        adminLogin,
        logout,
        adminLogout,
        refreshAccess,
        token,
        adminToken,
      }}
    >
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