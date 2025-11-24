import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Target, Dna, Heart, Activity, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export const Medicina30Banner = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative py-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
      <div className="container mx-auto px-6">
        {/* Banner Principal - Siempre visible */}
        <div 
          className="cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-gradient-gold rounded-full shadow-gold">
                <Sparkles className="w-6 h-6 text-background" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  Descubre tu Medicina 3.0
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Tu longevidad, tu salud, tu propósito
                </p>
              </div>
            </div>
            <Button 
              variant="gold" 
              className="group-hover:shadow-gold transition-all"
            >
              <span className="mr-2">Descubre más</span>
              <ChevronDown 
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </Button>
          </div>
        </div>

        {/* Contenido Expandible */}
        <div 
          className={cn(
            "grid transition-all duration-500 ease-in-out overflow-hidden",
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-8">
              {/* Subtítulo */}
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-xl text-muted-foreground italic">
                  "Transforma tu bienestar con ciencia, tecnología y hábitos personalizados."
                </p>
              </div>

              {/* Introducción */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-soft">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Bienvenido a Ilumina Vital Lounge: donde la Medicina 3.0 se convierte en experiencia.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  En nuestro centro, la salud deja de ser reactiva y se convierte en <span className="font-semibold text-primary">proactiva y personalizada</span>. 
                  Aplicamos los últimos avances en:
                </p>
              </div>

              {/* Grid de Características */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Prevención y Longevidad */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Prevención y longevidad</h4>
                      <p className="text-sm text-muted-foreground">
                        Analizamos tu edad biológica, genética y biomarcadores para prevenir enfermedades y optimizar tu vitalidad.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nutrición y Entrenamiento */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Nutrición y entrenamiento personalizados</h4>
                      <p className="text-sm text-muted-foreground">
                        Planes adaptados a tu biotipo, metabolismo y estilo de vida, potenciando energía y rendimiento.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Epigenética con Propósito */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Dna className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Epigenética con propósito</h4>
                      <p className="text-sm text-muted-foreground">
                        Intervenimos en tus hábitos y entorno para activar genes que promuevan salud, estética y bienestar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suplementación y Terapias */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Suplementación y terapias de precisión</h4>
                      <p className="text-sm text-muted-foreground">
                        Sueroterapia, micronutrientes y compuestos bioactivos diseñados para ti.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tecnología y Seguimiento */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tecnología y seguimiento inteligente</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitoreo continuo con IA para ajustar tu plan en tiempo real.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estética Regenerativa */}
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all hover:shadow-soft group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Estética regenerativa</h4>
                      <p className="text-sm text-muted-foreground">
                        Belleza que refleja salud interna, con protocolos innovadores y regenerativos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusión */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 text-center border border-primary/20">
                <p className="text-lg text-foreground leading-relaxed mb-6 max-w-4xl mx-auto">
                  <span className="font-semibold">Ilumina Vital Lounge</span> no es solo un espacio para cuidar tu cuerpo: 
                  es un <span className="font-semibold text-primary">ecosistema integral de bienestar</span>, 
                  donde la ciencia, la conciencia y la tecnología se unen para que vivas más, mejor y con propósito.
                </p>
                <Button 
                  variant="gold" 
                  size="lg" 
                  className="shadow-gold text-lg px-8"
                  onClick={() => window.dispatchEvent(new CustomEvent('openAppointmentModal'))}
                >
                  Comienza tu transformación hoy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
