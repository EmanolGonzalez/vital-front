import api from "@/lib/apiClient";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Users, 
  Stethoscope, 
  Heart, 
  Award, 
  GraduationCap,
  Building,
  ArrowRight,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle
} from "lucide-react";
import { CenterModal } from "./CenterModal";

interface JoinTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JoinTeamModal = ({ open, onOpenChange }: JoinTeamModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    certifications: "",
    motivation: "",
    availability: "",
    location: "",
    cv: "",
    references: ""
  });
  const [centerModalOpen, setCenterModalOpen] = useState(false);

  const positions = [
    {
      id: "medico",
      title: "Profesional Sanitario",
      icon: <Stethoscope className="w-6 h-6 text-primary" />,
      description: "Médico especialista en medicina estética y anti-aging",
      requirements: ["Título de medicina", "Especialización en estética", "Experiencia mínima 3 años"],
      benefits: ["Salario competitivo", "Formación continua", "Comisiones por ventas", "Seguro médico privado"]
    },
    {
      id: "especialista-estetico",
      title: "Especialista Estético",
      icon: <Heart className="w-6 h-6 text-primary" />,
      description: "Profesional en tratamientos estéticos avanzados",
      requirements: ["Certificación en estética", "Experiencia con láser", "Conocimiento en inyectables"],
      benefits: ["Formación en nuevas técnicas", "Comisiones atractivas", "Horario flexible", "Ambiente premium"]
    },
    {
      id: "esteticista",
      title: "Esteticista Avanzada",
      icon: <Award className="w-6 h-6 text-primary" />,
      description: "Especialista en cuidados faciales y corporales",
      requirements: ["Diploma en estética", "Experiencia en SPA premium", "Habilidades manuales"],
      benefits: ["Capacitación constante", "Clientes VIP", "Bonificaciones", "Crecimiento profesional"]
    },
    {
      id: "enfermera",
      title: "Enfermera Especializada",
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      description: "Enfermera con experiencia en procedimientos estéticos",
      requirements: ["Título de enfermería", "Experiencia en inyectables", "Certificación IV"],
      benefits: ["Salario premium", "Formación especializada", "Estabilidad laboral", "Crecimiento profesional"]
    },
    {
      id: "centro-partner",
      title: "Miembro de Centro ILUMINA",
      icon: <Building className="w-6 h-6 text-primary" />,
      description: "Únete como centro partner de la red ILUMINA",
      requirements: ["Centro de estética establecido", "Licencias vigentes", "Ubicación premium"],
      benefits: ["Marca reconocida", "Protocolos probados", "Marketing conjunto", "Soporte técnico"]
    }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Enviar solicitud al endpoint correcto del backend
    api.post("/application/team", formData)
      .then(() => {
        toast({
          title: "¡Solicitud Enviada!",
          description: "Hemos recibido tu solicitud. Nuestro equipo de Recursos Humanos se pondrá en contacto contigo pronto",
        });
        setFormData({
          name: "", email: "", phone: "", position: "", experience: "", 
          education: "", certifications: "", motivation: "", availability: "", 
          location: "", cv: "", references: ""
        });
        setStep(1);
        onOpenChange(false);
      })
      .catch(() => {
        toast({
          title: "Error al enviar",
          description: "No se pudo enviar la solicitud. Intenta nuevamente.",
          variant: "destructive"
        });
      });
  };

  const selectedPosition = positions.find(p => p.id === formData.position);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Únete al Equipo ILUMINA
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Header */}
            <Card className="border-none shadow-soft bg-gradient-hero">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-primary rounded-full w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Forma Parte de ILUMINA</h3>
                <p className="text-muted-foreground">
                  Únete al equipo líder en medicina estética y bienestar en Panamá. 
                  Ofrecemos oportunidades excepcionales para profesionales comprometidos con la excelencia.
                </p>
              </CardContent>
            </Card>

            {/* Positions Grid */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Selecciona la posición de tu interés:</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {positions.map((position) => (
                  <Card
                    key={position.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-gold border-2 ${
                      formData.position === position.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent hover:border-primary/30'
                    }`}
                    onClick={() => {
                      setFormData({...formData, position: position.id});
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-accent rounded-lg">
                          {position.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{position.title}</CardTitle>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {position.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-xs mb-2">Requisitos:</h5>
                        <div className="space-y-1">
                          {position.requirements.slice(0, 2).map((req, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-xs text-muted-foreground">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-xs mb-2">Beneficios:</h5>
                        <div className="space-y-1">
                          {position.benefits.slice(0, 2).map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {formData.position && (
              <div className="text-center">
                <Button 
                  onClick={() => {
                    if (formData.position === "centro-partner") {
                      setCenterModalOpen(true);
                      setStep(2);
                    } else {
                      setStep(2);
                    }
                  }}
                  variant="luxury"
                  size="lg"
                  className="group"
                >
                  Continuar con {selectedPosition?.title}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}
        {step === 2 && selectedPosition && (
          selectedPosition.id === "centro-partner" ? (
            <CenterModal
              open={centerModalOpen}
              onOpenChange={(open) => {
                setCenterModalOpen(open);
                if (!open) {
                  setStep(1);
                  setFormData({
                    name: "", email: "", phone: "", position: "", experience: "", 
                    education: "", certifications: "", motivation: "", availability: "", 
                    location: "", cv: "", references: ""
                  });
                }
              }}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Position Details */}
              <div className="space-y-6">
                <Card className="border-none shadow-soft bg-gradient-cream">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-primary rounded-lg">
                        {selectedPosition.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedPosition.title}</CardTitle>
                        <Badge variant="outline">Posición Disponible</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPosition.description}
                    </p>
                    <div>
                      <h5 className="font-semibold text-sm mb-3">Requisitos Completos:</h5>
                      <div className="space-y-2">
                        {selectedPosition.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-3">Beneficios del Puesto:</h5>
                      <div className="space-y-2">
                        {selectedPosition.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Right Column - Application Form */}
              <div className="lg:col-span-2">
                <Card className="border-none shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <FileText className="w-5 h-5 text-primary mr-2" />
                      Formulario de Aplicación
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Completa la información para postularte a {selectedPosition.title}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm flex items-center">
                        <User className="w-4 h-4 text-primary mr-2" />
                        Información Personal *
                      </h4>
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
                          <label className="text-sm font-medium">Ubicación en Panamá</label>
                          <Input 
                            placeholder="Ciudad o provincia"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
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
                            placeholder="+507 0000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm flex items-center">
                        <Briefcase className="w-4 h-4 text-primary mr-2" />
                        Experiencia Profesional
                      </h4>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Años de Experiencia</label>
                        <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu experiencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 años</SelectItem>
                            <SelectItem value="2-3">2-3 años</SelectItem>
                            <SelectItem value="4-5">4-5 años</SelectItem>
                            <SelectItem value="6-10">6-10 años</SelectItem>
                            <SelectItem value="10+">Más de 10 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Educación y Títulos</label>
                        <Textarea
                          placeholder="Describe tu formación académica, títulos y especialidades"
                          value={formData.education}
                          onChange={(e) => setFormData({...formData, education: e.target.value})}
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Certificaciones y Cursos</label>
                        <Textarea
                          placeholder="Certificaciones relevantes, cursos especializados, workshops, etc."
                          value={formData.certifications}
                          onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm">Información Adicional</h4>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">¿Por qué quieres unirte a ILUMINA?</label>
                        <Textarea
                          placeholder="Comparte tu motivación y qué puedes aportar al equipo"
                          value={formData.motivation}
                          onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Disponibilidad</label>
                        <Select value={formData.availability} onValueChange={(value) => setFormData({...formData, availability: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="¿Cuándo podrías comenzar?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inmediato">Inmediato</SelectItem>
                            <SelectItem value="1-2-semanas">1-2 semanas</SelectItem>
                            <SelectItem value="1-mes">1 mes</SelectItem>
                            <SelectItem value="2-meses">2 meses</SelectItem>
                            <SelectItem value="a-coordinar">A coordinar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Referencias Profesionales (Opcional)</label>
                        <Textarea
                          placeholder="Nombres y contactos de referencias profesionales"
                          value={formData.references}
                          onChange={(e) => setFormData({...formData, references: e.target.value})}
                          className="min-h-[60px]"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 pt-4">
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
                        Enviar Aplicación
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      * Nuestro equipo de Recursos Humanos se pondrá en contacto contigo en los próximos 3-5 días hábiles
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};