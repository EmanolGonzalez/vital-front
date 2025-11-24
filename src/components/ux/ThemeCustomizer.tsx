import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useUX } from '@/contexts/UXContext';
import {
  Settings,
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Zap,
  Check,
  Contrast,
  Eye
} from 'lucide-react';

export const ThemeCustomizer = () => {
  const { 
    theme, 
    setTheme, 
    fontSize, 
    setFontSize 
  } = useUX();
  const [open, setOpen] = useState(false);

  const themes = [
    { 
      key: 'light' as const, 
      name: 'Claro', 
      icon: <Sun className="w-4 h-4" />,
      description: 'Tema claro y limpio'
    },
    { 
      key: 'dark' as const, 
      name: 'Oscuro', 
      icon: <Moon className="w-4 h-4" />,
      description: 'Tema oscuro y moderno'
    },
    { 
      key: 'system' as const, 
      name: 'Sistema', 
      icon: <Monitor className="w-4 h-4" />,
      description: 'Sigue la configuración del sistema'
    },
  ];

  const fontSizes = [
    { 
      key: 'small' as const, 
      name: 'Pequeño', 
      description: 'Texto más compacto',
      preview: 'text-sm'
    },
    { 
      key: 'medium' as const, 
      name: 'Normal', 
      description: 'Tamaño estándar',
      preview: 'text-base'
    },
    { 
      key: 'large' as const, 
      name: 'Grande', 
      description: 'Texto más legible',
      preview: 'text-lg'
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-muted/50 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0 bg-background/95 backdrop-blur-xl border-primary/20" 
        align="end"
        sideOffset={8}
      >
        <div className="border-b border-border/50 px-4 py-3">
          <h3 className="font-semibold flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Personalización
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Ajusta la apariencia según tus preferencias
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Selection */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Contrast className="w-4 h-4 mr-2" />
              Tema de color
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((themeOption) => (
                <Button
                  key={themeOption.key}
                  variant={theme === themeOption.key ? "default" : "ghost"}
                  onClick={() => setTheme(themeOption.key)}
                  className="justify-start h-12 p-3"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-2 rounded-lg ${
                      theme === themeOption.key 
                        ? 'bg-primary-foreground text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {themeOption.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{themeOption.name}</span>
                        {theme === themeOption.key && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {themeOption.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Font Size Selection */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Tamaño de fuente
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {fontSizes.map((sizeOption) => (
                <Button
                  key={sizeOption.key}
                  variant={fontSize === sizeOption.key ? "default" : "ghost"}
                  onClick={() => setFontSize(sizeOption.key)}
                  className="justify-start h-12 p-3"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-2 rounded-lg ${
                      fontSize === sizeOption.key 
                        ? 'bg-primary-foreground text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Type className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{sizeOption.name}</span>
                          {fontSize === sizeOption.key && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className={`font-medium ${sizeOption.preview}`}>
                          Aa
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {sizeOption.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Preview Card */}
          <Card className="border-primary/20 bg-gradient-hero">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Vista previa
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-medium">ILUMINA Vital Lounge</span>
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Medicina estética de vanguardia con tecnología avanzada 
                  para resultados excepcionales.
                </p>
                <div className="flex space-x-2 pt-2">
                  <div className="h-2 w-8 bg-primary rounded-full"></div>
                  <div className="h-2 w-6 bg-accent rounded-full"></div>
                  <div className="h-2 w-4 bg-secondary rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-border/50">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-8"
                onClick={() => {
                  setTheme('system');
                  setFontSize('medium');
                }}
              >
                <Zap className="w-3 h-3 mr-1" />
                Restablecer
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};