const Queries = require('../../queries/queries') 

module.exports = function(app, dao) {
  const queries = new Queries(dao)

  // Rota para adição de veículos
  app.post('/veiculos', (req, res) => {
    // As informações do veículo serão armazenadas no banco de dados
    const { placa, chassi, renavam, modelo, marca, ano } = { placa: req.body.placa, chassi: req.body.chassi, renavam: req.body.renavam, modelo: req.body.modelo, marca: req.body.marca, ano: req.body.ano }
    queries.create(placa, chassi, renavam, modelo, marca, ano)
    .then((data) => { // Se a operação de criação for bem sucedida, retorna os dados com o id
      let veiculo = req.body
      veiculo.id = data.id 
      res.send(veiculo)
    })    
  });

  // Rota para atualizar dados de um veículo
  app.put('/veiculos/:id', (req, res) => {
    // Verifica a consistência entre os ids do corpo da mensagem e do parâmetro
    if(req.params.id!=req.body.id)
    {
      res.send("{\"resultado\": \"Id passado no corpo da mensagem não confere com o id passado como parâmetro\"}")
    }
    // As informações do veículo serão atualizadas no banco de dados
    const { placa, chassi, renavam, modelo, marca, ano } = { placa: req.body.placa, chassi: req.body.chassi, renavam: req.body.renavam, modelo: req.body.modelo, marca: req.body.marca, ano: req.body.ano }
    queries.update(req.params.id, placa, chassi, renavam, modelo, marca, ano)
    // Se a operação de criação for bem sucedida, retorna os dados alterados
    
    getById(queries, req, res);
  
  });

  //Rota para recuperação da lista de veículos
  app.get('/veiculos', (req, res) => {
    // Os veículos serão buscadas no banco de dados
    getAll(queries, res);
  });

  //Rota para recuperação de dados de um veículo específico
  app.get('/veiculos/:id', (req, res) => {
    // Os veículos serão buscadas no banco de dados
    getById(queries, req, res);
  });

  //Rota para apagar registro de veículo específico
  app.delete('/veiculos/:id', (req, res) => {
    queries.delete(req.params.id)
    res.send("{\"resultado\": \"Registro com id " + req.params.id +  " apagado com sucesso\"}")
  });
};

function getById(queries, req, res) {
  queries.getById(req.params.id)
    .then((veiculo) => {
      if (veiculo == null) {
        res.send("{\"resultado\": \"Veículo com id " + req.params.id + " não encontrado\"}");
      }
      console.log(`Dados do veículo recuperados do banco de dados`);
      res.send(veiculo);
    });
}

function getAll(queries, res) {
  queries.getAll()
    .then((veiculos) => {
      if (veiculos.length == 0) {
        res.send("{\"resultado\": \"Nenhum veículo encontrado\"}");
      }
      console.log(`Lista de veículos recuperada do banco de dados`);
      res.send(veiculos);
    });
}
