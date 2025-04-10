const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const documentoController = require('../controllers/documentoController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/upload/:processoId', upload.single('documento'), documentoController.uploadDocumento);

router.get('/:processoId', verifyToken, documentoController.listarDocumentoPorId);
router.get('/download/:caminho', verifyToken, documentoController.downloadDocumento);
router.delete('/:id',verifyToken, documentoController.removerDocumento );

module.exports = router;
