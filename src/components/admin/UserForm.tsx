import React, { useState, useEffect } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  userType: "Patient",
  phoneNumber: "",
  dateOfBirth: "",
  isActive: true,
};

const UserForm = ({ user, onCreate, onUpdate, onCancel, hideHeader = false }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        userType: user.userType || "Patient",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "",
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    } else {
      setForm(initialState);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(user.id, form);
    } else {
      onCreate(form);
    }
    setForm(initialState);
  };

  return (
    <section className="mb-8">
      {!hideHeader && (
        <h2 className="text-2xl font-bold mb-6 text-primary">{user ? "Editar usuario" : "Alta de usuario"}</h2>
      )}
      <form className={`bg-white dark:bg-background rounded-xl ${hideHeader ? '' : 'shadow-lg'} p-6 max-w-lg mx-auto`} onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              required
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
              required
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            required
            placeholder="Correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Tipo de usuario</label>
          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            required
          >
            <option value="Patient">Paciente</option>
            <option value="Doctor">Médico</option>
            <option value="Administrator">Administrador</option>
            <option value="Center">Centro</option>
          </select>
        </div>
        {/* Campos adicionales según tipo de usuario */}
        {form.userType === "Patient" && (
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Fecha de nacimiento</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Teléfono</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>
        )}
        {form.userType === "Doctor" && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Teléfono</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full"
            />
          </div>
        )}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-700 dark:text-gray-200">Usuario activo</label>
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition">
            {user ? "Actualizar" : "Crear"}
          </button>
          {user && (
            <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default UserForm;
