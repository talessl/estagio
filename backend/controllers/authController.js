const usuarioService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const token = await usuarioService.autenticar(req.body);
    return res.json({ token: `Bearer ${token}` });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
};
