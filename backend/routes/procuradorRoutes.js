const express = require('express');
const router = express.Router();
const procuradorController = require('../controllers/procuradorController');
const verifyRole = require('../middleware/authRole');

router.get('/:usuarioId', verifyRole('procurador'), procuradorController.listarPorUsuarioId);

module.exports = router;