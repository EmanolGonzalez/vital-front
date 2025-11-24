import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
  doctor?: string;
}

interface Treatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

export const BookingSystem = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  // Mock data - En producción vendría de Supabase
  const treatments: Treatment[] = [
    {
      id: "facial-revitalizacion",
      name: "Revitalización Facial",
      duration: "60 min",
      price: "€180",
      description: "Tratamiento completo de rejuvenecimiento facial"
    },
    {
      id: "sueroterapia-energia",
      name: "Sueroterapia Energizante",
      duration: "45 min", 
      price: "€120",
      description: "IV therapy para aumento de energía y vitalidad"
    },
    {
      id: "medicina-estetica",
      name: "Consulta Medicina Estética",
      duration: "30 min",
      price: "€80",
      description: "Evaluación personalizada con especialista"
    },
    {
      id: "biohacking-longevidad",
      name: "Protocolo Longevidad",
      duration: "90 min",
      price: "€280",
      description: "Análisis completo de edad biológica y optimización"
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: "09:00", available: true, doctor: "Dr. García" },
    { time: "09:30", available: false, doctor: "Dr. García" },
    { time: "10:00", available: true, doctor: "Dr. Martín" },
    { time: "10:30", available: true, doctor: "Dr. García" },
    { time: "11:00", available: false, doctor: "Dr. Martín" },
    { time: "11:30", available: true, doctor: "Dr. García" },
    { time: "12:00", available: true, doctor: "Dr. Martín" },
    { time: "15:00", available: true, doctor: "Dr. García" },
    { time: "15:30", available: true, doctor: "Dr. Martín" },
    { time: "16:00", available: false, doctor: "Dr. García" },
    { time: "16:30", available: true, doctor: "Dr. Martín" },
    { time: "17:00", available: true, doctor: "Dr. García" },
  ];

  const handleSubmit = () => {
    // Simulación de envío
    toast({
      title: "¡Reserva Confirmada! 🎉",
      description: `Tu cita para ${treatments.find(t => t.id === selectedTreatment)?.name} ha sido programada para el ${selectedDate?.toLocaleDateString()} a las ${selectedTime}. Te enviaremos la confirmación por email.`,
    });
    
    // Reset form
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedTreatment("");
    setFormData({ name: "", email: "", phone: "", notes: "" });
  };

  const selectedTreatmentData = treatments.find(t => t.id === selectedTreatment);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Sistema de Reservas DEMO
        </Badge>
        <h2 className="text-3xl font-bold mb-2">Reserva tu Cita</h2>
        <p className="text-muted-foreground">
          Proceso simple y rápido para agendar tu tratamiento
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= stepNum 
                  ? 'bg-primary text-primary-foreground shadow-soft' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                  step > stepNum ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="shadow-soft border-none bg-cream-card">
        <CardContent className="p-8">
          {/* Step 1: Seleccionar Tratamiento */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Selecciona tu Tratamiento</h3>
                <p className="text-muted-foreground">Elige el servicio que mejor se adapte a tus necesidades</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {treatments.map((treatment) => (
                  <Card 
                    key={treatment.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-gold ${
                      selectedTreatment === treatment.id 
                        ? 'ring-2 ring-primary shadow-gold bg-primary/5' 
                        : 'hover:shadow-soft'
                    }`}
                    onClick={() => setSelectedTreatment(treatment.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{treatment.name}</h4>
                        <Badge variant="outline">{treatment.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {treatment.duration}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Seleccionar Fecha */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Selecciona la Fecha</h3>
                <p className="text-muted-foreground">Elige el día que mejor te convenga</p>
              </div>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border shadow-soft"
                />
              </div>
              
              {selectedDate && (
                <div className="text-center">
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Seleccionar Hora */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Selecciona la Hora</h3>
                <p className="text-muted-foreground">Horarios disponibles para el {selectedDate?.toLocaleDateString()}</p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-4 h-auto flex flex-col items-center transition-all duration-300 ${
                      selectedTime === slot.time 
                        ? 'bg-gradient-gold text-primary-foreground shadow-gold' 
                        : slot.available 
                          ? 'hover:shadow-soft' 
                          : 'opacity-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 mb-1" />
                    <span className="font-medium">{slot.time}</span>
                    {slot.available && (
                      <span className="text-xs opacity-75">{slot.doctor}</span>
                    )}
                  </Button>
                ))}
              </div>
              
              {selectedTime && (
                <div className="text-center">
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedTime} - {timeSlots.find(s => s.time === selectedTime)?.doctor}
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Datos del Paciente */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Tus Datos</h3>
                <p className="text-muted-foreground">Completa la información para confirmar tu cita</p>
              </div>
              
              {/* Resumen de la cita */}
              <Card className="bg-gradient-hero border border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    Resumen de tu Cita
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tratamiento</p>
                      <p className="font-medium">{selectedTreatmentData?.name}</p>
                      <p className="text-primary">{selectedTreatmentData?.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-medium">{selectedDate?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hora</p>
                      <p className="font-medium">{selectedTime}</p>
                      <p className="text-muted-foreground text-xs">{timeSlots.find(s => s.time === selectedTime)?.doctor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Formulario */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre y apellidos"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Cuéntanos si tienes alguna condición médica, alergia o preferencia especial..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedTreatment) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && !selectedTime)
                }
                className="bg-gradient-gold text-primary-foreground hover:shadow-gold flex items-center"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="bg-gradient-gold text-primary-foreground hover:shadow-gold flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Reserva
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <div className="mt-8 text-center">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ MODO DEMO:</strong> Este es un sistema de reservas simulado. 
              Para funcionalidad real con confirmaciones automáticas, base de datos y gestión completa, 
              conecta tu proyecto a Supabase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};