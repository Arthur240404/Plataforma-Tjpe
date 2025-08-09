# Plataforma TJPE Consulta Processual

## Objetivo
Facilitar consultas processuais ao TJPE via integração SOAP autenticada por certificado digital, exibindo resultados em dashboard web, com filtros avançados e opção de exportação de dados.

## Estrutura do Projeto

```
tjpe-platform/
├── backend/
│   ├── src/
│   │   ├── soap/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── certificados/
│   ├── logs/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ConsultaPage.js
│   │   │   └── DashboardPage.js
│   │   └── App.js
│   └── package.json
├── scripts/
│   ├── test-conexao.js
│   └── test-consulta.js
├── README.md
```

## Instalação

1. Coloque o certificado digital `.pfx` em `backend/certificados/`.
2. Configure a senha no backend (backend/src/soap/tjpeClient.js).
3. Instale dependências (backend e frontend).
4. Execute scripts de teste em `scripts/`.
5. Inicie backend:  
   ```sh
   cd backend
   npm install
   npm start
   ```
6. Inicie frontend:  
   ```sh
   cd frontend
   npm install
   npm start
   ```
7. Acesse o painel web em [http://localhost:3000](http://localhost:3000).

## Funcionalidades
- Consulta processual (parte, advogado, CDA, comarca, classe, etc)
- Dashboard com estatísticas
- Exportação de resultados (CSV/JSON)
- Log de erros e auditoria
- Painel web

## Scripts de teste

- `scripts/test-conexao.js`: testa conexão SOAP/SSL.
- `scripts/test-consulta.js`: consulta exemplo por parte.

## Observação

- É necessário certificado digital válido e autorizado pelo TJPE.
- Para produção, usar variáveis de ambiente para senhas e caminhos de arquivos.