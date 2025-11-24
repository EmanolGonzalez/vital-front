import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus,
  Edit,
  Trash2,
  MapPin,
  User,
  Stethoscope,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DoctorScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DoctorScheduleModal = ({ open, onOpenChange }: DoctorScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("day");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const appointments = [
    {
      id: 1,
      time: "09:00",
      duration: 60,
      patient: "María González",
      treatment: "Botox Premium",
      status: "confirmed",
      type: "presencial",
      notes: "Primera sesión",
      phone: "+34 600 123 456"
    },
    {
      id: 2,
      time: "10:30",
      duration: 30,
      patient: "Carlos Ruiz",
      treatment: "Consulta Seguimiento",
      status: "confirmed",
      type: "telemedicina",
      notes: "Revisión resultados",
      phone: "+34 600 789 123"
    },
    {
      id: 3,
      time: "12:00",
      duration: 90,
      patient: "Ana Martínez",
      treatment: "Sueroterapia NAD+",
      status: "pending",
      type: "presencial",
      notes: "Protocolo longevidad",
      phone: "+34 600 456 789"
    },
    {
      id: 4,
      time: "15:30",
      duration: 45,
      patient: "Luis Fernández",
      treatment: "Consulta Inicial",
      status: "confirmed",
      type: "presencial",
      notes: "Evaluación facial",
      phone: "+34 600 987 654"
    }
  ];

  const weeklyStats = {
    totalAppointments: 28,
    completedAppointments: 24,
    cancelledAppointments: 2,
    revenue: "€8,400",
    averageRating: 4.9,
    utilizationRate: "85%"
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
    "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00", "19:30"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'telemedicina' ? (
      <MessageCircle className="w-4 h-4" />
    ) : (
      <MapPin className="w-4 h-4" />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
            Agenda Médica Avanzada
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-6 h-[70vh]">
          {/* Calendar Sidebar */}
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Estadísticas Semanales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Citas Totales:</span>
                  <span className="font-semibold">{weeklyStats.totalAppointments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completadas:</span>
                  <span className="font-semibold text-green-600">{weeklyStats.completedAppointments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ingresos:</span>
                  <span className="font-semibold text-primary">{weeklyStats.revenue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ocupación:</span>
                  <span className="font-semibold">{weeklyStats.utilizationRate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Schedule Area */}
          <div className="col-span-9 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="day">Vista Diaria</TabsTrigger>
                  <TabsTrigger value="week">Vista Semanal</TabsTrigger>
                  <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="telemedicina">Telemedicina</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Cita
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Day View */}
                <TabsContent value="day" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{format(selectedDate, "EEEE, dd MMMM yyyy", { locale: es })}</span>
                        <Badge variant="outline" className="text-primary">
                          {appointments.length} citas programadas
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <Card key={appointment.id} className="border-l-4 border-primary hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                  <div className="text-center min-w-[60px]">
                                    <div className="text-lg font-bold text-primary">{appointment.time}</div>
                                    <div className="text-xs text-muted-foreground flex items-center">
                                      <Timer className="w-3 h-3 mr-1" />
                                      {appointment.duration}m
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-semibold">{appointment.patient}</h4>
                                      {getTypeIcon(appointment.type)}
                                      <Badge className={getStatusColor(appointment.status)}>
                                        {appointment.status === 'confirmed' ? 'Confirmada' : 
                                         appointment.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                                      </Badge>
                                    </div>
                                    <p className="text-primary font-medium mb-1">{appointment.treatment}</p>
                                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{appointment.phone}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <MessageCircle className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Phone className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  {appointment.status === 'pending' && (
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                          <h3 className="text-lg font-semibold mb-2">No hay citas programadas</h3>
                          <p className="text-muted-foreground">¡Perfecto día para descansar o planificar!</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Week View */}
                <TabsContent value="week" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Vista Semanal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2 h-96">
                        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                          <div key={day} className="border rounded-lg p-2">
                            <h4 className="text-sm font-semibold mb-2 text-center">{day}</h4>
                            <div className="space-y-1">
                              {index < 5 && (
                                <div className="bg-primary/10 text-xs p-1 rounded text-center">
                                  {3 + index} citas
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Availability Management */}
                <TabsContent value="availability" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Gestionar Disponibilidad</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Horarios Disponibles - {format(selectedDate, "dd MMM yyyy", { locale: es })}</h4>
                        <div className="grid grid-cols-6 gap-2">
                          {timeSlots.map((slot) => {
                            const isBooked = appointments.some(apt => apt.time === slot);
                            const isSelected = selectedTimeSlot === slot;
                            
                            return (
                              <Button
                                key={slot}
                                variant={isBooked ? "destructive" : isSelected ? "default" : "outline"}
                                size="sm"
                                disabled={isBooked}
                                onClick={() => setSelectedTimeSlot(isSelected ? null : slot)}
                                className="text-xs h-8"
                              >
                                {slot}
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Disponible</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>Ocupado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded"></div>
                          <span>Seleccionado</span>
                        </div>
                      </div>

                      {selectedTimeSlot && (
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Bloque de Tiempo Seleccionado: {selectedTimeSlot}</h4>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600">
                                <Plus className="w-4 h-4 mr-1" />
                                Agendar Cita
                              </Button>
                              <Button size="sm" variant="outline">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Marcar No Disponible
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};