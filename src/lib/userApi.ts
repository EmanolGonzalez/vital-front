import api from "./apiClient";

// Usuarios (CRUD completo)
export const getUsers = async () => api.get("/users");
export const getUser = async (id: string) => api.get(`/users/${id}`);
export const createUser = async (user: any) => api.post(`/users`, user);
export const updateUser = async (id: string, user: any) => api.put(`/users/${id}`, user);
export const deleteUser = async (id: string) => api.del(`/users/${id}`);

// Médicos generales
export const getDoctors = async () => api.get("/doctors");

// Pacientes
export const getPatients = async () => api.get("/patients");
export const createPatient = async (patient: any) => api.post("/patients", patient);
export const updatePatient = async (id: string, patient: any) => api.put(`/patients/${id}`, patient);
export const deletePatient = async (id: string) => api.del(`/patients/${id}`);

// Staff (médicos, personal)
export const getStaff = async (centerId: string) => api.get(`/centers/${centerId}/staff`);
export const addStaff = async (centerId: string, staff: any) => api.post(`/centers/${centerId}/staff`, staff);
export const removeStaff = async (centerId: string, staffId: string) => api.del(`/centers/${centerId}/staff/${staffId}`);

// Administradores de centro
// getCenterAdmins requiere parámetro email
export const getCenterAdmins = async (centerId: string, email: string) => api.get(`/centers/${centerId}/admin/panel?email=${encodeURIComponent(email)}`);
// Para usar el token de acceso:
// import { setAccessToken } from "./apiClient";
// setAccessToken(token);
export const createCenterAdmin = async (centerId: string, admin: any) => api.post(`/centers/${centerId}/admin`, admin);
