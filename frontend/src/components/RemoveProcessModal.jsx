import React from "react";

function RemoveProcessModal({ isOpen, onClose, processo, onRemove }) {
  if (!isOpen || !processo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-red-600">Remover Processo</h2>
        <p className="mb-6">
          Tem certeza que deseja remover o processo <strong>{processo.numero}</strong>?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => onRemove(processo.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveProcessModal;
