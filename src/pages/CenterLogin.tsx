import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/apiClient";

// Simulación: verificar si el centro tiene admin
const checkCenterHasAdmin = (centerEmail: string) => {
  // Aquí iría la llamada real al backend
  // Simulación: si el email contiene "admin", tiene admin
  return centerEmail.includes("admin");
};

const CenterLogin = () => {
  const [centerEmail, setCenterEmail] = useState("");
  const [centerId, setCenterId] = useState(""); // Se puede obtener por props, contexto o query param
  const [checked, setChecked] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!centerId) throw new Error("Falta el ID del centro");
      await api.get(`/centers/${centerId}/admin/panel?email=${centerEmail}`);
      setHasAdmin(true);
    } catch {
      setHasAdmin(false);
    }
    setChecked(true);
  };

  const handleAltaAdmin = () => {
    navigate("/alta-admin-centro");
  };

  const handlePanel = () => {
    navigate("/panel-centro");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream p-4">
      <Card className="max-w-lg w-full border-none shadow-elegant bg-gradient-hero">
        <CardHeader>
          <CardTitle className="text-2xl">Acceso Centro ILUMINA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleCheck} className="space-y-4">
            <Input
              type="email"
              placeholder="Email del centro"
              value={centerEmail}
              onChange={e => setCenterEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="luxury" className="w-full">Validar acceso</Button>
          </form>
          {checked && (
            hasAdmin ? (
              <div className="space-y-3 text-center">
                <p className="text-green-700 font-semibold">Centro con administrador registrado.</p>
                <Button variant="luxury" className="w-full" onClick={handlePanel}>Ir al panel de gestión</Button>
              </div>
            ) : (
              <div className="space-y-3 text-center">
                <p className="text-yellow-700 font-semibold">Este centro no tiene administrador registrado.</p>
                <Button variant="luxury" className="w-full" onClick={handleAltaAdmin}>Registrar administrador</Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CenterLogin;
