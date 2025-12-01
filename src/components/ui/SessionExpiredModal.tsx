import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SessionExpiredModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Sesión expirada</h2>
        <p className="text-sm text-muted-foreground mb-4">Tu sesión ha expirado o ha sido invalidada. Serás redirigido al inicio de sesión.</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-slate-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Ir a login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
