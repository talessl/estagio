const { Prazo } = require('../models');

exports.criar = async ( dados) =>{
    return await Prazo.create(dados);
};

exports.atualizar = async(id, dados)=>{
    const prazo = await Prazo.findByPk(id);
    if (!prazo) throw new Error('Prazo não encontrado');
    await prazo.update(dados);
};

exports.remover = async (id) => {
    const prazo = await Prazo.findByPk(id);
    if (!prazo) throw new Error('Prazo não encontrado');
    await prazo.destroy();
    return prazo; 
  };
exports.listarPorProcessoId = async (id)=>{
    const prazo = await Prazo.findAll({where: {processoId: id}});
    if (!prazo) throw new Error('Prazo não encontrado');
    return prazo;
}