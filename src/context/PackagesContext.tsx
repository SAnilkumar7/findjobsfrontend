import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Package, SiteSettings } from '../types/index.ts';

interface PackagesContextType {
  packages: Package[];
  settings: SiteSettings | null;
  loading: boolean;
  refreshPackages: () => Promise<void>;
  getPackageBySlug: (slug: string) => Package | undefined;
  formatPrice: (amount: number) => string;
}

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

export function PackagesProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPackagesAndSettings = useCallback(async () => {
    try {
      const [pkgRes, setRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/admin/settings'),
      ]);

      if (pkgRes.ok) {
        const pkgs = await pkgRes.json();
        setPackages(pkgs);
      }

      if (setRes.ok) {
        const sett = await setRes.json();
        setSettings(sett);
      }
    } catch (err) {
      console.error('Failed to load packages or settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackagesAndSettings();
  }, [fetchPackagesAndSettings]);

  const getPackageBySlug = (slug: string) => {
    return packages.find((p) => p.slug === slug);
  };

  const formatPrice = (amount: number) => {
    const symbol = settings?.currency_symbol || '₹';
    return `${symbol}${amount}`;
  };

  return (
    <PackagesContext.Provider
      value={{
        packages,
        settings,
        loading,
        refreshPackages: fetchPackagesAndSettings,
        getPackageBySlug,
        formatPrice,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) {
    throw new Error('usePackages must be used within a PackagesProvider');
  }
  return context;
}
