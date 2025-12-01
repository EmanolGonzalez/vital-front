import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/apiClient";

const AltaAdminCentro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [centerId, setCenterId] = useState(""); // Se puede obtener por props, contexto o query param
  const [centerNotFound, setCenterNotFound] = useState<string | null>(null);

  useEffect(() => {
    // Prefill email if provided in querystring as ?centerEmail=...
    try {
      const qp = new URLSearchParams(location.search);
      const centerEmail = qp.get('prefillEmail') ?? qp.get('centerEmail');
      if (centerEmail) setEmail(centerEmail);
    } catch {}
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast({ title: 'Acepta los términos', description: 'Debes aceptar los términos para continuar.', variant: 'destructive' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Contraseña débil', description: 'La contraseña debe tener al menos 8 caracteres.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Contraseñas no coinciden', description: 'Confirma correctamente la contraseña.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      // Resolve center by identifier (email or name) using secure lookup
        let resolvedCenterId: string | null = null;
        try {
          const lookup = await api.post('/Centers/lookup', { identifier: email || name });
          if (lookup?.found) resolvedCenterId = lookup.centerId;
        } catch {}

        if (!resolvedCenterId) {
          // If not found, instruct the user to create the center first and show CTA
          const identifier = email || name || '';
          setCenterNotFound(identifier || '');
          toast({ title: 'Centro no encontrado', description: 'No se encontró un centro con ese email/nombre. Puedes crear el centro desde la opción indicada.', variant: 'destructive' });
          // show inline CTA instead of navigating away
          return;
        }

        const body = {
          email,
          name,
          phone,
          password
        };
        await api.post(`/centers/${resolvedCenterId}/admin`, body);
      toast({ title: "Administrador registrado", description: "El administrador del centro fue dado de alta correctamente.", variant: 'default' });
      setTimeout(() => navigate('/panel-centro'), 800);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      toast({ title: "Error al registrar administrador", description: errorMsg, variant: "destructive" });
    } finally {
      setIsLoading(false);
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
            <Input type="text" placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} required />
            <Input type="email" placeholder="Email del administrador" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="tel" placeholder="Teléfono (opcional)" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input type="password" placeholder="Contraseña (mínimo 8 caracteres)" value={password} onChange={e => setPassword(e.target.value)} required />
            <Input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            <div className="flex items-center space-x-2">
              <input id="terms" type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
              <label htmlFor="terms" className="text-sm text-muted-foreground">Acepto los <a className="underline">términos y condiciones</a></label>
            </div>
            <div className="text-sm text-muted-foreground">No es necesario introducir el ID del centro. Introduce el email o nombre del centro en el campo "Email del administrador" y el sistema intentará localizar el centro automáticamente.</div>
            <Button type="submit" variant="luxury" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrar administrador'}
            </Button>
          </form>
          {centerNotFound && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="text-sm">No se encontró un centro con "{centerNotFound}".</div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/alta-centro?prefillEmail=${encodeURIComponent(centerNotFound)}`)}
                >
                  Crear centro
                </Button>
                <Button variant="ghost" onClick={() => setCenterNotFound(null)}>Cancelar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AltaAdminCentro;
