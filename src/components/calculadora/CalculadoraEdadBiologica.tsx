import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  Heart, 
  Brain, 
  Apple, 
  Moon, 
  Cigarette,
  Wine,
  Dumbbell,
  TrendingDown,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  Target
} from "lucide-react";

interface BiologicalAgeResult {
  biologicalAge: number;
  chronologicalAge: number;
  difference: number;
  recommendations: string[];
  score: number;
  category: string;
}

export const CalculadoraEdadBiologica = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<BiologicalAgeResult | null>(null);
  
  const [formData, setFormData] = useState({
    // Datos básicos
    age: 35,
    gender: "",
    weight: 70,
    height: 170,
    
    // Estilo de vida
    exercise: "", // nunca, ocasional, regular, intenso
    sleep: 7,
    stress: 5, // 1-10
    smoking: "", // nunca, ex-fumador, actual
    alcohol: "", // nunca, ocasional, regular, excesivo
    
    // Nutrición
    diet: "", // occidental, mediterranea, vegetariana, cetogenica
    vegetables: 3, // porciones por día
    processedFood: 2, // veces por semana
    
    // Salud
    chronicDiseases: [],
    medication: "",
    lastCheckup: "",
    
    // Bienestar mental
    happiness: 7, // 1-10
    socialConnections: 8, // 1-10
    purposeInLife: 8, // 1-10
  });

  const calculateBiologicalAge = (): BiologicalAgeResult => {
    let score = 100; // Base score
    const age = formData.age;
    
    // Exercise factor
    const exerciseFactors = {
      "nunca": -15,
      "ocasional": -5,
      "regular": +10,
      "intenso": +15
    };
    score += exerciseFactors[formData.exercise as keyof typeof exerciseFactors] || 0;
    
    // Sleep factor (optimal 7-8 hours)
    const sleepDiff = Math.abs(formData.sleep - 7.5);
    score -= sleepDiff * 3;
    
    // Stress factor (1-10, lower is better)
    score -= (formData.stress - 1) * 2;
    
    // Smoking factor
    const smokingFactors = {
      "nunca": +10,
      "ex-fumador": 0,
      "actual": -20
    };
    score += smokingFactors[formData.smoking as keyof typeof smokingFactors] || 0;
    
    // Alcohol factor
    const alcoholFactors = {
      "nunca": +5,
      "ocasional": +2,
      "regular": -5,
      "excesivo": -15
    };
    score += alcoholFactors[formData.alcohol as keyof typeof alcoholFactors] || 0;
    
    // Diet factor
    const dietFactors = {
      "occidental": -5,
      "mediterranea": +10,
      "vegetariana": +8,
      "cetogenica": +5
    };
    score += dietFactors[formData.diet as keyof typeof dietFactors] || 0;
    
    // Vegetables (optimal 5+ per day)
    score += Math.min(formData.vegetables * 2, 10);
    
    // Processed food (less is better)
    score -= formData.processedFood * 2;
    
    // Mental wellbeing factors
    score += (formData.happiness - 5) * 2;
    score += (formData.socialConnections - 5) * 1.5;
    score += (formData.purposeInLife - 5) * 1.5;
    
    // BMI calculation
    const bmi = formData.weight / ((formData.height / 100) ** 2);
    const optimalBMI = 22;
    const bmiDiff = Math.abs(bmi - optimalBMI);
    score -= bmiDiff * 2;
    
    // Convert score to age modifier
    const ageModifier = (100 - score) * 0.3;
    const biologicalAge = Math.max(18, Math.round(age + ageModifier));
    const difference = age - biologicalAge;
    
    // Generate recommendations
    const recommendations = [];
    if (formData.exercise === "nunca" || formData.exercise === "ocasional") {
      recommendations.push("Incrementa tu actividad física a 150 min/semana mínimo");
    }
    if (formData.sleep < 7 || formData.sleep > 9) {
      recommendations.push("Optimiza tu sueño entre 7-8 horas diarias");
    }
    if (formData.stress > 6) {
      recommendations.push("Implementa técnicas de manejo del estrés como meditación");
    }
    if (formData.smoking === "actual") {
      recommendations.push("Considera un programa para dejar de fumar");
    }
    if (formData.vegetables < 5) {
      recommendations.push("Aumenta el consumo de vegetales a 5+ porciones diarias");
    }
    if (formData.processedFood > 3) {
      recommendations.push("Reduce el consumo de alimentos procesados");
    }
    
    // Determine category
    let category = "";
    if (difference > 5) category = "Excepcional";
    else if (difference > 0) category = "Saludable";
    else if (difference > -5) category = "Promedio";
    else category = "Necesita Mejoras";
    
    return {
      biologicalAge,
      chronologicalAge: age,
      difference,
      recommendations,
      score: Math.max(0, Math.min(100, score)),
      category
    };
  };

  const handleSubmit = () => {
    const result = calculateBiologicalAge();
    setResults(result);
    
    toast({
      title: "¡Análisis Completado! 🎉",
      description: `Tu edad biológica es ${result.biologicalAge} años (${result.difference > 0 ? '-' : '+'}${Math.abs(result.difference)} años vs cronológica)`,
    });
  };

  const resetCalculator = () => {
    setStep(1);
    setResults(null);
    setFormData({
      age: 35,
      gender: "",
      weight: 70,
      height: 170,
      exercise: "",
      sleep: 7,
      stress: 5,
      smoking: "",
      alcohol: "",
      diet: "",
      vegetables: 3,
      processedFood: 2,
      chronicDiseases: [],
      medication: "",
      lastCheckup: "",
      happiness: 7,
      socialConnections: 8,
      purposeInLife: 8,
    });
  };

  if (results) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-hero border border-primary/20 shadow-elegant">
          <CardContent className="p-8 text-center">
            <Badge variant="secondary" className="mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              Resultados del Análisis
            </Badge>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Edad Cronológica</h3>
                <div className="text-3xl font-bold">{results.chronologicalAge}</div>
                <p className="text-sm text-muted-foreground">años</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Edad Biológica</h3>
                <div className="text-4xl font-bold text-primary">{results.biologicalAge}</div>
                <p className="text-sm text-muted-foreground">años</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Diferencia</h3>
                <div className={`text-3xl font-bold flex items-center justify-center ${
                  results.difference > 0 ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {results.difference > 0 ? (
                    <TrendingDown className="w-6 h-6 mr-2" />
                  ) : (
                    <TrendingUp className="w-6 h-6 mr-2" />
                  )}
                  {results.difference > 0 ? '-' : '+'}
                  {Math.abs(results.difference)}
                </div>
                <p className="text-sm text-muted-foreground">años</p>
              </div>
            </div>
            
            <Badge 
              variant={results.difference > 5 ? "default" : results.difference > 0 ? "secondary" : "destructive"}
              className="text-base px-4 py-2"
            >
              {results.category}
            </Badge>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="shadow-soft border-none bg-cream-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Puntuación de Salud: {results.score.toFixed(0)}/100
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-gold h-4 rounded-full transition-all duration-1000"
                style={{ width: `${results.score}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Una puntuación más alta indica mejores hábitos de salud y longevidad.
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-soft border-none bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Recomendaciones Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-foreground text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline"
            onClick={resetCalculator}
            className="flex items-center"
          >
            <Clock className="w-4 h-4 mr-2" />
            Repetir Análisis
          </Button>
          <Button 
            className="bg-gradient-gold text-primary-foreground hover:shadow-gold flex items-center"
          >
            <Heart className="w-4 h-4 mr-2" />
            Consulta Personalizada
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          <Activity className="w-4 h-4 mr-2" />
          Calculadora de Edad Biológica
        </Badge>
        <h2 className="text-3xl font-bold mb-2">
          Descubre tu <span className="text-primary">Edad Real</span>
        </h2>
        <p className="text-muted-foreground">
          Análisis científico basado en tu estilo de vida, salud y bienestar
        </p>
      </div>

      <Card className="shadow-soft border-none bg-cream-card">
        <CardContent className="p-8">
          {/* Step 1: Datos Básicos */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Información Básica</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Edad Cronológica</Label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                    min="18"
                    max="100"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Género</Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masculino" id="masculino" />
                      <Label htmlFor="masculino">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="femenino" id="femenino" />
                      <Label htmlFor="femenino">Femenino</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                    min="30"
                    max="200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Altura (cm)</Label>
                  <Input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})}
                    min="100"
                    max="250"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Estilo de Vida */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Dumbbell className="w-5 h-5 mr-2 text-primary" />
                Estilo de Vida
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Ejercicio Regular</Label>
                  <RadioGroup 
                    value={formData.exercise} 
                    onValueChange={(value) => setFormData({...formData, exercise: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nunca" id="nunca" />
                      <Label htmlFor="nunca">Nunca o muy rara vez</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ocasional" id="ocasional" />
                      <Label htmlFor="ocasional">1-2 veces por semana</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">3-4 veces por semana</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intenso" id="intenso" />
                      <Label htmlFor="intenso">5+ veces por semana</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center">
                    <Moon className="w-4 h-4 mr-2" />
                    Horas de sueño por noche: {formData.sleep}h
                  </Label>
                  <Slider
                    value={[formData.sleep]}
                    onValueChange={(value) => setFormData({...formData, sleep: value[0]})}
                    max={12}
                    min={4}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Nivel de estrés (1-10): {formData.stress}
                  </Label>
                  <Slider
                    value={[formData.stress]}
                    onValueChange={(value) => setFormData({...formData, stress: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center">
                    <Cigarette className="w-4 h-4 mr-2" />
                    Hábito de fumar
                  </Label>
                  <RadioGroup 
                    value={formData.smoking} 
                    onValueChange={(value) => setFormData({...formData, smoking: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nunca" id="smoke-nunca" />
                      <Label htmlFor="smoke-nunca">Nunca he fumado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ex-fumador" id="ex-fumador" />
                      <Label htmlFor="ex-fumador">Ex-fumador (dejé hace +1 año)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="actual" id="actual" />
                      <Label htmlFor="actual">Fumador actual</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center">
                    <Wine className="w-4 h-4 mr-2" />
                    Consumo de alcohol
                  </Label>
                  <RadioGroup 
                    value={formData.alcohol} 
                    onValueChange={(value) => setFormData({...formData, alcohol: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nunca" id="alcohol-nunca" />
                      <Label htmlFor="alcohol-nunca">No bebo alcohol</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ocasional" id="alcohol-ocasional" />
                      <Label htmlFor="alcohol-ocasional">Ocasional (1-2 copas/semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="alcohol-regular" />
                      <Label htmlFor="alcohol-regular">Regular (3-7 copas/semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excesivo" id="alcohol-excesivo" />
                      <Label htmlFor="alcohol-excesivo">Más de 7 copas/semana</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Nutrición y Bienestar */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Apple className="w-5 h-5 mr-2 text-primary" />
                Nutrición y Bienestar Mental
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Tipo de dieta principal</Label>
                  <RadioGroup 
                    value={formData.diet} 
                    onValueChange={(value) => setFormData({...formData, diet: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occidental" id="occidental" />
                      <Label htmlFor="occidental">Occidental (procesados, carnes, lácteos)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mediterranea" id="mediterranea" />
                      <Label htmlFor="mediterranea">Mediterránea (pescado, aceite oliva, vegetales)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetariana" id="vegetariana" />
                      <Label htmlFor="vegetariana">Vegetariana/Vegana</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cetogenica" id="cetogenica" />
                      <Label htmlFor="cetogenica">Cetogénica/Baja en carbohidratos</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Porciones de vegetales/frutas por día: {formData.vegetables}</Label>
                  <Slider
                    value={[formData.vegetables]}
                    onValueChange={(value) => setFormData({...formData, vegetables: value[0]})}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Comida procesada/fast food por semana: {formData.processedFood}</Label>
                  <Slider
                    value={[formData.processedFood]}
                    onValueChange={(value) => setFormData({...formData, processedFood: value[0]})}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Nivel de felicidad general (1-10): {formData.happiness}</Label>
                  <Slider
                    value={[formData.happiness]}
                    onValueChange={(value) => setFormData({...formData, happiness: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Conexiones sociales (1-10): {formData.socialConnections}</Label>
                  <Slider
                    value={[formData.socialConnections]}
                    onValueChange={(value) => setFormData({...formData, socialConnections: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Sentido de propósito en la vida (1-10): {formData.purposeInLife}</Label>
                  <Slider
                    value={[formData.purposeInLife]}
                    onValueChange={(value) => setFormData({...formData, purposeInLife: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-8 border-t border-border mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Anterior
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!formData.gender || !formData.age)) ||
                  (step === 2 && (!formData.exercise || !formData.smoking || !formData.alcohol))
                }
                className="bg-gradient-gold text-primary-foreground hover:shadow-gold"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.diet}
                className="bg-gradient-gold text-primary-foreground hover:shadow-gold"
              >
                <Activity className="w-4 h-4 mr-2" />
                Calcular Edad Biológica
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};