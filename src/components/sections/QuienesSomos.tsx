import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Award, Microscope, Sparkles, Shield } from "lucide-react";

export const QuienesSomos = () => {
  const values = [
    {
      icon: <Microscope className="w-8 h-8 text-primary" />,
      title: "Medicina Estética Avanzada",
      description: "Para que reflejes tu mejor versión con tratamientos científicamente respaldados"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Biohacking y Longevidad",
      description: "Revitaliza tu energía y previene el desgaste con tecnología de vanguardia"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Bienestar Integral",
      description: "Cada cambio es sostenible y real, cuidando cuerpo, mente y espíritu"
    }
  ];

  const differentiators = [
    "La belleza es vitalidad que se siente",
    "La ciencia es la base de todo lo que ofrecemos", 
    "Tu experiencia debe ser transformadora",
    "Cuando tu interior brilla, tu exterior se ilumina"
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-gradient-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Tu Historia de Bienestar
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Comienza</span>
            <span className="text-primary"> Aquí</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Imagina un lugar donde la medicina estética no es solo una respuesta rápida a una arruga o a un signo de cansancio.
            Imagina un espacio donde la ciencia se une con la innovación para cuidar tanto de tu piel como de tu energía, 
            de tu belleza como de tu vitalidad.
          </p>
          <p className="text-lg text-primary font-medium mt-4">
            Ese lugar existe: es nuestro centro, donde creemos que la verdadera estética empieza desde adentro hacia afuera.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Nuestra Visión
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                El paso del tiempo, el estrés y el ritmo acelerado de la vida dejan huellas. 
                Algunas se ven en el espejo; otras se sienten en tu cuerpo y tu mente.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Por eso, nuestro propósito es acompañarte en un camino de renovación interna y externa, 
                con un enfoque que combina lo mejor de la medicina moderna con prácticas de bienestar integral.
              </p>
            </div>

            {/* La Experiencia */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-foreground">
                La Experiencia
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cada visita no es solo un tratamiento, sino un ritual de bienestar.
                Comenzamos con un diagnóstico personalizado, donde exploramos tu piel, tu salud y tu estilo de vida.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Queremos que cada sesión sea una pausa para reconectar contigo mismo: 
                luz, calma, tecnología y ciencia al servicio de tu bienestar.
              </p>
            </div>

            {/* Lo que nos hace diferentes */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 text-primary mr-2" />
                Lo Que Nos Hace Diferentes
              </h4>
              <div className="space-y-3">
                {differentiators.map((diff, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground font-medium">{diff}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-gold transition-all duration-500 bg-cream-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent rounded-full">
                      {value.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2 text-foreground">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tu Viaje Empieza Aquí */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 shadow-soft border border-primary/10">
          <h3 className="text-3xl font-bold mb-6 text-foreground">Tu Viaje Empieza Aquí</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            No se trata de ocultar el paso del tiempo, sino de vivirlo con plenitud, 
            con confianza y con energía renovada.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Te invitamos a descubrir un espacio donde cada detalle está pensado para ti: 
            tu piel, tu cuerpo, tu mente.
          </p>
          <div className="text-center">
            <p className="text-xl font-semibold text-primary mb-6">
              Porque cuando tu interior brilla, tu exterior también se ilumina.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-base px-4 py-2">Medicina Estética</Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">Biohacking</Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">Longevidad</Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">Bienestar Integral</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};