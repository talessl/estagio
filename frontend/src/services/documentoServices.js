import api from "../api/axios"

export const adicionarDocumento = async (documento, processoId) => {
    const response = await api.post(`documentos/upload/${processoId}`, documento);
    return response.data;
  };

export const listarDocumentosPorProcesso = async (id) => {
  const response = await api.get(`/documentos/${id}`);
  return response.data;
}

export const removerDocumento = async (id) => {
  const response = await api.delete(`/documentos/${id}`);
  return response.data;
}