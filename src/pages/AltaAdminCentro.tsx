import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/apiClient";

const AltaAdminCentro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [centerId, setCenterId] = useState(""); // Se puede obtener por props, contexto o query param

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!centerId) throw new Error("Falta el ID del centro");
      const body = {
        email,
        name,
        password
      };
      await api.post(`/centers/${centerId}/admin`, body);
      toast({
        title: "Administrador registrado",
        description: "El administrador del centro fue dado de alta correctamente.",
        variant: "default"
      });
      setTimeout(() => {
        navigate("/panel-centro");
      }, 800);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      toast({
        title: "Error al registrar administrador",
        description: errorMsg,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream p-4">
      <Card className="max-w-lg w-full border-none shadow-elegant bg-gradient-hero">
        <CardHeader>
          <CardTitle className="text-2xl">Alta de Administrador de Centro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email del administrador"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="luxury" className="w-full">Registrar administrador</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AltaAdminCentro;
