const express = require('express');
const router = express.Router();
const processoClienteService = require('../controllers/processoClienteController');
const verifyRole = require('../middleware/authRole');

router.post('/', verifyRole('procurador'), processoClienteService.criarRelacao);
router.post('/clientesId', verifyRole('procurador'), processoClienteService.listarPorProcessoId);
router.delete('/:clienteId/:processoId',verifyRole('procurador'), processoClienteService.removerRelacao);

module.exports = router;