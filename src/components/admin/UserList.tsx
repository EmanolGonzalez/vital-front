import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ConfirmModal from "./ConfirmModal";

const USER_TYPES = [
  { value: "all", label: "Todos" },
  { value: "Patient", label: "Pacientes" },
  { value: "Doctor", label: "Médicos" },
  { value: "Administrator", label: "Administradores" },
  { value: "Center", label: "Centros" },
];

const UserList = ({ users, loading, onEdit, onDelete }) => {
  const [filter, setFilter] = React.useState("all");
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmUser, setConfirmUser] = React.useState<any | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  // close menu on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (menuRef.current.contains(target)) return;
      setOpenMenu(null);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuRef]);

  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.userType === filter);

  return (
    <>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Usuarios del sistema
          </h2>
          <div>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {USER_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
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
            <div className="py-8 text-center text-gray-400">
              No hay usuarios registrados.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">
                    Usuario
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-background divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                  >
                    <td className="px-4 py-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                        {user.fullName
                          ? user.fullName[0]
                          : user.name
                            ? user.name[0]
                            : "U"}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {user.fullName || user.name}
                        </div>
                        {user.phoneNumber && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user.phoneNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold 
                      ${user.userType === "Administrator" ? "bg-blue-100 text-blue-700" : ""}
                      ${user.userType === "Doctor" ? "bg-green-100 text-green-700" : ""}
                      ${user.userType === "Patient" ? "bg-purple-100 text-purple-700" : ""}
                      ${user.userType === "Center" ? "bg-yellow-100 text-yellow-700" : ""}
                    `}
                      >
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {user.isActive ? (
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right relative">
                      <div className="inline-block">
                        <button
                          aria-haspopup="menu"
                          aria-expanded={openMenu === user.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            const btn = e.currentTarget as HTMLElement;
                            const rect = btn.getBoundingClientRect();
                            setMenuPos({ top: rect.bottom, left: rect.right });
                            setOpenMenu(openMenu === user.id ? null : user.id);
                          }}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          title="Acciones"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v.01M12 12v.01M12 18v.01"
                            />
                          </svg>
                        </button>

                        {openMenu === user.id &&
                          menuPos &&
                          ReactDOM.createPortal(
                            <div
                              ref={menuRef}
                              className="w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transform transition-all duration-150 origin-top-right scale-100 opacity-100"
                              style={{
                                position: "fixed",
                                top: menuPos.top + 8,
                                left: Math.max(8, menuPos.left - 176),
                                maxHeight: "60vh",
                                overflow: "auto",
                              }}
                            >
                              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      onEdit(user);
                                    }}
                                  >
                                    Editar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setConfirmUser(user);
                                      setConfirmOpen(true);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-red-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 7a1 1 0 012 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V9z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Eliminar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      user.onToggleActive && user.onToggleActive(user);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-gray-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-4h2v4zm0-6H9V5h2v2z" />
                                    </svg>
                                    {user.isActive ? "Desactivar" : "Activar"}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      user.onResetPassword && user.onResetPassword(user);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-yellow-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm9 3a3 3 0 10-2 0v4a1 1 0 102 0V8z" />
                                    </svg>
                                    Soporte
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      user.onManageRoles && user.onManageRoles(user);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-indigo-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M4 3a2 2 0 00-2 2v2h16V5a2 2 0 00-2-2H4zM2 9v6a2 2 0 002 2h12a2 2 0 002-2V9H2z" />
                                    </svg>
                                    Roles
                                  </button>
                                </li>
                              </ul>
                            </div>,
                            document.body
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <ConfirmModal
        open={confirmOpen}
        title="Confirmar eliminación"
        message="¿Estás seguro que quieres eliminar este usuario? Esta acción no se puede deshacer."
        userName={
          confirmUser ? confirmUser.fullName || confirmUser.email || "" : ""
        }
        onCancel={() => {
          setConfirmOpen(false);
          setConfirmUser(null);
        }}
        onConfirm={() => {
          if (confirmUser) onDelete(confirmUser.id);
          setConfirmOpen(false);
          setConfirmUser(null);
        }}
      />
    </>
  );
};

export default UserList;
