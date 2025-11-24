import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chip, ChipList } from "../ui/chip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import api from "@/lib/apiClient";

interface CenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CenterModal = ({ open, onOpenChange }: CenterModalProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const defaultServices = [
    "Medicina Estética",
    "Sueroterapia",
    "Performance",
    "Biohacking",
    "Consulta General",
    "Nutrición",
    "Dermatología"
  ];

  const handleServiceToggle = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        centerName: name.substring(0, 200),
        address: location.substring(0, 500),
        city: location && location.trim() ? location.substring(0, 100) : "Sin ciudad",
        country: "México",
        contactPhone: "0000000000",
        contactEmail: email.substring(0, 256),
        services: services.join(", ").substring(0, 2000),
      };
      await api.post("/centers", body);
      toast({
        title: "Centro registrado",
        description: "El centro fue dado de alta correctamente. Ahora puedes iniciar sesión como centro.",
        variant: "default"
      });
      onOpenChange(false);
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      toast({
        title: "Error al registrar centro",
        description: errorMsg,
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            Alta de Centro
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del Centro</label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ubicación</label>
                <Input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo del Centro</label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="correo@centro.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Servicios ofrecidos</label>
                <ChipList>
                  {defaultServices.map((service) => (
                    <Chip
                      key={service}
                      selected={services.includes(service)}
                      onClick={() => handleServiceToggle(service)}
                    >
                      {service}
                    </Chip>
                  ))}
                </ChipList>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="luxury" className="flex-1">Registrar Centro</Button>
                <Button type="button" variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
