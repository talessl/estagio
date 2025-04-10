import api from "../api/axios";

export const createRelation = async (dados) =>{
    const response = await api.post("/processoCliente", dados);
    return response.data;
}

export const listarPorProcesso = async (ids) => {
    const response = await api.post("processoCliente/clientesId", { ids });
    return response.data;
  };

  export const removerRelacao = async (clienteId, processoId) => {
    try {
      const response = await api.delete(`/processoCliente/${clienteId}/${processoId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover relação:', error);
      throw error;
    }
  };