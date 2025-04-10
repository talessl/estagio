import api from "../api/axios";

export const getProcuradorPorUsuarioId = async (usuarioId) => {
    const response = await api.get(`/procuradores/${usuarioId}`);
    return response.data;
}
