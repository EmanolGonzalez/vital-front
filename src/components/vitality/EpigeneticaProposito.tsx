import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Heart, 
  Target,
  TrendingDown,
  Sparkles,
  BookOpen,
  Activity,
  Moon,
  Sun
} from "lucide-react";

export const EpigeneticaProposito = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-primary/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Epigenética con Propósito
          </CardTitle>
          <CardDescription>
            Test de edad biológica, mindfulness y conexión con tu propósito vital
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="edad-biologica" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="edad-biologica">Edad Biológica</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="proposito">Propósito Vital</TabsTrigger>
        </TabsList>

        <TabsContent value="edad-biologica" className="space-y-6">
          {/* Test de Edad Biológica */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Test de Edad Biológica</CardTitle>
                  <CardDescription>Basado en análisis epigenético avanzado</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Actualizado
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background rounded-lg">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Edad Cronológica</p>
                  <p className="text-4xl font-bold">40</p>
                  <p className="text-xs text-muted-foreground">años</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">Edad Biológica</p>
                  <p className="text-4xl font-bold text-primary">32</p>
                  <p className="text-xs text-muted-foreground">años</p>
                </div>

                <div className="text-center p-6 bg-success/10 rounded-lg border-2 border-success/20">
                  <TrendingDown className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="text-sm text-muted-foreground mb-1">Diferencia</p>
                  <p className="text-4xl font-bold text-success">-8</p>
                  <p className="text-xs text-muted-foreground">años más joven</p>
                </div>
              </div>

              {/* Marcadores Epigenéticos */}
              <div className="space-y-4">
                <h4 className="font-semibold">Marcadores Epigenéticos</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Metilación del ADN</span>
                      <span className="text-sm font-semibold">Óptimo</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Longitud de Telómeros</span>
                      <span className="text-sm font-semibold">Excelente</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Inflamación Sistémica</span>
                      <span className="text-sm font-semibold">Bajo</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Estrés Oxidativo</span>
                      <span className="text-sm font-semibold">Controlado</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                Solicitar Nuevo Test
              </Button>
            </CardContent>
          </Card>

          {/* Factores que Influyen */}
          <Card>
            <CardHeader>
              <CardTitle>Factores que Mejoran tu Edad Biológica</CardTitle>
              <CardDescription>Hábitos que están revirtiendo tu envejecimiento</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { factor: "Nutrición antiinflamatoria", impact: 92, icon: "🥗" },
                { factor: "Ejercicio regular", impact: 88, icon: "💪" },
                { factor: "Sueño de calidad", impact: 85, icon: "😴" },
                { factor: "Gestión del estrés", impact: 80, icon: "🧘" },
                { factor: "Suplementación dirigida", impact: 78, icon: "💊" },
                { factor: "Conexión social", impact: 75, icon: "❤️" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.factor}</span>
                  </div>
                  <Badge variant="outline">{item.impact}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mindfulness" className="space-y-6">
          {/* Práctica Diaria */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Tu Práctica de Mindfulness
              </CardTitle>
              <CardDescription>
                Seguimiento diario de meditación y consciencia plena
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold text-primary mb-1">23</p>
                  <p className="text-sm text-muted-foreground">Días consecutivos</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold text-primary mb-1">315</p>
                  <p className="text-sm text-muted-foreground">Min. esta semana</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold text-primary mb-1">87%</p>
                  <p className="text-sm text-muted-foreground">Adherencia</p>
                </div>
              </div>

              {/* Sesiones Guiadas */}
              <div className="space-y-3">
                <h4 className="font-semibold">Sesiones Recomendadas Hoy</h4>
                
                {[
                  { name: "Meditación Matutina", duration: "10 min", type: "Energía" },
                  { name: "Respiración Consciente", duration: "5 min", type: "Focus" },
                  { name: "Body Scan", duration: "15 min", type: "Relajación" },
                  { name: "Gratitud Nocturna", duration: "8 min", type: "Sueño" }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                    <div>
                      <p className="font-semibold">{session.name}</p>
                      <p className="text-sm text-muted-foreground">{session.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{session.duration}</Badge>
                      <Button size="sm" variant="outline">Iniciar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progreso en Bienestar */}
          <Card>
            <CardHeader>
              <CardTitle>Impacto en tu Bienestar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Nivel de estrés</span>
                  <span className="text-sm font-semibold text-success">-35%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Calidad de sueño</span>
                  <span className="text-sm font-semibold text-success">+28%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Focus y claridad mental</span>
                  <span className="text-sm font-semibold text-success">+42%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposito" className="space-y-6">
          {/* Definición de Propósito */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Tu Propósito Vital
              </CardTitle>
              <CardDescription>
                Conectando tu bienestar con un propósito significativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-background rounded-lg border-2 border-primary/20">
                <p className="text-lg italic text-center">
                  "Empoderar a otros a alcanzar su máximo potencial de salud y vitalidad, 
                  compartiendo el camino hacia la longevidad consciente"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Misión</p>
                  <p className="text-sm text-muted-foreground">Inspirar cambio</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Valores</p>
                  <p className="text-sm text-muted-foreground">Salud consciente</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Impacto</p>
                  <p className="text-sm text-muted-foreground">Transformación</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                Redefinir Mi Propósito
              </Button>
            </CardContent>
          </Card>

          {/* Alineación Propósito-Acciones */}
          <Card>
            <CardHeader>
              <CardTitle>Alineación de Acciones con Propósito</CardTitle>
              <CardDescription>
                Cómo tus hábitos diarios reflejan tu propósito vital
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { 
                  action: "Mantener nutrición óptima", 
                  connection: "Ejemplo viviente de salud para inspirar", 
                  progress: 92 
                },
                { 
                  action: "Entrenar consistentemente", 
                  connection: "Demostrar disciplina y cuidado personal", 
                  progress: 88 
                },
                { 
                  action: "Practicar mindfulness", 
                  connection: "Cultivar paz interior para dar a otros", 
                  progress: 85 
                },
                { 
                  action: "Aprender sobre longevidad", 
                  connection: "Conocimiento para compartir y educar", 
                  progress: 80 
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.connection}</p>
                    </div>
                    <Badge variant="outline">{item.progress}%</Badge>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reflexiones y Gratitud */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Diario de Reflexiones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Hoy estoy agradecido por...</p>
                <Button variant="outline" className="w-full mt-2">
                  Escribir Reflexión
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Sun className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold mb-1">Intención del Día</p>
                  <p className="text-xs text-muted-foreground">Vivir con presencia plena</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Moon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold mb-1">Gratitud Nocturna</p>
                  <p className="text-xs text-muted-foreground">Por un día más de salud</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Calendar = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
