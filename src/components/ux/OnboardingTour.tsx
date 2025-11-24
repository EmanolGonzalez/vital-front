import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUX } from '@/contexts/UXContext';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Calendar,
  Search,
  Bell,
  Settings,
  User,
  Stethoscope,
  Star,
  Navigation,
  Zap
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  highlight?: string;
}

export const OnboardingTour = () => {
  const { 
    onboardingCompleted, 
    setOnboardingCompleted, 
    tourActive, 
    setTourActive,
    addNotification 
  } = useUX();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: '¡Bienvenido a ILUMINA!',
      description: 'Tu centro médico-estético de vanguardia. Te guiaremos por las funcionalidades principales para que aproveches al máximo tu experiencia.',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'search',
      title: 'Búsqueda Global',
      description: 'Encuentra cualquier cosa rápidamente con Cmd+K (⌘+K). Busca tratamientos, páginas, funciones y más.',
      icon: <Search className="w-6 h-6" />,
      action: {
        label: 'Probar búsqueda',
        onClick: () => {
          setTourActive(false);
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        }
      },
      highlight: 'search'
    },
    {
      id: 'navigation',
      title: 'Navegador Flotante',
      description: 'Accede rápidamente a cualquier sección desde el botón flotante en la esquina inferior derecha.',
      icon: <Navigation className="w-6 h-6" />,
      highlight: 'floating-nav'
    },
    {
      id: 'notifications',
      title: 'Centro de Notificaciones',
      description: 'Mantente al día con recordatorios de citas, actualizaciones de tratamientos y más.',
      icon: <Bell className="w-6 h-6" />,
      action: {
        label: 'Ver notificaciones de ejemplo',
        onClick: () => {
          addNotification({
            type: 'success',
            title: '¡Tour completado!',
            message: 'Has completado el tour de bienvenida exitosamente',
          });
        }
      },
      highlight: 'notifications'
    },
    {
      id: 'booking',
      title: 'Reserva de Citas',
      description: 'Agenda tu consulta médica de forma rápida y sencilla. Elige fecha, hora y tipo de tratamiento.',
      icon: <Calendar className="w-6 h-6" />,
      action: {
        label: 'Reservar ahora',
        onClick: () => {
          setTourActive(false);
          navigate('/reservar');
        }
      }
    },
    {
      id: 'treatments',
      title: 'Catálogo de Tratamientos',
      description: 'Explora nuestra amplia gama de tratamientos estéticos y de bienestar. Información detallada y precios.',
      icon: <Star className="w-6 h-6" />,
      action: {
        label: 'Ver tratamientos',
        onClick: () => {
          setTourActive(false);
          window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { treatmentType: 'facial' } }));
        }
      }
    },
    {
      id: 'portals',
      title: 'Portales Especializados',
      description: 'Accede a tu portal como paciente o profesional médico para gestionar citas, historiales y más.',
      icon: <User className="w-6 h-6" />,
      action: {
        label: 'Portal Paciente',
        onClick: () => {
          setTourActive(false);
          navigate('/patient');
        }
      }
    },
    {
      id: 'customization',
      title: 'Personalización',
      description: 'Ajusta el tema, tamaño de fuente y otras preferencias desde el menú de configuración.',
      icon: <Settings className="w-6 h-6" />,
      highlight: 'theme-customizer'
    },
    {
      id: 'complete',
      title: '¡Listo para empezar!',
      description: 'Ya conoces las funcionalidades principales. ¡Explora y descubre todo lo que ILUMINA tiene para ofrecerte!',
      icon: <CheckCircle className="w-6 h-6" />,
      action: {
        label: 'Comenzar experiencia',
        onClick: () => {
          setOnboardingCompleted(true);
          setTourActive(false);
          addNotification({
            type: 'success',
            title: '¡Bienvenido a ILUMINA!',
            message: 'Tour completado. ¡Disfruta de tu experiencia médico-estética!',
          });
        }
      }
    }
  ];

  // Auto-start tour for new users
  useEffect(() => {
    if (!onboardingCompleted && !tourActive) {
      const timer = setTimeout(() => {
        setTourActive(true);
      }, 2000); // Wait 2 seconds after page load
      
      return () => clearTimeout(timer);
    }
  }, [onboardingCompleted, tourActive, setTourActive]);

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    setOnboardingCompleted(true);
    setTourActive(false);
  };

  if (!tourActive) return null;

  return (
    <Dialog open={tourActive} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg bg-gradient-hero border-primary/20">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={skipTour}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground z-50"
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                {currentTourStep.icon}
              </div>
              <div>
                <Badge variant="secondary" className="text-xs">
                  Paso {currentStep + 1} de {tourSteps.length}
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progreso del tour</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Content */}
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-primary to-primary-glow rounded-full text-primary-foreground">
                  {currentTourStep.icon}
                </div>
                <span>{currentTourStep.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {currentTourStep.description}
              </p>
              
              {currentTourStep.action && (
                <Button 
                  variant="outline" 
                  onClick={currentTourStep.action.onClick}
                  className="w-full group border-primary/30 hover:border-primary"
                >
                  <Zap className="w-4 h-4 mr-2 group-hover:text-primary" />
                  {currentTourStep.action.label}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-primary' 
                      : index < currentStep 
                        ? 'bg-primary/50' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              {currentStep === tourSteps.length - 1 ? (
                <Button 
                  onClick={() => {
                    setOnboardingCompleted(true);
                    setTourActive(false);
                    addNotification({
                      type: 'success',
                      title: '¡Bienvenido a ILUMINA!',
                      message: 'Tour completado. ¡Disfruta de tu experiencia!',
                    });
                  }}
                  className="group"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Finalizar</span>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={skipTour}
                    className="text-muted-foreground"
                  >
                    Saltar tour
                  </Button>
                  <Button 
                    onClick={nextStep}
                    size="sm"
                    className="group"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};