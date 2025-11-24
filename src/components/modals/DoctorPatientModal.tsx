import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Plus, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  TrendingUp,
  Heart,
  FileText,
  Camera,
  MessageCircle,
  Video,
  Star,
  Activity,
  AlertTriangle
} from "lucide-react";
import { mockPatients } from "@/data/mockData";

interface DoctorPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DoctorPatientModal = ({ open, onOpenChange }: DoctorPatientModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patientDetails = selectedPatient ? {
    ...selectedPatient,
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "36.5°C",
      weight: "68 kg",
      height: "165 cm",
      bmi: "25.0"
    },
    allergies: ["Penicilina", "Mariscos"],
    conditions: ["Hipertensión controlada"],
    treatments: [
      { date: "2024-03-01", treatment: "Botox Premium", doctor: "Dra. García", status: "Completado" },
      { date: "2024-02-15", treatment: "Sueroterapia NAD+", doctor: "Dr. Martinez", status: "Completado" },
      { date: "2024-01-20", treatment: "Consulta Inicial", doctor: "Dra. García", status: "Completado" }
    ],
    notes: "Paciente muy colaborativo. Responde excelente a los tratamientos. Programar seguimiento en 4 semanas.",
    nextAppointment: "2024-03-25 10:30 - Seguimiento facial"
  } : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Gestión de Pacientes
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-6 h-[70vh]">
          {/* Patient List - Left Panel */}
          <div className="col-span-4 space-y-4 overflow-hidden">
            {/* Search and Add */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Patient List */}
            <div className="space-y-2 overflow-y-auto h-full pr-2">
              {filteredPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPatient?.id === patient.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {patient.membershipType && (
                            <Badge variant="outline" className="text-xs">
                              {patient.membershipType}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Última: {new Date(patient.lastVisit).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Patient Details - Right Panel */}
          <div className="col-span-8 overflow-hidden">
            {selectedPatient ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Resumen</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                  <TabsTrigger value="vitals">Signos</TabsTrigger>
                  <TabsTrigger value="notes">Notas</TabsTrigger>
                  <TabsTrigger value="actions">Acciones</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto mt-4">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    {/* Patient Header */}
                    <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={selectedPatient.avatar} />
                              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary-glow text-white">
                                {selectedPatient.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                              <p className="text-muted-foreground">{selectedPatient.email}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span>32 años</span>
                                <span>•</span>
                                <span>Miembro desde 2023</span>
                                <span>•</span>
                                <Badge className="bg-gradient-gold text-primary-foreground">Premium</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">12</div>
                          <p className="text-sm text-muted-foreground">Tratamientos</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <div className="text-2xl font-bold">€2,800</div>
                          <p className="text-sm text-muted-foreground">Inversión Total</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <div className="text-2xl font-bold">4.9</div>
                          <p className="text-sm text-muted-foreground">Satisfacción</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <div className="text-2xl font-bold">95%</div>
                          <p className="text-sm text-muted-foreground">Adherencia</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {patientDetails?.treatments.slice(0, 3).map((treatment, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <div className="flex-1">
                                <h4 className="font-medium">{treatment.treatment}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {treatment.date} - {treatment.doctor}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {treatment.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* History Tab */}
                  <TabsContent value="history" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Historial de Tratamientos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {patientDetails?.treatments.map((treatment, index) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold">{treatment.treatment}</h4>
                                  <p className="text-sm text-muted-foreground">Dr. {treatment.doctor}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{treatment.date}</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                  {treatment.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Vitals Tab */}
                  <TabsContent value="vitals" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Signos Vitales</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Presión Arterial:</span>
                            <span className="font-semibold">{patientDetails?.vitals.bloodPressure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frecuencia Cardíaca:</span>
                            <span className="font-semibold">{patientDetails?.vitals.heartRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temperatura:</span>
                            <span className="font-semibold">{patientDetails?.vitals.temperature}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Medidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Peso:</span>
                            <span className="font-semibold">{patientDetails?.vitals.weight}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Altura:</span>
                            <span className="font-semibold">{patientDetails?.vitals.height}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>IMC:</span>
                            <span className="font-semibold">{patientDetails?.vitals.bmi}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                          Alergias y Condiciones
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Alergias:</h4>
                          <div className="flex gap-2">
                            {patientDetails?.allergies.map((allergy, index) => (
                              <Badge key={index} variant="destructive">{allergy}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Condiciones:</h4>
                          <div className="flex gap-2">
                            {patientDetails?.conditions.map((condition, index) => (
                              <Badge key={index} variant="outline">{condition}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value="notes" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notas Médicas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={patientDetails?.notes}
                          placeholder="Añadir notas del paciente..."
                          rows={6}
                        />
                        <Button className="mt-4 bg-gradient-to-r from-primary to-primary-glow">
                          <FileText className="w-4 h-4 mr-2" />
                          Guardar Notas
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Próxima Cita</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold">{patientDetails?.nextAppointment}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Actions Tab */}
                  <TabsContent value="actions" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600">
                        <Calendar className="w-6 h-6" />
                        <span>Agendar Cita</span>
                      </Button>
                      <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600">
                        <MessageCircle className="w-6 h-6" />
                        <span>Enviar Mensaje</span>
                      </Button>
                      <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600">
                        <Video className="w-6 h-6" />
                        <span>Video Consulta</span>
                      </Button>
                      <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-orange-500 to-orange-600">
                        <FileText className="w-6 h-6" />
                        <span>Generar Reporte</span>
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">Selecciona un Paciente</h3>
                  <p className="text-muted-foreground">
                    Elige un paciente de la lista para ver su información detallada
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};