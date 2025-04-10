const { Procurador } = require('../models');

exports.listarPorUsuarioId = async (usuarioId) => {
    try {
      const procurador = await Procurador.findOne({
        where: { usuarioId },
      });
      return procurador;
    } catch (error) {
      throw new Error('Erro ao buscar procurador por usuarioId: ' + error.message);
    }
  };