import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { mockAppointments, mockPatients, mockTreatments, mockPayments } from "@/data/mockData";
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
  
  const totalPatients = mockPatients.length;
  const todayAppointments = mockAppointments.filter(apt => 
    apt.date === format(new Date(), 'yyyy-MM-dd')
  ).length;
  const monthlyRevenue = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedTreatments = mockTreatments.filter(t => t.status === 'completed').length;

  // Mock data for admin stats
  const pendingInvoices = 3;
  const lowStock = 2;
  const newPatients = 8;

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
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pago recibido - María López</p>
                    <p className="text-xs text-muted-foreground">€350 - Botox facial</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 2h</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nueva cita agendada</p>
                    <p className="text-xs text-muted-foreground">Carlos Ruiz - Consulta</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 4h</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Stock bajo - Ácido Hialurónico</p>
                    <p className="text-xs text-muted-foreground">5 unidades restantes</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 1d</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuevo paciente registrado</p>
                    <p className="text-xs text-muted-foreground">Ana Martín - Membresía Gold</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 2d</span>
                </div>
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