import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CalculadoraEdadBiologica } from "@/components/calculadora/CalculadoraEdadBiologica";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Shield, 
  Brain, 
  Heart, 
  ArrowLeft,
  Home,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const CalculadoraEdad = () => {
  const benefits = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "Análisis Científico",
      description: "Basado en más de 50 biomarcadores validados científicamente"
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Recomendaciones Personalizadas",
      description: "Plan específico para optimizar tu longevidad y bienestar"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "100% Privado",
      description: "Tus datos están protegidos y no se comparten con terceros"
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "Seguimiento Continuo",
      description: "Repite el análisis para ver tu progreso a lo largo del tiempo"
    }
  ];

  const factors = [
    "Actividad física y ejercicio",
    "Calidad y duración del sueño",
    "Niveles de estrés y manejo",
    "Hábitos alimentarios",
    "Consumo de alcohol y tabaco",
    "Conexiones sociales",
    "Bienestar mental",
    "Índice de masa corporal",
    "Propósito de vida",
    "Factores genéticos simulados"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-cream">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Link>
            <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
            <span className="text-foreground font-medium">Calculadora Edad Biológica</span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Activity className="w-4 h-4 mr-2" />
              Análisis Avanzado de Longevidad
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Descubre tu</span>
              <span className="text-primary"> Edad Biológica</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Nuestro algoritmo científico analiza tu estilo de vida, salud y bienestar 
              para determinar tu edad biológica real y ofrecerte un plan personalizado de optimización.
            </p>
            
            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Factores Analizados</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Precisión Científica</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary mb-2">3 min</div>
                <p className="text-sm text-muted-foreground">Tiempo de Análisis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-none shadow-soft bg-cream-card hover:shadow-gold transition-all duration-300">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent rounded-full w-fit mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-12 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">¿Qué Analizamos?</h2>
            <p className="text-muted-foreground mb-8">
              Nuestro análisis integral evalúa múltiples aspectos de tu vida 
              que impactan directamente en tu proceso de envejecimiento.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {factors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-soft">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <CalculadoraEdadBiologica />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center shadow-soft border-none bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Quieres Optimizar tus Resultados?</h3>
              <p className="text-muted-foreground mb-6">
                Basándose en tu análisis, nuestros especialistas pueden diseñar 
                un programa personalizado para revertir tu edad biológica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/reservar">
                  <Button className="bg-gradient-gold text-primary-foreground hover:shadow-gold">
                    <Heart className="w-4 h-4 mr-2" />
                    Consulta Personalizada
                  </Button>
                </Link>
                <Link to="/testimonios">
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Ver Casos de Éxito
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CalculadoraEdad;