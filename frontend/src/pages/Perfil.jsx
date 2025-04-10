import { useEffect, useState } from "react";
import { atualizarUsuario, getUsuario } from "../services/usuarioServices";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsuario();
        setUsuario(data);
        setForm({ nome: data.nome, email: data.email });
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await atualizarUsuario(usuario.id, form);
      setUsuario((prev) => ({ ...prev, ...form }));
      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      alert("Erro ao atualizar perfil.");
    }
  };

  if (!usuario) return <p>Carregando perfil...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Perfil do Usuário</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            disabled={!editando}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editando}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          {editando ? (
            <>
              <button
                onClick={() => setEditando(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditando(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
