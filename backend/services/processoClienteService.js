const { ProcessoCliente } = require('../models');

exports.criarRelacao = async (dados) => {
  const { processoId, clienteId } = dados;

  const existe = await ProcessoCliente.findOne({
    where: { processoId, clienteId }
  });

  if (existe) {
    throw new Error("Esta relação já existe.");
  }

  return await ProcessoCliente.create(dados);
};

exports.getPorProcessoId = async (ids) => {
  const clientes = await ProcessoCliente.findAll({
    where: { processoId: ids },
  });

  const clientesId = clientes.map((c) => c.clienteId);
  return clientesId;
};

exports.removeRelation = async (clienteId, processoId) => {
  try {
    const result = await ProcessoCliente.destroy({ 
      where: { 
        clienteId: clienteId, 
        processoId: processoId 
      } 
    });

    if (result === 0) {
      return {
        success: false,
        message: `Nenhuma relação encontrada para o Cliente ID ${clienteId} e Processo ID ${processoId}.`,
      };
    }

    return {
      success: true,
      message: `Relação entre o Cliente ID ${clienteId} e o Processo ID ${processoId} removida com sucesso.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao remover a relação: ${error.message}`,
    };
  }
};