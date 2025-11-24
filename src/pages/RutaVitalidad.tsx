import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { 
  Activity, 
  Apple, 
  Dumbbell, 
  Heart, 
  Sparkles, 
  TrendingDown, 
  Zap,
  Brain,
  Target,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { VitalityDashboard } from "@/components/vitality/VitalityDashboard";
import { NutricionPersonalizada } from "@/components/vitality/NutricionPersonalizada";
import { EntrenamientoIntegral } from "@/components/vitality/EntrenamientoIntegral";
import { SuplementacionInteligente } from "@/components/vitality/SuplementacionInteligente";
import { EpigeneticaProposito } from "@/components/vitality/EpigeneticaProposito";
import { AIAssistant } from "@/components/vitality/AIAssistant";

const RutaVitalidad = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-cream">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ruta de Vitalidad
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tu camino personalizado hacia la longevidad, vitalidad y propósito vital mediante nutrición, 
              entrenamiento, suplementación y epigenética consciente.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Edad Biológica"
              value="32 años"
              description="8 años menos que cronológica"
              icon={<TrendingDown className="w-5 h-5" />}
              trend={{ value: -5, isPositive: true }}
              className="hover:shadow-elegant transition-shadow"
            />
            <StatCard
              title="Nivel de Energía"
              value="87%"
              description="Óptimo"
              icon={<Zap className="w-5 h-5" />}
              trend={{ value: 12, isPositive: true }}
              className="hover:shadow-elegant transition-shadow"
            />
            <StatCard
              title="Bienestar Emocional"
              value="92%"
              description="Excelente"
              icon={<Heart className="w-5 h-5" />}
              trend={{ value: 8, isPositive: true }}
              className="hover:shadow-elegant transition-shadow"
            />
            <StatCard
              title="Progreso Semanal"
              value="78%"
              description="En meta"
              icon={<Target className="w-5 h-5" />}
              trend={{ value: 15, isPositive: true }}
              className="hover:shadow-elegant transition-shadow"
            />
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-card border border-border">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="nutricion" className="flex items-center gap-2">
                <Apple className="w-4 h-4" />
                <span className="hidden md:inline">Nutrición</span>
              </TabsTrigger>
              <TabsTrigger value="entrenamiento" className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                <span className="hidden md:inline">Entrenamiento</span>
              </TabsTrigger>
              <TabsTrigger value="suplementacion" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden md:inline">Suplementación</span>
              </TabsTrigger>
              <TabsTrigger value="epigenetica" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span className="hidden md:inline">Epigenética</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <VitalityDashboard />
            </TabsContent>

            <TabsContent value="nutricion">
              <NutricionPersonalizada />
            </TabsContent>

            <TabsContent value="entrenamiento">
              <EntrenamientoIntegral />
            </TabsContent>

            <TabsContent value="suplementacion">
              <SuplementacionInteligente />
            </TabsContent>

            <TabsContent value="epigenetica">
              <EpigeneticaProposito />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant />

      <Footer />
    </div>
  );
};

export default RutaVitalidad;
