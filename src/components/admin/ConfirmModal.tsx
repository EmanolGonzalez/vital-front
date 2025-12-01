import React from "react";

const ConfirmModal = ({ open, title, message, userName, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" />
      <div className="relative bg-white dark:bg-background rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all duration-200 ease-out scale-100 opacity-100" style={{ maxHeight: '80vh', overflow: 'auto' }}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{message}</p>
        {userName && <p className="text-sm font-semibold mb-4 truncate">Usuario: {userName}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >Cancelar</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
