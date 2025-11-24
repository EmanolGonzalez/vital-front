import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Wifi,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  Monitor
} from "lucide-react";

export const VideoConsulta = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'upcoming' | 'active' | 'history'>('upcoming');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const upcomingConsultations = [
    {
      id: 1,
      doctorName: "Dra. García",
      specialty: "Medicina Estética",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "10:00",
      duration: 30,
      type: "seguimiento",
      status: "confirmed",
      notes: "Revisión de tratamiento facial"
    },
    {
      id: 2,
      doctorName: "Dr. Martinez",
      specialty: "Medicina Regenerativa",
      date: new Date(Date.now() + 259200000), // 3 days
      time: "15:30",
      duration: 45,
      type: "consulta",
      status: "pending",
      notes: "Evaluación para protocolo de longevidad"
    }
  ];

  const consultationHistory = [
    {
      id: 1,
      doctorName: "Dra. García",
      date: new Date(Date.now() - 604800000), // 1 week ago
      time: "09:30",
      duration: 25,
      type: "seguimiento",
      rating: 5,
      notes: "Excelente evolución del tratamiento"
    },
    {
      id: 2,
      doctorName: "Dr. Martinez",
      date: new Date(Date.now() - 1209600000), // 2 weeks ago
      time: "14:00",
      duration: 40,
      type: "consulta inicial",
      rating: 5,
      notes: "Primera consulta - evaluación completa"
    }
  ];

  const availableSlots = [
    { date: "2024-03-15", time: "09:00", available: true },
    { date: "2024-03-15", time: "10:30", available: true },
    { date: "2024-03-15", time: "12:00", available: false },
    { date: "2024-03-15", time: "15:00", available: true },
    { date: "2024-03-16", time: "09:30", available: true },
    { date: "2024-03-16", time: "11:00", available: true },
  ];

  const startVideoCall = () => {
    setIsInCall(true);
  };

  const endVideoCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  if (isInCall) {
    return (
      <Card className="h-[600px] bg-black text-white shadow-elegant">
        <CardContent className="p-0 h-full relative">
          {/* Video Area */}
          <div className="h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <Stethoscope className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">Dra. García</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Conectada</span>
              </div>
            </div>
          </div>

          {/* Patient Video (Picture in Picture) */}
          <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-primary flex items-center justify-center">
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-gray-400" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>

          {/* Connection Status */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm">Excelente</span>
          </div>

          {/* Call Timer */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
            <span className="text-sm">05:23</span>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-red-500 hover:bg-red-600"
              onClick={endVideoCall}
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </Button>
            
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
            >
              <Monitor className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Toggle */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-6 right-4 rounded-full"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-hero border border-primary/20 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Video Consultas</h2>
              <p className="text-muted-foreground">Consultas médicas desde casa</p>
            </div>
            <Badge className="bg-gradient-gold text-primary-foreground">
              <Video className="w-4 h-4 mr-1" />
              Premium
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { key: 'upcoming', label: 'Próximas', icon: Calendar },
          { key: 'schedule', label: 'Agendar', icon: Clock },
          { key: 'history', label: 'Historial', icon: CheckCircle }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
              activeTab === tab.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Upcoming Consultations */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingConsultations.map((consultation) => (
            <Card key={consultation.id} className="shadow-soft border-none bg-cream-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Stethoscope className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{consultation.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                    </div>
                  </div>
                  <Badge variant={consultation.status === 'confirmed' ? 'default' : 'outline'}>
                    {consultation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{consultation.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{consultation.time} - {consultation.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm capitalize">{consultation.type}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{consultation.notes}</p>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={startVideoCall}
                    className="bg-gradient-gold text-primary-foreground hover:shadow-gold"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Iniciar Video Llamada
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reagendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Schedule New Consultation */}
      {activeTab === 'schedule' && (
        <Card className="shadow-soft border-none bg-card">
          <CardHeader>
            <CardTitle>Agendar Nueva Consulta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Especialista</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garcia">Dra. García - Medicina Estética</SelectItem>
                    <SelectItem value="martinez">Dr. Martinez - Medicina Regenerativa</SelectItem>
                    <SelectItem value="lopez">Dr. López - Biohacking & Longevidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Consulta</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Consulta Inicial</SelectItem>
                    <SelectItem value="seguimiento">Seguimiento</SelectItem>
                    <SelectItem value="urgente">Consulta Urgente</SelectItem>
                    <SelectItem value="revision">Revisión de Resultados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Motivo de la Consulta</Label>
              <Textarea
                placeholder="Describe brevemente el motivo de tu consulta..."
                rows={3}
              />
            </div>
            
            <div className="space-y-4">
              <Label>Horarios Disponibles</Label>
              <div className="grid md:grid-cols-3 gap-3">
                {availableSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={slot.available ? "outline" : "ghost"}
                    disabled={!slot.available}
                    className={`h-auto p-3 ${!slot.available ? 'opacity-40' : ''}`}
                  >
                    <div className="text-center">
                      <div className="font-medium">{new Date(slot.date).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">{slot.time}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            <Button className="w-full bg-gradient-gold text-primary-foreground hover:shadow-gold">
              <Calendar className="w-4 h-4 mr-2" />
              Confirmar Cita
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Consultation History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {consultationHistory.map((consultation) => (
            <Card key={consultation.id} className="shadow-soft border-none bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <Stethoscope className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{consultation.doctorName}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{consultation.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${
                          i < consultation.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{consultation.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{consultation.time} - {consultation.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Completada</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{consultation.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};