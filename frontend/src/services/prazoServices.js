import api from "../api/axios"; 

export const listarPrazosPorProcesso = async (processoId) => {
  const response = await api.get(`/prazos/${processoId}`);
  return response.data;
};

export const criarPrazos = async (dados) => {
  const response = await api.post('/prazos', dados);
  return response.data; 
}

export const removerPrazo = async (id) => {
  const response = await api.delete(`/prazos/${id}`);
  return response.data;
} 

export const editarPrazo = async (id) => {
  const response = await api.put(`/prazos/${id}`);
  return response.data;
} 