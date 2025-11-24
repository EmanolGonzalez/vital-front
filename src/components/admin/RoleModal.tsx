import React from "react";

const ROLE_OPTIONS = [
  { value: "Patient", label: "Paciente" },
  { value: "Doctor", label: "Médico" },
  { value: "Administrator", label: "Administrador" },
  { value: "Center", label: "Centro" },
];

const RoleModal = ({ user, open, onClose, onSave }) => {
  const [role, setRole] = React.useState(user?.userType || "Patient");

  React.useEffect(() => {
    setRole(user?.userType || "Patient");
  }, [user, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold mb-6 text-primary">Gestionar rol de usuario</h3>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Tipo de usuario</label>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            {ROLE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 justify-end mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            onClick={() => onSave(role)}
          >Guardar</button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            onClick={onClose}
          >Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
