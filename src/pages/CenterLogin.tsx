import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import api, { setAccessToken } from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthContext";

// Fallback local check (solo para desarrollo cuando el backend no expone el endpoint exacto)
const checkCenterHasAdmin = (identifier: string) => identifier.includes("admin");

const CenterLogin = () => {
  const [identifier, setIdentifier] = useState(""); // usuario o correo
  const [password, setPassword] = useState("");
  const [centerId, setCenterId] = useState(""); // opcional: puede venir por query string
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateCenterCTA, setShowCreateCenterCTA] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setTokenFromExternal } = useAuth();

  // Nuevo flujo: enviar email+password. Intentar login directo; si falla, comprobar si el centro tiene admin
  // y redirigir al registro si no existe.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // New flow: first lookup the center by identifier. Then:
      // - if not found: offer create center
      // - if found and has admin: attempt login with provided password
      // - if found and no admin: open admin registration (skip password verification)
      let resolvedCenterId = centerId;
      if (!resolvedCenterId) {
        try {
          const lookup = await api.post('/Centers/lookup', { identifier });
          if (lookup?.found) resolvedCenterId = lookup.centerId;
          // If lookup returned hasAdmin, we can branch later without extra calls
        } catch (lookupErr) {
          // lookup failed (network/server) — fall back to previous behavior: try generic login
          const ok = await login(identifier, password);
          if (ok) {
            toast({ title: "Acceso concedido", description: "Redirigiendo al panel del centro" });
            navigate("/panel-centro");
            return;
          }
          // if login also failed, show create CTA
          setShowCreateCenterCTA(true);
          setShowRegister(false);
          setCenterId("");
          return;
        }
      }

      if (!resolvedCenterId) {
        // Centro no encontrado — ofrecer crear centro
        setShowCreateCenterCTA(true);
        setShowRegister(false);
        setCenterId("");
        return;
      }

      // We have a centerId — re-run lookup to read hasAdmin (or use cached lookup)
      try {
        const lookup2 = await api.post('/Centers/lookup', { identifier });
        const hasAdmin = !!lookup2?.hasAdmin;
        if (hasAdmin) {
          // center has admin — attempt center-admin login
          const res = await api.post(`/centers/${resolvedCenterId}/admin/login`, { email: identifier, password });
          const token = res?.accessToken ?? res?.Token ?? res?.token ?? res?.tokenValue ?? res?.data?.token;
          if (token) {
            if (setTokenFromExternal) {
              const ok = await setTokenFromExternal(token);
              if (ok) {
                toast({ title: "Acceso concedido", description: "Redirigiendo al panel del centro" });
                navigate('/panel-centro');
                return;
              }
            }
            setAccessToken(token);
            toast({ title: "Acceso concedido", description: "Redirigiendo al panel del centro" });
            navigate('/panel-centro');
            return;
          }
          toast({ title: "Credenciales inválidas", description: "Usuario o contraseña incorrectos.", variant: 'destructive' });
          setShowRegister(false);
          setShowCreateCenterCTA(false);
        } else {
          // No admin yet — show registration
          setShowRegister(true);
          setCenterId(resolvedCenterId);
          setShowCreateCenterCTA(false);
          return;
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        toast({ title: 'Error comprobando centro', description: message, variant: 'destructive' });
      }
      } catch (err) {
      // fallback
      const fallback = checkCenterHasAdmin(identifier);
      if (fallback) {
        toast({ title: "Credenciales inválidas", description: "El centro tiene administrador. Verifica tu contraseña.", variant: "destructive" });
      } else {
        // no sabemos del centro; sugerir crear el centro
        setShowCreateCenterCTA(true);
        setShowRegister(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Prefill identifier and open inline register when coming from AltaCentro
  useEffect(() => {
    try {
      const qp = new URLSearchParams(location.search);
      const prefill = qp.get('prefillEmail') ?? qp.get('centerEmail');
      if (prefill) {
        setIdentifier(prefill);
        // Resolver el centro antes de mostrar el formulario de admin
        (async () => {
          try {
            const lookup = await api.post('/Centers/lookup', { identifier: prefill });
            if (lookup?.found) {
              setCenterId(lookup.centerId);
              const hasAdmin = !!lookup?.hasAdmin;
              if (hasAdmin) {
                toast({ title: 'Centro ya tiene administrador', description: 'Inicia sesión con las credenciales del administrador.', variant: 'destructive' });
                setShowRegister(false);
                setShowCreateCenterCTA(false);
              } else {
                setShowRegister(true);
                setShowCreateCenterCTA(false);
              }
            } else {
              setShowCreateCenterCTA(true);
            }
          } catch (_) {
            setShowCreateCenterCTA(true);
          }
        })();
      }
    } catch {
      setShowCreateCenterCTA(true);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-cream flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-14 h-14 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
              <span className="text-primary-foreground font-bold text-2xl">I</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">ILUMINA</h1>
              <p className="text-muted-foreground">Centro · Acceso</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Acceso Centro ILUMINA</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Acceso y registro para administradores de centros</p>
        </div>

        <div className="flex items-center justify-center">
          <Card className="border-none shadow-elegant bg-gradient-hero w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 mr-3 text-primary" />
                Inicio de Centro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
          {!showRegister && (
            <div className="transition-opacity duration-300 w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Usuario o correo del centro"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="bg-background"
                  required
                />
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-background"
                  required
                />
                <Button type="submit" variant="luxury" className="w-full rounded-full py-3" disabled={isLoading}>
                  {isLoading ? 'Validando...' : 'Entrar'}
                </Button>
              </form>
              <div className="text-center mt-3">
                {showCreateCenterCTA && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">No se encontró el centro. ¿Quieres crear uno?</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="secondary" onClick={() => window.dispatchEvent(new CustomEvent('openCenterModal', { detail: { email: identifier } }))}>Crear centro</Button>
                      <Button variant="ghost" onClick={() => { setShowCreateCenterCTA(false); }}>Cancelar</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {showRegister && (
            <div className="mt-6 p-6 border rounded-md bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">{centerId ? 'Registrar Administrador' : 'Crear Centro y Administrador'}</h3>
                <Button variant="ghost" onClick={() => setShowRegister(false)}>Volver</Button>
              </div>
              <div className="space-y-3">
                <Input type="text" placeholder="Nombre completo del administrador" value={regName} onChange={e => setRegName(e.target.value)} className="bg-background" />
                <Input type="tel" placeholder="Teléfono (opcional)" value={regPhone} onChange={e => setRegPhone(e.target.value)} className="bg-background" />
                <Input type="password" placeholder="Contraseña" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="bg-background" />
                <Input type="password" placeholder="Confirmar contraseña" value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} className="bg-background" />
                <div className="flex items-center space-x-2">
                  <input id="terms-inline" type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
                  <label htmlFor="terms-inline" className="text-sm text-muted-foreground">Acepto los términos</label>
                </div>
                <div className="flex gap-2">
                  <Button className="rounded-md" variant="secondary" onClick={async () => {
                    // Register flow: either create center then admin, or just admin if centerId present
                    if (!agreeTerms) { toast({ title: 'Acepta los términos', variant: 'destructive' }); return; }
                    if (regPassword.length < 8) { toast({ title: 'Contraseña débil', description: 'Mínimo 8 caracteres', variant: 'destructive' }); return; }
                    if (regPassword !== regConfirmPassword) { toast({ title: 'Contraseñas no coinciden', variant: 'destructive' }); return; }
                    setIsRegistering(true);
                    try {
                      let targetCenterId = centerId;
                      if (!targetCenterId) {
                        // create center
                        const centerBody = {
                          CenterName: identifier || regName,
                          Address: "",
                          ContactEmail: identifier && identifier.includes('@') ? identifier : regPhone || '',
                          ContactPhone: regPhone,
                          Email: identifier && identifier.includes('@') ? identifier : '',
                          Password: regPassword,
                          FirstName: regName.split(' ')[0] || regName,
                          LastName: regName.split(' ').slice(1).join(' ') || ""
                        };
                        const createRes = await api.post('/centers', centerBody);
                        targetCenterId = createRes?.centerId ?? createRes?.id ?? '';
                        if (!targetCenterId) throw new Error('No se pudo crear el centro');
                      }

                      // create admin for target center
                      const adminBody = { Email: identifier && identifier.includes('@') ? identifier : (regPhone || ''), Name: regName, Password: regPassword };
                      await api.post(`/centers/${targetCenterId}/admin`, adminBody);
                      // Auto-login the new admin (keep credentials in memory only)
                      const logged = await login(identifier && identifier.includes('@') ? identifier : adminBody.Email, regPassword);
                      if (logged) {
                        toast({ title: 'Registro exitoso', description: 'Administrador creado y autenticado.' });
                        navigate('/panel-centro');
                        return;
                      } else {
                        toast({ title: 'Registro creado', description: 'Administrador creado. Inicia sesión para continuar.' });
                        setShowRegister(false);
                      }
                    } catch (err: unknown) {
                      const msg = err instanceof Error ? err.message : JSON.stringify(err);
                      toast({ title: 'Error en registro', description: msg, variant: 'destructive' });
                    } finally {
                      setIsRegistering(false);
                    }
                  }}>
                    {isRegistering ? 'Registrando...' : 'Crear centro y administrador'}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowRegister(false)}>Cancelar</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default CenterLogin;
