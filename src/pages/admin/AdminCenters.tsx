import React from "react";
import ReactDOM from "react-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CenterList from "./CenterList";
import CenterForm from "./CenterForm";
import { Toaster } from "sonner";

const AdminCenters: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [editingCenter, setEditingCenter] = React.useState(null);
  const [reloadFlag, setReloadFlag] = React.useState(false);
  const handleSaved = () => {
    setReloadFlag(flag => !flag);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <DashboardLayout title="Gestión de Centros">
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Gestión de Centros</h2>
            <button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
              onClick={() => {
                setEditingCenter(null);
                setShowForm(true);
              }}
            >
              Nuevo Centro
            </button>
          </div>
          <CenterList onEdit={center => { setEditingCenter(center); setShowForm(true); }} reloadFlag={reloadFlag} />
          {showForm && ReactDOM.createPortal(
            <div className="fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40 z-40" onClick={() => setShowForm(false)} />
              <div className="ml-auto w-full max-w-lg h-full bg-white dark:bg-background shadow-xl p-6 overflow-auto relative z-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{editingCenter ? 'Editar centro' : 'Alta de centro'}</h3>
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowForm(false)}>Cerrar</button>
                </div>
                <CenterForm
                  center={editingCenter}
                  hideHeader={true}
                  onClose={() => setShowForm(false)}
                  onSaved={() => { setShowForm(false); handleSaved(); }}
                />
              </div>
            </div>, document.body)}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminCenters;
