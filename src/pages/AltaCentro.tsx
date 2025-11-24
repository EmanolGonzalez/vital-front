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
        navigate("/alta-admin-centro?centerId=" + response.centerId);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream p-4">
      <Card className="max-w-lg w-full border-none shadow-elegant bg-gradient-hero">
        <CardHeader>
          <CardTitle className="text-2xl">Alta de Centro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Nombre del centro" value={centerName} onChange={e => setCenterName(e.target.value)} required />
            <Input type="text" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} required />
            <Input type="text" placeholder="Ciudad" value={city} onChange={e => setCity(e.target.value)} required />
            <Input type="text" placeholder="País" value={country} onChange={e => setCountry(e.target.value)} required />
            <Input type="text" placeholder="Teléfono de contacto" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
            <Input type="email" placeholder="Email de contacto" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={hasEmergencyServices} onChange={e => setHasEmergencyServices(e.target.checked)} />
              <span>¿Tiene servicios de emergencia?</span>
            </label>
            <Button type="submit" variant="luxury" className="w-full">Registrar centro</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AltaCentro;
