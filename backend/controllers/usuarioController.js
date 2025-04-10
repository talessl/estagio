const usuarioService = require('../services/usuarioService');

exports.atualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizar(req.params.id, req.body);
    return res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const usuario = await usuarioService.listar(usuarioId);
    return res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarNomesPorId = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Informe um array de IDs de usuários.' });
    }

    const usuarios = await usuarioService.listarUsuarios(ids); 

    const nomes = usuarios.map(u => ({
      id: u.id,
      nome: u.nome
    }));

    return res.json(nomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.listarClientes = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarClientes();
    return res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarProcuradores = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarProcuradores();
    return res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};