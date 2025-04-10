const { Processo, Procurador, Cliente, ProcessoCliente } = require('../models');

//procurador
exports.criar = async (reqUsuarioId, dados) => {
    const procurador = await Procurador.findOne({ where: { usuarioId: reqUsuarioId } });
    return await Processo.create({
        ...dados,
        procuradorId: procurador.id
    });
};

exports.buscarProcesso = async (id) => {
    return await Processo.findByPk(id);
};

exports.listar = async () => {
    const processos = await Processo.findAll();
    return processos;
};

exports.listarPrivado = async (reqUsuarioId) => {
    const procurador = await Procurador.findOne({ where: { usuarioId: reqUsuarioId } });

    if (!procurador) {
        throw new Error('Procurador não encontrado para este usuário.');
    }

    const processos = await Processo.findAll({ where: { procuradorId: procurador.id }, order: [['createdAt', 'DESC']] },);
    return processos;
};

// cliente
exports.listarPrivadoCliente = async (reqUsuarioId) => {
    const cliente = await Cliente.findOne({ where: { usuarioId: reqUsuarioId } });
    if (!cliente) {
        throw new Error('Cliente não encontrado para este usuário');
    }

    const processosAssociados = await ProcessoCliente.findAll({
        where: { clienteId: cliente.id }
    });

    const processoIds = processosAssociados.map(p => p.processoId);

    const processos = await Processo.findAll({
        where: { id: processoIds }, 
        order: [['createdAt', 'DESC']]
    });

    return processos;
};

exports.distribuirParaProcurador = async (processoId, novoProcuradorId) => {
    return await Processo.update(
      { procuradorId: novoProcuradorId },
      { where: { id: processoId } }
    );
  };



//procurador
exports.remover = async (id) => {
    const processo = await Processo.findByPk(id);
    if (!processo) throw new Error('Processo não encontrado');
    await processo.destroy();
};

//procurador
exports.atualizar = async (id, dados) => {
    const processo = await Processo.findByPk(id);
    if (!processo) throw new Error('Processo não encontrado');
    await processo.update(dados);
};