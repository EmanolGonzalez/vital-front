import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target, 
  Trophy, 
  Flame, 
  Zap,
  Heart,
  Star,
  Gift,
  CheckCircle,
  Calendar,
  TrendingUp,
  Award,
  Sparkles,
  Clock,
  Book
} from "lucide-react";

export const PlanMotivacion = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([1, 3]);
  
  const currentLevel = {
    level: 7,
    title: "Transformador Avanzado",
    points: 2450,
    nextLevelPoints: 3000,
    progress: 82
  };

  const weeklyGoals = [
    {
      id: 1,
      title: "Completar 3 sesiones de ejercicio",
      completed: true,
      progress: 100,
      points: 50,
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Mantener 8 horas de sueño diarias",
      completed: false,
      progress: 71,
      points: 30,
      icon: <Heart className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Seguir plan nutricional",
      completed: true,
      progress: 100,
      points: 40,
      icon: <Target className="w-4 h-4" />
    },
    {
      id: 4,
      title: "Práctica de meditación (5 días)",
      completed: false,
      progress: 60,
      points: 25,
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Primera Semana Completa",
      description: "Completaste tu primera semana del programa",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      earned: true,
      date: "2024-02-01"
    },
    {
      id: 2,
      title: "Constancia de Hierro",
      description: "30 días consecutivos siguiendo el programa",
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      earned: true,
      date: "2024-02-28"
    },
    {
      id: 3,
      title: "Maestro del Sueño",
      description: "2 semanas manteniendo 8+ horas de sueño",
      icon: <Heart className="w-6 h-6 text-blue-500" />,
      earned: false,
      progress: 85
    },
    {
      id: 4,
      title: "Guerrero de la Salud",
      description: "Completar 50 entrenamientos",
      icon: <Zap className="w-6 h-6 text-green-500" />,
      earned: false,
      progress: 62
    },
    {
      id: 5,
      title: "Zen Master",
      description: "30 días de meditación consecutiva",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      earned: false,
      progress: 43
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Semana Detox",
      description: "7 días sin alimentos procesados",
      reward: "100 puntos + Badge exclusivo",
      difficulty: "Medio",
      duration: "7 días",
      completed: true,
      participants: 234
    },
    {
      id: 2,
      title: "Maratón de Bienestar",
      description: "21 días de rutina perfecta",
      reward: "250 puntos + Consulta gratuita",
      difficulty: "Alto",
      duration: "21 días",
      completed: false,
      participants: 89
    },
    {
      id: 3,
      title: "Hidratación Master",
      description: "2L de agua diarios por 14 días",
      reward: "75 puntos + Suplemento gratis",
      difficulty: "Fácil",
      duration: "14 días",
      completed: true,
      participants: 456
    },
    {
      id: 4,
      title: "Energía Natural",
      description: "10 días sin cafeína",
      reward: "125 puntos + Ebook exclusivo",
      difficulty: "Medio",
      duration: "10 días",
      completed: false,
      participants: 167
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Consulta Gratuita",
      points: 500,
      description: "Sesión de 30 min con especialista",
      available: true,
      claimed: false
    },
    {
      id: 2,
      title: "Descuento 20% Tratamiento",
      points: 800,
      description: "Válido para cualquier tratamiento",
      available: true,
      claimed: false
    },
    {
      id: 3,
      title: "Kit de Suplementos",
      points: 1200,
      description: "Pack personalizado de vitaminas",
      available: false,
      claimed: false
    },
    {
      id: 4,
      title: "Sesión VIP Gratuita",
      points: 1500,
      description: "Tratamiento premium completo",
      available: false,
      claimed: false
    }
  ];

  const tips = [
    {
      title: "Hidratación Matutina",
      content: "Bebe un vaso de agua nada más despertar para activar tu metabolismo",
      category: "Nutrición"
    },
    {
      title: "Respiración 4-7-8",
      content: "Técnica de relajación: inhala 4s, mantén 7s, exhala 8s",
      category: "Bienestar"
    },
    {
      title: "Ejercicio HIIT",
      content: "15 minutos de HIIT queman más grasa que 45 min de cardio tradicional",
      category: "Ejercicio"
    }
  ];

  const toggleChallenge = (challengeId: number) => {
    setCompletedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header - Level & Points */}
      <Card className="bg-gradient-hero border border-primary/20 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Plan de Motivación</h2>
              <p className="text-muted-foreground">Tu camino hacia la transformación total</p>
            </div>
            <Badge className="bg-gradient-gold text-primary-foreground text-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              Nivel {currentLevel.level}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{currentLevel.points}</div>
              <p className="text-sm text-muted-foreground">Puntos Totales</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{currentLevel.title}</div>
              <p className="text-sm text-muted-foreground">Nivel Actual</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{currentLevel.nextLevelPoints - currentLevel.points}</div>
              <p className="text-sm text-muted-foreground">Para siguiente nivel</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progreso al Nivel 8</span>
              <span className="text-sm text-muted-foreground">{currentLevel.progress}%</span>
            </div>
            <Progress value={currentLevel.progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <Card className="shadow-soft border-none bg-cream-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Objetivos Semanales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={goal.completed}
                      className="h-5 w-5"
                    />
                    <div className="flex items-center space-x-2">
                      {goal.icon}
                      <span className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {goal.title}
                      </span>
                    </div>
                  </div>
                  <Badge variant={goal.completed ? "default" : "outline"}>
                    +{goal.points} pts
                  </Badge>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{goal.progress}% completado</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-soft border-none bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary" />
              Logros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-4 p-3 rounded-lg ${
                achievement.earned ? 'bg-gradient-gold/20 border-2 border-primary/20' : 'bg-muted/50'
              }`}>
                <div className={achievement.earned ? 'text-primary' : 'text-muted-foreground'}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <Progress value={achievement.progress} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">{achievement.progress}%</p>
                    </div>
                  )}
                </div>
                {achievement.earned && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Challenges */}
      <Card className="shadow-soft border-none bg-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-primary" />
            Desafíos Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={`p-4 rounded-lg border-2 transition-all ${
                  completedChallenges.includes(challenge.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-muted hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <Badge variant={
                    challenge.difficulty === 'Fácil' ? 'default' :
                    challenge.difficulty === 'Medio' ? 'secondary' : 'destructive'
                  }>
                    {challenge.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{challenge.duration}</span>
                  </div>
                  <span>{challenge.participants} participantes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Gift className="w-4 h-4 inline mr-1 text-primary" />
                    {challenge.reward}
                  </div>
                  <Button
                    size="sm"
                    variant={completedChallenges.includes(challenge.id) ? "default" : "outline"}
                    onClick={() => toggleChallenge(challenge.id)}
                    disabled={completedChallenges.includes(challenge.id)}
                  >
                    {completedChallenges.includes(challenge.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completado
                      </>
                    ) : (
                      'Unirse'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rewards Store */}
        <Card className="shadow-soft border-none bg-cream-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="w-5 h-5 mr-2 text-primary" />
              Tienda de Recompensas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex-1">
                  <h4 className={`font-medium ${!reward.available ? 'text-muted-foreground' : ''}`}>
                    {reward.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{reward.points} puntos</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={reward.available ? "default" : "outline"}
                  disabled={!reward.available || currentLevel.points < reward.points}
                  className={reward.available ? "bg-gradient-gold text-primary-foreground" : ""}
                >
                  {reward.claimed ? 'Canjeado' : reward.available ? 'Canjear' : 'Bloqueado'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Tips */}
        <Card className="shadow-soft border-none bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2 text-primary" />
              Tips del Día
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="p-4 bg-gradient-cream rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{tip.title}</h4>
                  <Badge variant="outline">{tip.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};