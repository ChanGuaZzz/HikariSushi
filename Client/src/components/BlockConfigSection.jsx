import React from "react";
import { Calendar, AlertCircle, ToggleLeft, ToggleRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BlockConfigSection({
  blockConfig,
  setBlockConfig,
  saveChanges
}) {
  const handleInputChange = (field, value) => {
    setBlockConfig({
      ...blockConfig,
      [field]: value
    });
  };

  const handleDateChange = (field, date) => {
    // Convert the Date object to ISO string and extract the date part
    const dateString = date ? date.toISOString().split('T')[0] : '';
    handleInputChange(field, dateString);
  };

  const toggleBlockEnabled = () => {
    setBlockConfig({
      ...blockConfig,
      enabled: !blockConfig.enabled
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveChanges("blockConfig");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <AlertCircle className="mr-2 text-orange-500" />
        Bloqueo de Reservas
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Estado del bloqueo:</span>
          <button 
            type="button" 
            onClick={toggleBlockEnabled} 
            className="flex items-center text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200"
          >
            {blockConfig?.enabled ? (
              <>
                <ToggleRight className="text-orange-500 mr-1" size={20} />
                <span className="text-orange-500 font-medium">Activo</span>
              </>
            ) : (
              <>
                <ToggleLeft className="text-gray-500 mr-1" size={20} />
                <span className="text-gray-500">Inactivo</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <Calendar className="ml-2 text-gray-400" size={18} />
              <DatePicker
                selected={blockConfig?.startDate ? new Date(blockConfig.startDate) : null}
                onChange={(date) => handleDateChange("startDate", date)}
                className="w-full p-2 outline-none"
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha de inicio"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <Calendar className="ml-2 text-gray-400" size={18} />
              <DatePicker
                selected={blockConfig?.endDate ? new Date(blockConfig.endDate) : null}
                onChange={(date) => handleDateChange("endDate", date)}
                className="w-full p-2 outline-none"
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha de fin"
                required
                minDate={blockConfig?.startDate ? new Date(blockConfig.startDate) : null}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Razón del bloqueo</label>
          <textarea
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            rows="3"
            placeholder="Escriba el motivo del bloqueo de reservas..."
            value={blockConfig?.reason || ""}
            onChange={(e) => handleInputChange("reason", e.target.value)}
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          Guardar configuración
        </button>
      </form>
    </div>
  );
}

export default BlockConfigSection;