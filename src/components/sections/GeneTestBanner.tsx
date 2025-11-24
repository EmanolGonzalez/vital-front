import { Button } from "@/components/ui/button";
import { Dna, ArrowRight } from "lucide-react";

export const GeneTestBanner = () => {
  return (
    <section className="relative py-12 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
          {/* Icon and Text */}
          <div className="flex items-center gap-4 flex-1">
            <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm">
              <Dna className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Descubre tu perfil genético
              </h3>
              <p className="text-muted-foreground">
                Realiza nuestro test personalizado y conoce tu ruta hacia la vitalidad óptima
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="group"
              onClick={() => window.open('https://preview--gene-insight-quiz.lovable.app/', '_blank', 'noopener,noreferrer')}
            >
              Hazte tu test
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
