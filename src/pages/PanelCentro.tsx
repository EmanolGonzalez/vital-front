import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { mockCenters, mockAppointments } from '@/data/mockData';
import { parseISO } from 'date-fns';

const PanelCentro = () => {
  const [panel, setPanel] = useState<{
    centerName?: string;
    centerEmail?: string;
    adminEmail?: string;
    adminName?: string;
    staffCount?: number;
    occupancyPercent?: number;
    appointmentsToday?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const centerId = ""; // Se puede obtener por props, contexto o query param
  const adminEmail = ""; // Se puede obtener por props, contexto o query param

  useEffect(() => {
    const fetchPanel = async () => {
      try {
        if (!centerId) {
          // fall back to mock data when no centerId provided
          const c = mockCenters[0];
          setPanel({
            centerName: c.name,
            centerEmail: c.email,
            adminEmail: c.adminEmail,
            adminName: c.adminName,
            staffCount: c.staffCount,
            occupancyPercent: c.occupancyPercent,
            appointmentsToday: c.appointmentsToday ?? mockAppointments.length
          });
        } else {
          const data = await api.get(`/centers/${centerId}/admin/panel?email=${adminEmail}`);
          setPanel(data);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream p-4">
      <Card className="max-w-2xl w-full border-none shadow-elegant bg-gradient-hero">
        <CardHeader>
          <CardTitle className="text-2xl">Panel de Gestión del Centro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {panel.centerName}</p>
            <p><strong>Correo:</strong> {panel.centerEmail}</p>
            <p><strong>Administrador:</strong> {panel.adminEmail}</p>
            <p><strong>Nombre Admin:</strong> {panel.adminName}</p>
          </div>
          <div className="space-y-2">
            <Button variant="luxury" className="w-full">Gestionar servicios</Button>
            <Button variant="luxury" className="w-full">Gestionar médicos</Button>
            <Button variant="luxury" className="w-full">Ver reportes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PanelCentro;
