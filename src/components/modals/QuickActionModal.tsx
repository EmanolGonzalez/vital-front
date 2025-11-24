import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  Settings,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";

interface QuickActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: string;
}

export const QuickActionModal = ({ open, onOpenChange, actionType }: QuickActionModalProps) => {
  const actionData = {
    historial: {
      title: "Historial Médico",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      items: [
        { name: "Historial Completo PDF", action: "download", icon: <Download className="w-4 h-4" /> },
        { name: "Resultados de Laboratorio", action: "view", icon: <FileText className="w-4 h-4" /> },
        { name: "Imágenes Médicas", action: "view", icon: <FileText className="w-4 h-4" /> },
        { name: "Notas del Médico", action: "view", icon: <FileText className="w-4 h-4" /> }
      ]
    },
    citas: {
      title: "Gestión de Citas",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      items: [
        { name: "Próximas Citas", action: "view", icon: <Calendar className="w-4 h-4" /> },
        { name: "Historial de Citas", action: "view", icon: <Clock className="w-4 h-4" /> },
        { name: "Reagendar Cita", action: "schedule", icon: <Calendar className="w-4 h-4" /> },
        { name: "Cancelar Cita", action: "cancel", icon: <Calendar className="w-4 h-4" /> }
      ]
    },
    pagos: {
      title: "Facturación y Pagos",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      items: [
        { name: "Facturas Pendientes", action: "view", icon: <CreditCard className="w-4 h-4" /> },
        { name: "Historial de Pagos", action: "view", icon: <CheckCircle className="w-4 h-4" /> },
        { name: "Métodos de Pago", action: "manage", icon: <Settings className="w-4 h-4" /> },
        { name: "Descargar Facturas", action: "download", icon: <Download className="w-4 h-4" /> }
      ]
    },
    comunicacion: {
      title: "Comunicación",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      items: [
        { name: "Mensajes del Médico", action: "view", icon: <MessageCircle className="w-4 h-4" /> },
        { name: "Consulta Rápida", action: "message", icon: <MessageCircle className="w-4 h-4" /> },
        { name: "Solicitar Información", action: "request", icon: <MessageCircle className="w-4 h-4" /> },
        { name: "Soporte Técnico", action: "support", icon: <Settings className="w-4 h-4" /> }
      ]
    }
  };

  const currentAction = actionData[actionType as keyof typeof actionData];

  const handleActionClick = (action: string, itemName: string) => {
    let message = "";
    
    switch(action) {
      case "download":
        message = `Descargando ${itemName}...`;
        break;
      case "view":
        message = `Abriendo ${itemName}...`;
        break;
      case "schedule":
        message = "Abriendo calendario para reagendar...";
        break;
      case "cancel":
        message = "Procesando cancelación de cita...";
        break;
      case "manage":
        message = `Gestionando ${itemName}...`;
        break;
      case "message":
        message = "Abriendo chat con el médico...";
        break;
      case "request":
        message = "Abriendo formulario de solicitud...";
        break;
      case "support":
        message = "Conectando con soporte técnico...";
        break;
      default:
        message = `Ejecutando ${itemName}...`;
    }

    toast({
      title: "Acción Ejecutada",
      description: message,
    });

    // Simulate action delay
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  if (!currentAction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <div className={`p-3 bg-gradient-to-r ${currentAction.color} rounded-full text-white mr-3`}>
              {currentAction.icon}
            </div>
            {currentAction.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3">
            {currentAction.items.map((item, index) => (
              <Card 
                key={index}
                className="group cursor-pointer border-none shadow-soft hover:shadow-gold transition-all duration-300 hover:scale-105"
                onClick={() => handleActionClick(item.action, item.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent rounded-lg">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.action === "download" ? "Descargar" :
                         item.action === "view" ? "Ver" :
                         item.action === "schedule" ? "Agendar" :
                         item.action === "cancel" ? "Cancelar" :
                         item.action === "manage" ? "Gestionar" :
                         item.action === "message" ? "Mensaje" :
                         item.action === "request" ? "Solicitar" :
                         item.action === "support" ? "Soporte" : "Acción"}
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              💡 Estas acciones son simuladas para demostración. 
              En la implementación real estarían conectadas a tu base de datos.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};