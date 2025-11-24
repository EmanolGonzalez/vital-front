import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, 
  Heart, 
  Activity, 
  Timer,
  TrendingUp,
  Play,
  CheckCircle2,
  Calendar
} from "lucide-react";

export const EntrenamientoIntegral = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-primary/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-primary" />
            Entrenamiento Integral
          </CardTitle>
          <CardDescription>
            Rutinas personalizadas con monitoreo HRV y objetivos semanales
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progreso Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Sesiones Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">4/5</p>
              <p className="text-sm text-muted-foreground mb-4">Esta semana</p>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              HRV Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">58 ms</p>
              <p className="text-sm text-muted-foreground mb-4">
                <TrendingUp className="w-4 h-4 inline text-success" /> +12% vs mes anterior
              </p>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Calorías Quemadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">2,840</p>
              <p className="text-sm text-muted-foreground mb-4">Esta semana</p>
              <Progress value={95} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rutina de Hoy */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rutina de Hoy</CardTitle>
              <CardDescription>Lunes - Fuerza + Cardio HIIT</CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent">
              45 minutos
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              exercise: "Calentamiento dinámico",
              duration: "5 min",
              completed: true
            },
            {
              exercise: "Sentadillas con peso",
              sets: "4 x 12 reps",
              completed: true
            },
            {
              exercise: "Press de banca",
              sets: "4 x 10 reps",
              completed: true
            },
            {
              exercise: "Peso muerto rumano",
              sets: "3 x 12 reps",
              completed: false
            },
            {
              exercise: "HIIT - Intervalos",
              duration: "15 min",
              completed: false
            },
            {
              exercise: "Estiramiento",
              duration: "5 min",
              completed: false
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                item.completed ? 'bg-success/10' : 'bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                )}
                <div>
                  <p className="font-semibold">{item.exercise}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.sets || item.duration}
                  </p>
                </div>
              </div>
              {!item.completed && (
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </Button>
              )}
            </div>
          ))}

          <Button className="w-full bg-gradient-to-r from-primary to-accent mt-4">
            <Play className="w-4 h-4 mr-2" />
            Continuar Rutina
          </Button>
        </CardContent>
      </Card>

      {/* Calendario Semanal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Plan Semanal
          </CardTitle>
          <CardDescription>
            Tu programa de entrenamiento personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {[
              { day: "Lun", type: "Fuerza + HIIT", completed: true },
              { day: "Mar", type: "Cardio Moderado", completed: true },
              { day: "Mié", type: "Fuerza Upper", completed: true },
              { day: "Jue", type: "Yoga + Movilidad", completed: true },
              { day: "Vie", type: "Fuerza Lower", completed: false, active: true },
              { day: "Sáb", type: "Cardio LISS", completed: false },
              { day: "Dom", type: "Descanso Activo", completed: false }
            ].map((day, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg text-center ${
                  day.completed 
                    ? 'bg-success/10 border-2 border-success/20' 
                    : day.active
                    ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary'
                    : 'bg-muted'
                }`}
              >
                <p className="font-bold mb-1">{day.day}</p>
                <p className="text-xs text-muted-foreground mb-2">{day.type}</p>
                {day.completed && (
                  <CheckCircle2 className="w-4 h-4 mx-auto text-success" />
                )}
                {day.active && (
                  <Badge variant="outline" className="text-xs">Hoy</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoreo HRV */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Monitoreo HRV - Últimos 7 días
          </CardTitle>
          <CardDescription>
            Variabilidad del ritmo cardíaco como indicador de recuperación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted/50 rounded-lg flex items-end justify-around p-4">
            {[52, 48, 55, 58, 62, 60, 58].map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="w-12 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:shadow-gold"
                  style={{ height: `${value * 2}px` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                </span>
                <span className="text-xs font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-primary/5 rounded-lg">
            <p className="text-sm">
              <strong className="text-primary">Recomendación IA:</strong> Tu HRV muestra una recuperación óptima. 
              Puedes mantener la intensidad de entrenamientos esta semana.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Objetivos Semanales */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Objetivos de la Semana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">5 sesiones de entrenamiento</span>
            <div className="flex items-center gap-2">
              <Progress value={80} className="w-24 h-2" />
              <span className="text-sm font-semibold">4/5</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">10,000 pasos diarios</span>
            <div className="flex items-center gap-2">
              <Progress value={85} className="w-24 h-2" />
              <span className="text-sm font-semibold">8.5k avg</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">3 sesiones de movilidad</span>
            <div className="flex items-center gap-2">
              <Progress value={100} className="w-24 h-2" />
              <span className="text-sm font-semibold">3/3</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
