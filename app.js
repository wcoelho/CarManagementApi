const Promise = require('bluebird')  
const VeiculoDAO = require('./dao/veiculo_dao')  
const Queries = require('./queries/queries')  
   
function app() {  
    const dao = new VeiculoDAO('./db/database.sqlite3')
    const queries = new Queries(dao)
    let id

    queries.createTable()
    .then(() => {          
        const veiculos = [
        {
            placa: "HNU-0402",
            chassi: "6MMTW8D425T006276",
            renavam: "623456789",
            modelo: "Santana",
            marca: "Volkswagen",
            ano: "2000"
        },
        {
            placa: "HNU-0404",
            chassi: "8MMTW8D425T006277",
            renavam: "323456785",
            modelo: "Corcel",
            marca: "Ford",
            ano: "1975"
        }
        ]
        return Promise.all(veiculos.map((veiculo) => {
            const { placa, chassi, renavam, modelo, marca, ano } = veiculo
            const result = queries.create(placa, chassi, renavam, modelo, marca, ano)
            this.id = result.then((data) => { 
                return data.id
            })
            console.log(this.id)
            return result
        }))
    })
    .then(() => queries.getAll())
    .then((veiculos) => {
        console.log(`\nDados do veículo recuperados do banco de dados: `)
        return new Promise((resolve, reject) => {            
            veiculos.forEach((veiculo) => {  
                console.log(`==================`)              
                console.log(`id = ${veiculo.id}`)
                console.log(`placa = ${veiculo.placa}`)
                console.log(`chassi = ${veiculo.chassi}`)
                console.log(`renavam = ${veiculo.renavam}`)
                console.log(`modelo = ${veiculo.modelo}`)
                console.log(`marca = ${veiculo.marca}`)
                console.log(`ano = ${veiculo.ano}`)
            })
          })
          resolve('success')
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
}

app();