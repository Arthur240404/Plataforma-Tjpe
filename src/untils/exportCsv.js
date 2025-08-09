const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

module.exports = async (dados, formato = 'csv') => {
  if (!Array.isArray(dados) || dados.length === 0)
    throw new Error('Nenhum dado para exportar');

  const headers = Object.keys(dados[0]).map(k => ({ id: k, title: k }));

  const fileName = `export-${Date.now()}.${formato}`;
  const filePath = path.resolve(__dirname, '../../logs/', fileName);

  if (formato === 'csv') {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers
    });
    await csvWriter.writeRecords(dados);
    return filePath;
  } else if (formato === 'json') {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
    return filePath;
  } else {
    throw new Error('Formato não suportado');
  }
};