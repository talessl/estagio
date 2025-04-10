const express = require('express');
const router = express.Router();
const processoController = require('../controllers/processoController');
const verifyRole = require('../middleware/authRole');



router.post('/',verifyRole('procurador'),processoController.criarProcesso);
router.get('/', processoController.listarProcessosPrivados);
router.get('/cliente', processoController.listarProcessosPrivadosCliente);
router.get('/:id', processoController.buscarPorId);
router.put('/:id', processoController.atualizarProcesso);
router.delete('/:id', processoController.removerProcesso);

module.exports = router;