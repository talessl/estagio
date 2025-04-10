import api from "../api/axios";

export const getProcessosPrivados = async () => {
    const response = await api.get("/processos");
    return response.data;
};

export const getProcessosPrivadosCliente = async () => {
  const response = await api.get("/processos/cliente");
  return response.data;
};

export const updateProcesso = async (id, dados) => {
    const { createdAt, updatedAt, id: _, ...payload} = dados;
    const response = await api.put(`/processos/${id}`, payload);
  return response.data;
};

export const deleteProcesso = async (id) => {
  const response = await api.delete(`/processos/${id}`);
  return response.data;
};

export const createProcesso = async (dados) => {
  const response = await api.post('/processos', dados);
  return response.data;
};
