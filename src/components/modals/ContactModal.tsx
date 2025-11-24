import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Calendar,
  User,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactType?: "phone" | "email" | "whatsapp" | "appointment";
}

export const ContactModal = ({ open, onOpenChange, contactType = "phone" }: ContactModalProps) => {
  const contactActions = {
    phone: {
      title: "Llamar Ahora",
      icon: <Phone className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      primaryAction: "Llamar +34 91 000 00 00",
      description: "Habla directamente con nuestro equipo médico"
    },
    email: {
      title: "Contacto por Email",
      icon: <Mail className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      primaryAction: "Enviar Email",
      description: "Te responderemos en menos de 24 horas"
    },
    whatsapp: {
      title: "Chat por WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-400 to-green-500",
      primaryAction: "Abrir WhatsApp",
      description: "Respuesta inmediata a tus consultas"
    },
    appointment: {
      title: "Agendar Cita",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      primaryAction: "Reservar Cita Online",
      description: "Agenda tu consulta gratuita al instante"
    }
  };

  const currentAction = contactActions[contactType] || contactActions.phone || {
    title: "Contacto",
    icon: <Phone className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    primaryAction: "Contactar",
    description: "Ponte en contacto con nosotros"
  };

  const handlePrimaryAction = () => {
    switch (contactType) {
      case "phone":
        window.open("tel:+34910000000", "_self");
        toast({
          title: "Llamada iniciada",
          description: "Conectando con ILUMINA Vital Lounge...",
        });
        break;
      case "email":
        window.open("mailto:info@iluminavitallounge.com?subject=Consulta desde Web&body=Hola, me gustaría recibir más información sobre sus tratamientos.", "_blank");
        toast({
          title: "Email abierto",
          description: "Cliente de email listo para enviar tu consulta",
        });
        break;
      case "whatsapp":
        window.open("https://wa.me/34600000000?text=Hola, me gustaría información sobre los tratamientos de ILUMINA Vital Lounge", "_blank");
        toast({
          title: "WhatsApp abierto",
          description: "Chat iniciado con nuestro equipo",
        });
        break;
      case "appointment":
        toast({
          title: "Sistema de reservas",
          description: "Abriendo calendario de citas disponibles...",
        });
        // Aquí se abriría el modal de citas
        break;
    }
    onOpenChange(false);
  };

  const handleQuickMessage = (message: string) => {
    const whatsappUrl = `https://wa.me/34600000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Mensaje enviado",
      description: "Tu consulta ha sido enviada por WhatsApp",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <div className={`p-3 bg-gradient-to-r ${currentAction.color} rounded-full text-white mr-3`}>
              {currentAction.icon}
            </div>
            {currentAction.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Action */}
          <div className="space-y-6">
            <Card className={`border-none shadow-elegant bg-gradient-to-r ${currentAction.color}`}>
              <CardContent className="p-8 text-white text-center">
                <div className="mb-4">
                  {currentAction.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{currentAction.title}</h3>
                <p className="text-white/90 mb-6">{currentAction.description}</p>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full group"
                  onClick={handlePrimaryAction}
                >
                  {currentAction.primaryAction}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {contactType !== "appointment" && (
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle>Consultas Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Quiero información sobre precios",
                    "¿Cuál es el mejor tratamiento para mí?",
                    "Agendar consulta gratuita",
                    "Información sobre membresías"
                  ].map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-accent"
                      onClick={() => handleQuickMessage(message)}
                    >
                      <MessageCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">{message}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: <Phone className="w-4 h-4" />, label: "Teléfono", value: "+507 263-0000", action: () => window.open("tel:+5072630000") },
                  { icon: <MessageCircle className="w-4 h-4" />, label: "WhatsApp", value: "+507 6000-0000", action: () => window.open("https://wa.me/50760000000") },
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: "info@iluminavitallounge.com", action: () => window.open("mailto:info@iluminavitallounge.com") },
                  { icon: <MapPin className="w-4 h-4" />, label: "Dirección", value: "Calle 50, Torre Global Plaza, Panamá", action: () => window.open("https://maps.google.com") }
                ].map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={contact.action}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{contact.label}</div>
                        <div className="text-muted-foreground text-xs">{contact.value}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Horario de Atención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { day: "Lunes - Viernes", hours: "9:00 - 20:00", status: "Abierto" },
                    { day: "Sábados", hours: "10:00 - 18:00", status: "Abierto" },
                    { day: "Domingos", hours: "Cerrado", status: "Cerrado" },
                    { day: "Festivos", hours: "Consultar", status: "Variable" }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-sm font-medium">{schedule.day}</span>
                      <div className="text-right">
                        <span className="text-sm">{schedule.hours}</span>
                        <Badge 
                          variant={schedule.status === "Abierto" ? "default" : "outline"} 
                          className="ml-2 text-xs"
                        >
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="border-none shadow-soft bg-accent/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Nuestros Compromisos</h4>
                <div className="space-y-2">
                  {[
                    "Respuesta en menos de 24 horas",
                    "Consulta médica gratuita",
                    "Atención personalizada",
                    "Confidencialidad total"
                  ].map((commitment, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{commitment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};