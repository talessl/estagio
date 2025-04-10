const documentoService = require('../services/documentoService');

exports.criarDocumento = async (req, res) => {
  try {
    const documento = await documentoService.criar(req.body);
    return res.status(200).json(documento);
  } catch (err) {
    console.error('Erro ao criar documento', err);
    return res.status(400).json({ error: err.message || 'Erro ao criar documento' });
  }
};

exports.uploadDocumento = async (req, res) => {
  try {
    console.log('Arquivo recebido:', req.file);
    const { processoId } = req.params;
    const documento = await documentoService.upload(req.file, processoId);
    return res.status(201).json(documento);
  } catch (error) {
    console.error('Erro ao salvar documento:', error);
    return res.status(500).json({ error: 'Erro ao salvar documento' });
  }
};

exports.listarDocumentoPorId = async (req, res) => {
  try {
    const { processoId } = req.params;
    const documento = await documentoService.listarPorId(processoId);

    return res.status(200).json(documento);
  } catch (error) {
    console.error('Erro ao procurar o documento', error);
    return res.status(500).json({ error: 'Erro ao procurar documento' });
  }
};

const path = require('path');
const fs = require('fs');

exports.downloadDocumento = async (req, res) => {
  try {
    const { caminho } = req.params;

    const filePath = path.resolve(__dirname, '../uploads', caminho);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    res.download(filePath);
  } catch (err) {
    console.error('Erro ao fazer download do documento:', err);
    res.status(500).json({ error: 'Erro ao fazer download do documento' });
  }
};

exports.removerDocumento = async (req, res) => {
  try {
    const resultado = await documentoService.removerDocumentoPorId(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

