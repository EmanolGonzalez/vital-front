import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Stethoscope, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  UserCheck,
  FileText,
  Activity,
  Heart,
  Shield,
  Target,
  Calendar,
  Phone,
  Mail,
  User
} from "lucide-react";

interface FirstVisitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FirstVisitModal = ({ open, onOpenChange }: FirstVisitModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    objectives: "",
    medicalHistory: "",
    preferredDate: "",
    preferredTime: ""
  });

  const analysisDetails = [
    {
      icon: <Stethoscope className="w-6 h-6 text-primary" />,
      title: "Análisis Médico Integral",
      description: "Revisión completa de tu historial médico, medicaciones actuales y evaluación de tu estado de salud general",
      duration: "20 minutos"
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "Análisis Corporal Completo",
      description: "Medición de composición corporal: masa muscular, grasa corporal, agua corporal y masa ósea",
      duration: "15 minutos"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Estudio de Oligoelementos",
      description: "Análisis de niveles de minerales esenciales, vitaminas y marcadores biológicos clave",
      duration: "10 minutos"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Consulta Estética Personalizada",
      description: "Entrevista detallada sobre tus objetivos estéticos, expectativas y áreas de especial interés",
      duration: "15 minutos"
    }
  ];

  const deliverables = [
    "Plan médico personalizado de medicina estética",
    "Protocolo detallado de tratamientos recomendados",
    "Cronograma optimizado de sesiones",
    "Recomendaciones específicas de suplementación",
    "Guía de cuidados pre y post-tratamiento",
    "Seguimiento médico personalizado"
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Solicitud Enviada!",
      description: "Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu Primera Visita Médica",
    });

    // Reset form and close modal
    setFormData({
      name: "", email: "", phone: "", age: "", objectives: "", 
      medicalHistory: "", preferredDate: "", preferredTime: ""
    });
    setStep(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <UserCheck className="w-6 h-6 mr-3 text-primary" />
            Primera Visita Médica Especializada
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Service Details */}
            <div className="space-y-6">
              {/* Main Info */}
              <Card className="border-none shadow-soft bg-gradient-hero">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="p-4 bg-primary rounded-full w-fit mx-auto mb-4">
                      <Stethoscope className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Evaluación Médica Integral</h3>
                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>60 minutos</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4" />
                        <span>300€</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    Una evaluación médica completa diseñada para crear tu protocolo personalizado 
                    de medicina estética y bienestar, optimizando cada tratamiento según tus necesidades únicas.
                  </p>
                </CardContent>
              </Card>

              {/* What's Included */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  Análisis Incluidos
                </h4>
                {analysisDetails.map((analysis, index) => (
                  <Card key={index} className="border-none shadow-soft bg-card hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-accent rounded-lg flex-shrink-0">
                          {analysis.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-sm">{analysis.title}</h5>
                            <Badge variant="outline" className="text-xs">{analysis.duration}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {analysis.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Results & CTA */}
            <div className="space-y-6">
              {/* What You'll Receive */}
              <Card className="border-none shadow-soft bg-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-2" />
                    Tu Plan Personalizado Incluye
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-none shadow-soft bg-gradient-cream">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="w-5 h-5 text-primary mr-2" />
                    Beneficios Exclusivos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Descuento del 20%</strong>
                        <p className="text-muted-foreground">En tu primer tratamiento tras la consulta</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Seguimiento personalizado</strong>
                        <p className="text-muted-foreground">Monitoreo de tu progreso sin costo adicional</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Acceso prioritario</strong>
                        <p className="text-muted-foreground">Reserva de citas con prioridad</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-none shadow-elegant bg-gradient-gold">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-primary-foreground mb-4">
                    ¿Listo para Comenzar?
                  </h4>
                  <p className="text-primary-foreground/90 text-sm mb-6">
                    Solicita tu Primera Visita Médica y da el primer paso hacia tu transformación integral
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full group"
                    onClick={() => setStep(2)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Solicitar Cita
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <User className="w-5 h-5 text-primary mr-2" />
                  Solicitud de Primera Visita
                </CardTitle>
                <p className="text-muted-foreground">
                  Completa la información para agendar tu evaluación médica integral
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Información Personal *</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre Completo *</label>
                      <Input 
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Edad</label>
                      <Input 
                        placeholder="Tu edad"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input 
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Teléfono *</label>
                      <Input 
                        placeholder="+34 000 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Medical & Aesthetic Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Información Médica y Estética</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Objetivos Estéticos</label>
                    <Textarea
                      placeholder="Describe tus objetivos y áreas de interés (rejuvenecimiento facial, tratamientos corporales, etc.)"
                      value={formData.objectives}
                      onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Historial Médico Relevante (Opcional)</label>
                    <Textarea
                      placeholder="Menciona cualquier condición médica, alergias o medicaciones actuales"
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Scheduling Preferences */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Preferencias de Horario</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha Preferida</label>
                      <Input 
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Horario Preferido</label>
                      <Input 
                        placeholder="Ej: Mañanas, Tardes, Fines de semana"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <Card className="bg-gradient-hero border-none">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold">Primera Visita Médica Especializada</h5>
                        <p className="text-sm text-muted-foreground">Duración: 1 hora • Incluye plan personalizado</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">300€</div>
                        <div className="text-xs text-muted-foreground">Pago en consulta</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Volver
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1 group"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Enviar Solicitud
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  * Nos pondremos en contacto contigo en las próximas 24 horas para confirmar la cita y horario
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};