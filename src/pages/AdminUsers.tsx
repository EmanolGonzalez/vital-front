
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import UserList from "../components/admin/UserList";
import UserForm from "../components/admin/UserForm";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getPatients,
  getDoctors,
  createPatient,
  updatePatient,
  deletePatient,
  getCenterAdmins,
  createCenterAdmin,
  removeStaff,
} from "../lib/userApi";
import RoleModal from "../components/admin/RoleModal";
import SupportModal from "../components/admin/SupportModal";
import { toast } from "sonner";

interface UserItem {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  isActive?: boolean;
  userType?: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState<"patients" | "doctors" | "administrators">("patients");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserSheet, setShowUserSheet] = useState(false);
  const [loading, setLoading] = useState(false);

  // centerId puede venir de contexto, auth, etc. Si no existe, solo se gestionan pacientes y médicos generales.
  const centerId = null; // null o valor real si está disponible
  const adminEmail = null; // null o valor real si está disponible

  const fetchUsers = useCallback(async (tab: "patients" | "doctors" | "administrators") => {
    setLoading(true);
    try {
      if (tab === "patients") {
        const res = await getPatients();
        const list = Array.isArray(res) ? res : [];
        const normalized = list.map((u: UserItem) => ({
          id: u.id,
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          fullName: u.fullName || `${u.firstName || ""} ${u.lastName || ""}`.trim(),
          email: u.email,
          phoneNumber: u.phoneNumber,
          dateOfBirth: u.dateOfBirth,
          isActive: u.isActive,
          userType: "Patient",
        }));
        setUsers(normalized);
      } else if (tab === "doctors") {
        const res = await getDoctors();
        const list = Array.isArray(res) ? res : [];
        const normalized = list.map((u: UserItem) => ({
          id: u.id,
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          fullName: u.fullName || `${u.firstName || ""} ${u.lastName || ""}`.trim(),
          email: u.email,
          phoneNumber: u.phoneNumber,
          dateOfBirth: u.dateOfBirth,
          isActive: u.isActive,
          userType: "Doctor",
        }));
        setUsers(normalized);
      } else {
        // Administrators: use center-specific endpoint when centerId is available
        if (centerId) {
          const res = await getCenterAdmins(centerId, adminEmail || "");
          const list = Array.isArray(res) ? res : [];
          const normalized = list.map((u: UserItem) => ({
            id: u.id,
            firstName: u.firstName || (u as unknown as { name?: string }).name || "",
            lastName: u.lastName || "",
            fullName: u.fullName || (u as unknown as { name?: string }).name || `${u.firstName || ""} ${u.lastName || ""}`.trim(),
            email: u.email,
            phoneNumber: u.phoneNumber,
            dateOfBirth: u.dateOfBirth,
            isActive: u.isActive,
            userType: "Administrator",
          }));
          setUsers(normalized);
        } else {
          // No center context: administrators are center-scoped, show empty with notice
          setUsers([]);
        }
      }
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab, fetchUsers]);
  const handleCreate = async (user) => {
    try {
      if (activeTab === 'patients') {
        await createPatient(user);
        toast.success('Paciente creado');
      } else if (activeTab === 'administrators') {
        if (!centerId) {
          toast.error('Crear administradores requiere seleccionar un centro');
          return;
        }
        await createCenterAdmin(centerId, user);
        toast.success('Administrador creado en el centro');
      } else {
        toast.error('Crear médicos no está soportado vía este formulario');
      }
      fetchUsers(activeTab);
    } catch (err) {
      toast.error('Error al crear usuario');
    }
  };

  const handleUpdate = async (id, user) => {
    try {
      if (activeTab === 'patients') {
        await updatePatient(id, user);
        toast.success('Paciente actualizado');
      } else {
        toast.error('Editar este tipo de usuario no está soportado desde aquí');
      }
      fetchUsers(activeTab);
      setSelectedUser(null);
    } catch (err) {
      toast.error('Error al actualizar usuario');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (activeTab === 'patients') {
        await deletePatient(id);
        toast.success('Paciente eliminado');
      } else if (activeTab === 'administrators') {
        if (!centerId) {
          toast.error('Eliminar administradores requiere seleccionar un centro');
          return;
        }
        // Use removeStaff endpoint to remove admin/staff from center
        await removeStaff(centerId, id);
        toast.success('Administrador eliminado del centro');
      } else {
        toast.error('Eliminar médicos no está soportado vía este gestor');
      }
      fetchUsers(activeTab);
    } catch (err) {
      toast.error('Error al eliminar usuario');
    }
  };

  const handleToggleActive = async (user) => {
    try {
      if (activeTab === 'patients') {
        await updatePatient(user.id, { ...user, isActive: !user.isActive });
        toast.success('Estado actualizado');
      } else {
        toast.error('Cambiar estado no soportado para este tipo desde aquí');
      }
      fetchUsers(activeTab);
    } catch (err) {
      toast.error('Error al cambiar estado');
    }
  };

  // open sheet for create or edit
  const openUserSheetForCreate = () => {
    setSelectedUser(null);
    setShowUserSheet(true);
  };

  const openUserSheetForEdit = (user) => {
    setSelectedUser(user);
    setShowUserSheet(true);
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
      fetchUsers(activeTab);
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
        <div className="flex items-center justify-between">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}
              onClick={() => setActiveTab('patients')}
            >Pacientes</button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'doctors' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}
              onClick={() => setActiveTab('doctors')}
            >Médicos</button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'administrators' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}
              onClick={() => setActiveTab('administrators')}
            >Administradores</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Vista: {activeTab}</div>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
              onClick={openUserSheetForCreate}
            >
              Nuevo usuario
            </button>
          </div>
        </div>
        <UserList
          users={usersWithActions}
          loading={loading}
          onEdit={(u) => openUserSheetForEdit(u)}
          onDelete={handleDelete}
        />
        {showUserSheet && ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40 z-40" onClick={() => { setShowUserSheet(false); setSelectedUser(null); }} />
            <div className="ml-auto w-full max-w-md h-full bg-white dark:bg-background p-6 overflow-auto relative z-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{selectedUser ? 'Editar usuario' : 'Alta de usuario'}</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => { setShowUserSheet(false); setSelectedUser(null); }}>Cerrar</button>
              </div>
              <UserForm
                key={selectedUser ? selectedUser.id : "new"}
                user={selectedUser}
                hideHeader={true}
                onCreate={(data) => { handleCreate(data); setShowUserSheet(false); }}
                onUpdate={(id, data) => { handleUpdate(id, data); setShowUserSheet(false); }}
                onCancel={() => { setShowUserSheet(false); setSelectedUser(null); }}
              />
            </div>
          </div>, document.body)}
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
