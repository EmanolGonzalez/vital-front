import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Pill, 
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export const SuplementacionInteligente = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-primary/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Suplementación Inteligente
          </CardTitle>
          <CardDescription>
            Línea Ilumina Vital y recomendaciones personalizadas basadas en tus biomarcadores
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Plan Actual */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tu Plan de Suplementación</CardTitle>
              <CardDescription>Personalizado según análisis de biomarcadores</CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent">Activo</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              name: "Ilumina Vital Omega-3 Plus",
              dosage: "2 cápsulas / día",
              time: "Con desayuno",
              completed: true,
              purpose: "Antiinflamatorio, salud cardiovascular"
            },
            {
              name: "Ilumina Vital NAD+ Boost",
              dosage: "1 cápsula / día",
              time: "En ayunas",
              completed: true,
              purpose: "Energía celular, longevidad"
            },
            {
              name: "Ilumina Vital Multivitamínico Premium",
              dosage: "1 cápsula / día",
              time: "Con comida",
              completed: false,
              purpose: "Nutrición completa"
            },
            {
              name: "Ilumina Vital Probiótico Advanced",
              dosage: "1 cápsula / día",
              time: "Antes de dormir",
              completed: false,
              purpose: "Salud intestinal, inmunidad"
            },
            {
              name: "Ilumina Vital Magnesio Complejo",
              dosage: "2 cápsulas / día",
              time: "Con cena",
              completed: false,
              purpose: "Recuperación, sueño, energía"
            }
          ].map((supp, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                supp.completed ? 'bg-success/10 border-2 border-success/20' : 'bg-background border-2 border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {supp.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Pill className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="font-semibold">{supp.name}</p>
                    <p className="text-sm text-muted-foreground">{supp.purpose}</p>
                  </div>
                </div>
              </div>
              <div className="ml-8 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Dosis: </span>
                  <span className="font-semibold">{supp.dosage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Horario: </span>
                  <span className="font-semibold">{supp.time}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <Button className="w-full bg-gradient-to-r from-primary to-accent">
              <Clock className="w-4 h-4 mr-2" />
              Marcar Tomas Completadas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Productos Línea Ilumina Vital */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Línea Ilumina Vital</h3>
          <p className="text-muted-foreground">
            Suplementos de grado farmacéutico diseñados para longevidad y vitalidad óptima
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "NAD+ Boost",
              price: "$89.90",
              description: "Nicotinamida Riboside 300mg",
              benefits: "Energía mitocondrial, anti-aging"
            },
            {
              name: "Omega-3 Plus",
              price: "$54.90",
              description: "EPA/DHA 2000mg + Astaxantina",
              benefits: "Salud cardiovascular y cerebral"
            },
            {
              name: "Resveratrol Premium",
              price: "$69.90",
              description: "Trans-resveratrol 500mg",
              benefits: "Activación de sirtuinas, longevidad"
            },
            {
              name: "Multivitamínico Premium",
              price: "$49.90",
              description: "26 nutrientes esenciales",
              benefits: "Nutrición completa diaria"
            },
            {
              name: "Probiótico Advanced",
              price: "$59.90",
              description: "15 cepas, 50 billones UFC",
              benefits: "Microbioma saludable"
            },
            {
              name: "Magnesio Complejo",
              price: "$39.90",
              description: "7 formas de magnesio",
              benefits: "Energía, sueño, recuperación"
            }
          ].map((product, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Beneficios:</strong> {product.benefits}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Badge variant="outline">30 días</Badge>
                </div>
                <Button variant="outline" className="w-full group hover:bg-primary hover:text-primary-foreground">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Añadir al Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recomendaciones Basadas en Biomarcadores */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Recomendaciones IA - Basadas en tus Biomarcadores</CardTitle>
          <CardDescription>
            Sugerencias personalizadas según tu último análisis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Aumentar Omega-3</p>
              <p className="text-sm text-muted-foreground">
                Tu Omega-3 Index está en 6.8%. Se recomienda alcanzar más de 8% para protección cardiovascular óptima. 
                Considera aumentar a 3g diarios de EPA/DHA.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-success/5 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-success mt-1" />
            <div>
              <p className="font-semibold">Vitamina D en rango óptimo</p>
              <p className="text-sm text-muted-foreground">
                Tu nivel de 52 ng/mL es excelente. Mantén la suplementación actual de 5,000 UI diarias.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Considerar CoQ10</p>
              <p className="text-sm text-muted-foreground">
                Basado en tu edad y perfil de actividad, CoQ10 (200mg) podría beneficiar tu energía mitocondrial 
                y recuperación post-entrenamiento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
