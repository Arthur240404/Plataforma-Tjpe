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

console.log('🔎 Testando conexão SOAP com TJPE...');
soap.createClient(wsdl, { wsdl_options: { agent } }, (err, client) => {
  if (err) {
    console.error('❌ Erro ao conectar no WSDL SOAP:', err.message);
    process.exit(1);
  }
  console.log('✅ Conexão SSL/TLS OK!');
  console.log('🔎 Métodos SOAP disponíveis:');
  console.dir(client.describe(), { depth: null });
  process.exit(0);
});