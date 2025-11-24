import { ReactNode } from "react";
import { BreadcrumbNav } from "@/components/ux/BreadcrumbNav";
import { NotificationCenter } from "@/components/ux/NotificationCenter";
import { ThemeCustomizer } from "@/components/ux/ThemeCustomizer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Bell, Settings } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  sidebar?: ReactNode;
}

export default function DashboardLayout({ children, title, sidebar }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
    // Redireccionar a la página principal después del logout
    window.location.href = "/";
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'patient': return 'Paciente';
      case 'doctor': return 'Doctor';
      case 'admin': return 'Administrador';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cream">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                  <span className="text-primary-foreground font-bold text-xl">I</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                    ILUMINA
                  </h1>
                  <p className="text-xs text-muted-foreground">Vital Lounge</p>
                </div>
              </div>
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">Panel de control</p>
              </div>
            </div>

            {/* User Menu Mejorado */}
            <div className="flex items-center space-x-6">
              {/* Solo avatar sin datos de perfil */}
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-gold text-primary-foreground font-semibold">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Separador */}
              <div className="h-8 w-px bg-border/30 mx-2" />
              {/* Modales interactivos de notificación y ajustes */}
              <div className="flex items-center space-x-2">
                <NotificationCenter />
                <ThemeCustomizer />
              </div>
              {/* Separador */}
              <div className="h-8 w-px bg-border/30 mx-2" />
              {/* Logout */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs debajo del header */}
      <div className="container mx-auto px-6 pt-4">
        <BreadcrumbNav />
      </div>
      <div className="flex">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-72 min-h-[calc(100vh-88px)] border-r border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="p-6">
              {sidebar}
            </div>
          </aside>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-8 bg-gradient-cream/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}