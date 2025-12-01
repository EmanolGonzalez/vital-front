import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { mockAppointments, mockPatients, mockTreatments, mockDoctors } from "@/data/mockData";
import { parseISO } from 'date-fns';
import { DoctorPatientModal } from "@/components/modals/DoctorPatientModal";
import { DoctorScheduleModal } from "@/components/modals/DoctorScheduleModal";
import { DoctorAnalyticsModal } from "@/components/modals/DoctorAnalyticsModal";
import { VitalityPlanWizard } from "@/components/modals/VitalityPlanWizard";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Video, 
  Phone,
  Activity,
  Stethoscope,
  FileText,
  Settings,
  BarChart3,
  Zap,
  Award,
  Heart,
  UserPlus,
  CalendarPlus
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [vitalityPlanOpen, setVitalityPlanOpen] = useState(false);
  
  const doctorAppointments = mockAppointments.filter(apt => apt.doctorId === user?.id);
  const todayAppointments = doctorAppointments.filter(apt => 
    apt.date === format(new Date(), 'yyyy-MM-dd') && apt.status === 'scheduled'
  );

  // Patients assigned (from mockDoctors if available)
  const doctorInfo = mockDoctors.find(d => d.id === user?.id);
  const totalPatients = doctorInfo ? doctorInfo.patientsCount : mockPatients.length;

  // Revenue for this doctor this month
  const now = new Date();
  const monthlyRevenue = mockTreatments.reduce((sum, treatment) => {
    try {
      if (treatment.doctorId === user?.id) {
        const d = parseISO(treatment.date);
        if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
          return sum + (treatment.price || 0);
        }
      }
    } catch {
      return sum;
    }
    return sum;
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case 'consultation': return 'Consulta';
      case 'treatment': return 'Tratamiento';
      case 'followup': return 'Seguimiento';
      case 'telemedicine': return 'Telemedicina';
      default: return type;
    }
  };

  return (
    <DashboardLayout title="Panel Médico">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Citas Hoy"
            value={todayAppointments.length}
            description="Programadas"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="Total Pacientes"
            value={totalPatients}
            description="Bajo seguimiento"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Ingresos Mes"
            value={`€${monthlyRevenue}`}
            description="Enero 2024"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Valoración"
            value="4.9"
            description="⭐⭐⭐⭐⭐"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agenda de Hoy
              </CardTitle>
              <CardDescription>
                {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: es })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-muted rounded-lg">
                          <span className="text-xs font-medium">{appointment.time}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.patientName}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.treatment}</p>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getTypeDisplay(appointment.type)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No tienes citas programadas para hoy</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pacientes Recientes
              </CardTitle>
              <CardDescription>
                Últimas consultas y tratamientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback className="bg-gradient-gold text-primary-foreground">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Última visita: {format(new Date(patient.lastVisit), 'dd MMM', { locale: es })}
                        </p>
                        {patient.membershipType && (
                          <Badge variant="outline" className="text-xs">
                            {patient.membershipType}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Actions */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Centro de Control Médico
              </CardTitle>
              <CardDescription>
                Gestión avanzada de consultas y pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setVitalityPlanOpen(true)}
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white"
                >
                  <Heart className="h-6 w-6" />
                  <span className="text-sm">Plan de Vitalidad</span>
                </Button>
                <Button 
                  onClick={() => setScheduleModalOpen(true)}
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  <CalendarPlus className="h-6 w-6" />
                  <span className="text-sm">Agenda Avanzada</span>
                </Button>
                <Button 
                  onClick={() => setPatientModalOpen(true)}
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  <UserPlus className="h-6 w-6" />
                  <span className="text-sm">Gestión Pacientes</span>
                </Button>
                <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  <Video className="h-6 w-6" />
                  <span className="text-sm">Video Consulta</span>
                </Button>
                <Button 
                  onClick={() => setAnalyticsModalOpen(true)}
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analíticas Pro</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tools */}
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-600" />
                Herramientas Rápidas
              </CardTitle>
              <CardDescription>
                Acceso directo a funciones principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                  <FileText className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">Generar Reportes</div>
                    <div className="text-xs text-muted-foreground">Exportar datos del paciente</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                  <MessageCircle className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">Centro de Mensajes</div>
                    <div className="text-xs text-muted-foreground">Comunicación con pacientes</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                  <Settings className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">Configuración</div>
                    <div className="text-xs text-muted-foreground">Ajustes del perfil</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="bg-gradient-to-r from-gradient-start to-gradient-end border-none text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Rendimiento Excepcional</h3>
                  <p className="text-sm opacity-90">Superando objetivos este mes</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                Top Performer
              </Badge>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">96%</div>
                <div className="text-xs opacity-80">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+23%</div>
                <div className="text-xs opacity-80">Crecimiento</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-xs opacity-80">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">87%</div>
                <div className="text-xs opacity-80">Eficiencia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modales Inmersivos */}
      <VitalityPlanWizard 
        open={vitalityPlanOpen} 
        onOpenChange={setVitalityPlanOpen} 
      />
      <DoctorPatientModal 
        open={patientModalOpen} 
        onOpenChange={setPatientModalOpen} 
      />
      <DoctorScheduleModal 
        open={scheduleModalOpen} 
        onOpenChange={setScheduleModalOpen} 
      />
      <DoctorAnalyticsModal 
        open={analyticsModalOpen} 
        onOpenChange={setAnalyticsModalOpen} 
      />
    </DashboardLayout>
  );
}