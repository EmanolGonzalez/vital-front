// Modal button integration script
export const initializeModalButtons = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupButtons);
  } else {
    setupButtons();
  }
};

const setupButtons = () => {
  // Add click listeners to all buttons that should open modals
  setupTreatmentButtons();
  setupContactButtons();
  setupAppointmentButtons();
  setupMembershipButtons();
};

const setupTreatmentButtons = () => {
  // Find buttons with specific text content and add event listeners
  const buttons = document.querySelectorAll('button, a');
  
  buttons.forEach(button => {
    const text = button.textContent?.toLowerCase() || '';
    
    if (text.includes('ver tratamientos') || text.includes('tratamientos')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { type: 'facial' } }));
      });
    }
    
    if (text.includes('sueroterapia') || text.includes('suero')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('openTreatmentModal', { detail: { type: 'sueroterapia' } }));
      });
    }
  });
};

const setupContactButtons = () => {
  const buttons = document.querySelectorAll('button, a');
  
  buttons.forEach(button => {
    const text = button.textContent?.toLowerCase() || '';
    
    if (text.includes('llámanos') || text.includes('teléfono') || text.includes('llamar')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'phone' } }));
      });
    }
    
    if (text.includes('whatsapp') || text.includes('chat')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('openContactModal', { detail: { type: 'whatsapp' } }));
      });
    }
  });
};

const setupAppointmentButtons = () => {
  const buttons = document.querySelectorAll('button, a');
  
  buttons.forEach(button => {
    const text = button.textContent?.toLowerCase() || '';
    
    if (text.includes('reservar') || text.includes('agendar') || text.includes('cita') || text.includes('consulta')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('openAppointmentModal'));
      });
    }
  });
};

const setupMembershipButtons = () => {
  const buttons = document.querySelectorAll('button, a');
  
  buttons.forEach(button => {
    const text = button.textContent?.toLowerCase() || '';
    
    if (text.includes('membresía') || text.includes('planes') || text.includes('gold') || text.includes('platinum')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let planType = 'gold';
        if (text.includes('platinum')) planType = 'platinum';
        if (text.includes('reset')) planType = 'reset';
        window.dispatchEvent(new CustomEvent('openMembershipModal', { detail: { type: planType } }));
      });
    }
  });
};