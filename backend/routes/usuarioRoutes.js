const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.patch('/:id', usuarioController.atualizarUsuario);
router.get('/', usuarioController.listarUsuario);
router.get('/listarClientes', usuarioController.listarClientes);
router.get('/listarProcuradores', usuarioController.listarProcuradores);
router.post('/nomesPorIds', usuarioController.listarNomesPorId);

module.exports = router;