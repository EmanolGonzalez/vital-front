// Global event handlers for modals
export const openTreatmentModal = (type: string = "facial") => {
  const event = new CustomEvent('openTreatmentModal', { detail: { type } });
  window.dispatchEvent(event);
};

export const openContactModal = (type: "phone" | "email" | "whatsapp" | "appointment" = "phone") => {
  const event = new CustomEvent('openContactModal', { detail: { type } });
  window.dispatchEvent(event);
};

export const openMembershipModal = (type: "gold" | "platinum" | "reset" = "gold") => {
  const event = new CustomEvent('openMembershipModal', { detail: { type } });
  window.dispatchEvent(event);
};

export const openAppointmentModal = () => {
  const event = new CustomEvent('openAppointmentModal');
  window.dispatchEvent(event);
};