import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Navigation, 
  X, 
  Home, 
  Calendar, 
  Calculator, 
  MessageCircle, 
  Stethoscope,
  User,
  Shield,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FloatingNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { 
      name: "Inicio", 
      href: "/", 
      icon: <Home className="w-5 h-5" />,
      color: "bg-gradient-to-r from-primary to-primary-glow"
    },
    { 
      name: "Login", 
      href: "/login", 
      icon: <User className="w-5 h-5" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    { 
      name: "Reservar Cita", 
      href: "/reservar", 
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-gradient-to-r from-accent to-accent-glow",
      badge: "Nuevo"
    },
    { 
      name: "Calculadora", 
      href: "/calculadora-edad", 
      icon: <Calculator className="w-5 h-5" />,
      color: "bg-gradient-to-r from-secondary to-secondary-glow"
    },
    { 
      name: "Testimonios", 
      href: "/testimonios", 
      icon: <Star className="w-5 h-5" />,
      color: "bg-gradient-to-r from-warning to-warning-glow"
    },
    { 
      name: "Portal Paciente", 
      href: "/patient", 
      icon: <User className="w-5 h-5" />,
      color: "bg-gradient-to-r from-success to-success-glow",
      badge: "VIP"
    },
    { 
      name: "Portal Médico", 
      href: "/doctor", 
      icon: <Stethoscope className="w-5 h-5" />,
      color: "bg-gradient-to-r from-info to-info-glow"
    },
    { 
      name: "Admin", 
      href: "/admin", 
      icon: <Shield className="w-5 h-5" />,
      color: "bg-gradient-to-r from-destructive to-destructive-glow"
    }
  ];

  const toggleNavigator = () => {
    setIsOpen(!isOpen);
  };

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Navigation Menu */}
      <div className={`
        absolute bottom-16 right-0 transform transition-all duration-300 ease-out origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
      `}>
        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl min-w-[280px]">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground">Navegación Rápida</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleNavigator}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center justify-between p-3 rounded-xl transition-all duration-200
                  hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98]
                  ${isCurrentRoute(route.href) ? 'bg-primary/10 border border-primary/20' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-lg ${route.color} text-white shadow-lg
                    group-hover:shadow-xl transition-all duration-200
                    ${isCurrentRoute(route.href) ? 'ring-2 ring-primary/30' : ''}
                  `}>
                    {route.icon}
                  </div>
                  <span className={`
                    text-sm font-medium transition-colors
                    ${isCurrentRoute(route.href) ? 'text-primary' : 'text-foreground'}
                  `}>
                    {route.name}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {route.badge && (
                    <Badge 
                      variant={route.badge === "VIP" ? "default" : "secondary"}
                      className="text-xs px-2 py-1 animate-pulse"
                    >
                      {route.badge}
                    </Badge>
                  )}
                  {isCurrentRoute(route.href) && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Navegación rápida entre páginas
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <Button
        onClick={toggleNavigator}
        className={`
          h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ease-out
          bg-gradient-to-r from-primary via-primary-glow to-accent
          hover:scale-110 hover:shadow-3xl active:scale-95
          border-2 border-white/20 backdrop-blur-sm
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}
        style={{
          background: isOpen 
            ? 'linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--destructive-glow)))'
            : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Navigation className="w-6 h-6 text-white animate-pulse" />
        )}
      </Button>

      {/* Pulse ring animation */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
      )}
    </div>
  );
};