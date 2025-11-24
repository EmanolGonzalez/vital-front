import React from "react";
import { useEffect, useState } from "react";
import { getCenters } from "../../lib/centerApi";

const CenterList: React.FC<{ onEdit: (center: any) => void, reloadFlag?: boolean }> = ({ onEdit, reloadFlag }) => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCenters()
      .then(res => {
        // Si la respuesta es un array directo, úsalo. Si es objeto con data, úsalo también.
        if (Array.isArray(res)) {
          setCenters(res);
        } else if (Array.isArray(res.data)) {
          setCenters(res.data);
        } else {
          setCenters([]);
        }
      })
      .catch(() => setCenters([]))
      .finally(() => setLoading(false));
  }, [reloadFlag]);

  return (
    <section className="mb-8">
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-background">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="animate-spin mr-2 h-5 w-5 border-4 border-blue-400 border-t-transparent rounded-full"></span>
            <span className="text-gray-500">Cargando...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Dirección</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Ciudad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">País</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-background divide-y divide-gray-100 dark:divide-gray-700">
              {centers.map(center => (
                <tr key={center.id} className="hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{center.centerName}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{center.address}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{center.contactPhone}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{center.contactEmail}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{center.city}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{center.country}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition" onClick={() => onEdit(center)}>Editar</button>
                    <button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition">Eliminar</button>
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

export default CenterList;
