import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { GeneTestBanner } from "@/components/sections/GeneTestBanner";
import { Medicina30Banner } from "@/components/sections/Medicina30Banner";
import { FirstVisitSection } from "@/components/sections/FirstVisitSection";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { TratamientosSection } from "@/components/sections/TratamientosSection";
import { SueroterapiaSection } from "@/components/sections/SueroterapiaSection";
import { RutaVitalidadCommercial } from "@/components/sections/RutaVitalidadCommercial";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { TreatmentInfoModal } from "@/components/modals/TreatmentInfoModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { MembershipModal } from "@/components/modals/MembershipModal";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { FirstVisitModal } from "@/components/modals/FirstVisitModal";
import { JoinTeamModal } from "@/components/modals/JoinTeamModal";
import { initializeModalButtons } from "@/utils/modalIntegration";

const Index = () => {
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [firstVisitModalOpen, setFirstVisitModalOpen] = useState(false);
  const [joinTeamModalOpen, setJoinTeamModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");

  const handleOpenTreatmentModal = (type: string = "") => {
    setModalType(type);
    setTreatmentModalOpen(true);
  };

  const handleOpenContactModal = (type: "phone" | "email" | "whatsapp" | "appointment" = "phone") => {
    setModalType(type);
    setContactModalOpen(true);
  };

  const handleOpenMembershipModal = (type: "gold" | "platinum" | "reset" = "gold") => {
    setModalType(type);
    setMembershipModalOpen(true);
  };

  const handleOpenAppointmentModal = () => {
    setAppointmentModalOpen(true);
  };

  const handleOpenFirstVisitModal = () => {
    setFirstVisitModalOpen(true);
  };

  const handleOpenJoinTeamModal = () => {
    setJoinTeamModalOpen(true);
  };

  // Listen for global modal events
  useEffect(() => {
    const handleOpenTreatmentModal = (e: any) => {
      setModalType(e.detail?.type || "facial");
      setTreatmentModalOpen(true);
    };

    const handleOpenContactModal = (e: any) => {
      setModalType(e.detail?.type || "phone");
      setContactModalOpen(true);
    };

    const handleOpenMembershipModal = (e: any) => {
      setModalType(e.detail?.type || "gold");
      setMembershipModalOpen(true);
    };

    const handleOpenAppointmentModal = () => {
      setAppointmentModalOpen(true);
    };

    const handleOpenFirstVisitModal = () => {
      setFirstVisitModalOpen(true);
    };

    const handleOpenJoinTeamModal = () => {
      setJoinTeamModalOpen(true);
    };

    window.addEventListener('openTreatmentModal', handleOpenTreatmentModal);
    window.addEventListener('openContactModal', handleOpenContactModal);
    window.addEventListener('openMembershipModal', handleOpenMembershipModal);
    window.addEventListener('openAppointmentModal', handleOpenAppointmentModal);
    window.addEventListener('openFirstVisitModal', handleOpenFirstVisitModal);
    window.addEventListener('openJoinTeamModal', handleOpenJoinTeamModal);

    return () => {
      window.removeEventListener('openTreatmentModal', handleOpenTreatmentModal);
      window.removeEventListener('openContactModal', handleOpenContactModal);
      window.removeEventListener('openMembershipModal', handleOpenMembershipModal);
      window.removeEventListener('openAppointmentModal', handleOpenAppointmentModal);
      window.removeEventListener('openFirstVisitModal', handleOpenFirstVisitModal);
      window.removeEventListener('openJoinTeamModal', handleOpenJoinTeamModal);
    };
  }, []);

  // Initialize modal buttons when component mounts
  useEffect(() => {
    initializeModalButtons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cream overflow-x-hidden">
      <Navigation />
      <main className="relative">
        {/* Hero Section with proper spacing */}
        <HeroSection />
        
        {/* Gene Test Banner */}
        <GeneTestBanner />
        
        {/* Medicina 3.0 Banner */}
        <Medicina30Banner />
        
        {/* Content Sections with consistent spacing */}
        <div className="space-y-0">
          <FirstVisitSection />
          <QuienesSomos />
          <TratamientosSection />
          <SueroterapiaSection />
          <RutaVitalidadCommercial />
          <TestimonialsSection />
          <PerformanceSection />
          <MembershipSection />
          <ContactSection />
        </div>
      </main>
      <Footer />

      {/* Global Modal System - Hidden triggers for button clicks */}
      <div className="hidden">
        <button onClick={() => handleOpenTreatmentModal("facial")} data-trigger="treatment-facial" />
        <button onClick={() => handleOpenTreatmentModal("sueroterapia")} data-trigger="treatment-sueroterapia" />
        <button onClick={() => handleOpenContactModal("phone")} data-trigger="contact-phone" />
        <button onClick={() => handleOpenContactModal("appointment")} data-trigger="contact-appointment" />
        <button onClick={() => handleOpenMembershipModal("gold")} data-trigger="membership-gold" />
        <button onClick={handleOpenAppointmentModal} data-trigger="appointment" />
        <button onClick={handleOpenFirstVisitModal} data-trigger="first-visit" />
        <button onClick={handleOpenJoinTeamModal} data-trigger="join-team" />
      </div>

      {/* Modals */}
      {/* <TreatmentInfoModal ... /> eliminado, ya se gestiona globalmente en App.tsx */}
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        contactType={modalType as any}
      />
      <MembershipModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
        planType={modalType as any}
      />
      <AppointmentModal
        open={appointmentModalOpen}
        onOpenChange={setAppointmentModalOpen}
      />
      <FirstVisitModal
        open={firstVisitModalOpen}
        onOpenChange={setFirstVisitModalOpen}
      />
      <JoinTeamModal
        open={joinTeamModalOpen}
        onOpenChange={setJoinTeamModalOpen}
      />
    </div>
  );
};

export default Index;
