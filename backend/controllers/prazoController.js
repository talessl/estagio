const prazoService = require('../services/prazoService');

exports.criarPrazo = async (req, res) => {
    try {
        const prazo = await prazoService.criar(req.body);
        return res.status(201).json(prazo);
    } catch (err) {
        console.error('Erro ao criar prazo', err);
        return res.status(400).json({ error: err.message || 'Erro ao criar prazo' });
    }
};

exports.removerPrazo = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: 'ID do prazo é obrigatório.' });
      }
  
      await prazoService.remover(id); 
  
      return res.status(204).send(); 
    } catch (err) {
      console.error('Erro ao remover prazo:', err);
      const status = err.message === 'Prazo não encontrado' ? 404 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
  

exports.atualizarPrazo = async(req,res) => {
    try{
        const prazo = await prazoService.atualizar(req.params.id, req.body);
            return res.json(prazo);
        
    } catch(err){
        console.error('Erro ao atualizar prazo: ', err);
        return res.status(400).json({ error: err.message || 'Erro ao atualizar prazo'});
    }
};

exports.listaPrazoPorProcessoId = async (req,res)=>{
    try{
        const prazo = await prazoService.listarPorProcessoId(req.params.id);
        return res.json(prazo);
    } catch(err){
        console.error('Erro ao lista prazos: ',err);
        return res.status(500).json({ error: 'Erro ao listar prazos para o id do processo'});
    }
}