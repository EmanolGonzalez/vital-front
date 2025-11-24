import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Trophy, 
  Clock, 
  Users, 
  Zap, 
  ArrowRight,
  Target,
  Briefcase,
  Activity,
  Moon,
  Sun
} from "lucide-react";

// Modal trigger functions
const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

const triggerTreatmentModal = (treatmentType: string = "performance") => {
  window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType } }));
};

export const PerformanceSection = () => {
  const targetAudience = [
    { icon: <Trophy className="w-6 h-6" />, label: "Atletas", color: "text-primary" },
    { icon: <Plane className="w-6 h-6" />, label: "Viajeros Frecuentes", color: "text-primary" },
    { icon: <Users className="w-6 h-6" />, label: "Tripulaciones Aéreas", color: "text-primary" },
    { icon: <Briefcase className="w-6 h-6" />, label: "Ejecutivos Globales", color: "text-primary" }
  ];

  const services = [
    {
      name: "Suero Jet Lag Reset",
      description: "Reajuste rápido del ritmo circadiano",
      duration: "45 min",
      features: ["Melatonina IV", "Vitaminas B", "Magnesio", "Adaptógenos"],
      icon: <Plane className="w-5 h-5" />
    },
    {
      name: "Suero Performance IV",
      description: "Optimización del rendimiento físico y mental",
      duration: "60 min",
      features: ["NAD+", "CoQ10", "Carnitina", "Aminoácidos"],
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Oxígeno Hiperbárico",
      description: "Terapia de oxigenación celular avanzada",
      duration: "60-90 min",
      features: ["100% O2", "Presión controlada", "Regeneración", "Recovery"],
      icon: <Activity className="w-5 h-5" />
    },
    {
      name: "Terapia de Luz Circadiana",
      description: "Regulación natural del ciclo del sueño",
      duration: "30 min",
      features: ["Luz roja", "Luz azul", "Sincronización", "Bienestar"],
      icon: <Sun className="w-5 h-5" />
    }
  ];

  const plans = [
    {
      name: "ILUMINA Sport Pro",
      type: "Mensual",
      description: "Plan completo para atletas de alto rendimiento",
      features: [
        "4 sesiones Performance IV",
        "2 sesiones Recovery",
        "Valoración deportiva mensual",
        "Suplementación personalizada",
        "Monitoreo de biomarcadores"
      ],
      icon: <Trophy className="w-6 h-6" />,
      price: "Desde 899€/mes"
    },
    {
      name: "Reset Ejecutivo",
      type: "3 Días Intensivos",
      description: "Programa intensivo para recuperación total",
      features: [
        "Jet Lag Reset completo",
        "3 sesiones IV personalizadas",
        "Terapia circadiana",
        "Oxígeno hiperbárico",
        "Coaching de ritmo biológico"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      price: "1.299€ completo"
    }
  ];

  return (
    <section id="performance" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            Performance & Recovery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">ILUMINA</span>
            <br />
            <span className="text-primary">PERFORMANCE & RECOVERY</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Programas especializados para atletas, viajeros frecuentes y profesionales 
            que buscan optimizar su rendimiento y recuperación.
          </p>
        </div>

        {/* Target Audience */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {targetAudience.map((audience, index) => (
            <Card key={index} className="text-center hover:shadow-gold transition-all duration-500 border-none shadow-soft bg-cream-card">
              <CardContent className="p-6">
                <div className="p-4 bg-accent rounded-full w-fit mx-auto mb-4">
                  <div className={audience.color}>{audience.icon}</div>
                </div>
                <h3 className="font-semibold text-sm">{audience.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Servicios Destacados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-gold transition-all duration-500 border-none shadow-soft bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-gold rounded-full">
                      <div className="text-primary-foreground">{service.icon}</div>
                    </div>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Plans */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Planes Especiales</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className="relative overflow-hidden border-none shadow-elegant bg-gradient-hero">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-20 rounded-bl-full"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary rounded-full">
                      <div className="text-primary-foreground">{plan.icon}</div>
                    </div>
                    <Badge className="bg-gold-light text-foreground">
                      {plan.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-primary mb-4">{plan.price}</div>
                    <Button 
                      variant="luxury" 
                      className="w-full group"
                      onClick={triggerAppointmentModal}
                    >
                      Consultar Plan
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card rounded-2xl p-8 md:p-12 text-center shadow-soft border border-border">
          <div className="max-w-2xl mx-auto">
            <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              ¿Necesitas Recuperación Rápida?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nuestro Pack Jet Lag Recovery 24h está diseñado para viajeros que necesitan 
              adaptarse rápidamente a nuevos horarios. Resultados en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="luxury" 
                size="lg" 
                className="group"
                onClick={triggerAppointmentModal}
              >
                <Plane className="w-5 h-5 mr-2" />
                Pack Recovery 24h
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="gold-outline" 
                size="lg"
                onClick={() => triggerTreatmentModal("circadian")}
              >
                <Moon className="w-5 h-5 mr-2" />
                Coaching Circadiano
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};