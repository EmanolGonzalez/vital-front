import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/apiClient";
import { mockCenters, mockAppointments } from '@/data/mockData';
import { parseISO, format } from 'date-fns';
import { Users, Calendar, Settings, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PanelCentro = () => {
  const [panel, setPanel] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const centerId = ""; // obtener desde contexto o query param si está disponible
  const adminEmail = "";
  const { user } = useAuth();

  useEffect(() => {
    const fetchPanel = async () => {
      try {
        if (!centerId) {
          const c = mockCenters[0];
          setPanel({
            centerName: c.name,
            centerEmail: c.email,
            // show admin info only from authenticated user / real API
            adminEmail: user?.email ?? null,
            adminName: user?.name ?? null,
            adminAvatar: user?.avatar ?? null,
            adminPhone: user?.phone ?? null,
            adminRole: user?.role ?? null,
            staffCount: c.staffCount,
            occupancyPercent: c.occupancyPercent,
            appointments: mockAppointments.slice(0,5)
          });
        } else {
          const data = await api.get(`/centers/${centerId}/admin/panel?email=${adminEmail}`);
          setPanel({
            centerName: data.centerName,
            centerEmail: data.contactEmail || data.centerEmail,
            adminEmail: data.adminEmail || data.email,
            adminName: data.adminName || data.name,
            adminAvatar: data.adminAvatar || data.avatar,
            adminPhone: data.adminPhone || data.phone,
            adminRole: data.adminRole || data.role,
            staffCount: data.staffCount ?? 0,
            occupancyPercent: data.occupancyPercent ?? 0,
            appointments: data.recentAppointments ?? []
          });
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchPanel();
  }, [centerId, adminEmail]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!panel) return null;

  return (
    <DashboardLayout title={`Panel - ${panel.centerName ?? 'Centro'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Nº Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{panel.staffCount ?? 0}</div>
                <div className="text-sm text-muted-foreground">Personal activo</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ocupación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{panel.occupancyPercent ?? 0}%</div>
                <div className="text-sm text-muted-foreground">Capacidad actual</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Citas hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(panel.appointments || []).length}</div>
                <div className="text-sm text-muted-foreground">Próximas citas</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Próximas citas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(panel.appointments || []).map((a: any) => {
                  // support multiple shapes: { startsAt } ISO or { date, time }
                  let timeLabel = '';
                  try {
                    if (a.startsAt) {
                      timeLabel = format(parseISO(a.startsAt), 'HH:mm');
                    } else if (a.date && a.time) {
                      // combine date and time to ISO-like string
                      const iso = `${a.date}T${a.time}`;
                      timeLabel = format(parseISO(iso), 'HH:mm');
                    } else if (a.time) {
                      timeLabel = a.time;
                    } else if (a.date) {
                      timeLabel = a.date;
                    }
                  } catch {
                    timeLabel = (a.time) ? a.time : (a.date ? a.date : '—');
                  }
                  return (
                    <div key={a.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-semibold">{a.patientName}</div>
                        <div className="text-sm text-muted-foreground">{a.service || a.treatment || a.type}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{timeLabel}</div>
                    </div>
                  );
                })}
                {(!panel.appointments || panel.appointments.length === 0) && <div className="text-sm text-muted-foreground">No hay citas próximas.</div>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                  {panel.adminAvatar ? (
                    <img src={panel.adminAvatar} alt="avatar" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">{(panel.adminName || panel.adminEmail || 'A').charAt(0)}</div>
                  )}
                  <div>
                    <p className="font-semibold">{panel.adminName ?? 'Sin administrador registrado'}</p>
                    {panel.adminEmail ? (
                      <p className="text-sm text-muted-foreground">{panel.adminEmail}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay email asociado</p>
                    )}
                  </div>
                </div>
                {panel.adminPhone && <p className="text-sm mt-2">Tel: {panel.adminPhone}</p>}
                {panel.adminRole && <p className="text-sm text-muted-foreground mt-1">Rol: {panel.adminRole}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/admin/users'}>
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Usuarios</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/reservar'}>
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Agenda</span>
                </Button>
                <a
                  href={panel?.centerWebsite ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded border border-gray-200 p-3 text-sm hover:bg-gray-50"
                >
                  <FileText size={20} />
                  <div>
                    <div className="text-xs text-gray-500">Centro</div>
                    <div className="text-sm font-medium">Ver perfil</div>
                  </div>
                </a>

                <a
                  href={panel?.centerEmail ? `mailto:${panel.centerEmail}` : '#'}
                  className="flex items-center gap-3 rounded border border-gray-200 p-3 text-sm hover:bg-gray-50"
                >
                  <Settings size={20} />
                  <div>
                    <div className="text-xs text-gray-500">Contacto</div>
                    <div className="text-sm font-medium">Escribir al centro</div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default PanelCentro;
