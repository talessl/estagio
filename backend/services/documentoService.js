const { Documento } = require('../models');

exports.criar = async (data) => {
  return await Documento.create(data);
};

exports.upload = async (file, processoId) => {
  if (!file) {
    throw new Error('Nenhum arquivo foi enviado');
  }
  const { originalname, mimetype, filename } = file;

  return await Documento.create({
    nome: originalname,
    tipoDocumento: mimetype,
    caminho: filename,
    processoId
  });
};

exports.listarPorId = async (id) => {
  return await Documento.findAll({ where: { processoId: id } })
};



exports.removerDocumentoPorId = async (id) => {
  const documento = await Documento.findByPk(id);
  const path = require('path');
  const fs = require('fs');


  if (!documento) {
    throw new Error('Documento não encontrado');
  }

  const caminhoArquivo = path.join(__dirname, '..', 'documentos', documento.caminho);

  try {
    fs.unlinkSync(caminhoArquivo);
  } catch (err) {
    console.warn('Arquivo não encontrado ou erro ao remover:', err.message);
  }

  await documento.destroy();

  return { mensagem: 'Documento removido com sucesso' };
};

