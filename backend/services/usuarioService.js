const { Usuario, Cliente, Procurador } = require('../models');
const { Op } = require("sequelize");

exports.atualizar = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw Error('Usuario não encontrado');
    return await usuario.update(dados);
};

exports.listar = async (usuarioId) => {
    return await Usuario.findByPk(usuarioId);
};

exports.listarUsuarios = async (usuarioIds) => {
  return await Usuario.findAll({
    where: {
      id: usuarioIds
    }
  });
};


exports.listarClientes = async () => {
  const listaUsuarioId = await Cliente.findAll({
    attributes: ['usuarioId'],
    raw: true
  });

  const ids = listaUsuarioId.map(u => u.usuarioId);

  return await Usuario.findAll({
    attributes: ['id', 'nome'],
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};

exports.listarProcuradores = async () => {
  const listaUsuarioId = await Procurador.findAll({
    attributes: ['usuarioId'],
    raw: true
  });

  const ids = listaUsuarioId.map(u => u.usuarioId);

  return await Usuario.findAll({
    attributes: ['id', 'nome', 'email'], 
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};
