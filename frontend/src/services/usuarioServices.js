import api from "../api/axios";

export const getUsuario = async () => {
    const res = await api.get('/usuarios');
    return res.data;
  };

  export const getUsuariosPorIds = async (ids) => {
    const res = await api.post('/usuarios/nomesPorIds', { ids });
    return res.data;
  };
  
  export const  getListaClientes = async () => {
    const res = await api.get('/usuarios/listarClientes');
    return res.data
  };

  export const getListaProcuradores = async () => {
    return await api.get('/usuarios/listarProcuradores');
  }

  export const atualizarUsuario = async (id, dados) =>{
    return await api.patch(`/usuarios/${id}`, dados);
  }