const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido'});

    const [, token] = authHeader.split(' ');

    try{
        const decoded = jwt.verify(token, SECRET);
        req.usuarioId = decoded.id;
        req.usuarioTipo = decoded.tipoUsuario;
        next();

    } catch (err){
        return res.status(401).json({ error: 'Token inválido'});
    }
}