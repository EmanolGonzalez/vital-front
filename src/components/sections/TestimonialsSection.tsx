import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star,
  Quote,
  User,
  Heart,
  ArrowRight
} from "lucide-react";

// Modal trigger functions
const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

const triggerTreatmentModal = (treatmentType: string = "facial") => {
  window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType } }));
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      age: "42 años",
      treatment: "Protocolo Anti-Aging + Sueroterapia NAD+",
      text: "Después de 3 meses con el protocolo personalizado de ILUMINA, mi energía se ha multiplicado y mi piel luce 10 años más joven. El equipo médico es excepcional.",
      rating: 5,
      profile: "Ejecutiva"
    },
    {
      name: "Carlos Mendoza",
      age: "38 años", 
      treatment: "Botox + Suero Performance IV",
      text: "Como atleta profesional, necesitaba un centro que entendiera mis necesidades. En ILUMINA encontré la combinación perfecta de estética y rendimiento.",
      rating: 5,
      profile: "Deportista"
    },
    {
      name: "Ana Patricia Ruiz",
      age: "47 años",
      treatment: "Hilos Tensores + Bioestimuladores",
      text: "Los resultados han superado mis expectativas. El lifting sin cirugía me devolvió la confianza y el aspecto natural que buscaba.",
      rating: 5,
      profile: "Empresaria"
    },
    {
      name: "Roberto Silva",
      age: "52 años",
      treatment: "Sueroterapia Detox + Criolipólisis",
      text: "La combinación de tratamientos internos y externos de ILUMINA transformó completamente mi bienestar. Me siento renovado por dentro y por fuera.",
      rating: 5,
      profile: "Director"
    },
    {
      name: "Lucía Vargas",
      age: "35 años",
      treatment: "PRP Facial + Mesoterapia",
      text: "El enfoque personalizado y la atención médica especializada hacen la diferencia. Mi piel nunca había lucido tan radiante y saludable.",
      rating: 5,
      profile: "Médica"
    },
    {
      name: "Fernando Castro",
      age: "45 años",
      treatment: "Suero Anti-estrés + Radiofrecuencia",
      text: "ILUMINA entiende las necesidades del hombre moderno. Los tratamientos son efectivos, discretos y los resultados hablan por sí solos.",
      rating: 5,
      profile: "CEO"
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Quote className="w-4 h-4 mr-2" />
            Testimonios Reales
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Historias de</span>
            <br />
            <span className="text-primary">Transformación</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubre cómo nuestros pacientes han transformado su bienestar y confianza 
            con nuestros tratamientos personalizados.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-gold transition-all duration-500 border-none shadow-soft bg-cream-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-gold opacity-10 rounded-bl-full"></div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Treatment */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">
                    {testimonial.treatment}
                  </Badge>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent rounded-full">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.age} • {testimonial.profile}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-8 md:p-12 shadow-elegant">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para tu historia de éxito?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Únete a cientos de pacientes satisfechos que han transformado 
              su bienestar con nuestros tratamientos personalizados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="luxury" 
                size="lg" 
                className="group"
                onClick={triggerAppointmentModal}
              >
                <Heart className="w-5 h-5 mr-2" />
                Agenda tu Consulta
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="gold-outline" 
                size="lg"
                onClick={() => triggerTreatmentModal("testimonials")}
              >
                <Quote className="w-5 h-5 mr-2" />
                Ver Más Testimonios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};