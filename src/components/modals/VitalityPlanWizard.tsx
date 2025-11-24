import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Activity, 
  Droplet, 
  Heart, 
  Apple, 
  Utensils,
  Dumbbell,
  Pill,
  Brain,
  Target,
  Save
} from "lucide-react";
import { mockPatients, mockTreatments } from "@/data/mockData";
import { toast } from "sonner";

interface VitalityPlanWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VitalityPlanWizard({ open, onOpenChange }: VitalityPlanWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Datos del plan
  const [planData, setPlanData] = useState({
    // Paso 1: Paciente y tipo
    patientId: "",
    planType: "",
    
    // Paso 2: Analíticas básicas
    weight: "",
    height: "",
    bloodPressure: "",
    heartRate: "",
    bodyFat: "",
    muscleMass: "",
    
    // Paso 3: Oligoelementos
    vitamin_d: "",
    vitamin_b12: "",
    iron: "",
    magnesium: "",
    omega3: "",
    
    // Paso 4: Perfil del paciente
    lifestyle: "",
    sleepHours: "",
    stressLevel: "",
    activityLevel: "",
    goals: "",
    
    // Paso 5: Preferencias alimentarias
    dietType: "",
    allergies: [] as string[],
    foodPreferences: "",
    mealsPerDay: "",
    
    // Paso 6: Plan de nutrición
    dailyCalories: "",
    proteins: "",
    carbs: "",
    fats: "",
    
    // Paso 7: Plan de entrenamiento
    weeklyGoal: "",
    trainingType: [] as string[],
    
    // Paso 8: Suplementación
    supplements: [] as Array<{ name: string; dosage: string; time: string }>,
    
    // Paso 9: Epigenética
    mindfulnessMinutes: "",
    purposeActivities: "",
    stressManagement: "",
    
    // Paso 10: Notas finales
    notes: ""
  });

  const selectedPatient = mockPatients.find(p => p.id === planData.patientId);
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    toast.success("Plan de Vitalidad creado exitosamente");
    onOpenChange(false);
    // Aquí se guardaría en la base de datos
  };

  const updatePlanData = (field: string, value: any) => {
    setPlanData({ ...planData, [field]: value });
  };

  const addSupplement = () => {
    setPlanData({
      ...planData,
      supplements: [...planData.supplements, { name: "", dosage: "", time: "" }]
    });
  };

  const updateSupplement = (index: number, field: string, value: string) => {
    const newSupplements = [...planData.supplements];
    newSupplements[index] = { ...newSupplements[index], [field]: value };
    setPlanData({ ...planData, supplements: newSupplements });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Selección de Paciente</h3>
              <p className="text-muted-foreground">Elige el paciente y tipo de plan</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Paciente</Label>
                <Select value={planData.patientId} onValueChange={(value) => updatePlanData("patientId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tipo de Plan</Label>
                <Select value={planData.planType} onValueChange={(value) => updatePlanData("planType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo de plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rejuvenecimiento">Plan Rejuvenecimiento Integral</SelectItem>
                    <SelectItem value="energia">Plan Energía & Rendimiento</SelectItem>
                    <SelectItem value="equilibrio">Plan Equilibrio Hormonal</SelectItem>
                    <SelectItem value="longevidad">Plan Longevidad Activa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedPatient && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold">
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{selectedPatient.name}</h4>
                        <p className="text-sm text-muted-foreground">Última visita: {selectedPatient.lastVisit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Activity className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Analíticas Básicas</h3>
              <p className="text-muted-foreground">Datos antropométricos y biomarcadores</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Peso (kg)</Label>
                <Input 
                  type="number" 
                  value={planData.weight}
                  onChange={(e) => updatePlanData("weight", e.target.value)}
                  placeholder="70"
                />
              </div>
              <div>
                <Label>Altura (cm)</Label>
                <Input 
                  type="number" 
                  value={planData.height}
                  onChange={(e) => updatePlanData("height", e.target.value)}
                  placeholder="170"
                />
              </div>
              <div>
                <Label>Tensión Arterial</Label>
                <Input 
                  value={planData.bloodPressure}
                  onChange={(e) => updatePlanData("bloodPressure", e.target.value)}
                  placeholder="120/80"
                />
              </div>
              <div>
                <Label>Frecuencia Cardíaca</Label>
                <Input 
                  type="number" 
                  value={planData.heartRate}
                  onChange={(e) => updatePlanData("heartRate", e.target.value)}
                  placeholder="70"
                />
              </div>
              <div>
                <Label>% Grasa Corporal</Label>
                <Input 
                  type="number" 
                  value={planData.bodyFat}
                  onChange={(e) => updatePlanData("bodyFat", e.target.value)}
                  placeholder="20"
                />
              </div>
              <div>
                <Label>Masa Muscular (kg)</Label>
                <Input 
                  type="number" 
                  value={planData.muscleMass}
                  onChange={(e) => updatePlanData("muscleMass", e.target.value)}
                  placeholder="45"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Droplet className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Oligoelementos</h3>
              <p className="text-muted-foreground">Análisis de micronutrientes</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vitamina D (ng/mL)</Label>
                <Input 
                  type="number" 
                  value={planData.vitamin_d}
                  onChange={(e) => updatePlanData("vitamin_d", e.target.value)}
                  placeholder="30"
                />
              </div>
              <div>
                <Label>Vitamina B12 (pg/mL)</Label>
                <Input 
                  type="number" 
                  value={planData.vitamin_b12}
                  onChange={(e) => updatePlanData("vitamin_b12", e.target.value)}
                  placeholder="400"
                />
              </div>
              <div>
                <Label>Hierro (μg/dL)</Label>
                <Input 
                  type="number" 
                  value={planData.iron}
                  onChange={(e) => updatePlanData("iron", e.target.value)}
                  placeholder="100"
                />
              </div>
              <div>
                <Label>Magnesio (mg/dL)</Label>
                <Input 
                  type="number" 
                  value={planData.magnesium}
                  onChange={(e) => updatePlanData("magnesium", e.target.value)}
                  placeholder="2.0"
                />
              </div>
              <div>
                <Label>Omega 3 Index (%)</Label>
                <Input 
                  type="number" 
                  value={planData.omega3}
                  onChange={(e) => updatePlanData("omega3", e.target.value)}
                  placeholder="8"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Perfil del Paciente</h3>
              <p className="text-muted-foreground">Estilo de vida y objetivos</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Estilo de Vida</Label>
                <Select value={planData.lifestyle} onValueChange={(value) => updatePlanData("lifestyle", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentario</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="muy-activo">Muy Activo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Horas de Sueño</Label>
                <Input 
                  type="number" 
                  value={planData.sleepHours}
                  onChange={(e) => updatePlanData("sleepHours", e.target.value)}
                  placeholder="7-8"
                />
              </div>

              <div>
                <Label>Nivel de Estrés (1-10)</Label>
                <Input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={planData.stressLevel}
                  onChange={(e) => updatePlanData("stressLevel", e.target.value)}
                  placeholder="5"
                />
              </div>

              <div>
                <Label>Nivel de Actividad</Label>
                <Select value={planData.activityLevel} onValueChange={(value) => updatePlanData("activityLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bajo">Bajo (1-2 días/semana)</SelectItem>
                    <SelectItem value="medio">Medio (3-4 días/semana)</SelectItem>
                    <SelectItem value="alto">Alto (5+ días/semana)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Objetivos Principales</Label>
                <Textarea 
                  value={planData.goals}
                  onChange={(e) => updatePlanData("goals", e.target.value)}
                  placeholder="Ej: Mejorar energía, reducir peso, optimizar rendimiento..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Apple className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Preferencias Alimentarias</h3>
              <p className="text-muted-foreground">Restricciones y gustos</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Tipo de Dieta</Label>
                <Select value={planData.dietType} onValueChange={(value) => updatePlanData("dietType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivora">Omnívora</SelectItem>
                    <SelectItem value="vegetariana">Vegetariana</SelectItem>
                    <SelectItem value="vegana">Vegana</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="mediterranea">Mediterránea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Alergias e Intolerancias</Label>
                <div className="space-y-2">
                  {["Lactosa", "Gluten", "Frutos Secos", "Mariscos", "Huevo"].map(allergen => (
                    <div key={allergen} className="flex items-center space-x-2">
                      <Checkbox 
                        checked={planData.allergies.includes(allergen)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updatePlanData("allergies", [...planData.allergies, allergen]);
                          } else {
                            updatePlanData("allergies", planData.allergies.filter(a => a !== allergen));
                          }
                        }}
                      />
                      <label className="text-sm">{allergen}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferencias Alimentarias</Label>
                <Textarea 
                  value={planData.foodPreferences}
                  onChange={(e) => updatePlanData("foodPreferences", e.target.value)}
                  placeholder="Alimentos favoritos, aversiones, etc..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Comidas al Día</Label>
                <Select value={planData.mealsPerDay} onValueChange={(value) => updatePlanData("mealsPerDay", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 comidas</SelectItem>
                    <SelectItem value="4">4 comidas</SelectItem>
                    <SelectItem value="5">5 comidas</SelectItem>
                    <SelectItem value="6">6 comidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Utensils className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Plan de Nutrición</h3>
              <p className="text-muted-foreground">Macronutrientes y calorías</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Calorías Diarias</Label>
                <Input 
                  type="number" 
                  value={planData.dailyCalories}
                  onChange={(e) => updatePlanData("dailyCalories", e.target.value)}
                  placeholder="1800"
                />
              </div>
              <div>
                <Label>Proteínas (g)</Label>
                <Input 
                  type="number" 
                  value={planData.proteins}
                  onChange={(e) => updatePlanData("proteins", e.target.value)}
                  placeholder="120"
                />
              </div>
              <div>
                <Label>Carbohidratos (g)</Label>
                <Input 
                  type="number" 
                  value={planData.carbs}
                  onChange={(e) => updatePlanData("carbs", e.target.value)}
                  placeholder="180"
                />
              </div>
              <div>
                <Label>Grasas (g)</Label>
                <Input 
                  type="number" 
                  value={planData.fats}
                  onChange={(e) => updatePlanData("fats", e.target.value)}
                  placeholder="60"
                />
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Distribución de Macros</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proteínas: {planData.proteins}g</span>
                    <span>{planData.proteins ? Math.round((parseInt(planData.proteins) * 4 / (parseInt(planData.dailyCalories) || 1)) * 100) : 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Carbohidratos: {planData.carbs}g</span>
                    <span>{planData.carbs ? Math.round((parseInt(planData.carbs) * 4 / (parseInt(planData.dailyCalories) || 1)) * 100) : 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Grasas: {planData.fats}g</span>
                    <span>{planData.fats ? Math.round((parseInt(planData.fats) * 9 / (parseInt(planData.dailyCalories) || 1)) * 100) : 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Plan de Entrenamiento</h3>
              <p className="text-muted-foreground">Rutinas y objetivos físicos</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Sesiones Semanales</Label>
                <Select value={planData.weeklyGoal} onValueChange={(value) => updatePlanData("weeklyGoal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 sesiones</SelectItem>
                    <SelectItem value="3">3 sesiones</SelectItem>
                    <SelectItem value="4">4 sesiones</SelectItem>
                    <SelectItem value="5">5 sesiones</SelectItem>
                    <SelectItem value="6">6 sesiones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tipos de Entrenamiento</Label>
                <div className="space-y-2">
                  {["HIIT", "Fuerza", "Cardio", "Yoga", "Pilates", "Natación"].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        checked={planData.trainingType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updatePlanData("trainingType", [...planData.trainingType, type]);
                          } else {
                            updatePlanData("trainingType", planData.trainingType.filter(t => t !== type));
                          }
                        }}
                      />
                      <label className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Pill className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Suplementación</h3>
              <p className="text-muted-foreground">Complementos nutricionales</p>
            </div>

            <div className="space-y-4">
              {planData.supplements.map((supp, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label>Suplemento</Label>
                        <Input 
                          value={supp.name}
                          onChange={(e) => updateSupplement(index, "name", e.target.value)}
                          placeholder="Ej: Omega 3"
                        />
                      </div>
                      <div>
                        <Label>Dosis</Label>
                        <Input 
                          value={supp.dosage}
                          onChange={(e) => updateSupplement(index, "dosage", e.target.value)}
                          placeholder="Ej: 2 cápsulas"
                        />
                      </div>
                      <div>
                        <Label>Momento</Label>
                        <Input 
                          value={supp.time}
                          onChange={(e) => updateSupplement(index, "time", e.target.value)}
                          placeholder="Ej: Mañana"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button onClick={addSupplement} variant="outline" className="w-full">
                + Añadir Suplemento
              </Button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Epigenética y Propósito</h3>
              <p className="text-muted-foreground">Bienestar mental y emocional</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Minutos Diarios de Mindfulness</Label>
                <Input 
                  type="number" 
                  value={planData.mindfulnessMinutes}
                  onChange={(e) => updatePlanData("mindfulnessMinutes", e.target.value)}
                  placeholder="15"
                />
              </div>

              <div>
                <Label>Actividades de Propósito</Label>
                <Textarea 
                  value={planData.purposeActivities}
                  onChange={(e) => updatePlanData("purposeActivities", e.target.value)}
                  placeholder="Ej: Journaling, conexión con naturaleza, actividades creativas..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Técnicas de Gestión del Estrés</Label>
                <Textarea 
                  value={planData.stressManagement}
                  onChange={(e) => updatePlanData("stressManagement", e.target.value)}
                  placeholder="Ej: Respiración consciente, meditación, ejercicio..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">Revisión Final</h3>
              <p className="text-muted-foreground">Confirma y guarda el plan</p>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle>Resumen del Plan</CardTitle>
                <CardDescription>
                  {selectedPatient?.name} - {planData.planType}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Analíticas</p>
                    <p className="text-sm text-muted-foreground">{planData.weight}kg, {planData.height}cm</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nutrición</p>
                    <p className="text-sm text-muted-foreground">{planData.dailyCalories} kcal/día</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Entrenamiento</p>
                    <p className="text-sm text-muted-foreground">{planData.weeklyGoal} sesiones/semana</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Suplementos</p>
                    <p className="text-sm text-muted-foreground">{planData.supplements.length} productos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label>Notas Adicionales</Label>
              <Textarea 
                value={planData.notes}
                onChange={(e) => updatePlanData("notes", e.target.value)}
                placeholder="Observaciones, recomendaciones especiales..."
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6 text-primary" />
            Crear Plan de Vitalidad
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Paso {currentStep} de {totalSteps}</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <Badge 
                key={i} 
                variant={i + 1 === currentStep ? "default" : i + 1 < currentStep ? "secondary" : "outline"}
                className="text-xs"
              >
                {i + 1 < currentStep ? <Check className="h-3 w-3" /> : i + 1}
              </Badge>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            {currentStep === totalSteps ? (
              <Button onClick={handleSave} className="bg-gradient-gold">
                <Save className="h-4 w-4 mr-2" />
                Guardar Plan
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
