const express = require('express');
const router = express.Router();
const prazoController = require('../controllers/prazoController');
const verifyRole = require('../middleware/authRole');


router.post('/', verifyRole('procurador'), prazoController.criarPrazo);
router.put('/:id', verifyRole('procurador'), prazoController.atualizarPrazo);
router.delete('/:id', verifyRole('procurador'), prazoController.removerPrazo);
router.get('/:id', prazoController.listaPrazoPorProcessoId);

module.exports = router;