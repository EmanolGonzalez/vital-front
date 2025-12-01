import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { QuickActionModal } from "@/components/modals/QuickActionModal";
import { MyVitalityPlan } from "@/components/patient/MyVitalityPlan";
import { 
  Calendar, 
  Stethoscope, 
  FileText, 
  CreditCard, 
  MessageCircle,
  TrendingUp,
  Clock,
  Star,
  Gift,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { mockAppointments, mockTreatments, mockPatients } from '@/data/mockData';
import { parseISO, isAfter, compareAsc } from 'date-fns';

const PatientDashboard = () => {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [quickActionModalOpen, setQuickActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const openQuickAction = (actionType: string) => {
    setSelectedAction(actionType);
    setQuickActionModalOpen(true);
  };

  const { user } = useAuth();
  const patientId = user?.id ?? '2';

  // Next appointment for this patient
  const futureAppointments = mockAppointments
    .filter(a => a.patientId === patientId)
    .map(a => ({...a, parsed: parseISO(a.date + 'T' + (a.time ?? '00:00:00'))}))
    .filter(a => isAfter(a.parsed, new Date()))
    .sort((a,b) => compareAsc(a.parsed, b.parsed));

  const nextApt = futureAppointments.length > 0 ? futureAppointments[0] : null;

  // Treatments completed this year
  const currentYear = new Date().getFullYear();
  const treatmentsCompletedThisYear = mockTreatments.filter(t => t.patientId === patientId && t.status === 'completed' && parseISO(t.date).getFullYear() === currentYear).length;

  // Plan and savings
  const patient = mockPatients.find(p => p.id === patientId);
  const planActive = patient?.membershipType ?? 'N/A';
  const saved = patient ? `€${Math.round(patient.totalSpent * 0.15)}` : '€0';

  const stats = [
    { title: 'Próxima Cita', value: nextApt ? `${format(parseISO(nextApt.date), 'dd MMM')}` : 'Sin cita', description: nextApt ? `${nextApt.time} - ${nextApt.treatment}` : '', icon: <Calendar className="w-5 h-5" /> },
    { title: 'Tratamientos', value: `${treatmentsCompletedThisYear}`, description: 'Completados este año', icon: <Stethoscope className="w-5 h-5" /> },
    { title: 'Plan Activo', value: planActive, description: 'Membresía', icon: <Star className="w-5 h-5" /> },
    { title: 'Ahorrado', value: saved, description: 'Estimado con membresía', icon: <Gift className="w-5 h-5" /> }
  ];

  return (
    <DashboardLayout title="Mi Panel de Paciente">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="vitality" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Mi Ruta de Vitalidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-accent rounded-full">
                      {stat.icon}
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="md:col-span-2 border-none shadow-elegant bg-gradient-hero">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-3" />
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="ghost" className="h-20 flex flex-col space-y-2 hover:bg-primary/10 group" onClick={() => openQuickAction("historial")}>
                    <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Historial</span>
                  </Button>
                  <Button variant="ghost" className="h-20 flex flex-col space-y-2 hover:bg-primary/10 group" onClick={() => openQuickAction("citas")}>
                    <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Citas</span>
                  </Button>
                  <Button variant="ghost" className="h-20 flex flex-col space-y-2 hover:bg-primary/10 group" onClick={() => openQuickAction("pagos")}>
                    <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Pagos</span>
                  </Button>
                  <Button variant="ghost" className="h-20 flex flex-col space-y-2 hover:bg-primary/10 group" onClick={() => openQuickAction("comunicacion")}>
                    <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Consultas</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-3" />
                  Próxima Cita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-gold rounded-xl text-primary-foreground">
                  <div className="font-bold text-lg">Botox Premium</div>
                  <div className="text-sm opacity-90">Dr. Carlos Mendoza</div>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">15 Enero - 10:30</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button variant="luxury" className="flex-1 group" onClick={() => setAppointmentModalOpen(true)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Cita
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="gold-outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle>Mi Progreso de Tratamientos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Plan Anual de Rejuvenecimiento</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sueroterapias Programadas</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitality">
          <MyVitalityPlan />
        </TabsContent>
      </Tabs>

      <AppointmentModal open={appointmentModalOpen} onOpenChange={setAppointmentModalOpen} />
      <QuickActionModal open={quickActionModalOpen} onOpenChange={setQuickActionModalOpen} actionType={selectedAction} />
    </DashboardLayout>
  );
};

export default PatientDashboard;
