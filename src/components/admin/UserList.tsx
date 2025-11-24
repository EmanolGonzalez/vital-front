import React from "react";


const USER_TYPES = [
  { value: "all", label: "Todos" },
  { value: "Patient", label: "Pacientes" },
  { value: "Doctor", label: "Médicos" },
  { value: "Administrator", label: "Administradores" },
  { value: "Center", label: "Centros" },
];

const UserList = ({ users, loading, onEdit, onDelete }) => {
  const [filter, setFilter] = React.useState("all");

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.userType === filter);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Usuarios del sistema</h2>
        <div>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-white"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {USER_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-background">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="animate-spin mr-2 h-5 w-5 border-4 border-blue-400 border-t-transparent rounded-full"></span>
            <span className="text-gray-500">Cargando...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-8 text-center text-gray-400">No hay usuarios registrados.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">Usuario</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">Tipo</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">Estado</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-background divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                      {user.fullName ? user.fullName[0] : user.name ? user.name[0] : "U"}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{user.fullName || user.name}</div>
                      {user.phoneNumber && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.phoneNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold 
                      ${user.userType === 'Administrator' ? 'bg-blue-100 text-blue-700' : ''}
                      ${user.userType === 'Doctor' ? 'bg-green-100 text-green-700' : ''}
                      ${user.userType === 'Patient' ? 'bg-purple-100 text-purple-700' : ''}
                      ${user.userType === 'Center' ? 'bg-yellow-100 text-yellow-700' : ''}
                    `}>{user.userType}</span>
                  </td>
                  <td className="px-4 py-2">
                    {user.isActive ? (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Activo</span>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">Inactivo</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                      onClick={() => onEdit(user)}
                      title="Editar usuario"
                    >Editar</button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => onDelete(user.id)}
                      title="Eliminar usuario"
                    >Eliminar</button>
                    <button
                      className={`px-3 py-1 rounded ${user.isActive ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold transition`}
                      onClick={() => user.onToggleActive && user.onToggleActive(user)}
                      title={user.isActive ? "Desactivar usuario" : "Activar usuario"}
                    >{user.isActive ? "Desactivar" : "Activar"}</button>
                    <button
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      onClick={() => user.onResetPassword && user.onResetPassword(user)}
                      title="Restablecer contraseña"
                    >Soporte</button>
                    <button
                      className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
                      onClick={() => user.onManageRoles && user.onManageRoles(user)}
                      title="Gestionar roles"
                    >Roles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default UserList;
