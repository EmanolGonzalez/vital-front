import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Droplets, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AppointmentModal = ({ open, onOpenChange }: AppointmentModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  const treatments = [
    {
      id: "consulta",
      name: "Consulta Médica",
      duration: "45 min",
      price: "Gratuita",
      icon: <User className="w-5 h-5" />,
      description: "Evaluación inicial personalizada"
    },
    {
      id: "botox",
      name: "Botox Premium",
      duration: "60 min",
      price: "350€",
      icon: <Stethoscope className="w-5 h-5" />,
      description: "Tratamiento antiarrugas facial"
    },
    {
      id: "hialuronico",
      name: "Ácido Hialurónico",
      duration: "90 min",
      price: "450€",
      icon: <Stethoscope className="w-5 h-5" />,
      description: "Hidratación y volumen facial"
    },
    {
      id: "sueroterapia",
      name: "Sueroterapia NAD+",
      duration: "75 min",
      price: "280€",
      icon: <Droplets className="w-5 h-5" />,
      description: "Revitalización celular avanzada"
    }
  ];

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedTreatment) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Cita Agendada!",
      description: `Tu cita ha sido confirmada para el ${format(selectedDate, "PPP", { locale: es })} a las ${selectedTime}`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedTreatment("");
    setNotes("");
    setStep(1);
    onOpenChange(false);
  };

  const selectedTreatmentData = treatments.find(t => t.id === selectedTreatment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
            Agendar Nueva Cita
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Selection */}
          <div className="space-y-6">
            {/* Step 1: Treatment Selection */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">1. Selecciona el Tratamiento</h3>
                <div className="space-y-3">
                  {treatments.map((treatment) => (
                    <Card
                      key={treatment.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-gold ${
                        selectedTreatment === treatment.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => {
                        setSelectedTreatment(treatment.id);
                        setStep(2);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {treatment.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{treatment.name}</h4>
                              <Badge variant="outline">{treatment.price}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {treatment.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {treatment.duration}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">2. Selecciona la Fecha</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep(1)}
                  >
                    Cambiar Tratamiento
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) setStep(3);
                    }}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {step === 3 && selectedDate && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">3. Selecciona la Hora</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep(2)}
                  >
                    Cambiar Fecha
                  </Button>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Fecha seleccionada: {format(selectedDate, "PPP", { locale: es })}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Notes */}
            {step === 3 && selectedTime && (
              <div className="space-y-4">
                <h4 className="font-semibold">Notas Adicionales (Opcional)</h4>
                <Textarea
                  placeholder="Menciona cualquier información relevante para tu cita..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-soft bg-gradient-hero">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                  Resumen de la Cita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTreatmentData && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {selectedTreatmentData.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{selectedTreatmentData.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedTreatmentData.duration} • {selectedTreatmentData.price}
                        </p>
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {format(selectedDate, "PPP", { locale: es })}
                          </h4>
                          {selectedTime && (
                            <p className="text-sm text-muted-foreground">
                              {selectedTime} - {format(
                                new Date(`2023-01-01 ${selectedTime}`).getTime() + 
                                parseInt(selectedTreatmentData.duration) * 60000, 
                                "HH:mm"
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {notes && (
                      <div className="p-3 bg-background/50 rounded-lg">
                        <h5 className="font-medium mb-1">Notas:</h5>
                        <p className="text-sm text-muted-foreground">{notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedDate && selectedTime && selectedTreatment && (
                  <Button 
                    onClick={handleConfirmAppointment}
                    variant="luxury" 
                    className="w-full group"
                  >
                    Confirmar Cita
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Información de Contacto</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 Calle 50, Torre Global Plaza, Panamá</p>
                  <p>📞 +507 263-0000</p>
                  <p>✉️ info@iluminavitallounge.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};