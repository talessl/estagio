import { useState, useEffect } from "react";

function EditProcessModal({ isOpen, onClose, processo, onSave }) {
  const [formData, setFormData] = useState({
    numero: "",
    orgaoResponsavel: "",
    assunto: "",
    statusProcesso: "",
  });

  useEffect(() => {
    if (processo) {
      setFormData({
        numero: processo.numero,
        orgaoResponsavel: processo.orgaoResponsavel,
        assunto: processo.assunto,
        statusProcesso: processo.statusProcesso,
      });
    }
  }, [processo]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...processo, ...formData });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Editar Processo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Número</label>
            <input
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Órgão Responsável</label>
            <input
              name="orgaoResponsavel"
              value={formData.orgaoResponsavel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Assunto</label>
            <input
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              name="statusProcesso"
              value={formData.statusProcesso}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProcessModal;
