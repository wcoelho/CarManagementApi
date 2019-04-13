const express = require('express');
const bodyParser = require('body-parser');
const Queries = require('./queries/queries') 
const VeiculoDAO = require('./dao/veiculo_dao')

const app = express();

const port = 8000;

// Permite enviar resposta em formato json
app.use(bodyParser.json())

// Cria o banco de dados, caso não exista, e recebe a conexão
const dao = new VeiculoDAO('./db/database.sqlite3')

require('./app/routes')(app, dao);

// Inicializa a conexão na classe de queries
const queries = new Queries(dao)

// Cria a tabela de veiculos, caso não exista
queries.createTable()

// Sobe a aplicação
app.listen(port, () => {
  console.log('Aplicação rodando na porta ' + port);
});