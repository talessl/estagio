import { useState, useEffect } from "react";
import { getListaProcuradores } from "../services/usuarioServices";
import { getProcuradorPorUsuarioId } from "../services/procuradorServices";

function DistributeProcessModal({ isOpen, onClose, onSave }) {
  const [procuradores, setProcuradores] = useState([]); 
  const [usuarioId, setUsuarioId] = useState("");

  useEffect(() => {
    const fetchProcuradores = async () => {
      try {
        const data = await getListaProcuradores();
        setProcuradores(data.data || []); 
      } catch (err) {
        console.error("Erro ao carregar procuradores:", err);
        setProcuradores([]);
      }
    };

    if (isOpen) fetchProcuradores();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId) return;
    const idProcurador = await getProcuradorPorUsuarioId([usuarioId]);
    onSave(idProcurador.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Distribuir Processo</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Selecione o Procurador</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Selecione --</option>
            {(procuradores || []).map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.email})
              </option>
            ))}
          </select>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Distribuir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DistributeProcessModal;
