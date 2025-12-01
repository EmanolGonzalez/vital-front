import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/apiClient";

const AltaCentro = () => {
  const [centerName, setCenterName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [hasEmergencyServices, setHasEmergencyServices] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        centerName,
        address,
        city,
        country,
        contactPhone,
        contactEmail,
        hasEmergencyServices
      };
      const response = await api.post("/centers", body);
      toast({
        title: "Centro registrado",
        description: "El centro fue dado de alta correctamente.",
        variant: "default"
      });
      setTimeout(() => {
        // Redirect to center-login with prefilled email so user can register admin inline
        navigate(`/center-login?prefillEmail=${encodeURIComponent(contactEmail || '')}`);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white/60 via-rose-50 to-white p-6">
      <Card className="max-w-4xl w-full border bg-white/90 rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gradient-to-tr from-primary/10 to-primary/5 flex flex-col justify-center items-start gap-4">
            <div className="w-16 h-16 rounded-md bg-white/30 flex items-center justify-center text-primary"> 
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-inherit">
                <path d="M12 2C8 6 4 9 4 13c0 4 4 7 8 9s8-3 8-7c0-4-4-7-8-13z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold">Registrar Centro</h3>
            <p className="text-sm text-muted-foreground">Crea un nuevo centro para que su administrador pueda gestionar pacientes y servicios.</p>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" placeholder="Nombre del centro" value={centerName} onChange={e => setCenterName(e.target.value)} required />
              <Input type="text" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} required />
              <div className="grid grid-cols-2 gap-3">
                <Input type="text" placeholder="Ciudad" value={city} onChange={e => setCity(e.target.value)} required />
                <Input type="text" placeholder="País" value={country} onChange={e => setCountry(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input type="text" placeholder="Teléfono de contacto" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
                <Input type="email" placeholder="Email de contacto" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
              </div>
              <label className="flex items-center space-x-3">
                <input className="h-4 w-4 rounded border-gray-300" type="checkbox" checked={hasEmergencyServices} onChange={e => setHasEmergencyServices(e.target.checked)} />
                <span className="text-sm">¿Tiene servicios de emergencia?</span>
              </label>
              <div className="flex items-center justify-between gap-3">
                <Button type="submit" variant="luxury" className="flex-1 rounded-full py-3">Registrar centro</Button>
                <Button variant="ghost" onClick={() => navigate('/')}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AltaCentro;
