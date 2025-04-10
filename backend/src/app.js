const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('../routes/authRoutes');
const verifyToken = require('../middleware/authMiddleware');
const processoRoutes = require('../routes/processoRoutes');
const processoClienteRoutes = require('../routes/processoClienteRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const documentoRoutes = require('../routes/documentoRoutes');
const procuradorRoutes = require('../routes/procuradorRoutes');
const prazoRoutes = require('../routes/prazoRoutes');
const clienteRoutes = require('../routes/clienteRoutes');



const cors = require('cors');

app.use(cors()); //pode ser limitado para mais segurança
app.use('/documentos/upload', documentoRoutes);
app.use(express.json());
app.use(authRoutes);
app.use('/processoCliente', verifyToken, processoClienteRoutes);
app.use('/processos', verifyToken,processoRoutes);
app.use('/usuarios', verifyToken, usuarioRoutes);
app.use('/documentos', documentoRoutes); 
app.use('/procuradores', verifyToken, procuradorRoutes)
app.use('/prazos', verifyToken, prazoRoutes)
app.use('/clientes', verifyToken, clienteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
