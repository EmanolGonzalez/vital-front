import React from "react";

const SupportModal = ({ user, open, onClose, onSendRecovery }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold mb-6 text-primary">Soporte para usuario</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-200">Enviar correo de recuperación de acceso a <span className="font-semibold">{user.email}</span></p>
        <div className="flex gap-3 justify-end mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            onClick={() => onSendRecovery(user)}
          >Enviar recuperación</button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            onClick={onClose}
          >Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
