import { useState, useEffect } from "react";
import { getListaClientes } from "../services/usuarioServices";

function AddClientModal({ isOpen, onClose, processo, onSave }) {
  const [formData, setFormData] = useState({
    processoId: null,
    clienteId: "",
  });

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if (processo) {
      setFormData({
        processoId: processo.id,
        clienteId: "",
      });
    }
  }, [processo]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getListaClientes();

        setClientes(data);
      } catch (err) {
        console.error("Erro ao carregar lista de clientes:", err);
      }
    };

    fetchClientes();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...processo, ...formData });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Selecione o cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <select
              name="clienteId"
              value={formData.clienteId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="" disabled>Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
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

export default AddClientModal;
