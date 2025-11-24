import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Quote, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Sparkles, 
  Award, 
  Timer, 
  BarChart3,
  Users,
  ChevronLeft,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const aestheticCases = [
    {
      name: "María Elena",
      age: 45,
      treatment: "Revitalización Facial + Sueroterapia",
      duration: "3 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Después de 3 meses de tratamiento, no solo mi piel luce más radiante, sino que me siento con una energía que no tenía desde hace años. El equipo de ILUMINA realmente entiende que la belleza viene de adentro.",
      results: [
        "Reducción de arrugas de expresión 60%",
        "Mejora en textura y luminosidad",
        "Hidratación profunda restaurada",
        "Aumento notable de energía"
      ]
    },
    {
      name: "Carmen Rodriguez",
      age: 52,
      treatment: "Medicina Estética Integral",
      duration: "6 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Lo que más me sorprendió fue el enfoque personalizado. No solo trabajaron en mi rostro, sino que crearon un plan integral que incluyó nutrición celular. Los resultados han superado mis expectativas.",
      results: [
        "Reafirmación facial visible",
        "Eliminación de manchas solares",
        "Mejora en contorno facial",
        "Piel más firme y elástica"
      ]
    },
    {
      name: "Isabel Martinez",
      age: 38,
      treatment: "Protocolo Anti-Aging Preventivo",
      duration: "4 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Llegué buscando prevenir los signos del envejecimiento y encontré mucho más. Mi piel nunca había estado tan saludable y mi nivel de energía ha mejorado increíblemente.",
      results: [
        "Prevención activa del envejecimiento",
        "Piel con luminosidad natural",
        "Mejora en calidad del sueño",
        "Aumento de vitalidad general"
      ]
    }
  ];

  const biohackingCases = [
    {
      name: "Roberto Silva",
      age: 48,
      biologicalAge: "35 años",
      improvement: "13 años menor",
      treatment: "Protocolo Longevidad + IV Therapy",
      duration: "8 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Mi edad biológica bajó de 48 a 35 años en solo 8 meses. No solo me veo mejor, sino que mis marcadores de salud han mejorado dramáticamente. Es como haber encontrado la fuente de la juventud.",
      biomarkers: [
        "Telómeros 40% más largos",
        "Inflamación sistémica -65%",
        "Capacidad cardiopulmonar +35%",
        "Calidad del sueño optimizada"
      ]
    },
    {
      name: "Ana Patricia",
      age: 41,
      biologicalAge: "32 años",
      improvement: "9 años menor",
      treatment: "Biohacking Integral + Sueroterapia",
      duration: "6 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Como ejecutiva, necesitaba algo que me diera energía real, no estimulantes artificiales. El protocolo de biohacking cambió completamente mi rendimiento y mi salud celular.",
      biomarkers: [
        "Energía celular +50%",
        "Función cognitiva mejorada",
        "Resistencia física aumentada",
        "Marcadores hormonales optimizados"
      ]
    },
    {
      name: "Diego Mendoza",
      age: 55,
      biologicalAge: "42 años",
      improvement: "13 años menor",
      treatment: "Medicina Regenerativa Avanzada",
      duration: "10 meses",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Mis análisis muestran la salud de alguien 13 años menor. Mi médico no podía creer los resultados. La inversión en mi longevidad ha sido lo mejor que he hecho por mi salud.",
      biomarkers: [
        "Función mitocondrial restaurada",
        "Perfil metabólico optimizado",
        "Densidad ósea mejorada",
        "Sistema inmune fortalecido"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-20 bg-gradient-cream">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
            <span className="text-foreground font-medium">Testimonios</span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Users className="w-4 h-4 mr-2" />
              Casos de Éxito Reales
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Historias de</span>
              <span className="text-primary"> Transformación</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Descubre cómo nuestros pacientes han logrado transformaciones reales, 
              tanto estéticas como en su edad biológica, con nuestros protocolos personalizados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2 shadow-soft">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-muted-foreground">Satisfacción</span>
              </div>
              <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2 shadow-soft">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-semibold">98%</span>
                <span className="text-muted-foreground">Recomendación</span>
              </div>
              <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2 shadow-soft">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <span className="font-semibold">12 años</span>
                <span className="text-muted-foreground">Promedio edad biológica reducida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aesthetic Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Transformaciones Estéticas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Resultados que se <span className="text-primary">Ven y se Sienten</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Belleza auténtica que surge desde el interior, con resultados visibles 
              y una sensación de bienestar que transforma tu día a día.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {aestheticCases.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-gold transition-all duration-500 bg-cream-card">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-1">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.age} años</p>
                      <div className="flex items-center mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{testimonial.duration}</Badge>
                    </div>
                  </div>

                  {/* Treatment */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-primary mb-2">{testimonial.treatment}</h5>
                  </div>

                  {/* Testimonial */}
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-primary mb-3" />
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h6 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      Resultados Obtenidos
                    </h6>
                    <div className="space-y-2">
                      {testimonial.results.map((result, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-20" />

      {/* Biohacking Cases Section */}
      <section className="py-20 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Timer className="w-4 h-4 mr-2" />
              Reversión de Edad Biológica
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">La Ciencia de</span>
              <span className="text-primary"> Rejuvenecer</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Medimos, optimizamos y revertimos tu edad biológica usando biomarcadores avanzados 
              y protocolos de medicina regenerativa respaldados por la ciencia.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {biohackingCases.map((case_, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-gold transition-all duration-500 bg-card">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-foreground mb-2">{case_.name}</h4>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Edad Cronológica</p>
                        <p className="text-2xl font-bold text-foreground">{case_.age}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Edad Biológica</p>
                        <p className="text-2xl font-bold text-primary">{case_.biologicalAge}</p>
                      </div>
                    </div>
              <Badge variant="secondary" className="mb-2">
                -{case_.improvement}
              </Badge>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(case_.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Treatment Info */}
                  <div className="mb-6 text-center">
                    <h5 className="font-semibold text-primary mb-1">{case_.treatment}</h5>
                    <p className="text-sm text-muted-foreground">{case_.duration} de protocolo</p>
                  </div>

                  {/* Testimonial */}
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-primary mb-3 mx-auto" />
                    <p className="text-muted-foreground italic leading-relaxed text-center">
                      "{case_.testimonial}"
                    </p>
                  </div>

                  {/* Biomarkers */}
                  <div>
                    <h6 className="font-semibold mb-3 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-green-500 mr-2" />
                      Biomarcadores Mejorados
                    </h6>
                    <div className="space-y-2">
                      {case_.biomarkers.map((marker, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{marker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 shadow-soft border border-primary/10">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              ¿Listo para tu Propia Transformación?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a cientos de pacientes que ya han experimentado resultados reales 
              en su bienestar, estética y edad biológica.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" size="lg" className="bg-gradient-gold text-primary-foreground shadow-gold hover:shadow-gold/80 hover:scale-105 transition-all duration-300">
                <Calendar className="w-5 h-5 mr-2" />
                Reservar Consulta Gratuita
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:border-primary">
                <Heart className="w-5 h-5 mr-2" />
                Ver Más Casos de Éxito
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;