const processoClienteService = require('../services/processoClienteService');

exports.criarRelacao = async (req, res) => {   
    try{
        const processoCliente = await processoClienteService.criarRelacao(req.body);
        return res.status(201).json(processoCliente);
    } catch(err){
        console.error('Erro ao criar relacao entre cliente e processo', err);
        return res.status(400).json({ error: err.message|| 'Erro ao criar relacao'});
    }
};

exports.listarPorProcessoId = async (req, res) => {
    try {
      const { ids } = req.body;
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Informe um array de IDs de processo.' });
      }
  
      const clienteIds = await processoClienteService.getPorProcessoId(ids);
      return res.json(clienteIds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.removerRelacao = async (req, res) => {
    try {
      const { clienteId, processoId } = req.params;
  
      if (!clienteId || !processoId) {
        return res.status(400).json({ error: "clienteId e processoId são necessários." });
      }
  
      const processoCliente = await processoClienteService.removeRelation(clienteId, processoId);
  
      return res.status(200).json(processoCliente);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  
  