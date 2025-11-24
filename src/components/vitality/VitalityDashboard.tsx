import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Apple, 
  Dumbbell, 
  Heart, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Zap,
  Brain,
  Droplet,
  Moon
} from "lucide-react";

export const VitalityDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Progreso de Edad Biológica */}
      <Card className="border-primary/20 shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Evolución de Edad Biológica
              </CardTitle>
              <CardDescription>
                Tu edad biológica vs cronológica en los últimos 6 meses
              </CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              -8 años
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Edad Cronológica</p>
                <p className="text-3xl font-bold text-foreground">40 años</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Edad Biológica</p>
                <p className="text-3xl font-bold text-primary">32 años</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Mejora</p>
                <p className="text-3xl font-bold text-success flex items-center justify-center gap-2">
                  <TrendingDown className="w-6 h-6" />
                  20%
                </p>
              </div>
            </div>

            {/* Gráfico de progreso simulado */}
            <div className="h-48 bg-muted/50 rounded-lg flex items-end justify-around p-4">
              {[65, 58, 52, 45, 38, 32].map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:shadow-gold"
                    style={{ height: `${value * 2}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    Mes {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-red-500" />
              Salud Cardiovascular
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">FC en reposo</span>
                <span className="font-semibold">62 bpm</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">HRV</span>
                <span className="font-semibold">58 ms</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Presión arterial</span>
                <span className="font-semibold">118/76</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Apple className="w-5 h-5 text-primary" />
              Nutrición Diaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calorías</span>
                <span className="font-semibold">1,850 / 2,100</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proteínas</span>
                <span className="font-semibold">145g / 160g</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hidratación</span>
                <span className="font-semibold">2.5L / 3L</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Dumbbell className="w-5 h-5 text-primary" />
              Actividad Física
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pasos diarios</span>
                <span className="font-semibold">8,432 / 10,000</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrenamientos</span>
                <span className="font-semibold">4 / 5 esta semana</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calorías quemadas</span>
                <span className="font-semibold">450 kcal hoy</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objetivos Semanales */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Objetivos de la Semana
          </CardTitle>
          <CardDescription>
            Progreso hacia tus metas personalizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Apple className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Seguir plan nutricional 7/7 días</p>
                  <p className="text-sm text-muted-foreground">6 de 7 días completados</p>
                </div>
              </div>
              <Progress value={86} className="w-24 h-2" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">5 sesiones de entrenamiento</p>
                  <p className="text-sm text-muted-foreground">4 de 5 completadas</p>
                </div>
              </div>
              <Progress value={80} className="w-24 h-2" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">3L agua diaria</p>
                  <p className="text-sm text-muted-foreground">2.5L promedio esta semana</p>
                </div>
              </div>
              <Progress value={83} className="w-24 h-2" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">7-8 horas de sueño</p>
                  <p className="text-sm text-muted-foreground">7.2h promedio</p>
                </div>
              </div>
              <Progress value={90} className="w-24 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones Personalizadas */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Recomendaciones IA
          </CardTitle>
          <CardDescription>
            Sugerencias personalizadas basadas en tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <Zap className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Aumenta tu ingesta de Omega-3</p>
              <p className="text-sm text-muted-foreground">
                Tus biomarcadores muestran niveles subóptimos. Considera agregar 2g diarios.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <TrendingUp className="w-5 h-5 text-success mt-1" />
            <div>
              <p className="font-semibold">Excelente adherencia al plan</p>
              <p className="text-sm text-muted-foreground">
                Has cumplido el 86% de tus objetivos. ¡Sigue así!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <Calendar className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Próximo análisis de biomarcadores</p>
              <p className="text-sm text-muted-foreground">
                Programa tu próximo test en 2 semanas para evaluar progreso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
