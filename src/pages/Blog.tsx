import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, Clock, User, Search, Heart, MessageCircle, Share2, BookOpen,
  Sparkles, Activity, Stethoscope, Zap, ChevronRight, TrendingUp, Award, Users
} from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = [
    { value: "todos", label: "Todos", count: 24 },
    { value: "medicina-estetica", label: "Medicina Estética", count: 12 },
    { value: "sueroterapia", label: "Sueroterapia", count: 8 },
    { value: "biohacking", label: "Biohacking", count: 6 },
    { value: "nutricion", label: "Nutrición", count: 5 },
    { value: "lifestyle", label: "Lifestyle", count: 4 },
  ];

  const featuredPost = {
    id: 1,
    title: "Guía Completa: Todo lo que Necesitas Saber sobre el Ácido Hialurónico",
    excerpt: "Descubre los beneficios, aplicaciones y técnicas más avanzadas del ácido hialurónico en medicina estética. Una guía completa para entender uno de los tratamientos más populares.",
    content: "El ácido hialurónico se ha convertido en uno de los tratamientos más solicitados en medicina estética...",
    category: "medicina-estetica",
    author: {
      name: "Dra. María González",
      avatar: "/api/placeholder/60/60",
      bio: "Especialista en Medicina Estética con 15 años de experiencia"
    },
    date: "2025-01-15",
    readTime: "12 min",
    image: "/api/placeholder/800/400",
    tags: ["ácido hialurónico", "rellenos", "rejuvenecimiento"],
    likes: 245,
    comments: 18,
    shares: 32,
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: "Los 5 Beneficios Principales de la Vitamina IV para tu Salud",
      excerpt: "Explora cómo la administración intravenosa de vitaminas puede transformar tu bienestar y energía de manera natural y efectiva.",
      category: "sueroterapia",
      author: {
        name: "Dr. Carlos Mendoza",
        avatar: "/api/placeholder/40/40",
      },
      date: "2025-01-12",
      readTime: "8 min",
      image: "/api/placeholder/400/250",
      tags: ["vitaminas", "energía", "hidratación"],
      likes: 189,
      comments: 12,
      shares: 24
    },
    {
      id: 3,
      title: "Biohacking: Cómo Optimizar tu Rendimiento Físico y Mental",
      excerpt: "Técnicas científicamente probadas para mejorar tu rendimiento, longevidad y calidad de vida a través del biohacking responsable.",
      category: "biohacking",
      author: {
        name: "Dra. Ana Torres",
        avatar: "/api/placeholder/40/40",
      },
      date: "2025-01-10",
      readTime: "15 min",
      image: "/api/placeholder/400/250",
      tags: ["optimización", "rendimiento", "longevidad"],
      likes: 156,
      comments: 23,
      shares: 41
    },
    {
      id: 4,
      title: "Rutina de Skincare Anti-Aging: Productos y Técnicas Profesionales",
      excerpt: "Descubre los secretos de una rutina de cuidado facial efectiva que combina productos de calidad médica con técnicas profesionales.",
      category: "medicina-estetica",
      author: {
        name: "Dra. Isabel Ruiz",
        avatar: "/api/placeholder/40/40",
      },
      date: "2025-01-08",
      readTime: "10 min",
      image: "/api/placeholder/400/250",
      tags: ["skincare", "anti-aging", "rutina"],
      likes: 203,
      comments: 31,
      shares: 19
    },
    {
      id: 5,
      title: "Nutrición Funcional: Alimenta tu Piel desde Adentro",
      excerpt: "La conexión entre nutrición y salud de la piel. Aprende qué alimentos y suplementos pueden mejorar tu apariencia naturalmente.",
      category: "nutricion",
      author: {
        name: "Dr. Roberto Silva",
        avatar: "/api/placeholder/40/40",
      },
      date: "2025-01-05",
      readTime: "7 min",
      image: "/api/placeholder/400/250",
      tags: ["nutrición", "piel", "suplementos"],
      likes: 134,
      comments: 15,
      shares: 28
    },
    {
      id: 6,
      title: "Mindfulness y Belleza: El Poder de la Conexión Mente-Cuerpo",
      excerpt: "Explora cómo las prácticas de mindfulness pueden potenciar los resultados de tus tratamientos estéticos y mejorar tu bienestar integral.",
      category: "lifestyle",
      author: {
        name: "Dra. Patricia López",
        avatar: "/api/placeholder/40/40",
      },
      date: "2025-01-03",
      readTime: "9 min",
      image: "/api/placeholder/400/250",
      tags: ["mindfulness", "bienestar", "salud mental"],
      likes: 167,
      comments: 28,
      shares: 35
    }
  ];

  const popularPosts = [
    {
      id: 7,
      title: "Botox vs. Rellenos: ¿Cuál es la Mejor Opción para Ti?",
      views: "12.5k",
      date: "2024-12-20"
    },
    {
      id: 8,
      title: "Hidratación Profunda: Secretos de la Sueroterapia",
      views: "8.7k",
      date: "2024-12-15"
    },
    {
      id: 9,
      title: "Longevidad Celular: El Futuro del Anti-Aging",
      views: "6.3k",
      date: "2024-12-10"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medicina-estetica": return <Sparkles className="w-4 h-4" />;
      case "sueroterapia": return <Heart className="w-4 h-4" />;
      case "biohacking": return <Activity className="w-4 h-4" />;
      case "nutricion": return <Stethoscope className="w-4 h-4" />;
      case "lifestyle": return <Zap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medicina-estetica": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "sueroterapia": return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200";
      case "biohacking": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "nutricion": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "lifestyle": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "todos" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-cream pt-24">
      {/* SEO Meta Tags */}
      <title>Blog de Medicina Estética y Bienestar | ILUMINA Vital Lounge</title>
      <meta name="description" content="Blog especializado en medicina estética, sueroterapia, biohacking y bienestar. Consejos de expertos y las últimas tendencias en salud y belleza en Panamá." />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Blog ILUMINA
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre consejos de expertos, tendencias innovadoras y guías completas sobre medicina estética, 
            bienestar y optimización de la salud.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar artículos del blog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.value} 
                    value={category.value}
                    className="flex items-center gap-1 text-xs"
                  >
                    {getCategoryIcon(category.value)}
                    <span className="hidden sm:inline">{category.label}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Featured Post */}
            <Card className="mb-12 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  <Award className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Badge className={`mb-2 ${getCategoryColor(featuredPost.category)}`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(featuredPost.category)}
                      Medicina Estética
                    </span>
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-200 mb-3 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={featuredPost.author.avatar} />
                        <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('es-ES')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(post.category)}
                        {categories.find(cat => cat.value === post.category)?.label}
                      </span>
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('es-ES')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {post.shares}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group/btn w-full">
                      Leer artículo completo
                      <ChevronRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                Cargar más artículos
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Más Populares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.views} vistas</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Newsletter
                </CardTitle>
                <CardDescription>
                  Recibe los mejores consejos de nuestros expertos cada semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'email' } }))}
                >
                  Suscribirse
                </Button>
              </CardContent>
            </Card>

            {/* Categories Widget */}
            <Card>
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <div 
                    key={category.value}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setActiveCategory(category.value)}
                  >
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.value)}
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">¿Tienes dudas?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Agenda una consulta gratuita con nuestros especialistas
                </p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.dispatchEvent(new CustomEvent('openAppointmentModal'))}
                >
                  Agendar Consulta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;