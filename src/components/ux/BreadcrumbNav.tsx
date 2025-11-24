import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUX } from '@/contexts/UXContext';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const BreadcrumbNav = () => {
  const location = useLocation();
  const { breadcrumbs, setBreadcrumbs } = useUX();

  // Auto-generate breadcrumbs based on route
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const routeMap: Record<string, string> = {
      '': 'Inicio',
      'login': 'Iniciar Sesión',
      'reservar': 'Reservar Cita',
      'calculadora-edad': 'Calculadora de Edad',
      'testimonios': 'Testimonios',
      'patient': 'Portal Paciente',
      'doctor': 'Portal Médico',
      'admin': 'Administración',
    };

    const newBreadcrumbs: BreadcrumbItem[] = [
      { label: 'Inicio', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Don't add link to the last item (current page)
      if (index === pathSegments.length - 1) {
        newBreadcrumbs.push({ label });
      } else {
        newBreadcrumbs.push({ label, href: currentPath });
      }
    });

    // Only show breadcrumbs if we're not on the home page
    if (location.pathname !== '/') {
      setBreadcrumbs(newBreadcrumbs);
    } else {
      setBreadcrumbs([]);
    }
  }, [location.pathname, setBreadcrumbs]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg border border-border/50">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          )}
          
          {crumb.href ? (
            <Link to={crumb.href}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {index === 0 && <Home className="w-3 h-3 mr-1" />}
                {crumb.label}
              </Button>
            </Link>
          ) : (
            <span className="px-2 py-1 text-foreground font-medium">
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};