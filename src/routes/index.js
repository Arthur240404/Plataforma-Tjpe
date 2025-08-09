const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Consulta processual com filtros avançados
router.post('/consulta', consultaController.consultaProcessos);

// Exportação de dados
router.post('/export', consultaController.exportarResultados);

// Consulta de advogados
router.post('/consulta-advogado', consultaController.consultaAdvogado);

// Consulta CDA
router.post('/consulta-cda', consultaController.consultaCDA);

// Consulta de comarcas
router.get('/comarcas', consultaController.consultaComarcas);

// Consulta de métodos disponíveis (diagnóstico)
router.get('/diagnostico', consultaController.diagnosticoSOAP);

module.exports = router;