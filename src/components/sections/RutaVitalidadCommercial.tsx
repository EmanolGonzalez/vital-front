import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, TrendingUp, Brain, Apple, Dumbbell, Pill, Target } from "lucide-react";
import { Link } from "react-router-dom";

export const RutaVitalidadCommercial = () => {
  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Edad Biológica Optimizada",
      description: "Revierte el envejecimiento celular con nuestro protocolo científico personalizado"
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: "Nutrición Personalizada",
      description: "Planes nutricionales basados en tu perfil genético y biomarcadores únicos"
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Entrenamiento Integral",
      description: "Rutinas diseñadas para maximizar tu rendimiento físico y mental"
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Suplementación Inteligente",
      description: "Línea Ilumina Vital con fórmulas científicamente respaldadas"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Epigenética con Propósito",
      description: "Activa genes de longevidad a través de hábitos conscientes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Seguimiento en Tiempo Real",
      description: "Monitoreo continuo de tus progresos con IA avanzada"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold">Tecnología Consciente para tu Bienestar</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Ruta de Vitalidad
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4">
            El programa más completo de medicina 3.0 para transformar tu salud desde lo celular hasta lo emocional
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">-6 años</div>
              <div className="text-sm text-muted-foreground">Edad biológica promedio</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">+85%</div>
              <div className="text-sm text-muted-foreground">Nivel de energía</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-none shadow-elegant hover:shadow-glow transition-all duration-300 group bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Overview */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-bold text-center mb-10">Tu Viaje hacia la Vitalidad Óptima</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Evaluación Completa</h4>
              <p className="text-sm text-muted-foreground">Análisis de biomarcadores y test de edad biológica</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">Plan Personalizado</h4>
              <p className="text-sm text-muted-foreground">Tu médico crea tu ruta única de vitalidad</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Implementación Guiada</h4>
              <p className="text-sm text-muted-foreground">Acompañamiento con IA y seguimiento continuo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2">Resultados Medibles</h4>
              <p className="text-sm text-muted-foreground">Mejoras verificables en edad biológica y bienestar</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" className="group">
                Comienza tu Ruta de Vitalidad
                <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="gold-outline" onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Habla con un Especialista
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Primera consulta gratuita • Sin compromiso • Resultados garantizados
          </p>
        </div>
      </div>
    </section>
  );
};
