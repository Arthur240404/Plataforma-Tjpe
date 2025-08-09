const soap = require('soap');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Caminho do certificado digital .pfx
const certificadoPath = path.resolve(__dirname, '../../certificados/certificado-unico.pfx');
const senhaCertificado = process.env.CERT_PASSWORD || '33337777';

const wsdl = 'https://homologacao.tjpe.jus.br/consultaprocessualunificadaservicoexterno/ConsultaProcessualUnificadaServicosServico?wsdl';

function getAgent() {
  return new https.Agent({
    pfx: fs.readFileSync(certificadoPath),
    passphrase: senhaCertificado,
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3'
  });
}

async function getClient() {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdl, { wsdl_options: { agent: getAgent() } }, (err, client) => {
      if (err) return reject(err);
      resolve(client);
    });
  });
}

// Consulta por parte (nome, cpfCnpj, tipoParte, comarca, etc)
exports.consultaPorParte = async (filtros) => {
  const client = await getClient();
  const args = { listarProcessosPorDadosParteRequest: { ...filtros } };
  return new Promise((resolve, reject) => {
    client.listarProcessosPorDadosParte(args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Consulta por advogado
exports.consultaPorAdvogado = async (filtros) => {
  const client = await getClient();
  const args = { listarProcessosPorDadosAdvogadoRequest: { ...filtros } };
  return new Promise((resolve, reject) => {
    client.listarProcessosPorDadosAdvogado(args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Consulta por CDA
exports.consultaPorCDA = async (filtros) => {
  const client = await getClient();
  const args = { listarProcessosPorCDARequest: { ...filtros } };
  return new Promise((resolve, reject) => {
    client.listarProcessosPorCDA(args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Consulta comarcas
exports.consultaComarcas = async () => {
  const client = await getClient();
  return new Promise((resolve, reject) => {
    client.listarComarcas({ listarComarcasRequest: {} }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Diagnóstico: retorna estrutura do SOAP
exports.describe = async () => {
  const client = await getClient();
  return client.describe();
};