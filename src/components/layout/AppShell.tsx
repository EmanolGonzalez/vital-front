import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { FloatingNavigator } from '@/components/layout/FloatingNavigator';
import { GlobalSearch } from '@/components/ux/GlobalSearch';
import { NotificationCenter } from '@/components/ux/NotificationCenter';
import { ThemeCustomizer } from '@/components/ux/ThemeCustomizer';
import { BreadcrumbNav } from '@/components/ux/BreadcrumbNav';
import { OnboardingTour } from '@/components/ux/OnboardingTour';
import { useUX } from '@/contexts/UXContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const location = useLocation();
  const { loadingStates } = useUX();
  
  // Pages that should have minimal UI (login, center login, onboarding forms, etc.)
  const minimalPages = ['/login', '/center-login'];
  const isMinimalPage = minimalPages.includes(location.pathname);
  
  // Dashboard pages that might have different layout
  const dashboardPaths = ['/patient', '/doctor', '/admin', '/panel-centro'];
  const isDashboard = dashboardPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Global UX Components */}
      <GlobalSearch />
      <OnboardingTour />
      
      {/* Main Navigation - Hidden on minimal pages and dashboard */}
      {!isMinimalPage && !isDashboard && <Navigation />}
      
      {/* Main Content Area */}
      <main className={`w-full ${!isMinimalPage ? 'pt-20' : ''}`}>
        {/* Breadcrumb Navigation - Only on non-minimal pages */}
        {!isMinimalPage && !isDashboard && (
          <div className="container mx-auto px-4 py-4">
            <BreadcrumbNav />
          </div>
        )}
        
        {/* Page Content */}
        <div className="w-full">
          {children}
        </div>
      </main>
      
      {/* Floating Elements - Solo en páginas públicas, nunca en dashboard ni login */}
      {!isMinimalPage && !isDashboard && (
        <>
          <FloatingNavigator />
          {/* Quick Actions Bar */}
          <div className="fixed top-20 right-4 z-[9998] flex items-center space-x-2">
            <NotificationCenter />
            <ThemeCustomizer />
          </div>
        </>
      )}
      
      {/* Global Loading Overlay */}
      {loadingStates.global && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-sm font-medium">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );
};