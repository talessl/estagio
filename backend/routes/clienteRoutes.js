const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const verifyRole = require('../middleware/authRole');

router.get('/:usuarioId', verifyRole('procurador'), clienteController.listarPorUsuarioId);
router.post('/usuario', verifyRole('procurador'), clienteController.listarPorId);

module.exports = router;