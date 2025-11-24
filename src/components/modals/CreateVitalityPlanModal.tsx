import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { mockPatients } from "@/data/mockData";
import { planTemplates } from "@/data/vitalityPlansData";
import { Apple, Dumbbell, Pill, Brain, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface CreateVitalityPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateVitalityPlanModal = ({ open, onOpenChange }: CreateVitalityPlanModalProps) => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const [planData, setPlanData] = useState({
    // Nutrition
    dailyCalories: 1800,
    proteins: 120,
    carbs: 180,
    fats: 60,
    
    // Training
    weeklyGoal: 5,
    
    // Supplements
    supplements: [] as string[],
    
    // Epigenetics
    mindfulnessMinutes: 15,
    
    // General
    notes: ""
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = planTemplates.find(t => t.id === templateId);
    
    // Auto-populate based on template
    if (template) {
      switch (template.category) {
        case "anti-aging":
          setPlanData({
            ...planData,
            dailyCalories: 1800,
            proteins: 130,
            carbs: 170,
            fats: 65,
            weeklyGoal: 5,
            mindfulnessMinutes: 20
          });
          break;
        case "performance":
          setPlanData({
            ...planData,
            dailyCalories: 2200,
            proteins: 150,
            carbs: 220,
            fats: 75,
            weeklyGoal: 6,
            mindfulnessMinutes: 10
          });
          break;
        case "hormonal":
          setPlanData({
            ...planData,
            dailyCalories: 1700,
            proteins: 110,
            carbs: 160,
            fats: 70,
            weeklyGoal: 4,
            mindfulnessMinutes: 25
          });
          break;
        case "longevity":
          setPlanData({
            ...planData,
            dailyCalories: 1600,
            proteins: 120,
            carbs: 150,
            fats: 60,
            weeklyGoal: 5,
            mindfulnessMinutes: 30
          });
          break;
      }
    }
  };

  const handleCreatePlan = () => {
    if (!selectedPatient) {
      toast.error("Por favor selecciona un paciente");
      return;
    }

    const patient = mockPatients.find(p => p.id === selectedPatient);
    
    toast.success(
      `Plan de Vitalidad creado exitosamente para ${patient?.name}`,
      {
        description: "El paciente recibirá una notificación y podrá ver su plan personalizado"
      }
    );
    
    onOpenChange(false);
    
    // Reset form
    setSelectedPatient("");
    setSelectedTemplate("");
    setCurrentStep(1);
    setPlanData({
      dailyCalories: 1800,
      proteins: 120,
      carbs: 180,
      fats: 60,
      weeklyGoal: 5,
      supplements: [],
      mindfulnessMinutes: 15,
      notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Crear Plan de Vitalidad
          </DialogTitle>
          <DialogDescription>
            Diseña un plan personalizado para tu paciente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Patient & Template Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Seleccionar Paciente</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un paciente..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Seleccionar Plantilla Base (Opcional)</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {planTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'border-primary shadow-md' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {selectedTemplate === template.id && (
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-semibold mb-1">{template.name}</div>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={() => setCurrentStep(2)}>
                  Siguiente: Configurar Plan
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Detailed Configuration */}
          {currentStep === 2 && (
            <Tabs defaultValue="nutrition" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="nutrition" className="flex items-center gap-2">
                  <Apple className="w-4 h-4" />
                  <span className="hidden md:inline">Nutrición</span>
                </TabsTrigger>
                <TabsTrigger value="training" className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span className="hidden md:inline">Entrenamiento</span>
                </TabsTrigger>
                <TabsTrigger value="supplements" className="flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  <span className="hidden md:inline">Suplementos</span>
                </TabsTrigger>
                <TabsTrigger value="epigenetics" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="hidden md:inline">Epigenética</span>
                </TabsTrigger>
              </TabsList>

              {/* Nutrition Configuration */}
              <TabsContent value="nutrition" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Calorías Diarias</Label>
                    <Input
                      type="number"
                      value={planData.dailyCalories}
                      onChange={(e) => setPlanData({...planData, dailyCalories: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proteínas (g)</Label>
                    <Input
                      type="number"
                      value={planData.proteins}
                      onChange={(e) => setPlanData({...planData, proteins: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Carbohidratos (g)</Label>
                    <Input
                      type="number"
                      value={planData.carbs}
                      onChange={(e) => setPlanData({...planData, carbs: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Grasas (g)</Label>
                    <Input
                      type="number"
                      value={planData.fats}
                      onChange={(e) => setPlanData({...planData, fats: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Training Configuration */}
              <TabsContent value="training" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Sesiones Semanales Objetivo</Label>
                  <Input
                    type="number"
                    value={planData.weeklyGoal}
                    onChange={(e) => setPlanData({...planData, weeklyGoal: Number(e.target.value)})}
                    min="1"
                    max="7"
                  />
                  <p className="text-sm text-muted-foreground">
                    Número de entrenamientos recomendados por semana
                  </p>
                </div>
              </TabsContent>

              {/* Supplements Configuration */}
              <TabsContent value="supplements" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label>Suplementos Recomendados</Label>
                  <p className="text-sm text-muted-foreground">
                    Selecciona de la línea Ilumina Vital
                  </p>
                  {/* This would be a more complex multi-select in production */}
                  <div className="p-4 bg-accent/10 rounded-lg text-sm text-muted-foreground">
                    Los suplementos se configurarán automáticamente según el perfil del paciente y biomarcadores
                  </div>
                </div>
              </TabsContent>

              {/* Epigenetics Configuration */}
              <TabsContent value="epigenetics" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Minutos Diarios de Mindfulness</Label>
                  <Input
                    type="number"
                    value={planData.mindfulnessMinutes}
                    onChange={(e) => setPlanData({...planData, mindfulnessMinutes: Number(e.target.value)})}
                    min="5"
                    max="60"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tiempo recomendado para prácticas de consciencia
                  </p>
                </div>
              </TabsContent>

              <div className="space-y-2 mt-6">
                <Label>Notas para el Paciente</Label>
                <Textarea
                  placeholder="Instrucciones especiales, consideraciones médicas, etc."
                  value={planData.notes}
                  onChange={(e) => setPlanData({...planData, notes: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Atrás
                </Button>
                <Button onClick={handleCreatePlan}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Crear Plan de Vitalidad
                </Button>
              </div>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
