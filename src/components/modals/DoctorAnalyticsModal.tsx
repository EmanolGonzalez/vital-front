import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Star,
  Activity,
  Target,
  Award,
  Clock,
  Zap,
  Brain,
  Heart,
  Download,
  Filter,
  Eye,
  ThumbsUp,
  BarChart3,
  PieChart
} from "lucide-react";

interface DoctorAnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DoctorAnalyticsModal = ({ open, onOpenChange }: DoctorAnalyticsModalProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");

  const performanceMetrics = {
    totalPatients: 147,
    totalAppointments: 324,
    totalRevenue: 28500,
    averageRating: 4.9,
    patientSatisfaction: 96,
    treatmentSuccess: 94,
    referralRate: 23,
    utilizationRate: 87
  };

  const monthlyData = [
    { month: "Ene", patients: 35, revenue: 6200, appointments: 72 },
    { month: "Feb", patients: 42, revenue: 7800, appointments: 84 },
    { month: "Mar", patients: 38, revenue: 6900, appointments: 78 },
    { month: "Abr", patients: 45, revenue: 8200, appointments: 89 },
    { month: "May", patients: 52, revenue: 9400, appointments: 97 }
  ];

  const topTreatments = [
    { name: "Botox Premium", count: 89, revenue: 12400, growth: "+15%" },
    { name: "Sueroterapia NAD+", count: 67, revenue: 9800, growth: "+22%" },
    { name: "Ácido Hialurónico", count: 45, revenue: 8900, growth: "+8%" },
    { name: "Consulta Médica", count: 123, revenue: 0, growth: "+12%" },
    { name: "Medicina Preventiva", count: 34, revenue: 5200, growth: "+35%" }
  ];

  const patientDemographics = [
    { age: "25-35", percentage: 35, color: "bg-blue-500" },
    { age: "36-45", percentage: 28, color: "bg-green-500" },
    { age: "46-55", percentage: 22, color: "bg-yellow-500" },
    { age: "56-65", percentage: 12, color: "bg-purple-500" },
    { age: "65+", percentage: 3, color: "bg-red-500" }
  ];

  const recentAchievements = [
    { title: "Top Performer", description: "Mayor satisfacción del mes", icon: <Award className="w-5 h-5" />, color: "bg-yellow-500" },
    { title: "Innovation Leader", description: "Nuevos protocolos implementados", icon: <Brain className="w-5 h-5" />, color: "bg-purple-500" },
    { title: "Patient Care Excellence", description: "98% satisfacción este mes", icon: <Heart className="w-5 h-5" />, color: "bg-red-500" },
    { title: "Efficiency Master", description: "Optimización de horarios", icon: <Zap className="w-5 h-5" />, color: "bg-blue-500" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-primary" />
              Centro de Analíticas y Rendimiento
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mes</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="year">Año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[70vh] flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen General</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="patients">Análisis Pacientes</TabsTrigger>
            <TabsTrigger value="financial">Financiero</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Pacientes Totales</p>
                        <p className="text-2xl font-bold text-blue-900">{performanceMetrics.totalPatients}</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +12% este mes
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Ingresos Totales</p>
                        <p className="text-2xl font-bold text-green-900">€{performanceMetrics.totalRevenue.toLocaleString()}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +18% este mes
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Satisfacción</p>
                        <p className="text-2xl font-bold text-purple-900">{performanceMetrics.patientSatisfaction}%</p>
                        <p className="text-xs text-purple-600 flex items-center mt-1">
                          <Star className="w-3 h-3 mr-1" />
                          {performanceMetrics.averageRating}/5.0 estrellas
                        </p>
                      </div>
                      <Heart className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 text-sm font-medium">Tasa de Ocupación</p>
                        <p className="text-2xl font-bold text-orange-900">{performanceMetrics.utilizationRate}%</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <Activity className="w-3 h-3 mr-1" />
                          Excelente rendimiento
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Evolución Mensual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((month, index) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{month.month}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground">{month.patients} pac.</span>
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2 transition-all duration-500"
                                style={{ width: `${(month.revenue / 10000) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">€{month.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Treatments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Tratamientos Más Populares
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topTreatments.slice(0, 5).map((treatment, index) => (
                        <div key={treatment.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="w-6 h-6 p-0 text-xs">
                              {index + 1}
                            </Badge>
                            <div>
                              <h4 className="text-sm font-medium">{treatment.name}</h4>
                              <p className="text-xs text-muted-foreground">{treatment.count} sesiones</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">€{treatment.revenue.toLocaleString()}</p>
                            <p className="text-xs text-green-600">{treatment.growth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Logros Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center mx-auto mb-3 text-white`}>
                          {achievement.icon}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Indicadores Clave</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tasa de Éxito</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-green-500 rounded-full h-2" style={{ width: `${performanceMetrics.treatmentSuccess}%` }}></div>
                        </div>
                        <span className="text-sm font-bold">{performanceMetrics.treatmentSuccess}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Referidos</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2" style={{ width: `${performanceMetrics.referralRate}%` }}></div>
                        </div>
                        <span className="text-sm font-bold">{performanceMetrics.referralRate}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ocupación</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-purple-500 rounded-full h-2" style={{ width: `${performanceMetrics.utilizationRate}%` }}></div>
                        </div>
                        <span className="text-sm font-bold">{performanceMetrics.utilizationRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Comparativa Mensual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">vs. Mes Anterior</span>
                        <Badge className="bg-green-100 text-green-800">+12%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">vs. Promedio Sector</span>
                        <Badge className="bg-blue-100 text-blue-800">+8%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">vs. Objetivo Mensual</span>
                        <Badge className="bg-purple-100 text-purple-800">105%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Próximos Objetivos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm">150 pacientes activos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Mantener rating 4.9+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">€30k ingresos mensuales</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Patients Analysis Tab */}
            <TabsContent value="patients" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Demografía de Pacientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientDemographics.map((demo, index) => (
                        <div key={demo.age} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{demo.age} años</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-muted rounded-full h-3">
                              <div 
                                className={`${demo.color} rounded-full h-3 transition-all duration-500`}
                                style={{ width: `${demo.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold w-8">{demo.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Retención</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">92%</div>
                      <p className="text-sm text-muted-foreground">Tasa de Retención</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold">67%</div>
                        <p className="text-xs text-muted-foreground">Pacientes Recurrentes</p>
                      </div>
                      <div>
                        <div className="text-xl font-bold">23%</div>
                        <p className="text-xs text-muted-foreground">Nuevos por Referidos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Ingresos por Tratamiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topTreatments.map((treatment, index) => (
                        <div key={treatment.name} className="flex justify-between items-center">
                          <span className="text-sm truncate">{treatment.name}</span>
                          <span className="font-semibold">€{treatment.revenue.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Proyección Mensual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">€32,500</div>
                      <p className="text-sm text-muted-foreground">Estimado fin de mes</p>
                      <Badge className="bg-green-100 text-green-800">
                        +14% vs objetivo
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eficiencia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Ingreso por hora</span>
                        <span className="font-semibold">€125</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Costo por paciente</span>
                        <span className="font-semibold">€45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Margen promedio</span>
                        <span className="font-semibold text-green-600">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};