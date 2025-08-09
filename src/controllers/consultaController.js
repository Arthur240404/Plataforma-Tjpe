const tjpeClient = require('../soap/tjpeClient');
const exportCsv = require('../utils/exportCsv');

// Consulta processual principal
exports.consultaProcessos = async (req, res) => {
  try {
    const filtros = req.body;
    const resultado = await tjpeClient.consultaPorParte(filtros);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportarResultados = async (req, res) => {
  try {
    const { dados, formato } = req.body;
    const arquivo = await exportCsv(dados, formato || 'csv');
    res.download(arquivo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.consultaAdvogado = async (req, res) => {
  try {
    const filtros = req.body;
    const resultado = await tjpeClient.consultaPorAdvogado(filtros);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.consultaCDA = async (req, res) => {
  try {
    const filtros = req.body;
    const resultado = await tjpeClient.consultaPorCDA(filtros);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.consultaComarcas = async (req, res) => {
  try {
    const resultado = await tjpeClient.consultaComarcas();
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Diagnóstico: retorna métodos e filtros possíveis do SOAP
exports.diagnosticoSOAP = async (req, res) => {
  try {
    const info = await tjpeClient.describe();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};