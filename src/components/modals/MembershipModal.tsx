import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Crown,
  Star,
  Gift,
  Shield,
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Users,
  Heart
} from "lucide-react";

interface MembershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planType?: "gold" | "platinum" | "reset";
}

export const MembershipModal = ({ open, onOpenChange, planType = "gold" }: MembershipModalProps) => {
  const plans = {
    gold: {
      name: "ILUMINA Gold",
      price: "299€",
      period: "/mes",
      color: "from-yellow-500 to-yellow-600",
      icon: <Star className="w-8 h-8" />,
      popular: false,
      savings: "20%",
      description: "Plan ideal para comenzar tu transformación",
      features: [
        "2 sesiones de medicina estética al mes",
        "1 sueroterapia personalizada",
        "Valoración médica trimestral",
        "20% descuento en tratamientos adicionales",
        "Acceso a eventos exclusivos",
        "Kit de bienvenida premium"
      ],
      bonuses: [
        "Consulta inicial gratuita",
        "Plan personalizado incluido",
        "Seguimiento médico"
      ]
    },
    platinum: {
      name: "ILUMINA Platinum",
      price: "599€",
      period: "/mes",
      color: "from-gray-400 to-gray-600",
      icon: <Crown className="w-8 h-8" />,
      popular: true,
      savings: "35%",
      description: "Programa completo de rejuvenecimiento premium",
      features: [
        "4 sesiones de medicina estética al mes",
        "2 sueroterapias avanzadas",
        "Valoración médica mensual",
        "30% descuento en todos los servicios",
        "Tratamientos corporales incluidos",
        "Concierge de bienestar personal",
        "Invitado gratis a eventos VIP",
        "Suplementación personalizada"
      ],
      bonuses: [
        "Pruebas biológicas incluidas",
        "Coaching nutricional",
        "Acceso VIP prioritario"
      ]
    },
    reset: {
      name: "ILUMINA Reset 90",
      price: "1.899€",
      period: "/90 días",
      color: "from-purple-500 to-purple-600",
      icon: <Gift className="w-8 h-8" />,
      popular: false,
      savings: "40%",
      description: "Transformación completa en 90 días",
      features: [
        "Programa intensivo personalizado",
        "Sesiones ilimitadas por 90 días",
        "Sueroterapias premium incluidas",
        "Seguimiento médico semanal",
        "Pruebas biológicas avanzadas",
        "Coaching nutricional",
        "Oxígeno hiperbárico incluido",
        "Garantía de resultados"
      ],
      bonuses: [
        "Análisis genético incluido",
        "Plan nutricional personalizado",
        "Garantía de satisfacción 100%"
      ]
    }
  };

  const currentPlan = plans[planType] || plans.gold || {
    name: "Plan Básico",
    price: "299€",
    period: "/mes",
    color: "from-blue-500 to-blue-600",
    icon: <Star className="w-8 h-8" />,
    popular: false,
    savings: "20%",
    description: "Plan ideal para comenzar",
    features: ["Acceso básico"],
    bonuses: ["Consulta incluida"]
  };

  const handleSelectPlan = () => {
    toast({
      title: "¡Plan Seleccionado!",
      description: `Te contactaremos para finalizar tu membresía ${currentPlan.name}`,
    });
    onOpenChange(false);
  };

  const handleConsultation = () => {
    toast({
      title: "Consulta Agendada",
      description: "Recibirás una llamada para explicarte todos los detalles del plan",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <div className={`p-3 bg-gradient-to-r ${currentPlan.color} rounded-full text-white mr-3`}>
              {currentPlan.icon}
            </div>
            Detalles de Membresía - {currentPlan.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Plan Details */}
          <div className="space-y-6">
            {/* Plan Card */}
            <Card className={`border-none shadow-elegant bg-gradient-to-r ${currentPlan.color} text-white relative overflow-hidden`}>
              {currentPlan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-semibold">
                  🌟 MÁS POPULAR
                </div>
              )}
              
              <CardContent className={`p-8 ${currentPlan.popular ? 'pt-12' : 'pt-8'}`}>
                <div className="text-center mb-6">
                  <div className="mb-4">{currentPlan.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{currentPlan.name}</h3>
                  <p className="text-white/90 mb-4">{currentPlan.description}</p>
                  <div className="text-5xl font-bold mb-2">{currentPlan.price}</div>
                  <div className="text-lg text-white/80">{currentPlan.period}</div>
                  <Badge className="mt-3 bg-white/20 text-white border-white/30">
                    Ahorra {currentPlan.savings} vs precios individuales
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Compare Plans */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle>Comparar Planes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(plans).map(([key, plan]) => (
                    <Button
                      key={key}
                      variant={planType === key ? "default" : "outline"}
                      onClick={() => {/* Change plan type */}}
                      className="h-20 flex flex-col space-y-1 text-xs"
                    >
                      <div className="text-lg">{plan.icon}</div>
                      <span>{plan.name.split(' ')[1]}</span>
                      <span className="font-bold">{plan.price}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Features & Actions */}
          <div className="space-y-6">
            {/* Features */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Lo que Incluye
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bonuses */}
            <Card className="border-none shadow-soft bg-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-primary" />
                  Beneficios Adicionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentPlan.bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{bonus}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <Button onClick={handleSelectPlan} variant="luxury" className="w-full group" size="lg">
                <Crown className="w-5 h-5 mr-2" />
                Seleccionar {currentPlan.name}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button onClick={handleConsultation} variant="outline" className="w-full" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Consulta Personalizada Gratuita
              </Button>
            </div>

            {/* Guarantees */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Nuestras Garantías
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Cancelación sin penalización primeros 30 días",
                  "Garantía de satisfacción 100%",
                  "Médicos certificados y especializados",
                  "Tecnología de última generación",
                  "Atención personalizada exclusiva"
                ].map((guarantee, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{guarantee}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">¿Tienes dudas?</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nuestro equipo te ayudará a elegir el plan perfecto
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Llamar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};