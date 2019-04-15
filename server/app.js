const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const Queries = require('./queries/queries') 
const VeiculoDAO = require('./dao/veiculo_dao')

let app = express();

// Habilitando o CORS
app.options('*', cors());

const port = 8000;

// Permite enviar resposta em formato json
app.use(bodyParser.json())

// Cria o banco de dados, caso não exista, e recebe a conexão
const dao = new VeiculoDAO('./db/database.sqlite3')

// Inicializando as rotas com o app e o dao
require('./routes')(app, dao);

// Inicializa a conexão na classe de queries
const queries = new Queries(dao)

// Cria a tabela de veiculos, caso não exista
queries.createTable()

// Sobe a aplicação
const server = app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});

// Encerrando processos e fechando o banco de dados quando o servidor é derrubado
[`SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, function(code) {
    executeOnExit(code);
  });
})

process.on('exit', function(code) {
    console.info("Aplicação encerrada.");
});


function executeOnExit(signal) {
  console.info(`Sinal ${signal} recebido`);
  console.info('Fechando servidor http e conexão ao banco de dados...');
  server.close();
  console.info('Servidor Http fechado.');
  dao.close;
  console.info('Conexão ao banco de dados fechada.');
  process.exit(0);
}

