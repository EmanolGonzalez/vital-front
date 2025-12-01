import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import api from '@/lib/apiClient';
import { mockAppointments, mockPatients, mockTreatments, mockPayments, mockCenters } from "@/data/mockData";
import { useEffect, useState } from 'react';
import { parseISO, differenceInDays } from 'date-fns';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Package, 
  FileText, 
  CreditCard, 
  BarChart3,
  DollarSign,
  Activity,
  UserCheck
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<{
    totalPatients: number;
    patientsActive30Days: number;
    centersCount: number;
    appointmentsToday: number;
    monthlyRevenue: number;
    pendingInvoices: number;
    newPatientsThisWeek: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [summaryData, activityData] = await Promise.all([
          api.get('/admin/summary'),
          api.get('/admin/activity?take=6')
        ]);
        if (mounted) {
          setSummary(summaryData);
          // @ts-ignore
          setActivity(activityData);
        }
      } catch (err: any) {
        console.error('Error loading admin summary', err);
        if (mounted) setError(err?.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
  const [activity, setActivity] = useState<Array<{ type: string; title: string; description?: string; occurredAt: string }>>([]);

  const totalPatients = summary?.totalPatients ?? mockPatients.length;
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const todayAppointments = summary?.appointmentsToday ?? mockAppointments.filter(apt => apt.date === todayStr).length;

  // Revenue this month
  const monthlyRevenue = summary?.monthlyRevenue ?? mockPayments.reduce((sum, payment) => {
    try {
      const d = parseISO(payment.date);
      if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()) {
        return sum + payment.amount;
      }
    } catch {
      return sum;
    }
    return sum;
  }, 0);

  const completedTreatments = mockTreatments.filter(t => t.status === 'completed').length;

  // New computed stats
  const patientsActive30 = summary?.patientsActive30Days ?? mockPatients.filter(p => {
    try {
      const d = parseISO(p.lastVisit);
      return differenceInDays(today, d) <= 30;
    } catch {
      return false;
    }
  }).length;

  const centersCount = summary?.centersCount ?? mockCenters.length;
  const pendingInvoices = summary?.pendingInvoices ?? mockPayments.filter(p => p.status === 'pending').length;
  const lowStock = 2; // keep as placeholder
  const newPatients = summary?.newPatientsThisWeek ?? mockPatients.filter(p => {
    try {
      const d = parseISO(p.lastVisit);
      return differenceInDays(today, d) <= 7;
    } catch {
      return false;
    }
  }).length;

  return (
    <DashboardLayout title="Panel de Administración">
      <div className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Pacientes"
            value={totalPatients}
            description="Registrados"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Citas Hoy"
            value={todayAppointments}
            description="Programadas"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="Ingresos Mes"
            value={`€${monthlyRevenue}`}
            description="Enero 2024"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Tratamientos"
            value={completedTreatments}
            description="Este mes"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Operational Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Facturas Pendientes"
            value={pendingInvoices}
            description="Requieren atención"
            icon={<FileText className="h-4 w-4" />}
            className="border-orange-200"
          />
          <StatCard
            title="Stock Bajo"
            value={lowStock}
            description="Productos"
            icon={<Package className="h-4 w-4" />}
            className="border-red-200"
          />
          <StatCard
            title="Nuevos Pacientes"
            value={newPatients}
            description="Esta semana"
            icon={<UserCheck className="h-4 w-4" />}
            className="border-green-200"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimos movimientos del sistema
              </CardDescription>
            </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Cargando actividad...</div>
                  ) : error ? (
                    <div className="text-sm text-red-600">{error}</div>
                  ) : activity.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No hay actividad reciente</div>
                  ) : (
                    activity.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${it.type === 'patient' ? 'bg-green-500' : it.type === 'appointment' ? 'bg-blue-500' : it.type === 'treatment' ? 'bg-purple-500' : 'bg-gray-400'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.title}</p>
                          {it.description && <p className="text-xs text-muted-foreground">{it.description}</p>}
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(it.occurredAt).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión Rápida</CardTitle>
              <CardDescription>
                Accesos directos a funciones administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/admin/users'}>
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Usuarios</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/admin/centers'}>
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Centros</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Agenda Global</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Package className="h-5 w-5" />
                  <span className="text-sm">Inventario</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Facturas</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm">Pagos</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">Reportes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resumen Financiero
            </CardTitle>
            <CardDescription>
              Estado financiero del período actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <h3 className="text-2xl font-bold text-green-600">€{monthlyRevenue}</h3>
                <p className="text-sm text-muted-foreground">Ingresos Este Mes</p>
                <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                  +23% vs mes anterior
                </Badge>
              </div>
              
              <div className="text-center p-4 border border-border rounded-lg">
                <h3 className="text-2xl font-bold text-orange-600">€1,250</h3>
                <p className="text-sm text-muted-foreground">Gastos Operativos</p>
                <Badge variant="outline" className="mt-2 text-orange-600 border-orange-600">
                  +5% vs mes anterior
                </Badge>
              </div>
              
              <div className="text-center p-4 border border-border rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600">€{monthlyRevenue - 1250}</h3>
                <p className="text-sm text-muted-foreground">Beneficio Neto</p>
                <Badge variant="outline" className="mt-2 text-blue-600 border-blue-600">
                  +31% vs mes anterior
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}