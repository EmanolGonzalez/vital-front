import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockVitalityPlans } from "@/data/vitalityPlansData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Heart, Apple, Dumbbell, Pill, Brain, TrendingUp, 
  Calendar, CheckCircle2, Clock, Target, Sparkles,
  MessageCircle, AlertCircle
} from "lucide-react";

export const MyVitalityPlan = () => {
  const { user } = useAuth();
  
  // Get the patient's vitality plan (using first plan for demo)
  const myPlan = mockVitalityPlans[0];

  if (!myPlan) {
    return (
      <Card className="border-none shadow-elegant">
        <CardContent className="p-12 text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No tienes un Plan de Vitalidad asignado</h3>
          <p className="text-muted-foreground mb-6">
            Habla con tu médico para crear tu plan personalizado
          </p>
          <Button>
            <MessageCircle className="w-4 h-4 mr-2" />
            Contactar Médico
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-none shadow-elegant bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Tu Ruta de Vitalidad</h2>
              </div>
              <p className="text-muted-foreground">
                Creado por {myPlan.doctorName} • {new Date(myPlan.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {myPlan.status === 'active' ? 'Activo' : myPlan.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-xl">
              <Heart className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{myPlan.biologicalAge} años</div>
              <div className="text-xs text-muted-foreground">Edad Biológica</div>
              <div className="text-xs text-green-600 font-medium mt-1">
                -{myPlan.chronologicalAge - myPlan.biologicalAge} años vs edad real
              </div>
            </div>
            
            <div className="text-center p-4 bg-background rounded-xl">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{myPlan.energyLevel}%</div>
              <div className="text-xs text-muted-foreground">Energía</div>
              <Progress value={myPlan.energyLevel} className="mt-2 h-1" />
            </div>
            
            <div className="text-center p-4 bg-background rounded-xl">
              <Brain className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{myPlan.emotionalWellbeing}%</div>
              <div className="text-xs text-muted-foreground">Bienestar Emocional</div>
              <Progress value={myPlan.emotionalWellbeing} className="mt-2 h-1" />
            </div>
            
            <div className="text-center p-4 bg-background rounded-xl">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{myPlan.weeklyProgress}%</div>
              <div className="text-xs text-muted-foreground">Progreso Semanal</div>
              <Progress value={myPlan.weeklyProgress} className="mt-2 h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="nutrition" className="flex flex-col gap-1 py-3">
            <Apple className="w-4 h-4" />
            <span className="text-xs">Nutrición</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex flex-col gap-1 py-3">
            <Dumbbell className="w-4 h-4" />
            <span className="text-xs">Entrenamiento</span>
          </TabsTrigger>
          <TabsTrigger value="supplements" className="flex flex-col gap-1 py-3">
            <Pill className="w-4 h-4" />
            <span className="text-xs">Suplementos</span>
          </TabsTrigger>
          <TabsTrigger value="epigenetics" className="flex flex-col gap-1 py-3">
            <Brain className="w-4 h-4" />
            <span className="text-xs">Epigenética</span>
          </TabsTrigger>
        </TabsList>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-4 mt-6">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-primary" />
                Plan Nutricional Personalizado
              </CardTitle>
              <CardDescription>Optimizado según tus biomarcadores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.nutritionPlan.dailyCalories}</div>
                  <div className="text-xs text-muted-foreground">Calorías/día</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.nutritionPlan.proteins}g</div>
                  <div className="text-xs text-muted-foreground">Proteínas</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.nutritionPlan.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbohidratos</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.nutritionPlan.fats}g</div>
                  <div className="text-xs text-muted-foreground">Grasas</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold mb-3">Comidas del Día</h4>
                {myPlan.nutritionPlan.meals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-muted-foreground">{meal.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{meal.calories} kcal</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-4 mt-6">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Rutina de Entrenamiento
              </CardTitle>
              <CardDescription>
                {myPlan.trainingPlan.sessionsCompleted} de {myPlan.trainingPlan.weeklyGoal} sesiones completadas esta semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(myPlan.trainingPlan.sessionsCompleted / myPlan.trainingPlan.weeklyGoal) * 100} className="mb-6" />
              
              <div className="space-y-3">
                {myPlan.trainingPlan.routines.map((routine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{routine.type}</div>
                        <div className="text-sm text-muted-foreground">{routine.day} • {routine.duration} min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={routine.intensity === 'Alta' ? 'default' : routine.intensity === 'Media' ? 'secondary' : 'outline'}>
                        {routine.intensity}
                      </Badge>
                      {index < myPlan.trainingPlan.sessionsCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplements Tab */}
        <TabsContent value="supplements" className="space-y-4 mt-6">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-primary" />
                Suplementación Inteligente
              </CardTitle>
              <CardDescription>Línea Ilumina Vital personalizada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myPlan.supplementsPlan.supplements.map((supplement, index) => (
                  <div key={index} className="p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-lg">{supplement.name}</div>
                        <div className="text-sm text-muted-foreground">{supplement.dosage} • {supplement.time}</div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      {supplement.purpose}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Epigenetics Tab */}
        <TabsContent value="epigenetics" className="space-y-4 mt-6">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Epigenética con Propósito
              </CardTitle>
              <CardDescription>Activa tus genes de longevidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.epigeneticsPlan.mindfulnessMinutes} min</div>
                  <div className="text-xs text-muted-foreground">Mindfulness Diario</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.epigeneticsPlan.purposeScore}%</div>
                  <div className="text-xs text-muted-foreground">Propósito Vital</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold">{myPlan.epigeneticsPlan.stressLevel}/10</div>
                  <div className="text-xs text-muted-foreground">Nivel de Estrés</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold mb-3">Recomendaciones Personalizadas</h4>
                {myPlan.epigeneticsPlan.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Doctor Notes */}
      {myPlan.notes && (
        <Card className="border-none shadow-soft bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-900 mb-1">Notas de tu Médico</div>
                <p className="text-sm text-blue-800">{myPlan.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
