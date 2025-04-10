const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

exports.autenticar = async ({ email, senha }) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    const error = new Error('Credenciais inválidas');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipoUsuario: usuario.tipoUsuario },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );

  return token;
};
