import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award,
  Camera,
  BarChart3,
  Zap,
  Heart,
  Brain,
  Activity
} from "lucide-react";

export const ProgramaResultados = () => {
  const objectives = [
    {
      id: 1,
      title: "Reducir Edad Biológica",
      current: 3,
      target: 8,
      unit: "años",
      progress: 37,
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      color: "green"
    },
    {
      id: 2,
      title: "Aumento de Energía",
      current: 7,
      target: 10,
      unit: "/10",
      progress: 70,
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      color: "yellow"
    },
    {
      id: 3,
      title: "Mejora Calidad del Sueño",
      current: 8,
      target: 9,
      unit: "/10",
      progress: 89,
      icon: <Brain className="w-5 h-5 text-blue-500" />,
      color: "blue"
    },
    {
      id: 4,
      title: "Optimización Cardiovascular",
      current: 6,
      target: 9,
      unit: "/10",
      progress: 67,
      icon: <Heart className="w-5 h-5 text-red-500" />,
      color: "red"
    }
  ];

  const milestones = [
    {
      date: "2024-01-15",
      title: "Inicio del Programa",
      description: "Evaluación inicial y establecimiento de objetivos",
      completed: true,
      type: "start"
    },
    {
      date: "2024-02-01",
      title: "Primera Evaluación",
      description: "Análisis de biomarcadores y ajuste del protocolo",
      completed: true,
      type: "evaluation"
    },
    {
      date: "2024-02-15",
      title: "Optimización Nutricional",
      description: "Implementación de plan nutricional personalizado",
      completed: true,
      type: "nutrition"
    },
    {
      date: "2024-03-01",
      title: "Protocolo de Ejercicio",
      description: "Inicio del programa de ejercicio específico",
      completed: false,
      type: "exercise"
    },
    {
      date: "2024-03-15",
      title: "Evaluación Intermedia",
      description: "Análisis de progreso y ajustes necesarios",
      completed: false,
      type: "evaluation"
    },
    {
      date: "2024-04-01",
      title: "Objetivo Final",
      description: "Evaluación completa y celebración de resultados",
      completed: false,
      type: "target"
    }
  ];

  const biomarkers = [
    {
      name: "Longitud de Telómeros",
      value: 12.5,
      unit: "kb",
      change: +15,
      optimal: "12-15 kb",
      status: "optimal"
    },
    {
      name: "Inflamación (CRP)",
      value: 0.8,
      unit: "mg/L",
      change: -45,
      optimal: "<1.0 mg/L",
      status: "optimal"
    },
    {
      name: "Función Mitocondrial",
      value: 85,
      unit: "%",
      change: +25,
      optimal: ">80%",
      status: "optimal"
    },
    {
      name: "Resistencia Insulina",
      value: 1.2,
      unit: "HOMA-IR",
      change: -30,
      optimal: "<2.0",
      status: "optimal"
    },
    {
      name: "Vitamina D",
      value: 45,
      unit: "ng/mL",
      change: +50,
      optimal: "40-60 ng/mL",
      status: "optimal"
    },
    {
      name: "Omega-3 Index",
      value: 7.2,
      unit: "%",
      change: +20,
      optimal: ">6%",
      status: "optimal"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-hero border border-primary/20 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Programa de Resultados</h2>
              <p className="text-muted-foreground">Seguimiento de tu transformación integral</p>
            </div>
            <Badge className="bg-gradient-gold text-primary-foreground">
              <Award className="w-4 h-4 mr-1" />
              Nivel Premium
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <p className="text-sm text-muted-foreground">Progreso General</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">Semanas Activo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">-5</div>
              <p className="text-sm text-muted-foreground">Años Biológicos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">+45%</div>
              <p className="text-sm text-muted-foreground">Energía Vital</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card className="shadow-soft border-none bg-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Objetivos en Progreso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((objective) => (
              <div key={objective.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {objective.icon}
                    <span className="font-medium">{objective.title}</span>
                  </div>
                  <Badge variant="outline">
                    {objective.current}/{objective.target} {objective.unit}
                  </Badge>
                </div>
                <Progress value={objective.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {objective.progress}% completado
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <Card className="shadow-soft border-none bg-cream-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Cronología del Programa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    milestone.completed 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone.title}
                      </h4>
                      <Badge variant={milestone.completed ? "default" : "outline"} className="text-xs">
                        {new Date(milestone.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className={`text-sm ${
                      milestone.completed ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Biomarkers */}
        <Card className="shadow-soft border-none bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Biomarcadores Clave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {biomarkers.map((marker, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-cream rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{marker.name}</h4>
                    <p className="text-xs text-muted-foreground">Óptimo: {marker.optimal}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{marker.value} {marker.unit}</div>
                    <div className={`text-xs flex items-center ${
                      marker.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <Activity className="w-3 h-3 mr-1" />
                      {marker.change > 0 ? '+' : ''}{marker.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Progress */}
      <Card className="shadow-soft border-none bg-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2 text-primary" />
            Progreso Visual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="aspect-square bg-gradient-cream rounded-lg mb-2 flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Inicio</p>
              <p className="text-xs text-muted-foreground">Enero 2024</p>
            </div>
            <div className="text-center">
              <div className="aspect-square bg-gradient-cream rounded-lg mb-2 flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Mes 2</p>
              <p className="text-xs text-muted-foreground">Febrero 2024</p>
            </div>
            <div className="text-center">
              <div className="aspect-square bg-gradient-cream rounded-lg mb-2 flex items-center justify-center border-2 border-primary border-dashed">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-medium">Próxima Foto</p>
              <p className="text-xs text-muted-foreground">Marzo 2024</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-gradient-gold text-primary-foreground hover:shadow-gold">
              <Camera className="w-4 h-4 mr-2" />
              Subir Nueva Foto de Progreso
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};