import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { BookingSystem } from "@/components/booking/BookingSystem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  Phone, 
  MapPin, 
  CheckCircle,
  ArrowLeft,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const Booking = () => {
  const benefits = [
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Seguro y Privado",
      description: "Tus datos están protegidos con encriptación de grado médico"
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      title: "Confirmación Inmediata",
      description: "Recibirás confirmación por email y SMS al instante"
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: "Soporte 24/7",
      description: "Nuestro equipo está disponible para ayudarte siempre"
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: "Ubicación Premium",
      description: "Centro médico en zona exclusiva con fácil acceso"
    }
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
            <span className="text-foreground font-medium">Reservar Cita</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Reserva tu</span>
              <span className="text-primary"> Transformación</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Agenda tu cita de forma rápida y segura. Nuestro sistema te permite 
              seleccionar el tratamiento perfecto para ti y elegir el horario que mejor se adapte a tu agenda.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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

      {/* Booking System */}
      <section className="py-12 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <BookingSystem />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center shadow-soft border-none bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Necesitas Ayuda?</h3>
              <p className="text-muted-foreground mb-6">
                Si tienes alguna pregunta o necesitas asistencia para reservar tu cita, 
                nuestro equipo está aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +507 263-0000
                </Button>
                <Button variant="outline" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Panamá Centro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;