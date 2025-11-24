import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Heart, 
  Zap, 
  Star, 
  ArrowRight,
  User,
  Activity,
  Shield
} from "lucide-react";

// Add function to trigger treatment modal
const triggerTreatmentModal = (treatmentType: string) => {
  window.dispatchEvent(new CustomEvent('openTreatmentModal', { 
    detail: { treatmentType } 
  }));
};
import medicinaEsteticaImg from "@/assets/medicina-estetica.jpg";

export const TratamientosSection = () => {
  const facialTreatments = [
    { name: "Botox Premium", description: "Eliminación completa de arrugas dinámicas con toxina botulínica de última generación" },
    { name: "Ácido Hialurónico", description: "Hidratación profunda, volumen y definición facial personalizada" },
    { name: "Hilos Tensores PDO", description: "Lifting facial sin cirugía con resultados inmediatos y duraderos" },
    { name: "PRP Facial Avanzado", description: "Regeneración celular con plasma rico en plaquetas enriquecido" },
    { name: "Peelings Médicos", description: "Renovación celular profunda con ácidos médicos especializados" },
    { name: "Bioestimuladores", description: "Sculptra y Radiesse para rejuvenecimiento natural y duradero" },
    { name: "Mesoterapia Facial", description: "Cóctel de vitaminas y principios activos revitalizantes" },
    { name: "Profhilo", description: "Biorevitalización con ácido hialurónico de alta concentración" }
  ];

  const bodyTreatments = [
    { name: "HIFU Corporal", description: "Ultrasonido focalizado para lifting y reafirmación corporal profunda" },
    { name: "Suplementación", description: "Programa personalizado de nutrición y suplementos avanzados" },
    { name: "Radiofrecuencia Tripolar", description: "Reafirmación profunda y estimulación del colágeno" },
    { name: "Drenaje Linfático Médico", description: "Desintoxicación y recuperación post-tratamiento" },
    { name: "Mesoterapia Corporal", description: "Reducción de celulitis y flacidez localizada" },
    { name: "Carboxiterapia", description: "Mejora de circulación y oxigenación tisular" }
  ];

  const techTreatments = [
    { name: "Láser Médico-Estético", description: "Rejuvenecimiento avanzado y corrección de imperfecciones" },
    { name: "Terapia LED", description: "Bioestimulación celular y rejuvenecimiento" },
    { name: "Microneeding RF", description: "Estimulación del colágeno con radiofrecuencia" }
  ];

  const treatmentCategories = [
    {
      id: "facial",
      title: "Medicina Estética Facial",
      icon: <User className="w-5 h-5" />,
      treatments: facialTreatments,
      color: "text-primary"
    },
    {
      id: "corporal",
      title: "Estética Corporal",
      icon: <Activity className="w-5 h-5" />,
      treatments: bodyTreatments,
      color: "text-primary"
    },
    {
      id: "tecnologia",
      title: "Tecnología No Invasiva",
      icon: <Zap className="w-5 h-5" />,
      treatments: techTreatments,
      color: "text-primary"
    }
  ];

  return (
    <section id="tratamientos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Nuestros Tratamientos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Medicina Estética</span>
            <br />
            <span className="text-primary">de Vanguardia</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tratamientos personalizados con tecnología de última generación 
            para resultados excepcionales y naturales.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant">
            <img
              src={medicinaEsteticaImg}
              alt="Medicina Estética ILUMINA"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Tecnología Avanzada</h3>
              <p className="text-white/90">Equipamiento médico de última generación</p>
            </div>
          </div>
        </div>

        {/* Treatment Categories */}
        <Tabs defaultValue="facial" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-cream-card border border-border">
            {treatmentCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {treatmentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.treatments.map((treatment, index) => (
                  <Card key={index} className="group hover:shadow-gold transition-all duration-500 border-none shadow-soft bg-cream-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                          {treatment.name}
                        </CardTitle>
                        <Star className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {treatment.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="group/btn p-0 h-auto font-medium text-primary hover:text-primary"
                        onClick={() => triggerTreatmentModal(category.id)}
                      >
                        Más información
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-elegant">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para tu transformación?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Agenda tu consulta personalizada y descubre qué tratamientos 
              son perfectos para alcanzar tus objetivos estéticos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="luxury" 
                size="lg" 
                className="group"
                onClick={() => triggerTreatmentModal('facial')}
              >
                <Shield className="w-5 h-5 mr-2" />
                Consulta Médica Gratuita
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="gold-outline" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                Ver Casos de Éxito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};