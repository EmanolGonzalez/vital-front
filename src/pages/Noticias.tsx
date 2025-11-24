import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Search, Filter, ChevronRight, Heart, Sparkles, Activity, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Noticias = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const categories = [
    { value: "todas", label: "Todas las categorías" },
    { value: "medicina-estetica", label: "Medicina Estética" },
    { value: "sueroterapia", label: "Sueroterapia" },
    { value: "biohacking", label: "Biohacking" },
    { value: "nutricion", label: "Nutrición" },
    { value: "tecnologia", label: "Tecnología" },
  ];

  const featuredNews = [
    {
      id: 1,
      title: "Estudio Científico Confirma: La Vitamina D Reduce el Envejecimiento Celular en un 40%",
      excerpt: "Investigación publicada en Nature revela que niveles óptimos de vitamina D pueden ralentizar significativamente el acortamiento de telómeros, principal marcador del envejecimiento celular.",
      category: "medicina-estetica",
      author: "Dr. María González",
      date: "2025-01-15",
      readTime: "8 min",
      image: "/api/placeholder/600/300",
      featured: true,
      tags: ["vitamina D", "telómeros", "longevidad", "evidencia científica"]
    },
    {
      id: 2,
      title: "Revolución en Nutrición IV: Cómo los Antioxidantes Protegen tu ADN del Daño Oxidativo",
      excerpt: "Nuevos estudios demuestran que la administración intravenosa de glutatión y vitamina C puede reparar hasta el 75% del daño oxidativo en células expuestas a estrés crónico.",
      category: "sueroterapia",
      author: "Dr. Carlos Mendoza",
      date: "2025-01-12",
      readTime: "10 min",
      image: "/api/placeholder/600/300",
      featured: true,
      tags: ["antioxidantes", "ADN", "estrés oxidativo", "glutatión"]
    },
    {
      id: 3,
      title: "El Microbioma Intestinal: Tu Segunda Piel y la Clave para una Apariencia Radiante",
      excerpt: "Investigación de Harvard confirma la conexión directa entre salud intestinal y apariencia de la piel. Descubre cómo optimizar tu microbioma para lucir mejor desde adentro.",
      category: "nutricion",
      author: "Dr. Ana Torres",
      date: "2025-01-10",
      readTime: "12 min",
      image: "/api/placeholder/600/300",
      featured: true,
      tags: ["microbioma", "piel", "salud intestinal", "belleza desde adentro"]
    }
  ];

  const recentNews = [
    {
      id: 4,
      title: "Colágeno Marino vs. Bovino: Estudio Revela Cuál es Más Efectivo para la Piel",
      excerpt: "Investigación de 12 meses con 500 participantes demuestra que el colágeno marino aumenta la elasticidad de la piel en un 65% comparado con el 35% del bovino.",
      category: "medicina-estetica",
      author: "Dra. Isabel Ruiz",
      date: "2025-01-08",
      readTime: "7 min",
      image: "/api/placeholder/400/200",
      tags: ["colágeno", "elasticidad", "estudios clínicos", "piel"]
    },
    {
      id: 5,
      title: "Omega-3 y Salud Mental: La Conexión Cerebro-Belleza que Cambia Todo",
      excerpt: "Nuevos estudios comprueban que niveles óptimos de omega-3 no solo mejoran el estado de ánimo, sino que reducen la inflamación facial y mejoran la luminosidad natural.",
      category: "nutricion",
      author: "Dr. Roberto Silva",
      date: "2025-01-05",
      readTime: "9 min",
      image: "/api/placeholder/400/200",
      tags: ["omega-3", "salud mental", "inflamación", "luminosidad"]
    },
    {
      id: 6,
      title: "Magnesio: El Mineral Olvidado que Revoluciona tu Sueño y Regeneración",
      excerpt: "Investigación del MIT confirma que la suplementación correcta de magnesio mejora la calidad del sueño en un 87% y acelera la reparación celular nocturna.",
      category: "biohacking",
      author: "Dr. Patricia López",
      date: "2025-01-03",
      readTime: "6 min",
      image: "/api/placeholder/400/200",
      tags: ["magnesio", "sueño", "regeneración", "MIT"]
    },
    {
      id: 7,
      title: "Ayuno Intermitente y Autofagia: Cómo tu Cuerpo se Rejuvenece Naturalmente",
      excerpt: "Estudios japoneses demuestran que el ayuno intermitente activa la autofagia, proceso celular que elimina componentes dañados y regenera tejidos desde adentro.",
      category: "biohacking",
      author: "Dr. Fernando Castro",
      date: "2025-01-01",
      readTime: "8 min",
      image: "/api/placeholder/400/200",
      tags: ["ayuno intermitente", "autofagia", "regeneración", "anti-aging"]
    },
    {
      id: 8,
      title: "NAD+ y Longevidad: El Suplemento que Revierte el Envejecimiento Mitocondrial",
      excerpt: "Ensayos clínicos muestran que la suplementación con NAD+ precursores aumenta la función mitocondrial en un 60% y mejora los marcadores de juventud biológica.",
      category: "sueroterapia",
      author: "Dra. Carmen Jiménez",
      date: "2024-12-28",
      readTime: "10 min",
      image: "/api/placeholder/400/200",
      tags: ["NAD+", "mitocondrias", "longevidad", "envejecimiento"]
    },
    {
      id: 9,
      title: "Probióticos de Nueva Generación: Cómo las Bacterias Buenas Mejoran tu Piel",
      excerpt: "Investigación francesa identifica cepas específicas de probióticos que reducen el acné en un 78% y mejoran la hidratación natural de la piel.",
      category: "nutricion",
      author: "Dr. Luis Herrera",
      date: "2024-12-25",
      readTime: "7 min",
      image: "/api/placeholder/400/200",
      tags: ["probióticos", "acné", "microbioma", "hidratación"]
    },
    {
      id: 10,
      title: "Vitamina K2: El Nutriente Secreto para Huesos Fuertes y Piel Firme",
      excerpt: "Estudios holandeses revelan que la vitamina K2 no solo fortalece los huesos, sino que también mejora la elasticidad de la piel al optimizar el metabolismo del calcio.",
      category: "nutricion",
      author: "Dra. Elena Vargas",
      date: "2024-12-22",
      readTime: "6 min",
      image: "/api/placeholder/400/200",
      tags: ["vitamina K2", "huesos", "elasticidad", "calcio"]
    },
    {
      id: 11,
      title: "Estrés Crónico y Envejecimiento Acelerado: La Ciencia del Cortisol y la Piel",
      excerpt: "Investigación de Stanford demuestra cómo el estrés crónico acelera el envejecimiento en 5 años y qué técnicas científicamente probadas pueden revertir estos efectos.",
      category: "biohacking",
      author: "Dr. Michael Torres",
      date: "2024-12-20",
      readTime: "11 min",
      image: "/api/placeholder/400/200",
      tags: ["estrés", "cortisol", "envejecimiento", "Stanford"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medicina-estetica": return <Sparkles className="w-4 h-4" />;
      case "sueroterapia": return <Heart className="w-4 h-4" />;
      case "biohacking": return <Activity className="w-4 h-4" />;
      case "nutricion": return <Stethoscope className="w-4 h-4" />;
      case "tecnologia": return <Filter className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medicina-estetica": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "sueroterapia": return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200";
      case "biohacking": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "nutricion": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "tecnologia": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredNews = recentNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todas" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-cream pt-24">
      {/* SEO Meta Tags */}
      <title>Noticias de Medicina Estética | ILUMINA Vital Lounge Panamá</title>
      <meta name="description" content="Mantente al día con las últimas noticias y avances en medicina estética, sueroterapia y biohacking en Panamá. Información actualizada por nuestros especialistas." />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Noticias ILUMINA
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mantente informado sobre las últimas tendencias, avances tecnológicos y descubrimientos 
            en medicina estética, sueroterapia y biohacking.
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured News Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Noticias Destacadas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredNews.map((article, index) => (
              <Card key={article.id} className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(article.category)}
                      {categories.find(cat => cat.value === article.category)?.label}
                    </span>
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('es-ES')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="group/btn w-full">
                    Leer más
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent News Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Clock className="w-8 h-8 text-primary" />
            Noticias Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(article.category)}`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(article.category)}
                      {categories.find(cat => cat.value === article.category)?.label}
                    </span>
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('es-ES')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn w-full">
                    Leer artículo
                    <ChevronRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Quieres estar siempre informado?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Suscríbete a nuestro newsletter y recibe las últimas noticias sobre medicina estética, 
                tratamientos innovadores y consejos de salud directamente en tu email.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-transform"
                onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'email' } }))}
              >
                Suscribirse al Newsletter
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Noticias;