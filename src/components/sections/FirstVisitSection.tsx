import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  UserCheck,
  FileText,
  Activity,
  Heart,
  Shield,
  Target
} from "lucide-react";

// Modal trigger function
const triggerFirstVisitModal = () => {
  window.dispatchEvent(new CustomEvent('openFirstVisitModal'));
};

export const FirstVisitSection = () => {
  const analysisIncludes = [
    {
      icon: <Stethoscope className="w-5 h-5 text-primary" />,
      title: "Análisis Médico Integral",
      description: "Evaluación completa de tu estado de salud actual"
    },
    {
      icon: <Activity className="w-5 h-5 text-primary" />,
      title: "Análisis Corporal Completo",
      description: "Composición corporal, masa muscular y grasa"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Estudio de Oligoelementos",
      description: "Análisis de minerales y vitaminas esenciales"
    },
    {
      icon: <UserCheck className="w-5 h-5 text-primary" />,
      title: "Consulta Personalizada",
      description: "Entrevista detallada sobre objetivos estéticos"
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <UserCheck className="w-4 h-4 mr-2" />
            Servicio Premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Tu Primera Visita</span>
            <br />
            <span className="text-primary">Médica Especializada</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una evaluación médica integral diseñada para crear tu plan personalizado 
            de medicina estética y bienestar. El primer paso hacia tu transformación.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Service Card */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-elegant bg-background/95 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 rounded-bl-full"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-gold rounded-full">
                    <Stethoscope className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                    Premium
                  </Badge>
                </div>
                <CardTitle className="text-3xl mb-4">Primera Visita Médica Especializada</CardTitle>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Una evaluación médica completa y personalizada donde nuestro equipo especializado 
                  analizará tu estado actual de salud, composición corporal y objetivos estéticos 
                  para diseñar el protocolo perfecto para ti.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* What's Included */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    ¿Qué Incluye tu Primera Visita?
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysisIncludes.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-cream-card rounded-lg">
                        <div className="p-2 bg-accent rounded-full flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">{item.title}</h5>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="bg-gradient-cream rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="w-5 h-5 text-primary mr-2" />
                    Proceso de la Consulta
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium">Análisis Médico Integral (20 min)</h5>
                        <p className="text-sm text-muted-foreground">Revisión de historial médico y evaluación actual</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium">Análisis Corporal y Oligoelementos (25 min)</h5>
                        <p className="text-sm text-muted-foreground">Composición corporal y estudio de minerales esenciales</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium">Consulta Estética Personalizada (15 min)</h5>
                        <p className="text-sm text-muted-foreground">Entrevista sobre objetivos y expectativas estéticas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-primary">
                    <FileText className="w-5 h-5 mr-2" />
                    Al Finalizar Recibirás
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Plan personalizado de medicina estética</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Protocolo de tratamientos recomendados</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Cronograma de sesiones optimizado</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Recomendaciones de suplementación</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & CTA Card */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-none shadow-elegant bg-gradient-gold relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full"></div>
              
              <CardContent className="p-8 text-center relative">
                <div className="mb-6">
                  <Clock className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Primera Consulta
                  </h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Evaluación médica integral
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="text-5xl font-bold text-primary-foreground mb-2">300€</div>
                  <div className="text-primary-foreground/80 text-sm">Pago único</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Duración: 1 hora</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm">Médico especializado</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Plan personalizado incluido</span>
                  </div>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full group mb-4"
                  onClick={triggerFirstVisitModal}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Solicitar Cita
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-xs text-primary-foreground/80">
                  * Descuento del 20% en el primer tratamiento tras la consulta
                </p>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="border-none shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  ¿Por Qué es Importante?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>
                    <strong className="text-foreground">Seguridad:</strong> Evaluamos tu idoneidad para cada tratamiento
                  </p>
                  <p>
                    <strong className="text-foreground">Efectividad:</strong> Diseñamos el protocolo más eficaz para ti
                  </p>
                  <p>
                    <strong className="text-foreground">Resultados:</strong> Maximizamos los beneficios de cada sesión
                  </p>
                  <p>
                    <strong className="text-foreground">Inversión:</strong> Optimizamos tu tiempo y recursos
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};