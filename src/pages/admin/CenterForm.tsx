import React from "react";
import { createCenter, updateCenter } from "../../lib/centerApi";
import { toast } from "sonner";

const CenterForm: React.FC<{ center: any, onClose: () => void, onSaved: () => void }> = ({ center, onClose, onSaved }) => {
  const [centerName, setCenterName] = React.useState(center?.centerName || "");
  const [address, setAddress] = React.useState(center?.address || "");
  const [contactEmail, setContactEmail] = React.useState(center?.contactEmail || "");
  const [contactPhone, setContactPhone] = React.useState(center?.contactPhone || "");
  const [city, setCity] = React.useState(center?.city || "");
  const [country, setCountry] = React.useState(center?.country || "");
  const [capacity, setCapacity] = React.useState(center?.capacity || "");
  const [hasEmergencyServices, setHasEmergencyServices] = React.useState(center?.hasEmergencyServices || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      centerName,
      address,
      contactEmail,
      contactPhone,
      city,
      country,
      capacity: Number(capacity),
      hasEmergencyServices,
    };
    try {
      if (center?.id) {
        await updateCenter(center.id, payload);
        toast.success("Centro actualizado correctamente");
      } else {
        await createCenter(payload);
        toast.success("Centro creado correctamente");
      }
      if (onSaved) onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Error al guardar centro");
      if (onSaved) onSaved();
      console.error(err);
    }
  };

  return (
    <form className="bg-white dark:bg-background rounded-xl shadow-lg p-6 max-w-lg mx-auto mb-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Nombre del Centro</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
          value={centerName}
          onChange={e => setCenterName(e.target.value)}
          required
          placeholder="Nombre del centro"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Dirección</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          placeholder="Dirección"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email de contacto</label>
        <input
          type="email"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={contactEmail}
          onChange={e => setContactEmail(e.target.value)}
          required
          placeholder="Email de contacto"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Teléfono de contacto</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={contactPhone}
          onChange={e => setContactPhone(e.target.value)}
          required
          placeholder="Teléfono de contacto"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Ciudad</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Ciudad"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">País</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={country}
          onChange={e => setCountry(e.target.value)}
          placeholder="País"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Capacidad</label>
        <input
          type="number"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          placeholder="Capacidad"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={hasEmergencyServices}
          onChange={e => setHasEmergencyServices(e.target.checked)}
        />
        <label className="text-sm text-gray-700 dark:text-gray-200">¿Tiene servicios de emergencia?</label>
      </div>
      <div className="flex gap-3 mt-6 justify-end">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition">Guardar</button>
        <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default CenterForm;
