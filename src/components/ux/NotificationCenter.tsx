import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useUX } from '@/contexts/UXContext';
import {
  Bell,
  Check,
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Trash2,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const NotificationCenter = () => {
  const { 
    notifications, 
    unreadCount, 
    removeNotification, 
    markAsRead,
    addNotification 
  } = useUX();
  const [open, setOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBorderColor = (type: string, read: boolean) => {
    if (read) return 'border-border/50';
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50/50';
      case 'warning': return 'border-yellow-200 bg-yellow-50/50';
      case 'error': return 'border-red-200 bg-red-50/50';
      default: return 'border-blue-200 bg-blue-50/50';
    }
  };

  const clearAllNotifications = () => {
    notifications.forEach(n => removeNotification(n.id));
  };

  const markAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) markAsRead(n.id);
    });
  };

  // Demo notifications for testing
  const addDemoNotifications = () => {
    addNotification({
      type: 'success',
      title: 'Cita confirmada',
      message: 'Tu cita del 15 de enero a las 10:00 ha sido confirmada',
      action: {
        label: 'Ver detalles',
        onClick: () => console.log('Ver cita')
      }
    });
    
    addNotification({
      type: 'info',
      title: 'Recordatorio',
      message: 'Tienes una consulta médica mañana a las 14:30',
    });
    
    addNotification({
      type: 'warning',
      title: 'Documentos pendientes',
      message: 'Completa tu perfil médico para obtener mejor atención',
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-muted/50 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-96 p-0 bg-background/95 backdrop-blur-xl border-primary/20" 
        align="end"
        sideOffset={8}
      >
        <div className="border-b border-border/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {unreadCount} nuevas
                </Badge>
              )}
            </h3>
            <div className="flex items-center space-x-1">
              {notifications.length > 0 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-6 px-2"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Marcar leídas
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="text-xs h-6 px-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground mb-4">
                No tienes notificaciones
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addDemoNotifications}
                className="text-xs"
              >
                Generar notificaciones de prueba
              </Button>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`mx-2 mb-2 p-3 rounded-lg border transition-all hover:shadow-soft ${getBorderColor(notification.type, notification.read)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {notification.title}
                          </h4>
                          <p className={`text-xs mt-1 ${notification.read ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                            {notification.message}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground/70">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDistanceToNow(notification.timestamp, { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {notification.action && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={notification.action.onClick}
                              className="text-xs h-6 px-2 text-primary hover:text-primary"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                          
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs h-6 px-2"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="border-t border-border/50 px-4 py-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-primary hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Ver todas las notificaciones
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};