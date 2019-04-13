class Queries {  

    constructor(dao) {
      this.dao = dao
    }
  
    // Cria a tabela de veículos
    createTable() {
      const sql =
        `CREATE TABLE IF NOT EXISTS veiculos(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            placa TEXT, 
            chassi TEXT, 
            renavam TEXT, 
            modelo TEXT, 
            marca TEXT, 
            ano INTEGER)`

      return this.dao.run(sql)
    }

    // Registra um novo veículo
    create(placa, chassi, renavam, modelo, marca, ano) {
        return this.dao.run(
          `INSERT INTO veiculos (placa, chassi, renavam, modelo, marca, ano)
            VALUES (?, ?, ?, ?, ?, ?)`,
          [placa, chassi, renavam, modelo, marca, ano])
    }

    // Atualiza os dados de um veículo
    update(id, placa, chassi, renavam, modelo, marca, ano) {
        return this.dao.run(
          `UPDATE veiculos SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ? WHERE id = ?`,
          [placa, chassi, renavam, modelo, marca, ano, id]
        )
    }

    // Apaga o registro de um veículo
    delete(id) {
        return this.dao.run(
            `DELETE FROM veiculos WHERE id = ?`,
            [id]
        )
    }

    // Recupera informação de um veículo
    getById(id) {
        return this.dao.get(
          `SELECT * FROM veiculos WHERE id = ?`,
          [id])
    }

    // Recupera lista de todos veículos
    getAll() {
        return this.dao.all(`SELECT * FROM veiculos`)
    }
}
  
module.exports = Queries; 