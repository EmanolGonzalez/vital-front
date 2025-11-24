import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Star, 
  Gift, 
  Calendar, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Diamond,
  Heart,
  Users,
  Clock,
  Award
} from "lucide-react";

// Modal trigger function
const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

export const MembershipSection = () => {
  const benefits = [
    {
      icon: <Crown className="w-5 h-5" />,
      title: "Ahorro Exclusivo",
      description: "Hasta 40% de descuento en tratamientos"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Seguimiento Médico",
      description: "Valoraciones médicas incluidas"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Acceso VIP",
      description: "Prioridad en reservas y horarios exclusivos"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Regalos & Descuentos",
      description: "Bienvenida premium y ofertas especiales"
    }
  ];

  const plans = [
    {
      name: "ILUMINA Gold",
      price: "299€",
      period: "/mes",
      description: "Plan ideal para comenzar tu transformación",
      features: [
        "2 sesiones de medicina estética al mes",
        "1 sueroterapia personalizada",
        "Valoración médica trimestral",
        "20% descuento en tratamientos adicionales",
        "Acceso a eventos exclusivos",
        "Kit de bienvenida premium"
      ],
      icon: <Star className="w-8 h-8" />,
      color: "gold",
      popular: false
    },
    {
      name: "ILUMINA Platinum",
      price: "599€",
      period: "/mes",
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
      icon: <Diamond className="w-8 h-8" />,
      color: "platinum",
      popular: true
    },
    {
      name: "ILUMINA Reset 90",
      price: "1.899€",
      period: "/90 días",
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
      icon: <Crown className="w-8 h-8" />,
      color: "premium",
      popular: false
    }
  ];

  return (
    <section id="membresias" className="py-20 bg-gradient-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Membresías Exclusivas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Planes de</span>
            <br />
            <span className="text-primary">Transformación Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Accede a nuestros tratamientos de medicina estética y revitalización 
            con beneficios exclusivos y ahorros significativos.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-none shadow-soft bg-cream-card hover:shadow-gold transition-all duration-500">
              <CardContent className="p-6">
                <div className="p-4 bg-accent rounded-full w-fit mx-auto mb-4">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Membership Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border-none shadow-elegant transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-gold' 
                  : plan.color === 'premium' 
                  ? 'bg-gradient-hero'
                  : 'bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  🌟 MÁS POPULAR
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
                  plan.popular ? 'bg-primary-foreground/20' : 'bg-accent'
                }`}>
                  <div className={plan.popular ? 'text-primary-foreground' : 'text-primary'}>
                    {plan.icon}
                  </div>
                </div>
                
                <CardTitle className={`text-2xl mb-2 ${
                  plan.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {plan.name}
                </CardTitle>
                
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    plan.popular ? 'text-primary-foreground' : 'text-primary'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${
                    plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {plan.period}
                  </span>
                </div>
                
                <p className={`text-sm ${
                  plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-primary-foreground' : 'text-primary'
                      }`} />
                      <span className={`text-sm ${
                        plan.popular ? 'text-primary-foreground' : 'text-foreground'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.popular ? "secondary" : "luxury"} 
                  className="w-full mt-6 group"
                  onClick={triggerAppointmentModal}
                >
                  Seleccionar Plan
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Membership Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-soft bg-card">
            <CardHeader className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle>Pruebas Biológicas</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Análisis completos incluidos para monitorear tu progreso 
                y optimizar tus tratamientos de forma personalizada.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft bg-card">
            <CardHeader className="text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle>Seguimiento Personalizado</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nuestro equipo médico diseña protocolos únicos según 
                tus objetivos y necesidades específicas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft bg-card">
            <CardHeader className="text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle>Garantía de Resultados</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comprometidos con tu transformación. Si no ves resultados, 
                ajustamos tu plan sin costo adicional.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para formar parte de ILUMINA?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Comienza tu transformación hoy mismo. Agenda una consulta gratuita 
              y descubre qué plan se adapta mejor a tus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="luxury" 
                size="lg" 
                className="group"
                onClick={triggerAppointmentModal}
              >
                <Clock className="w-5 h-5 mr-2" />
                Consulta Gratuita
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="gold-outline" 
                size="lg"
                onClick={triggerAppointmentModal}
              >
                <Crown className="w-5 h-5 mr-2" />
                Comparar Planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};