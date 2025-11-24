import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

// Modal trigger functions
const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

const triggerTreatmentModal = () => {
  window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }));
};

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ILUMINA Vital Lounge - Centro de Medicina Estética"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/85 to-background/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-soft animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Centro Médico Estético Premium</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 animate-slide-up">
            <span className="text-foreground block mb-2">Revela tu</span>
            <span className="bg-gradient-gold bg-clip-text text-transparent block">
              mejor versión
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl animate-fade-in">
            Desde adentro hacia afuera. Medicina estética avanzada y 
            revitalización celular en un ambiente de lujo y bienestar sensorial.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16 animate-slide-up">
            <Button 
              variant="gold" 
              size="lg" 
              className="group shadow-gold text-lg px-8 py-4"
              onClick={triggerAppointmentModal}
            >
              Reserva tu consulta
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary/30 hover:border-primary text-lg px-8 py-4"
              onClick={triggerTreatmentModal}
            >
              Ver tratamientos
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="flex items-center space-x-3 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/30">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Equipo Médico</p>
                <p className="text-sm text-muted-foreground">Certificado</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/30">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Tecnología</p>
                <p className="text-sm text-muted-foreground">Última Generación</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/30">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Ambiente</p>
                <p className="text-sm text-muted-foreground">Lujo y Bienestar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center bg-card/20 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-gradient-gold rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};