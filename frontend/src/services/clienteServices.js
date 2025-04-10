import api from "../api/axios";

export const getClientePorUsuarioId = async (usuarioId) => {
    const response = await api.get(`/clientes/${usuarioId}`);
    return response.data;
}

export const getUsuarioIds = async (ids) => {
    const response = await api.post('/clientes/usuario', { ids });
    return response.data;
}