import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { mockVitalityPlans } from "@/data/vitalityPlansData";
import { 
  Sparkles, TrendingUp, Users, Activity, 
  Eye, BarChart3, Heart, Calendar 
} from "lucide-react";

export const VitalityPlansOverview = () => {
  const totalPlans = mockVitalityPlans.length;
  const activePlans = mockVitalityPlans.filter(p => p.status === 'active').length;
  const avgProgress = Math.round(
    mockVitalityPlans.reduce((sum, plan) => sum + plan.weeklyProgress, 0) / totalPlans
  );
  const avgBioAgeReduction = Math.round(
    mockVitalityPlans.reduce((sum, plan) => sum + (plan.chronologicalAge - plan.biologicalAge), 0) / totalPlans
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">{totalPlans}</div>
            <div className="text-sm text-muted-foreground">Planes Totales</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">{activePlans}</div>
            <div className="text-sm text-muted-foreground">Planes Activos</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold mb-1">{avgProgress}%</div>
            <div className="text-sm text-muted-foreground">Progreso Promedio</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold mb-1">-{avgBioAgeReduction} años</div>
            <div className="text-sm text-muted-foreground">Reducción Edad Bio.</div>
          </CardContent>
        </Card>
      </div>

      {/* Plans by Doctor */}
      <Card className="border-none shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Planes por Médico
          </CardTitle>
          <CardDescription>
            Resumen de actividad de cada médico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Group plans by doctor */}
            {Object.entries(
              mockVitalityPlans.reduce((acc, plan) => {
                if (!acc[plan.doctorId]) {
                  acc[plan.doctorId] = {
                    name: plan.doctorName,
                    plans: []
                  };
                }
                acc[plan.doctorId].plans.push(plan);
                return acc;
              }, {} as Record<string, { name: string; plans: typeof mockVitalityPlans }>)
            ).map(([doctorId, data]) => (
              <div key={doctorId} className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {data.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{data.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.plans.length} planes activos
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-lg">
                      {Math.round(data.plans.reduce((sum, p) => sum + p.weeklyProgress, 0) / data.plans.length)}%
                    </div>
                    <div className="text-muted-foreground">Progreso Promedio</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">
                      -{Math.round(data.plans.reduce((sum, p) => sum + (p.chronologicalAge - p.biologicalAge), 0) / data.plans.length)}
                    </div>
                    <div className="text-muted-foreground">Reducción Edad</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">
                      {data.plans.filter(p => p.status === 'active').length}
                    </div>
                    <div className="text-muted-foreground">Activos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Plans Detail */}
      <Card className="border-none shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Todos los Planes de Vitalidad
          </CardTitle>
          <CardDescription>
            Vista detallada de cada plan asignado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVitalityPlans.map((plan) => (
              <div key={plan.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-gold text-primary-foreground">
                        {plan.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{plan.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        Médico: {plan.doctorName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Creado: {new Date(plan.createdAt).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status === 'active' ? 'Activo' : plan.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="font-bold text-lg">{plan.biologicalAge}</div>
                    <div className="text-xs text-muted-foreground">Edad Biológica</div>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="font-bold text-lg text-green-600">
                      -{plan.chronologicalAge - plan.biologicalAge}
                    </div>
                    <div className="text-xs text-muted-foreground">Reducción</div>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="font-bold text-lg">{plan.energyLevel}%</div>
                    <div className="text-xs text-muted-foreground">Energía</div>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="font-bold text-lg">{plan.emotionalWellbeing}%</div>
                    <div className="text-xs text-muted-foreground">Bienestar</div>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="font-bold text-lg">{plan.weeklyProgress}%</div>
                    <div className="text-xs text-muted-foreground">Progreso</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Adherencia al Plan</span>
                    <span className="font-semibold">{plan.weeklyProgress}%</span>
                  </div>
                  <Progress value={plan.weeklyProgress} className="h-2" />
                </div>

                {plan.notes && (
                  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                    <span className="font-semibold text-blue-900">Notas: </span>
                    <span className="text-blue-800">{plan.notes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
