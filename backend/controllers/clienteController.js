const clienteService = require('../services/clienteService');

exports.listarPorUsuarioId = async(req, res) =>{
    try{
        const { usuarioId } = req.params;
        const cliente = await clienteService.listarPorUsuarioId(usuarioId);
        return res.json(cliente);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.listarPorId = async (req, res) => {
    try {
      const { ids } = req.body; 
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Informe um array de IDs.' });
      }
  
      const clientes = await clienteService.listarPorIds(ids);
      return res.json(clientes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };