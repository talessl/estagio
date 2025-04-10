import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { X } from "lucide-react";

const AddDocumentModal = ({ isOpen, onClose, onSave, processoId }) => {
  const [documento, setDocumento] = useState(null);
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documento || !processoId) return;

    const formData = new FormData();
    formData.append("documento", documento);
    formData.append("nome", nome);
    formData.append("processoId", processoId);

    onSave(formData);
    setDocumento(null);
    setNome("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <DialogTitle className="text-lg font-bold mb-4 text-gray-800">
            Adicionar Documento
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome (opcional)
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full mt-1 border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Arquivo
              </label>
              <input
                type="file"
                onChange={(e) => setDocumento(e.target.files[0])}
                required
                className="w-full mt-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm"
              >
                Enviar
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddDocumentModal;
