import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart,
  Shield,
  FileText,
  Users,
  Crown
} from "lucide-react";

export const Footer = () => {
  const quickLinks = [
    { name: "Quiénes Somos", href: "#quienes-somos" },
    { name: "Tratamientos", href: "#tratamientos" },
    { name: "Sueroterapia", href: "#sueroterapia" },
    { name: "Performance", href: "#performance" },
    { name: "Membresías", href: "#membresias" },
    { name: "Instalaciones", href: "#instalaciones" }
  ];

  const services = [
    "Medicina Estética Facial",
    "Estética Corporal",
    "Sueroterapia IV",
    "Revitalización Celular",
    "Performance Recovery",
    "Jet Lag Reset"
  ];

  const legalLinks = [
    { name: "Aviso Legal", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Cookies", href: "#" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                  <span className="text-primary-foreground font-bold text-xl">I</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">ILUMINA</h3>
                  <p className="text-sm opacity-80">Vital Lounge</p>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed mb-6">
                Centro pionero en medicina estética avanzada y revitalización celular. 
                Revelamos tu mejor versión desde adentro hacia afuera.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Calle 50, Torre Global Plaza, Panamá</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">+507 263-0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">info@iluminavitallounge.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary">Navegación</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm opacity-90 hover:text-primary hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-sm opacity-90">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Newsletter</h4>
              <p className="text-sm opacity-90 mb-4">
                Recibe consejos exclusivos de belleza y bienestar.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="tu@email.com"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                />
                <Button variant="gold" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-background hover:text-primary p-2">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-background hover:text-primary p-2">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-background hover:text-primary p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="opacity-80 hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center"
              >
                <FileText className="w-3 h-3 mr-1" />
                {link.name}
              </a>
            ))}
          </div>

          {/* Special Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a 
              href="#medicos"
              className="opacity-80 hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center"
            >
              <Users className="w-3 h-3 mr-1" />
              Información para Médicos
            </a>
            <a 
              href="#miembros"
              className="opacity-80 hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center"
            >
              <Crown className="w-3 h-3 mr-1" />
              Acceso Miembros
            </a>
            <a 
              href="#"
              className="opacity-80 hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center"
            >
              <Shield className="w-3 h-3 mr-1" />
              Certificaciones
            </a>
          </div>
        </div>

        <Separator className="bg-background/20 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm opacity-80">
            © 2024 ILUMINA Vital Lounge. Todos los derechos reservados.
            <span className="block sm:inline sm:ml-2 mt-2 sm:mt-0">
              Centro médico estético autorizado. Registro sanitario: ES-M-001234567
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};