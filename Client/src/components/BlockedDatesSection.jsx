import React, { useState } from "react";
import { Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BlockedDatesSection({ saveChanges, setSettings, settings }) {
  const [selectedDate, setSelectedDate] = useState(null);
    const [animationDate, setAnimationDate] = useState(null);

  const handleAddDate = () => {
    if (selectedDate) {
        console.log(selectedDate, "fecha seleccionada y fechas bloqueadas" , settings.unavailableDates);
      // Verificar si la fecha ya existe en el array
      const dateExists = settings?.unavailableDates.some(
        (date) => new Date(date).toDateString() === selectedDate.toDateString()
      );

      if (!dateExists) {
        // Agregar la fecha al array
        setSettings((prev) => ({
          ...prev,
            unavailableDates: [...prev.unavailableDates, selectedDate],
        }));
        setAnimationDate("bg-green-500 animate-bounce");
      }
    }
  };

  const handleDeleteDate = (index) => {
    const updatedDates = [...settings.unavailableDates];
    updatedDates.splice(index, 1);
    //eliminar la fecha del array
    setSettings((prev) => ({
      ...prev,
      unavailableDates: updatedDates,
    }));
    setAnimationDate("bg-green-500 animate-bounce");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2" size={24} />
        Fechas No Disponibles
      </h2>
      <p className="text-gray-600 mb-4">
        Agrega las fechas que no estarán disponibles para reservas.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="flex gap-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholderText="Seleccionar fecha"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
            <button
              onClick={handleAddDate}
              disabled={!selectedDate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="font-medium mb-2">Fechas bloqueadas:</h3>
          <div className="max-h-64 overflow-y-auto border rounded p-2">
            {settings?.unavailableDates && settings?.unavailableDates.length > 0 ? (
              <ul className="space-y-2">
                {settings?.unavailableDates.map((date, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span>{formatDate(date)}</span>
                    <button
                      onClick={() => handleDeleteDate(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Eliminar fecha"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 py-2 text-center">No hay fechas bloqueadas.</p>
            )}
          </div>
          
          <button
            onClick={()=>{saveChanges("unavailableDates")
            setAnimationDate(null)
            } }
            className={`mt-4 ${animationDate?animationDate:"bg-green-500"} text-white px-4 py-2 rounded hover:bg-green-600`}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlockedDatesSection;