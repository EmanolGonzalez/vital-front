import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  User,
  UserCheck,
  UserPlus,
  CreditCard,
  Shield,
  ArrowRight,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  Calendar
} from "lucide-react";
import api from "@/lib/apiClient";

interface ContractServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatmentName?: string;
  treatmentPrice?: string;
}

export const ContractServiceModal = ({ open, onOpenChange, treatmentName, treatmentPrice }: ContractServiceModalProps) => {
  const [step, setStep] = useState<'user-check' | 'login' | 'register' | 'contract'>('user-check');
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "", email: "", password: "", phone: "", confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleUserRegistered = () => {
    setStep('login');
  };

  const handleUserNotRegistered = () => {
    setStep('register');
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa email y contraseña",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Acceso exitoso!",
      description: "Redirigiendo a tu portal de paciente...",
    });

    setTimeout(() => {
      navigate('/patient');
      onOpenChange(false);
    }, 1500);
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error en contraseña",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    try {
      const payload = {
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        password: registerForm.password
      };
      const res = await api.post("/auth/register", payload);
      toast({
        title: "¡Registro exitoso!",
        description: "Cuenta creada. Redirigiendo a tu portal...",
      });
      setTimeout(() => {
        navigate('/patient');
        onOpenChange(false);
      }, 1500);
    } catch (err: unknown) {
      let message = "No se pudo crear la cuenta";
      if (err instanceof Error) message = err.message;
      toast({
        title: "Error al registrar",
        description: message,
        variant: "destructive"
      });
    }
  };

  const handleContract = () => {
    setStep('contract');
  };

  const handleFinalizeContract = () => {
    toast({
      title: "¡Contratación Exitosa!",
      description: `${treatmentName} contratado por ${treatmentPrice}. Te contactaremos pronto.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-primary" />
            Contratar Servicio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Info */}
          <Card className="border-primary/20 bg-gradient-hero">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-bold text-lg">{treatmentName}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{treatmentPrice}</p>
              </div>
            </CardContent>
          </Card>

          {/* Step: User Check */}
          {step === 'user-check' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">¿Ya tienes cuenta con nosotros?</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleUserRegistered}
                  className="flex flex-col items-center space-y-2 h-20 hover:bg-primary/10"
                >
                  <UserCheck className="w-6 h-6 text-primary" />
                  <span className="text-sm">Sí, soy paciente</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleUserNotRegistered}
                  className="flex flex-col items-center space-y-2 h-20 hover:bg-primary/10"
                >
                  <UserPlus className="w-6 h-6 text-primary" />
                  <span className="text-sm">No, soy nuevo</span>
                </Button>
              </div>
            </div>
          )}

          {/* Step: Login */}
          {step === 'login' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Accede a tu cuenta</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contraseña</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('user-check')} className="flex-1">
                    Volver
                  </Button>
                  <Button onClick={handleLogin} className="flex-1 group">
                    <Shield className="w-4 h-4 mr-2" />
                    Acceder
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Register */}
          {step === 'register' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Crea tu cuenta</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre completo *</label>
                  <Input
                    placeholder="Tu nombre completo"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Teléfono</label>
                  <Input
                    placeholder="+34 000 000 000"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contraseña *</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Confirmar *</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('user-check')} className="flex-1">
                    Volver
                  </Button>
                  <Button onClick={handleRegister} className="flex-1 group">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Contract */}
          {step === 'contract' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Finalizar Contratación</h3>
              <Card className="border-none shadow-soft">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Consulta médica incluida</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Plan personalizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Seguimiento post-tratamiento</span>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={handleFinalizeContract} className="w-full group">
                <CreditCard className="w-4 h-4 mr-2" />
                Confirmar Contratación
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};