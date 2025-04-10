const processoService = require('../services/processoService');

exports.criarProcesso = async (req, res) => {
  try {
    const processo = await processoService.criar(req.usuarioId, req.body);
    return res.status(201).json(processo);
  } catch (err) {
    console.error('Erro ao criar processo:', err);
    return res.status(400).json({ error: err.message || 'Erro ao criar processo' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const processo = await processoService.buscarProcesso(req.params.id);
    if (!processo) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }
    return res.json(processo);
  } catch (err) {
    console.error('Erro ao buscar processo:', err);
    return res.status(500).json({ error: 'Erro ao buscar processo' });
  }
};

exports.listarProcessos = async (req, res) => {
  try {
    const processos = await processoService.listar();
    return res.json(processos);
  } catch (err) {
    console.error('Erro ao listar processos:', err);
    return res.status(500).json({ error: 'Erro ao listar processos' });
  }
};


exports.listarProcessosPrivados = async (req, res) => {
  try {
    const processos = await processoService.listarPrivado(req.usuarioId);
    return res.json(processos);
  } catch (err) {
    console.error('Erro ao listar processos privados:', err);
    return res.status(500).json({ error: 'Erro ao listar processos privados' });
  }
};

exports.listarProcessosPrivadosCliente = async (req, res) => {
  try{
    const processos = await processoService.listarPrivadoCliente(req.usuarioId);
    return res.json(processos);
  } catch (err) {
    console.error('Erro ao listar processos privados para o cliente:', err);
    return res.status(500).json({ error: 'Erro ao listar processos privados para o cliente' });
  }
};

exports.removerProcesso = async (req, res) => {
  try {
    await processoService.remover(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao remover processo:', err);
    return res.status(500).json({ error: err.message || 'Erro ao remover processo' });
  }
};

exports.atualizarProcesso = async (req, res) => {
  try {
    const processo = await processoService.atualizar(req.params.id, req.body);
    return res.json(processo);
  } catch (err) {
    console.error('Erro ao atualizar processo:', err);
    return res.status(400).json({ error: err.message || 'Erro ao atualizar processo' });
  }
};
