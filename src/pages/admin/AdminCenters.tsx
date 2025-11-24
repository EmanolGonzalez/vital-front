import React from "react";
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
          {showForm ? (
            <CenterForm
              center={editingCenter}
              onClose={() => setShowForm(false)}
              onSaved={handleSaved}
            />
          ) : (
            <CenterList onEdit={center => { setEditingCenter(center); setShowForm(true); }} reloadFlag={reloadFlag} />
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminCenters;
