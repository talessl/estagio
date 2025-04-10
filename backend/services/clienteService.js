const { Cliente } = require('../models');

exports.listarPorUsuarioId = async (usuarioId) => {
    try{
        const cliente = await Cliente.findOne({
            where: {usuarioId: usuarioId}
        });
        return cliente;
    } catch(error){
        throw new Error('Erro ao buscar cliente por usuarioId: ' + error.message);
    }
}

exports.listarPorIds = async (ids) => {
    try {
      const clientes = await Cliente.findAll({
        where: {
          id: ids, 
        },
      });
  
      const usuarioIds = clientes.map(cliente => cliente.usuarioId);
  
      return usuarioIds;
    } catch (error) {
      throw new Error('Erro ao buscar clientes por usuarioIds: ' + error.message);
    }
  };