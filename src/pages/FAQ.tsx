import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, HelpCircle, Sparkles, Heart, Activity, Stethoscope, 
  Clock, DollarSign, Shield, Users, Calendar, Phone, MessageCircle
} from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    { id: "general", label: "General", icon: <HelpCircle className="w-4 h-4" />, count: 8 },
    { id: "medicina-estetica", label: "Medicina Estética", icon: <Sparkles className="w-4 h-4" />, count: 12 },
    { id: "sueroterapia", label: "Sueroterapia", icon: <Heart className="w-4 h-4" />, count: 10 },
    { id: "biohacking", label: "Biohacking", icon: <Activity className="w-4 h-4" />, count: 6 },
    { id: "precios", label: "Precios y Pagos", icon: <DollarSign className="w-4 h-4" />, count: 5 },
    { id: "citas", label: "Citas y Reservas", icon: <Calendar className="w-4 h-4" />, count: 7 }
  ];

  const faqData = {
    general: [
      {
        question: "¿Qué es ILUMINA Vital Lounge y qué servicios ofrecen?",
        answer: "ILUMINA Vital Lounge es un centro especializado en medicina estética, sueroterapia y biohacking ubicado en Panamá. Ofrecemos tratamientos no invasivos para el rejuvenecimiento facial y corporal, terapias intravenosas para optimizar la salud, y técnicas avanzadas de biohacking para mejorar el rendimiento físico y mental."
      },
      {
        question: "¿Sus tratamientos son seguros y están regulados?",
        answer: "Sí, todos nuestros tratamientos están aprobados por las autoridades sanitarias de Panamá y son realizados por médicos especialistas certificados. Utilizamos productos y equipos de la más alta calidad con certificaciones internacionales."
      },
      {
        question: "¿Qué diferencia a ILUMINA de otros centros estéticos?",
        answer: "Nuestra filosofía integral combina medicina estética avanzada con enfoque en el bienestar interno. No solo nos enfocamos en la apariencia externa, sino en optimizar la salud celular, el rendimiento y la longevidad a través de técnicas científicamente respaldadas."
      },
      {
        question: "¿Necesito una consulta previa antes de cualquier tratamiento?",
        answer: "Sí, ofrecemos una consulta gratuita con nuestros especialistas para evaluar tus necesidades, explicar los procedimientos disponibles y crear un plan personalizado. Esta consulta puede ser presencial o virtual."
      },
      {
        question: "¿Qué medidas de seguridad e higiene manejan?",
        answer: "Mantenemos los más altos estándares de bioseguridad con protocolos de esterilización, uso de materiales desechables, equipos certificados y seguimiento estricto de las normativas sanitarias internacionales."
      },
      {
        question: "¿Atienden a pacientes internacionales?",
        answer: "Sí, recibimos pacientes de toda Centroamérica y el Caribe. Ofrecemos paquetes especiales que incluyen alojamiento y seguimiento post-tratamiento para pacientes que viajan desde otros países."
      },
      {
        question: "¿Qué edad mínima se requiere para los tratamientos?",
        answer: "La edad mínima es 18 años para la mayoría de tratamientos. Para menores de edad se requiere autorización de los padres y evaluación médica especial. Algunos tratamientos preventivos pueden iniciarse desde los 25 años."
      },
      {
        question: "¿Ofrecen planes de financiamiento?",
        answer: "Sí, tenemos convenios con entidades financieras para ofrecer planes de pago flexibles. También manejamos membresías anuales con beneficios exclusivos y descuentos preferenciales."
      }
    ],
    "medicina-estetica": [
      {
        question: "¿Qué es el ácido hialurónico y cómo funciona?",
        answer: "El ácido hialurónico es una sustancia naturalmente presente en nuestro cuerpo que retiene agua y proporciona volumen. En medicina estética, se usa para hidratar la piel, rellenar arrugas y dar volumen a labios y mejillas, con resultados naturales y duraderos."
      },
      {
        question: "¿Duele la aplicación de botox?",
        answer: "El disconfort es mínimo. Utilizamos agujas ultrafinas y técnicas avanzadas para minimizar las molestias. La mayoría de pacientes describe la sensación como un pequeño pinchazo. Opcionalmente, aplicamos crema anestésica."
      },
      {
        question: "¿Cuánto duran los resultados de los rellenos faciales?",
        answer: "Los resultados varían según el tipo de producto y la zona tratada. Generalmente, el ácido hialurónico dura entre 8-18 meses, el botox entre 4-6 meses, y otros tratamientos pueden tener duraciones diferentes según el caso individual."
      },
      {
        question: "¿Qué cuidados debo tener después de un tratamiento facial?",
        answer: "Evitar ejercicio intenso las primeras 24 horas, no masajear la zona tratada, usar protector solar diariamente, mantener buena hidratación y seguir las indicaciones específicas del médico tratante."
      },
      {
        question: "¿Los tratamientos dejan marca o requieren tiempo de recuperación?",
        answer: "La mayoría son procedimientos ambulatorios con mínimo tiempo de inactividad. Puede haber ligero enrojecimiento o pequeños hematomas que desaparecen en 1-3 días. Puedes retomar actividades normales inmediatamente."
      },
      {
        question: "¿A partir de qué edad se recomiendan los tratamientos preventivos?",
        answer: "Los tratamientos preventivos pueden iniciarse entre los 25-30 años, enfocándose en mantener la producción de colágeno y prevenir las primeras líneas de expresión. La prevención siempre es más efectiva que la corrección."
      },
      {
        question: "¿Qué es la bioestimulación y qué beneficios tiene?",
        answer: "La bioestimulación utiliza sustancias como hidroxiapatita de calcio o ácido poliláctico para estimular la producción natural de colágeno, mejorando la firmeza, textura y luminosidad de la piel de forma gradual y natural."
      },
      {
        question: "¿Pueden combinarse diferentes tratamientos estéticos?",
        answer: "Sí, desarrollamos protocolos personalizados que combinan diferentes técnicas para resultados óptimos. Por ejemplo, botox con rellenos, o bioestimuladores con tratamientos faciales, siempre bajo supervisión médica especializada."
      },
      {
        question: "¿Los hombres también pueden realizarse tratamientos estéticos?",
        answer: "Absolutamente. Tenemos protocolos específicos para hombres, adaptados a la anatomía masculina y buscando resultados naturales que realcen la masculinidad sin feminizar los rasgos."
      },
      {
        question: "¿Qué tratamientos recomiendan para mejorar la textura de la piel?",
        answer: "Ofrecemos microagujas, peelings médicos, radiofrecuencia, y terapias con luz LED. La elección depende del tipo de piel, edad y objetivos específicos del paciente."
      },
      {
        question: "¿Es verdad que los tratamientos estéticos son adictivos?",
        answer: "Los tratamientos en sí no son adictivos. Sin embargo, al ver buenos resultados, algunos pacientes desean mantenerlos. Por eso enfatizamos la educación del paciente y establecemos protocolos de mantenimiento realistas y saludables."
      },
      {
        question: "¿Qué diferencia hay entre los tratamientos corporales y faciales?",
        answer: "Los tratamientos corporales se enfocan en contorno, flacidez y celulitis usando tecnologías como criolipolisis, radiofrecuencia corporal y suplementación. Los faciales se concentran en rejuvenecimiento, hidratación y corrección de imperfecciones específicas del rostro."
      }
    ],
    sueroterapia: [
      {
        question: "¿Qué es exactamente la sueroterapia intravenosa?",
        answer: "La sueroterapia IV es la administración directa de vitaminas, minerales, antioxidantes y otros nutrientes al torrente sanguíneo, permitiendo una absorción del 100% versus el 20-30% de la vía oral. Esto optimiza la hidratación celular y los niveles nutricionales."
      },
      {
        question: "¿Qué beneficios específicos ofrece la vitamina C intravenosa?",
        answer: "La vitamina C IV fortalece el sistema inmunológico, actúa como potente antioxidante, mejora la producción de colágeno, aumenta la energía, reduce la fatiga y puede ayudar en procesos de recuperación y anti-envejecimiento."
      },
      {
        question: "¿Con qué frecuencia se puede recibir sueroterapia?",
        answer: "Depende del objetivo y el protocolo individual. Para mantenimiento general: 1-2 veces por mes. Para recuperación o objetivos específicos: puede ser semanal. Siempre bajo supervisión médica y evaluación personalizada."
      },
      {
        question: "¿La sueroterapia tiene efectos secundarios?",
        answer: "Es muy segura cuando se administra correctamente. Efectos mínimos pueden incluir ligera molestia en el sitio de punción o sensación de frío durante la infusión. Realizamos evaluación médica previa para evitar contraindicaciones."
      },
      {
        question: "¿Cuánto tiempo dura una sesión de sueroterapia?",
        answer: "Generalmente entre 30-60 minutos, dependiendo del tipo y volumen del suero. Durante este tiempo puedes relajarte, leer, usar tu teléfono o simplemente descansar en nuestras cómodas instalaciones."
      },
      {
        question: "¿Qué diferencia hay entre los diferentes tipos de sueros?",
        answer: "Tenemos sueros específicos: energizantes (B12, complejo B), antioxidantes (vitamina C, glutatión), hidratantes (electrolitos), deportivos (aminoácidos), y detox (glutatión, NAC). Cada uno está formulado para objetivos particulares."
      },
      {
        question: "¿Puedo hacer ejercicio el mismo día de la sueroterapia?",
        answer: "Sí, de hecho muchos atletas la usan para optimizar su rendimiento y recuperación. Se recomienda esperar 1-2 horas post-sesión antes del ejercicio intenso para permitir la distribución completa de nutrientes."
      },
      {
        question: "¿La sueroterapia es efectiva para la resaca?",
        answer: "Muy efectiva. Nuestro suero específico para recuperación incluye hidratación profunda, vitaminas B, electrolitos y antioxidantes que ayudan a metabolizar el alcohol y restaurar el equilibrio corporal rápidamente."
      },
      {
        question: "¿Qué es el glutatión y por qué es importante?",
        answer: "El glutatión es el antioxidante maestro del cuerpo, crucial para la desintoxicación hepática, función inmune y protección celular. Su administración IV es especialmente efectiva para anti-envejecimiento y recuperación."
      },
      {
        question: "¿Pueden los diabéticos recibir sueroterapia?",
        answer: "Con evaluación y supervisión médica adecuada, sí. Ajustamos las fórmulas evitando glucosa y monitoreando cuidadosamente. Algunos sueros pueden incluso beneficiar el metabolismo en diabéticos controlados."
      }
    ],
    biohacking: [
      {
        question: "¿Qué significa biohacking y cómo lo aplican?",
        answer: "El biohacking es la optimización sistemática de la biología humana usando ciencia, tecnología y cambios de estilo de vida. Aplicamos técnicas como análisis de biomarcadores, suplementación personalizada, fototerapia, y protocolos de sueño y ejercicio."
      },
      {
        question: "¿Qué es la calculadora de edad biológica?",
        answer: "Es una herramienta que evalúa múltiples biomarcadores para determinar qué tan rápido está envejeciendo tu cuerpo comparado con tu edad cronológica. Incluye análisis de telómeros, marcadores inflamatorios, función mitocondrial y más."
      },
      {
        question: "¿Qué análisis incluye la evaluación de biohacking?",
        answer: "Realizamos análisis completos: perfil hormonal, vitaminas y minerales, marcadores inflamatorios, función hepática y renal, perfil lipídico avanzado, análisis de micronutrientes, y evaluación del estrés oxidativo."
      },
      {
        question: "¿Cómo pueden ayudarme a optimizar mi sueño?",
        answer: "Evaluamos patrones de sueño, niveles de melatonina, magnesio y otros factores. Recomendamos protocolos de higiene del sueño, suplementación específica, técnicas de relajación y, si es necesario, estudios del sueño más profundos."
      },
      {
        question: "¿Qué es la suplementación personalizada?",
        answer: "Basándose en tus análisis específicos, diseñamos protocolos de suplementos individualizados para optimizar deficiencias, mejorar rendimiento, aumentar energía y promover longevidad, ajustando dosis y combinaciones según tu perfil único."
      },
      {
        question: "¿Ofrecen protocolos para mejorar el rendimiento deportivo?",
        answer: "Sí, tenemos programas específicos para atletas que incluyen análisis de lactato, VO2 máx, optimización nutricional, suplementación deportiva, protocolos de recuperación y monitoreo de biomarcadores de rendimiento."
      }
    ],
    precios: [
      {
        question: "¿Cuáles son sus formas de pago aceptadas?",
        answer: "Aceptamos efectivo, tarjetas de crédito y débito (Visa, MasterCard, American Express), transferencias bancarias, y ofrecemos planes de financiamiento sin intereses hasta 12 meses para tratamientos mayores."
      },
      {
        question: "¿Ofrecen descuentos por paquetes de tratamientos?",
        answer: "Sí, manejamos paquetes con descuentos progresivos: 10% en 3 sesiones, 15% en 6 sesiones, 20% en 10 o más. También tenemos promociones estacionales y descuentos para referidos."
      },
      {
        question: "¿Qué incluye la membresía anual?",
        answer: "Las membresías incluyen descuentos preferenciales (15-25%), consultas gratuitas, acceso prioritario a nuevos tratamientos, evaluaciones anuales sin costo, y beneficios exclusivos en productos para el hogar."
      },
      {
        question: "¿Los precios incluyen consulta y seguimiento?",
        answer: "La consulta inicial siempre es gratuita. Los precios de tratamientos incluyen la aplicación y primera evaluación post-tratamiento. Consultas de seguimiento adicionales tienen costo reducido para nuestros pacientes activos."
      },
      {
        question: "¿Manejan precios especiales para estudiantes o adultos mayores?",
        answer: "Ofrecemos 10% de descuento a estudiantes universitarios con credencial vigente y 15% a adultos mayores de 65 años. También tenemos programas especiales para profesionales de la salud."
      }
    ],
    citas: [
      {
        question: "¿Cómo puedo agendar mi primera cita?",
        answer: "Puedes agendar a través de nuestra página web, WhatsApp (+507 6000-0000), llamando directamente, o visitando nuestras instalaciones. La primera consulta siempre es gratuita y sin compromiso."
      },
      {
        question: "¿Qué debo llevar a mi primera consulta?",
        answer: "Trae tu cédula de identidad, lista de medicamentos actuales, alergias conocidas, y si tienes, resultados de exámenes médicos recientes. También es útil traer fotos de referencia de resultados deseados."
      },
      {
        question: "¿Puedo cancelar o reprogramar mi cita?",
        answer: "Sí, con al menos 24 horas de anticipación sin costo. Cancelaciones con menos tiempo pueden tener una tarifa del 50%. Entendemos que surgen emergencias y evaluamos cada caso individualmente."
      },
      {
        question: "¿Ofrecen consultas virtuales?",
        answer: "Sí, realizamos consultas virtuales para evaluaciones iniciales, seguimientos post-tratamiento, y asesorías sobre cuidados en casa. Usamos plataformas seguras que protegen tu privacidad médica."
      },
      {
        question: "¿Cuál es su horario de atención?",
        answer: "Lunes a Viernes: 8:00 AM - 6:00 PM, Sábados: 8:00 AM - 4:00 PM. Para emergencias post-tratamiento tenemos línea de contacto 24/7. Domingos solo para casos especiales con cita previa."
      },
      {
        question: "¿Atienden urgencias estéticas?",
        answer: "Sí, manejamos urgencias relacionadas con tratamientos previos, reacciones alérgicas, o situaciones que requieran atención inmediata. Tenemos protocolo de emergencias disponible 24/7."
      },
      {
        question: "¿Puedo traer acompañante a mi cita?",
        answer: "Por supuesto, especialmente para la primera consulta. Para tratamientos, por razones de espacio y privacidad, preferimos máximo un acompañante en el área de tratamiento."
      }
    ]
  };

  const filteredFAQs = faqData[activeCategory as keyof typeof faqData]?.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const allFAQs = Object.values(faqData).flat().filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayFAQs = activeCategory === "general" && searchTerm === "" ? faqData.general : 
                     searchTerm !== "" ? allFAQs : filteredFAQs;

  return (
    <div className="min-h-screen bg-gradient-cream pt-24">
      {/* SEO Meta Tags */}
      <title>Preguntas Frecuentes - Medicina Estética y Sueroterapia | ILUMINA Panamá</title>
      <meta name="description" content="Resuelve todas tus dudas sobre medicina estética, sueroterapia, biohacking y nuestros tratamientos en ILUMINA Vital Lounge, Panamá. Preguntas frecuentes respondidas por expertos." />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros tratamientos, 
            procedimientos y servicios. Nuestros expertos han recopilado toda la información que necesitas.
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Buscar en preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col sm:flex-row items-center gap-1 p-3"
                >
                  {category.icon}
                  <span className="text-xs sm:text-sm">{category.label}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main FAQ Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {categories.find(cat => cat.id === activeCategory)?.icon}
                  {categories.find(cat => cat.id === activeCategory)?.label}
                  <Badge variant="outline" className="ml-2">
                    {displayFAQs.length} preguntas
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {searchTerm ? `Resultados para "${searchTerm}"` : 
                   `Preguntas frecuentes sobre ${categories.find(cat => cat.id === activeCategory)?.label.toLowerCase()}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {displayFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  ¿No encuentras tu respuesta?
                </CardTitle>
                <CardDescription>
                  Nuestros especialistas están aquí para ayudarte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'whatsapp' } }))}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'phone' } }))}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Ahora
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => window.dispatchEvent(new CustomEvent('openAppointmentModal'))}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Consulta
                </Button>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categorías Populares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.slice(1, 4).map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.label}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Consulta Gratuita</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Agenda una evaluación personalizada sin costo con nuestros especialistas
                </p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.dispatchEvent(new CustomEvent('openFirstVisitModal'))}
                >
                  Agendar Primera Visita
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                  Línea de Emergencia
                </h4>
                <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
                  Para urgencias post-tratamiento 24/7
                </p>
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  +507 6000-0000
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;