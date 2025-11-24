import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Clock,
  CheckCheck,
  User,
  Stethoscope
} from "lucide-react";

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'voice';
}

export const ChatMedico = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'doctor',
      content: '¡Hola! Soy la Dra. García. ¿Cómo te sientes después del tratamiento de ayer?',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      type: 'text'
    },
    {
      id: '2',
      sender: 'patient',
      content: 'Muy bien, doctora. Me siento con mucha más energía. La sueroterapia fue increíble.',
      timestamp: new Date(Date.now() - 3300000),
      read: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'doctor',
      content: 'Excelente! Esa es exactamente la respuesta que esperábamos. ¿Has notado algún cambio en tu calidad de sueño?',
      timestamp: new Date(Date.now() - 3000000),
      read: true,
      type: 'text'
    },
    {
      id: '4',
      sender: 'patient',
      content: 'Sí, duermo mucho mejor. ¿Cuándo sería recomendable la próxima sesión?',
      timestamp: new Date(Date.now() - 2700000),
      read: true,
      type: 'text'
    },
    {
      id: '5',
      sender: 'doctor',
      content: 'Perfecto. Basándome en tu respuesta, recomiendo que esperemos 2 semanas. Te enviaré el protocolo personalizado en unos minutos.',
      timestamp: new Date(Date.now() - 600000),
      read: false,
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'patient',
      content: newMessage,
      timestamp: new Date(),
      read: false,
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate doctor typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        content: 'Gracias por tu mensaje. Lo revisaré y te responderé pronto con recomendaciones específicas.',
        timestamp: new Date(),
        read: false,
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-soft border-none bg-card">
      {/* Header */}
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Stethoscope className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Dra. García</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">En línea</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
              message.sender === 'patient' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className={
                  message.sender === 'doctor' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }>
                  {message.sender === 'doctor' ? (
                    <Stethoscope className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className={`rounded-lg px-4 py-2 ${
                message.sender === 'patient'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center justify-end mt-1 space-x-1 ${
                  message.sender === 'patient' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                  {message.sender === 'patient' && (
                    <CheckCheck className={`w-3 h-3 ${message.read ? 'text-blue-300' : ''}`} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Stethoscope className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1 h-8 w-8 p-0"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-gold text-primary-foreground hover:shadow-gold"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick Replies */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setNewMessage('¿Cuándo es mi próxima cita?')}
          >
            ¿Próxima cita?
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setNewMessage('Tengo una pregunta sobre mi tratamiento')}
          >
            Pregunta tratamiento
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setNewMessage('¿Hay alguna promoción disponible?')}
          >
            Promociones
          </Badge>
        </div>
      </div>
    </Card>
  );
};