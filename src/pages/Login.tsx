import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { User, Stethoscope, Shield, ArrowRight, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const quickAccess = [
    {
      type: "patient",
      title: "Paciente",
      description: "Accede a tu historial médico y agenda citas",
      email: "maria@ejemplo.com",
      icon: <User className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      route: "/patient"
    },
    {
      type: "doctor",
      title: "Médico",
      description: "Gestiona pacientes y tratamientos",
      email: "doctor@ilumina.com",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      route: "/doctor"
    },
    {
      type: "admin",
      title: "Administrador",
      description: "Panel de control administrativo",
      email: "admin@ilumina.com",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      route: "/admin"
    },
    {
      type: "center",
      title: "Centro",
      description: "Acceso para centros registrados",
      email: "centro@ilumina.com",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      route: "/center"
    }
  ];

  const handleLogin = async (e?: React.FormEvent, quickType?: string, quickEmail?: string) => {
    if (e) e.preventDefault();
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const loginEmail = quickEmail || email;
      let userType = "patient";
      let route = "/patient";
      
      if (loginEmail.includes("doctor")) {
        userType = "doctor";
        route = "/doctor";
      } else if (loginEmail.includes("admin")) {
        userType = "admin";
        route = "/admin";
      } else if (loginEmail.includes("centro")) {
        userType = "center";
        route = "/center";
      }
      
      const mockUser = {
        id: "1",
        email: loginEmail,
        name: quickType === "patient" ? "María González" : 
              quickType === "doctor" ? "Dr. Carlos Mendoza" :
              quickType === "admin" ? "Admin Sistema" : "Usuario",
        role: userType as "patient" | "doctor" | "admin" | "center"
      };
      
      // Usar la función login correcta del AuthContext
      const success = await login(loginEmail, password || "demo");
      
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: `Has iniciado sesión exitosamente`,
        });
        // Si es centro, redirigir a flujo especial
        if (userType === "center") {
          navigate("/center-login");
        } else {
          navigate(route);
        }
      } else {
        toast({
          title: "Error",
          description: "Credenciales inválidas",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales inválidas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = (profile: typeof quickAccess[0]) => {
    setEmail(profile.email);
    handleLogin(undefined, profile.type, profile.email);
  };

  return (
    <div className="min-h-screen bg-gradient-cream flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
              <span className="text-primary-foreground font-bold text-2xl">I</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                ILUMINA
              </h1>
              <p className="text-muted-foreground">Vital Lounge</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Acceso al Sistema</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Selecciona tu perfil para acceso rápido o inicia sesión con tus credenciales
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Card className="border-none shadow-elegant bg-gradient-hero w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 mr-3 text-primary" />
                Inicio de Sesión
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                  required
                />
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background"
                  required
                />
                <Button 
                  type="submit" 
                  variant="luxury" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6">
          <a
            href="/center-login"
            className="text-sm text-primary underline hover:text-primary-dark transition-colors"
            style={{ display: 'inline-block', marginTop: '8px' }}
          >
            ¿Eres un centro? Accede aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;