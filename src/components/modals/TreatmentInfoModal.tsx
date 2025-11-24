import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  User,
  Stethoscope,
  Droplets,
  ArrowRight,
  CheckCircle,
  CreditCard
} from "lucide-react";

interface TreatmentInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatmentType?: string;
}

export const TreatmentInfoModal = ({ open, onOpenChange, treatmentType }: TreatmentInfoModalProps) => {
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentType || "");
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: ""
  });

  const treatments = {
    facial: {
      title: "Medicina Estética Facial",
      icon: <User className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      treatments: [
        { name: "Botox Premium", price: "350€", duration: "45 min", description: "Eliminación de arrugas dinámicas" },
        { name: "Ácido Hialurónico", price: "450€", duration: "60 min", description: "Hidratación y volumen facial" },
        { name: "Hilos Tensores PDO", price: "650€", duration: "90 min", description: "Lifting facial sin cirugía" },
        { name: "PRP Facial", price: "280€", duration: "75 min", description: "Regeneración con plasma rico en plaquetas" }
      ]
    },
    corporal: {
      title: "Estética Corporal",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      treatments: [
        { name: "Criolipólisis", price: "400€", duration: "60 min", description: "Eliminación de grasa localizada" },
        { name: "Radiofrecuencia", price: "180€", duration: "45 min", description: "Reafirmación corporal" },
        { name: "HIFU Corporal", price: "800€", duration: "90 min", description: "Lifting corporal no invasivo" },
        { name: "Drenaje Linfático", price: "120€", duration: "60 min", description: "Desintoxicación y recuperación" }
      ]
    },
    sueroterapia: {
      title: "Sueroterapia & Revitalización",
      icon: <Droplets className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      treatments: [
        { name: "Suero NAD+", price: "350€", duration: "90 min", description: "Revitalización celular anti-aging" },
        { name: "Glutatión Detox", price: "280€", duration: "60 min", description: "Desintoxicación profunda" },
        { name: "Performance IV", price: "320€", duration: "75 min", description: "Optimización del rendimiento" },
        { name: "Inmuno Boost", price: "250€", duration: "45 min", description: "Fortalecimiento inmunológico" }
      ]
    },
    tecnologia: {
      title: "Tecnología No Invasiva",
      icon: <Star className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      treatments: [
        { name: "Láser Médico-Estético", price: "450€", duration: "60 min", description: "Rejuvenecimiento avanzado y corrección de imperfecciones" },
        { name: "Terapia LED", price: "150€", duration: "30 min", description: "Bioestimulación celular y rejuvenecimiento" },
        { name: "Microneeding RF", price: "380€", duration: "75 min", description: "Estimulación del colágeno con radiofrecuencia" }
      ]
    }
  };

  const currentCategory = treatments[selectedTreatment as keyof typeof treatments] || treatments.facial;

  const handleConsultationRequest = () => {
    if (!consultationForm.name || !consultationForm.phone) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa nombre y teléfono",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Consulta Solicitada!",
      description: "Te contactaremos en las próximas 24 horas para agendar tu consulta gratuita",
    });

    setConsultationForm({ name: "", phone: "", email: "", interest: "", message: "" });
    onOpenChange(false);
  };

  const handleBookAppointment = () => {
    // Trigger appointment modal
    window.dispatchEvent(new CustomEvent('openAppointmentModal'));
    onOpenChange(false);
    toast({
      title: "Agendando Cita",
      description: "Selecciona tu fecha y hora preferida",
    });
  };

  const handleContractTreatment = (treatmentName: string, price: string) => {
    // Trigger contract modal
    window.dispatchEvent(new CustomEvent('openContractModal', { 
      detail: { treatmentName, treatmentPrice: price } 
    }));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <div className={`p-3 bg-gradient-to-r ${currentCategory.color} rounded-full text-white mr-3`}>
              {currentCategory.icon}
            </div>
            Información Detallada de Tratamientos
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Treatment Categories */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(treatments).map(([key, category]) => (
                <Button
                  key={key}
                  variant={selectedTreatment === key ? "default" : "outline"}
                  onClick={() => setSelectedTreatment(key)}
                  className="h-20 flex flex-col space-y-2"
                >
                  {category.icon}
                  <span className="text-xs">{category.title.split(' ')[0]}</span>
                </Button>
              ))}
            </div>

            {/* Treatment Details */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {currentCategory.icon}
                  <span className="ml-2">{currentCategory.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCategory.treatments.map((treatment, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{treatment.name}</h4>
                        <Badge variant="outline" className="font-bold">{treatment.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {treatment.duration}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleContractTreatment(treatment.name, treatment.price)}
                            className="text-xs"
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Contratar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={handleBookAppointment}
                            className="text-primary text-xs"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Agendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Consultation Form */}
          <div className="space-y-6">
            <Card className="border-none shadow-elegant bg-gradient-hero">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Solicita tu Consulta Gratuita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre *</label>
                    <Input
                      placeholder="Tu nombre completo"
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Teléfono *</label>
                    <Input
                      placeholder="+34 000 000 000"
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tratamiento de Interés</label>
                  <Input
                    placeholder="¿Qué tratamiento te interesa?"
                    value={consultationForm.interest}
                    onChange={(e) => setConsultationForm({...consultationForm, interest: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Mensaje</label>
                  <Textarea
                    placeholder="Cuéntanos tus objetivos y expectativas..."
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm({...consultationForm, message: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleConsultationRequest} variant="luxury" className="group">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Consulta Gratuita
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button onClick={handleBookAppointment} variant="gold-outline" className="group">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Cita
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Información de Contacto</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">+507 263-0000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">info@iluminavitallounge.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">Calle 50, Torre Global Plaza, Panamá</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">L-V 9:00-20:00 • S 10:00-18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="border-none shadow-soft bg-accent/20">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Consulta médica gratuita</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Plan personalizado sin compromiso</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Respuesta en menos de 24h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};