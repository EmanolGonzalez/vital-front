import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUX } from '@/contexts/UXContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  User,
  Calendar,
  Stethoscope,
  Star,
  Calculator,
  ArrowRight,
  Command,
  Sparkles,
  Heart,
  Shield
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'treatment' | 'doctor' | 'appointment' | 'patient';
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
  badge?: string;
}

export const GlobalSearch = () => {
  const { searchOpen, setSearchOpen, searchHistory, addToSearchHistory } = useUX();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const searchData: SearchResult[] = [
    // Páginas
    { 
      id: 'home', 
      title: 'Inicio', 
      description: 'Página principal de ILUMINA Vital Lounge',
      category: 'page', 
      href: '/', 
      icon: <User className="w-4 h-4" />
    },
    { 
      id: 'booking', 
      title: 'Reservar Cita', 
      description: 'Agenda tu consulta médica',
      category: 'appointment', 
      href: '/reservar', 
      icon: <Calendar className="w-4 h-4" />,
      badge: 'Nuevo'
    },
    { 
      id: 'calculator', 
      title: 'Calculadora de Edad Biológica', 
      description: 'Descubre tu edad real',
      category: 'page', 
      href: '/calculadora-edad', 
      icon: <Calculator className="w-4 h-4" />
    },
    { 
      id: 'testimonials', 
      title: 'Testimonios', 
      description: 'Casos de éxito de nuestros pacientes',
      category: 'page', 
      href: '/testimonios', 
      icon: <Star className="w-4 h-4" />
    },
    { 
      id: 'patient-portal', 
      title: 'Portal Paciente', 
      description: 'Accede a tu área personal',
      category: 'patient', 
      href: '/patient', 
      icon: <User className="w-4 h-4" />,
      badge: 'VIP'
    },
    { 
      id: 'doctor-portal', 
      title: 'Portal Médico', 
      description: 'Panel de control médico',
      category: 'doctor', 
      href: '/doctor', 
      icon: <Stethoscope className="w-4 h-4" />
    },
    
    // Tratamientos
    { 
      id: 'botox', 
      title: 'Botox Premium', 
      description: 'Eliminación de arrugas dinámicas',
      category: 'treatment', 
      icon: <Sparkles className="w-4 h-4" />,
      action: () => window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }))
    },
    { 
      id: 'hialuronico', 
      title: 'Ácido Hialurónico', 
      description: 'Hidratación y volumen facial',
      category: 'treatment', 
      icon: <Heart className="w-4 h-4" />,
      action: () => window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }))
    },
    { 
      id: 'hilos-tensores', 
      title: 'Hilos Tensores PDO', 
      description: 'Lifting facial sin cirugía',
      category: 'treatment', 
      icon: <Sparkles className="w-4 h-4" />,
      action: () => window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }))
    },
    { 
      id: 'sueroterapia', 
      title: 'Sueroterapia NAD+', 
      description: 'Revitalización celular anti-aging',
      category: 'treatment', 
      icon: <Shield className="w-4 h-4" />,
      action: () => window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'sueroterapia' } }))
    },
    { 
      id: 'criolipolisis', 
      title: 'Criolipólisis Avanzada', 
      description: 'Eliminación de grasa localizada',
      category: 'treatment', 
      icon: <Sparkles className="w-4 h-4" />,
      action: () => window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'corporal' } }))
    },
  ];

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!searchOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, results, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    addToSearchHistory(query);
    setSearchOpen(false);
    setQuery('');
    
    if (result.action) {
      result.action();
    } else if (result.href) {
      navigate(result.href);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'page': return <User className="w-3 h-3" />;
      case 'treatment': return <Sparkles className="w-3 h-3" />;
      case 'doctor': return <Stethoscope className="w-3 h-3" />;
      case 'appointment': return <Calendar className="w-3 h-3" />;
      case 'patient': return <Heart className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'page': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'treatment': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'doctor': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'appointment': return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'patient': return 'bg-pink-500/10 text-pink-600 border-pink-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-background/95 backdrop-blur-xl border-primary/20">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-border/50">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <Input
            placeholder="Buscar tratamientos, páginas, funciones..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none focus-visible:ring-0 text-base bg-transparent"
            autoFocus
          />
          <div className="flex items-center space-x-1 text-xs text-muted-foreground ml-2">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <Button
                  key={result.id}
                  variant="ghost"
                  className={`w-full justify-start px-4 py-3 h-auto text-left hover:bg-muted/50 ${
                    index === selectedIndex ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                  }`}
                  onClick={() => handleSelectResult(result)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-2 rounded-lg ${getCategoryColor(result.category)}`}>
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium truncate">{result.title}</h4>
                        {result.badge && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            {result.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs px-2 py-1 ${getCategoryColor(result.category)}`}>
                        {getCategoryIcon(result.category)}
                        <span className="ml-1 capitalize">{result.category}</span>
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Search History */}
          {!query.trim() && searchHistory.length > 0 && (
            <div className="py-4 px-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Búsquedas recientes
              </h4>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((historyItem, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setQuery(historyItem)}
                  >
                    <Clock className="w-3 h-3 mr-2" />
                    {historyItem}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {!query.trim() && (
            <div className="py-4 px-4 border-t border-border/50 bg-muted/20">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Acciones rápidas
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start h-8"
                  onClick={() => {
                    setSearchOpen(false);
                    navigate('/reservar');
                  }}
                >
                  <Calendar className="w-3 h-3 mr-2" />
                  Reservar Cita
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start h-8"
                  onClick={() => {
                    setSearchOpen(false);
                    window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }));
                  }}
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  Ver Tratamientos
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border/50 bg-muted/10">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded">↑↓</kbd>
                <span>Navegar</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded">Enter</kbd>
                <span>Seleccionar</span>
              </span>
            </div>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-background border rounded">Esc</kbd>
              <span>Cerrar</span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};