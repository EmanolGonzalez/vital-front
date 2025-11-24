import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Send, 
  Minimize2, 
  Maximize2,
  X
} from "lucide-react";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "¡Hola! Soy tu asistente de Ruta de Vitalidad. Estoy aquí para ayudarte con recomendaciones personalizadas sobre nutrición, entrenamiento, suplementación y propósito vital. ¿En qué puedo ayudarte hoy?"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { type: "user", content: message }]);
    setMessage("");

    // Simular respuesta de IA
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "assistant",
        content: "Basándome en tu perfil actual y progreso, te recomiendo ajustar tu ingesta de Omega-3 a 3g diarios. Tus biomarcadores muestran un índice de 6.8%, y el objetivo óptimo es >8%. Esto mejorará tu perfil antiinflamatorio y salud cardiovascular."
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-gold hover:shadow-gold/80 transition-all hover:scale-110 group"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-gold hover:shadow-gold/80 px-6"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Asistente IA
          <Badge className="ml-2 bg-primary-foreground text-primary">1</Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Asistente IA - Ruta de Vitalidad</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-xs">Nutrición</Badge>
            <Badge variant="outline" className="text-xs">Entrenamiento</Badge>
            <Badge variant="outline" className="text-xs">Suplementos</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Pregúntame sobre tu plan..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Recomendaciones personalizadas basadas en IA
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
