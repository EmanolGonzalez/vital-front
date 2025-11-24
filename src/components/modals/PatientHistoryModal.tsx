import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Calendar, 
  Stethoscope, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  Download,
  MessageCircle,
  Phone,
  Mail
} from "lucide-react";

interface PatientHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
}

export const PatientHistoryModal = ({ open, onOpenChange, patientId }: PatientHistoryModalProps) => {
  // Mock patient data
  const patientData = {
    id: patientId,
    name: "María González Ruiz",
    email: "maria.gonzalez@email.com",
    phone: "+34 600 123 456",
    age: 42,
    memberSince: "Marzo 2023",
    plan: "ILUMINA Platinum",
    avatar: "MG",
    nextAppointment: {
      date: "15 Enero 2024",
      time: "10:30",
      treatment: "Botox Premium",
      doctor: "Dr. Carlos Mendoza"
    },
    treatments: [
      {
        date: "2024-01-08",
        treatment: "Sueroterapia NAD+",
        doctor: "Dr. Ana López",
        status: "Completado",
        notes: "Excelente respuesta al tratamiento. Paciente reporta mayor energía.",
        cost: "280€"
      },
      {
        date: "2023-12-20",
        treatment: "Botox Premium",
        doctor: "Dr. Carlos Mendoza",
        status: "Completado",
        notes: "Aplicación en frente y entrecejo. Resultado natural.",
        cost: "350€"
      },
      {
        date: "2023-11-15",
        treatment: "Ácido Hialurónico",
        doctor: "Dr. María Silva",
        status: "Completado",
        notes: "Hidratación labial. Paciente muy satisfecha con resultados.",
        cost: "450€"
      },
      {
        date: "2023-10-10",
        treatment: "Consulta Inicial",
        doctor: "Dr. Carlos Mendoza",
        status: "Completado",
        notes: "Evaluación integral. Plan de tratamiento personalizado.",
        cost: "Gratuita"
      }
    ],
    medicalInfo: {
      allergies: ["Penicilina"],
      conditions: ["Migraña ocasional"],
      medications: ["Ninguna"],
      notes: "Piel sensible. Prefiere tratamientos mínimamente invasivos."
    },
    analytics: {
      totalTreatments: 4,
      totalSpent: "1080€",
      avgMonthlyVisits: 1.2,
      satisfactionScore: 9.5,
      referrals: 2
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <User className="w-6 h-6 mr-3 text-primary" />
            Historial Completo del Paciente
          </DialogTitle>
        </DialogHeader>

        {/* Patient Header */}
        <Card className="border-none shadow-soft bg-gradient-hero">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {patientData.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{patientData.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{patientData.age} años</span>
                    <span>•</span>
                    <span>Miembro desde {patientData.memberSince}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">{patientData.plan}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
            <TabsTrigger value="medical">Info Médica</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{patientData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{patientData.phone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Appointment */}
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Próxima Cita
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold">{patientData.nextAppointment.treatment}</div>
                    <div className="text-sm text-muted-foreground">
                      {patientData.nextAppointment.date} a las {patientData.nextAppointment.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Con {patientData.nextAppointment.doctor}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Treatments */}
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-primary" />
                  Tratamientos Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.treatments.slice(0, 3).map((treatment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{treatment.treatment}</div>
                        <div className="text-sm text-muted-foreground">
                          {treatment.date} - {treatment.doctor}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{treatment.status}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {treatment.cost}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            {patientData.treatments.map((treatment, index) => (
              <Card key={index} className="border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{treatment.treatment}</h4>
                      <p className="text-sm text-muted-foreground">
                        {treatment.date} - {treatment.doctor}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{treatment.status}</Badge>
                      <p className="text-sm font-medium mt-1">{treatment.cost}</p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{treatment.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Alergias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patientData.medicalInfo.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="mr-2 mb-2">
                      {allergy}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Condiciones Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patientData.medicalInfo.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {condition}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle>Notas Médicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{patientData.medicalInfo.notes}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{patientData.analytics.totalTreatments}</div>
                  <div className="text-sm text-muted-foreground">Tratamientos</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{patientData.analytics.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">Total Gastado</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{patientData.analytics.avgMonthlyVisits}</div>
                  <div className="text-sm text-muted-foreground">Visitas/Mes</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-6 text-center">
                  <User className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{patientData.analytics.satisfactionScore}/10</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle>Resumen de Actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tratamientos completados</span>
                    <span className="font-semibold">{patientData.analytics.totalTreatments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Referidos generados</span>
                    <span className="font-semibold">{patientData.analytics.referrals} pacientes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Puntuación de satisfacción</span>
                    <span className="font-semibold">{patientData.analytics.satisfactionScore}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Historial
          </Button>
          <Button variant="luxury">
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Nueva Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};