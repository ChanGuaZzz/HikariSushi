import React from "react";
import { AlertTriangle, X } from "lucide-react";

function BlockReservationModal({ reason, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <AlertTriangle className="text-orange-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Reservas no disponibles</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            En este momento no se pueden realizar reservas por el siguiente motivo:
          </p>
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-md text-gray-800">
            {reason}
          </div>
        </div>
        
        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlockReservationModal;