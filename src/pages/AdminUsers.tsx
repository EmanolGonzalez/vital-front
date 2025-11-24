
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import UserList from "../components/admin/UserList";
import UserForm from "../components/admin/UserForm";
import {
  getPatients,
  getStaff,
  getCenterAdmins,
  createPatient,
  updatePatient,
  deletePatient,
  // addStaff, removeStaff, createCenterAdmin
} from "../lib/userApi";
import RoleModal from "../components/admin/RoleModal";
import SupportModal from "../components/admin/SupportModal";
import { toast } from "sonner";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // centerId puede venir de contexto, auth, etc. Si no existe, solo se gestionan pacientes y médicos generales.
  const centerId = null; // null o valor real si está disponible
  const adminEmail = null; // null o valor real si está disponible

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Pacientes
      const patientsRes = await getPatients();
      const patients = Array.isArray(patientsRes.data) ? patientsRes.data.map(u => ({ ...u, userType: "Patient" })) : [];

      // Médicos generales (no ligados a centro)
      let doctors = [];
      try {
        const doctorsRes = await getDoctors();
        doctors = Array.isArray(doctorsRes.data) ? doctorsRes.data.map(u => ({ ...u, userType: "Doctor" })) : [];
      } catch {}

      // Staff (médicos ligados a centro)
      let staff = [];
      if (centerId) {
        try {
          const staffRes = await getStaff(centerId);
          staff = Array.isArray(staffRes.data) ? staffRes.data.map(u => ({ ...u, userType: "Doctor" })) : [];
        } catch {}
      }

      // Administradores de centro (solo si hay centerId y email)
      let admins = [];
      if (centerId && adminEmail) {
        try {
          const adminsRes = await getCenterAdmins(centerId, adminEmail);
          admins = Array.isArray(adminsRes.data?.admins) ? adminsRes.data.admins.map(u => ({ ...u, userType: "Administrator" })) : [];
        } catch {}
      }

      // Combinar médicos generales y staff, evitando duplicados por id
      const allDoctors = [...doctors, ...staff].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

      setUsers([...patients, ...allDoctors, ...admins]);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (user) => {
    await createUser(user);
    fetchUsers();
  };

  const handleUpdate = async (id, user) => {
    await updateUser(id, user);
    fetchUsers();
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleToggleActive = async (user) => {
    await updateUser(user.id, { ...user, isActive: !user.isActive });
    fetchUsers();
  };



  const [supportModalUser, setSupportModalUser] = useState(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const handleResetPassword = (user) => {
    setSupportModalUser(user);
    setSupportModalOpen(true);
  };

  const handleSendRecovery = async (user) => {
    // Aquí iría la llamada real a la API de recuperación
    toast.success(`Correo de recuperación enviado a ${user.email}`);
    setSupportModalOpen(false);
    setSupportModalUser(null);
  };

  const [roleModalUser, setRoleModalUser] = useState(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const handleManageRoles = (user) => {
    setRoleModalUser(user);
    setRoleModalOpen(true);
  };

  const handleSaveRole = async (newRole) => {
    if (roleModalUser) {
      await updateUser(roleModalUser.id, { ...roleModalUser, userType: newRole });
      toast.success("Rol actualizado correctamente");
      fetchUsers();
      setRoleModalOpen(false);
      setRoleModalUser(null);
    }
  };

  // Pasar handlers a UserList y añadirlos a cada usuario
  const usersWithActions = users.map(u => ({
    ...u,
    onToggleActive: handleToggleActive,
    onResetPassword: handleResetPassword,
    onManageRoles: handleManageRoles,
  }));

  return (
    <DashboardLayout title="Gestión de Usuarios">
      <div className="space-y-8">
        <UserList
          users={usersWithActions}
          loading={loading}
          onEdit={setSelectedUser}
          onDelete={handleDelete}
        />
        <UserForm
          key={selectedUser ? selectedUser.id : "new"}
          user={selectedUser}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setSelectedUser(null)}
        />
        <RoleModal
          user={roleModalUser}
          open={roleModalOpen}
          onClose={() => { setRoleModalOpen(false); setRoleModalUser(null); }}
          onSave={handleSaveRole}
        />
        <SupportModal
          user={supportModalUser}
          open={supportModalOpen}
          onClose={() => { setSupportModalOpen(false); setSupportModalUser(null); }}
          onSendRecovery={handleSendRecovery}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
