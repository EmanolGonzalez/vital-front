import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Shield, 
  Zap, 
  Heart, 
  Brain, 
  ArrowRight,
  CheckCircle,
  Star,
  Activity
} from "lucide-react";
import sueroterapiaImg from "@/assets/sueroterapia-image.jpg";

// Modal trigger functions
const triggerTreatmentModal = (treatmentType: string = "sueroterapia") => {
  window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType } }));
};

const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

export const SueroterapiaSection = () => {
  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Rejuvenecimiento Celular",
      description: "Regeneración profunda a nivel celular"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Detox Hepático",
      description: "Eliminación de toxinas y purificación"
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "Energía y Enfoque",
      description: "Mejora del rendimiento mental y físico"
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "Apoyo Inmunológico",
      description: "Fortalecimiento del sistema inmune"
    }
  ];

  const protocols = [
    {
      name: "Suero Glutatión Detox",
      description: "Potente antioxidante para desintoxicación profunda",
      features: ["Glutatión", "Vitamina C", "Selenio", "Ácido Alfa Lipoico"],
      duration: "45-60 min",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Suero NAD+",
      description: "Revitalización celular y anti-aging avanzado",
      features: ["NAD+", "Vitaminas B", "Aminoácidos", "Minerales"],
      duration: "60-90 min",
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "Antiestrés Plus",
      description: "Relajación profunda y equilibrio del sistema nervioso",
      features: ["Magnesio", "Vitaminas B", "Taurina", "Glicina"],
      duration: "30-45 min",
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: "Inmunoboost",
      description: "Fortalecimiento inmunológico intensivo",
      features: ["Vitamina C", "Zinc", "Selenio", "Complejo B"],
      duration: "45 min",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Post-COVID Recovery",
      description: "Recuperación integral post-viral",
      features: ["NAD+", "Glutatión", "Vitaminas", "Minerales"],
      duration: "60-75 min",
      icon: <Activity className="w-5 h-5" />
    }
  ];

  return (
    <section id="sueroterapia" className="py-20 bg-gradient-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Droplets className="w-4 h-4 mr-2" />
            Sueroterapia & Revitalización
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Revitalización</span>
            <br />
            <span className="text-primary">Celular Avanzada</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Terapias intravenosas personalizadas para optimizar tu salud, 
            energía y bienestar desde el nivel celular más profundo.
          </p>
        </div>

        {/* Client Profiles */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Perfil de Nuestros Pacientes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Ejecutivos",
                description: "Profesionales que buscan optimizar su rendimiento y bienestar",
                icon: <Brain className="w-6 h-6" />
              },
              {
                title: "Atletas",
                description: "Deportistas que requieren recuperación y potenciación del rendimiento",
                icon: <Activity className="w-6 h-6" />
              },
              {
                title: "Mujeres 35-55",
                description: "Prevención del envejecimiento y revitalización integral",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Hombres 40-60",
                description: "Mejora de energía, vitalidad y bienestar masculino",
                icon: <Shield className="w-6 h-6" />
              }
            ].map((profile, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-gold transition-all duration-300 bg-cream-card border-none">
                <div className="p-3 bg-accent rounded-full w-fit mx-auto mb-4">
                  {profile.icon}
                </div>
                <h4 className="font-semibold mb-2 text-primary">{profile.title}</h4>
                <p className="text-sm text-muted-foreground">{profile.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Hero Image & Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={sueroterapiaImg}
                alt="Sueroterapia ILUMINA Vital Lounge"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-gold">
              <div className="text-primary-foreground text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">IV Therapy</div>
                <div className="text-sm opacity-90">Personalizada</div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Beneficios de la Sueroterapia</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-cream-card rounded-xl shadow-soft">
                <div className="p-2 bg-accent rounded-full flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocols */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Protocolos Personalizados
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <Card key={index} className="group hover:shadow-gold transition-all duration-500 border-none shadow-soft bg-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-gold opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-accent rounded-full">
                      {protocol.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {protocol.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {protocol.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {protocol.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Componentes principales:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {protocol.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn w-full justify-start p-0 h-auto font-medium text-primary hover:text-primary mt-4"
                    onClick={() => triggerTreatmentModal("sueroterapia")}
                  >
                    Más información
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical Notice */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-accent rounded-full">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Valoración Médica Previa</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Todos nuestros protocolos de sueroterapia requieren una valoración médica 
                previa para garantizar la máxima seguridad y eficacia. Nuestro equipo médico 
                diseñará el protocolo perfecto según tus necesidades específicas y estado de salud.
              </p>
              <Button 
                variant="gold-outline" 
                size="sm"
                onClick={triggerAppointmentModal}
              >
                Agendar Valoración Médica
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};