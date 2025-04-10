import React, { useState } from "react";

const AddPrazoModal = ({ isOpen, onClose, processoId, onSave }) => {
  const [dataVencimento, setDataVencimento] = useState("");
  const [status, setStatus] = useState("");
  const [tipoPrazo, setTipoPrazo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoPrazo = {
      dataVencimento,
      status,
      tipoPrazo,
      processoId,
    };

    onSave(novoPrazo);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Adicionar Prazo</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Vencimento</label>
            <input
              type="datetime-local"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md"
              placeholder="Ex: Em andamento, Concluído..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Prazo</label>
            <input
              type="text"
              value={tipoPrazo}
              onChange={(e) => setTipoPrazo(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md"
              placeholder="Ex: Judicial, Administrativo..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrazoModal;
