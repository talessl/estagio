const procuradorService = require('../services/procuradorService');

exports.listarPorUsuarioId = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const procurador = await procuradorService.listarPorUsuarioId(usuarioId);
      return res.json(procurador);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };