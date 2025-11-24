import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Apple, 
  UtensilsCrossed, 
  Beaker, 
  TrendingUp,
  Clock,
  Flame,
  Heart,
  Plus
} from "lucide-react";

export const NutricionPersonalizada = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-primary/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="w-6 h-6 text-primary" />
            Nutrición Personalizada
          </CardTitle>
          <CardDescription>
            Plan nutricional adaptado a tu biotipo, metabolismo y objetivos de longevidad
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="plan">Mi Plan</TabsTrigger>
          <TabsTrigger value="recetas">Recetas</TabsTrigger>
          <TabsTrigger value="biomarcadores">Biomarcadores</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-6">
          {/* Plan Nutricional Actual */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plan Mediterráneo Longevidad</CardTitle>
                  <CardDescription>Personalizado para tu perfil epigenético</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent">Activo</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Macros del día */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold">2,100</p>
                  <p className="text-sm text-muted-foreground">Calorías</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">160g</p>
                  <p className="text-sm text-muted-foreground">Proteínas</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">220g</p>
                  <p className="text-sm text-muted-foreground">Carbohidratos</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">65g</p>
                  <p className="text-sm text-muted-foreground">Grasas</p>
                </div>
              </div>

              {/* Comidas del día */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Desayuno - 8:00 AM</p>
                      <p className="text-sm text-muted-foreground">Bowl de yogur griego con frutos rojos y nueces</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">520 kcal</p>
                    <p className="text-xs text-muted-foreground">30P • 45C • 18G</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Snack - 11:00 AM</p>
                      <p className="text-sm text-muted-foreground">Batido verde con espirulina y semillas de chía</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">180 kcal</p>
                    <p className="text-xs text-muted-foreground">12P • 20C • 6G</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Comida - 2:00 PM</p>
                      <p className="text-sm text-muted-foreground">Salmón al horno con quinoa y verduras asadas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">720 kcal</p>
                    <p className="text-xs text-muted-foreground">55P • 65C • 25G</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Snack - 5:00 PM</p>
                      <p className="text-sm text-muted-foreground">Hummus con palitos de vegetales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">150 kcal</p>
                    <p className="text-xs text-muted-foreground">8P • 18C • 5G</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Cena - 8:00 PM</p>
                      <p className="text-sm text-muted-foreground">Pechuga de pollo con ensalada mediterránea</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">530 kcal</p>
                    <p className="text-xs text-muted-foreground">55P • 42C • 11G</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                <Plus className="w-4 h-4 mr-2" />
                Generar Nuevo Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recetas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bowl Antioxidante",
                category: "Desayuno",
                time: "15 min",
                calories: "450 kcal"
              },
              {
                title: "Salmón con Cúrcuma",
                category: "Comida",
                time: "30 min",
                calories: "680 kcal"
              },
              {
                title: "Smoothie Verde Detox",
                category: "Snack",
                time: "5 min",
                calories: "180 kcal"
              },
              {
                title: "Ensalada Mediterránea",
                category: "Cena",
                time: "20 min",
                calories: "520 kcal"
              },
              {
                title: "Pollo Teriyaki Saludable",
                category: "Comida",
                time: "35 min",
                calories: "620 kcal"
              },
              {
                title: "Yogur con Superfoods",
                category: "Desayuno",
                time: "10 min",
                calories: "380 kcal"
              }
            ].map((receta, index) => (
              <Card key={index} className="hover:shadow-elegant transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                    <UtensilsCrossed className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{receta.title}</CardTitle>
                  <CardDescription>{receta.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiempo</span>
                    <span className="font-semibold">{receta.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Calorías</span>
                    <span className="font-semibold">{receta.calories}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Ver Receta</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biomarcadores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary" />
                Análisis de Biomarcadores
              </CardTitle>
              <CardDescription>
                Última actualización: 15 de Enero, 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Glucosa en ayunas", value: "85 mg/dL", status: "optimal", range: "70-99" },
                { name: "Hemoglobina A1c", value: "5.2%", status: "optimal", range: "<5.7%" },
                { name: "Colesterol Total", value: "175 mg/dL", status: "optimal", range: "<200" },
                { name: "HDL (bueno)", value: "65 mg/dL", status: "optimal", range: ">40" },
                { name: "LDL (malo)", value: "95 mg/dL", status: "optimal", range: "<100" },
                { name: "Triglicéridos", value: "75 mg/dL", status: "optimal", range: "<150" },
                { name: "Vitamina D", value: "52 ng/mL", status: "good", range: "30-100" },
                { name: "Omega-3 Index", value: "6.8%", status: "attention", range: ">8%" }
              ].map((bio, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">{bio.name}</p>
                    <p className="text-sm text-muted-foreground">Rango óptimo: {bio.range}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{bio.value}</p>
                    <Badge 
                      className={
                        bio.status === "optimal" 
                          ? "bg-success/20 text-success" 
                          : bio.status === "good"
                          ? "bg-primary/20 text-primary"
                          : "bg-warning/20 text-warning"
                      }
                    >
                      {bio.status === "optimal" ? "Óptimo" : bio.status === "good" ? "Bueno" : "Atención"}
                    </Badge>
                  </div>
                </div>
              ))}

              <Button className="w-full bg-gradient-to-r from-primary to-accent mt-6">
                <Beaker className="w-4 h-4 mr-2" />
                Agendar Nuevo Análisis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
