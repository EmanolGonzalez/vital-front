import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UXProvider } from "@/contexts/UXContext";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useState } from "react";
import { TreatmentInfoModal } from "@/components/modals/TreatmentInfoModal";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { ContractServiceModal } from "@/components/modals/ContractServiceModal";
import AltaAdminCentro from "./pages/AltaAdminCentro";
import PanelCentro from "./pages/PanelCentro";
import AdminUsers from "./pages/AdminUsers";
import AdminCenters from "./pages/admin/AdminCenters";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Testimonials from "./pages/Testimonials";
import Booking from "./pages/Booking";
import CalculadoraEdad from "./pages/CalculadoraEdad";
import RutaVitalidad from "./pages/RutaVitalidad";
import Noticias from "./pages/Noticias";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import CenterLogin from "./pages/CenterLogin";

const queryClient = new QueryClient();

const App = () => {
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [treatmentType, setTreatmentType] = useState("");
  const [contractData, setContractData] = useState({ treatmentName: "", treatmentPrice: "" });

  useEffect(() => {
      const handleOpenTreatmentModal = (event: CustomEvent<{ treatmentType: string }>) => {
        setTreatmentType(event.detail?.treatmentType || "");
        setTreatmentModalOpen(true);
      };

      const handleOpenAppointmentModal = () => {
        setAppointmentModalOpen(true);
      };

      const handleOpenContractModal = (event: CustomEvent<{ treatmentName: string; treatmentPrice: string }>) => {
        setContractData({
          treatmentName: event.detail?.treatmentName || "",
          treatmentPrice: event.detail?.treatmentPrice || ""
        });
        setContractModalOpen(true);
      };

    window.addEventListener('openTreatmentModal', handleOpenTreatmentModal);
    window.addEventListener('openAppointmentModal', handleOpenAppointmentModal);
    window.addEventListener('openContractModal', handleOpenContractModal);

    return () => {
      window.removeEventListener('openTreatmentModal', handleOpenTreatmentModal);
      window.removeEventListener('openAppointmentModal', handleOpenAppointmentModal);
      window.removeEventListener('openContractModal', handleOpenContractModal);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UXProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppShell>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/center-login" element={<CenterLogin />} />
                  <Route path="/testimonios" element={<Testimonials />} />
                  <Route path="/reservar" element={<Booking />} />
                  <Route path="/calculadora-edad" element={<CalculadoraEdad />} />
                  <Route path="/ruta-vitalidad" element={<RutaVitalidad />} />
                  <Route path="/noticias" element={<Noticias />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/patient" element={<PatientDashboard />} />
                  <Route path="/doctor" element={<DoctorDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/centers" element={<AdminCenters />} />
                  <Route path="/alta-admin-centro" element={<AltaAdminCentro />} />
                  <Route path="/panel-centro" element={<PanelCentro />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppShell>
              
              {/* Global Modals */}
              <TreatmentInfoModal 
                open={treatmentModalOpen} 
                onOpenChange={setTreatmentModalOpen}
                treatmentType={treatmentType}
              />
              <AppointmentModal 
                open={appointmentModalOpen} 
                onOpenChange={setAppointmentModalOpen}
              />
              <ContractServiceModal
                open={contractModalOpen}
                onOpenChange={setContractModalOpen}
                treatmentName={contractData.treatmentName}
                treatmentPrice={contractData.treatmentPrice}
              />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </UXProvider>
    </QueryClientProvider>
  );
};

export default App;
