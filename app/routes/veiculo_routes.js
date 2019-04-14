const Queries = require('../../queries/queries') 
const cors = require('cors');

let queries;

module.exports = function(app, dao) {
  const baseURL = "/api/v1/veiculos"
  queries = new Queries(dao)

  // Rota para adição de veículos
  app.post(baseURL, cors(), (req, res) => {
    // As informações do veículo serão armazenadas no banco de dados
    const { placa, chassi, renavam, modelo, marca, ano } = getCarData(req)
    queries.create(placa, chassi, renavam, modelo, marca, ano)
    .then((data) => { // Se a operação de criação for bem sucedida, retorna os dados com o id
      let veiculo = req.body
      veiculo.id = data.id
      res.status(201).send(veiculo)
    })    
  });

  // Rota para atualizar dados de um veículo
  app.put(`${baseURL}/:id`, cors(), (req, res) => {
    // Verifica a consistência entre os ids do corpo da mensagem e do parâmetro
    if(req.params.id!=req.body.id)
    {
      res.status(500).json({erro: 'Ocorreu um erro em sua requisição. Consulte o administrador.'})
    } else {
      // As informações do veículo serão atualizadas no banco de dados
      const { placa, chassi, renavam, modelo, marca, ano } = getCarData(req)
      const id = req.params.id;
      queries.update(id, placa, chassi, renavam, modelo, marca, ano);

      // Recupera todos os campos
      getById(id, res);
    }
 
  });

  //Rota para recuperação da lista de veículos
  app.get(baseURL, cors(), (req, res) => {
    // Os veículos serão buscadas no banco de dados
    getAll(res);
  });

  //Rota para recuperação de dados de um veículo específico
  app.get(`${baseURL}/:id`, cors('/'), (req, res) => {
    // O veículos será buscado no banco de dados
    getById(req.params.id, res);
  });

  //Rota para apagar registro de veículo específico
  app.delete(`${baseURL}/:id`, cors(), (req, res) => {
    const id = req.params.id;
    queries.delete(id);
    let msg = `Registro com id ${id} apagado com sucesso`;
    console.log(msg);
    res.json({mensagem: msg});
  });
};

function getCarData(req) {
  return { placa: req.body.placa, chassi: req.body.chassi, renavam: req.body.renavam, modelo: req.body.modelo, marca: req.body.marca, ano: req.body.ano };
}

function getById(id, res) {
  queries.getById(id)
    .then((veiculo) => {
      if (veiculo == null) {        
        res.status(404).json({erro: `Veículo com id ${id} não encontrado`});
      } else {
        console.log(`Dados do veículo recuperados do banco de dados`);      
        res.send(veiculo);
      }
    });    
}

function getAll(res) {
  queries.getAll()
    .then((veiculos) => {
      if (veiculos.length == 0) {
        res.json({erro: 'Nenhum veículo encontrado'});
      } else {
        console.log(`Lista de veículos recuperada do banco de dados`);
        res.send(veiculos);
      }
    });
}
