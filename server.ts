import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const bodyParser = require('body-parser');
  const sql = require('mssql');
  const cors = require('cors');

  const app = express();
  const port = 4200;

app.use(cors());
app.use(bodyParser.json());

// Configuração da string de conexão com o SQL Server
  const config = {
  user: 'maxer', // substitua com o usuário do SQL Server
  password: '10205618', // substitua com a senha do SQL Server
  server: 'localhost',
  database: 'PLDApp',
};

 // Rota para conectar ao banco de dados
app.post('/api/connect', (req, res) => {
  sql.connect(config, (err: any) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      res.status(500).send('Erro ao conectar ao banco de dados.');
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados SQL Server.');
    res.status(200).send('Conexão bem-sucedida ao banco de dados SQL Server.');
  });
});

// Rota para realizar operações CRUD no banco de dados

// Exemplo: Rota para obter todos os registros de uma tabela
app.get('/api/registros', (req, res) => {
  const query = 'SELECT * FROM tabela';
  sql.query(query, (err: any, result: { recordset: any; }) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);
      res.status(500).send('Erro ao executar consulta.');
      return;
    }
    res.status(200).json(result.recordset);
  });
});

// Mais rotas para outras operações CRUD

app.listen(port, () => {
  console.log(`Servidor está escutando na porta ${port}`);
});

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
