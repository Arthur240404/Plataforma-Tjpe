const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const consultaRoutes = require('./routes');
const winston = require('winston');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Logger configurado para logar em arquivo e console
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.resolve(__dirname, '../../logs/app.log') }),
    new winston.transports.Console()
  ]
});

app.use(cors());
app.use(bodyParser.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, { body: req.body });
  next();
});

// Rotas principais
app.use('/api', consultaRoutes);

// Rota de status
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  logger.info(`Backend rodando na porta ${PORT}`);
});