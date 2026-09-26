import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { PackagesProvider, usePackages } from './context/PackagesContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { PaymentModal } from './components/PaymentModal.tsx';

// User Pages
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { JobsCategoryPage } from './pages/JobsCategoryPage.tsx';
import { JobDetailPage } from './pages/JobDetailPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { MyAccessPage } from './pages/MyAccessPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { LegalPages } from './pages/LegalPages.tsx';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage.tsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminJobsPage } from './pages/admin/AdminJobsPage.tsx';
import { AdminJobFormPage } from './pages/admin/AdminJobFormPage.tsx';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage.tsx';
import { AdminUsersPage } from './pages/admin/AdminUsersPage.tsx';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage.tsx';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.tsx';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { user, loading } = useAuth();
  const { packages, getPackageBySlug } = usePackages();

  // Active checkout modal state
  const [checkoutSlug, setCheckoutSlug] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = (slug: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCheckoutSlug(slug);
  };

  const selectedPackage = checkoutSlug ? getPackageBySlug(checkoutSlug) : null;

  const renderRoute = () => {
    // 1. Landing Page
    if (currentPath === '/' || currentPath === '') {
      return <LandingPage navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 2. Auth Pages
    if (currentPath === '/login') {
      return <LoginPage navigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <RegisterPage navigate={navigate} />;
    }

    // 3. User Dashboard
    if (currentPath === '/dashboard') {
      return <DashboardPage navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 4. Jobs per Category
    if (currentPath === '/jobs/it') {
      return <JobsCategoryPage categorySlug="it" navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }
    if (currentPath === '/jobs/non-it') {
      return <JobsCategoryPage categorySlug="non-it" navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }
    if (currentPath === '/jobs/banking') {
      return <JobsCategoryPage categorySlug="banking" navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }
    if (currentPath === '/jobs/all') {
      return <JobsCategoryPage categorySlug="all" navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 5. Job Details View: /jobs/view/:id or /jobs/:id
    if (currentPath.startsWith('/jobs/view/')) {
      const jobId = currentPath.replace('/jobs/view/', '');
      return <JobDetailPage jobId={jobId} navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }
    if (currentPath.startsWith('/jobs/') && !['it', 'non-it', 'banking', 'all'].includes(currentPath.replace('/jobs/', ''))) {
      const jobId = currentPath.replace('/jobs/', '');
      return <JobDetailPage jobId={jobId} navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 6. Pricing & Plans
    if (currentPath === '/pricing') {
      return <PricingPage navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 7. My Access Status
    if (currentPath === '/my-access') {
      return <MyAccessPage navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
    }

    // 8. Profile
    if (currentPath === '/profile') {
      return <ProfilePage navigate={navigate} />;
    }

    // 9. Legal Pages (Section 12)
    if (currentPath === '/terms') {
      return <LegalPages type="terms" navigate={navigate} />;
    }
    if (currentPath === '/privacy') {
      return <LegalPages type="privacy" navigate={navigate} />;
    }
    if (currentPath === '/refund') {
      return <LegalPages type="refund" navigate={navigate} />;
    }
    if (currentPath === '/disclaimer') {
      return <LegalPages type="disclaimer" navigate={navigate} />;
    }

    // 10. Admin Pages
    if (currentPath === '/admin/login') {
      return <AdminLoginPage navigate={navigate} />;
    }
    if (currentPath === '/admin/dashboard' || currentPath === '/admin') {
      return <AdminDashboardPage navigate={navigate} />;
    }
    if (currentPath === '/admin/jobs') {
      return <AdminJobsPage navigate={navigate} />;
    }
    if (currentPath === '/admin/jobs/add') {
      return <AdminJobFormPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/admin/jobs/') && currentPath.endsWith('/edit')) {
      const parts = currentPath.split('/');
      const editJobId = parts[3];
      return <AdminJobFormPage jobId={editJobId} navigate={navigate} />;
    }
    if (currentPath === '/admin/categories') {
      return <AdminCategoriesPage navigate={navigate} />;
    }
    if (currentPath === '/admin/users') {
      return <AdminUsersPage navigate={navigate} />;
    }
    if (currentPath === '/admin/payments') {
      return <AdminPaymentsPage navigate={navigate} />;
    }
    if (currentPath === '/admin/settings') {
      return <AdminSettingsPage navigate={navigate} />;
    }

    // Fallback: Landing Page
    return <LandingPage navigate={navigate} onOpenCheckout={handleOpenCheckout} />;
  };

  const isAdminView = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Header / Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Footer */}
      {!isAdminView && <Footer navigate={navigate} />}

      {/* Razorpay Payment Modal (Section 4 & 7) */}
      {selectedPackage && (
        <PaymentModal
          packageItem={selectedPackage}
          onClose={() => setCheckoutSlug(null)}
          onSuccess={(slug) => {
            // Refresh and close
            setCheckoutSlug(null);
          }}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PackagesProvider>
        <MainRouter />
      </PackagesProvider>
    </AuthProvider>
  );
}
