module.exports = function authorizeRole(...rolePermitidas){
    return (req, res, next) => { 
        if(!rolePermitidas.includes(req.usuarioTipo)){
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }
        next();
    };
};