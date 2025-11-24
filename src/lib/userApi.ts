// Médicos generales
export const getDoctors = async () => api.get("/doctors");
// API client para gestión de usuarios
import api from "./apiClient";

// Pacientes
export const getPatients = async () => api.get("/patients");
export const createPatient = async (patient) => api.post("/patients", patient);
export const updatePatient = async (id, patient) => api.put(`/patients/${id}`, patient);
export const deletePatient = async (id) => api.del(`/patients/${id}`);

// Staff (médicos, personal)
export const getStaff = async (centerId) => api.get(`/centers/${centerId}/staff`);
export const addStaff = async (centerId, staff) => api.post(`/centers/${centerId}/staff`, staff);
export const removeStaff = async (centerId, staffId) => api.del(`/centers/${centerId}/staff/${staffId}`);

// Administradores de centro
// getCenterAdmins requiere parámetro email
export const getCenterAdmins = async (centerId, email) => api.get(`/centers/${centerId}/admin/panel?email=${encodeURIComponent(email)}`);
// Para usar el token de acceso:
// import { setAccessToken } from "./apiClient";
// setAccessToken(token);
export const createCenterAdmin = async (centerId, admin) => api.post(`/centers/${centerId}/admin`, admin);
