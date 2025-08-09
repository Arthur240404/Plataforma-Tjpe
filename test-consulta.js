const soap = require('soap');
const https = require('https');
const fs = require('fs');
const path = require('path');

const certificadoPath = path.resolve(__dirname, '../backend/certificados/certificado.pfx');
const senhaCertificado = '12345678'; // Altere para sua senha
const wsdl = 'https://homologacao.tjpe.jus.br/consultaprocessualunificadaservicoexterno/ConsultaProcessualUnificadaServicosServico?wsdl';

const agent = new https.Agent({
  pfx: fs.readFileSync(certificadoPath),
  passphrase: senhaCertificado,
  rejectUnauthorized: false,
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.3'
});

soap.createClient(wsdl, { wsdl_options: { agent } }, (err, client) => {
  if (err) {
    console.error('Erro SOAP:', err);
    return;
  }
  client.listarProcessosPorDadosParte({
    listarProcessosPorDadosParteRequest: {
      nomeParte: "CONDOMINIO EXEMPLO",
      tipoParte: "REU",
      cpfCnpj: "",
      comarca: "RECIFE"
    }
  }, (error, result) => {
    if (error) {
      console.error('Erro na consulta:', error);
    } else {
      console.log('Resultado:', result);
    }
  });
});