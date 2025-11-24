import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Send
} from "lucide-react";

// Modal trigger functions
const triggerContactModal = (type: string = "email") => {
  window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type } }));
};

const triggerAppointmentModal = () => {
  window.dispatchEvent(new CustomEvent('openAppointmentModal'));
};

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Dirección",
      content: "Calle 50, Edificio Torre Global Plaza, Panamá",
      subtitle: "Zona Bancaria - Fácil acceso"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Teléfono",
      content: "+507 263-0000",
      subtitle: "Atención directa"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp",
      content: "+507 6000-0000",
      subtitle: "Consultas rápidas"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      content: "info@iluminavitallounge.com",
      subtitle: "Respuesta en 24h"
    }
  ];

  const schedule = [
    { day: "Lunes - Viernes", hours: "9:00 - 20:00" },
    { day: "Sábados", hours: "10:00 - 18:00" },
    { day: "Domingos", hours: "Cerrado" },
    { day: "Festivos", hours: "Consultar" }
  ];

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Phone className="w-4 h-4 mr-2" />
            Contacto
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Reserva tu</span>
            <br />
            <span className="text-primary">Consulta Personalizada</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para acompañarte en tu transformación. Contáctanos 
            y comienza tu camino hacia una mejor versión de ti.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-none shadow-elegant bg-gradient-hero">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Send className="w-6 h-6 mr-3 text-primary" />
                Formulario de Contacto
              </CardTitle>
              <p className="text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre *</label>
                  <Input placeholder="Tu nombre completo" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teléfono *</label>
                  <Input placeholder="+34 000 000 000" className="bg-background" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input placeholder="tu@email.com" className="bg-background" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tratamiento de Interés</label>
                <Input placeholder="Ej: Medicina estética facial, Sueroterapia..." className="bg-background" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje</label>
                <Textarea 
                  placeholder="Cuéntanos qué objetivos tienes y cómo podemos ayudarte..."
                  className="bg-background min-h-[100px]"
                />
              </div>
              
              <Button 
                variant="luxury" 
                className="w-full group"
                onClick={() => triggerContactModal("email")}
              >
                Enviar Consulta
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                * Campos obligatorios. Tus datos están protegidos según nuestra política de privacidad.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-none shadow-soft bg-cream-card hover:shadow-gold transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-accent rounded-full">
                        <div className="text-primary">{info.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        <p className="text-foreground font-medium">{info.content}</p>
                        <p className="text-muted-foreground text-sm">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Schedule */}
            <Card className="border-none shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Horario de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-primary font-semibold">{item.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media & Quick Actions */}
            <Card className="border-none shadow-soft bg-card">
              <CardHeader>
                <CardTitle>Síguenos & Contacto Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    variant="gold-outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => triggerContactModal("instagram")}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button 
                    variant="gold-outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => triggerContactModal("facebook")}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                </div>
                
                <Button 
                  variant="luxury" 
                  className="w-full group"
                  onClick={() => triggerContactModal("whatsapp")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Directo
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-none shadow-elegant overflow-hidden">
            <div className="h-64 md:h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Encuéntranos en Panamá</h3>
                  <p className="text-muted-foreground">Calle 50, Torre Global Plaza, Ciudad de Panamá</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Metro: Estación 12 de Octubre - Valet parking disponible
                  </p>
                </div>
                <Button 
                  variant="gold-outline"
                  onClick={() => triggerContactModal("maps")}
                >
                  Ver en Google Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};