# API para cadastro e gerenciamento de veículos

## Autor
Walter de Oliveira Pinto Coelho  
wcoelho@gmail.com  
  

## Solução
  
Linguagem: NodeJS  
Banco de Dados: SQLite (gerado automaticamente ao rodar a aplicação)  
  
## Endpoints  
  
URL base = http://localhost:8000/api/v1/ 

* GET veiculos/ => Lista todos veículos registrados
  
* GET veiculos/{id} => Lista os dados de veículo específico identificado pelo id 
    
* POST veiculos/ => Cria novo veículo  
Payload:  
{  
    "placa": string,  
    "chassi": string,  
    "renavam": string,  
    "marca": string,  
    "modelo": string,   
    "ano": number  
}  
  
* PUT veiculos/{id} => Atualiza os dados de veículo específico identificado pelo id  
Payload:  
{  
    "id": number,  
    "placa": string,  
    "chassi": string,  
    "renavam": string,    
    "marca": string,  
    "modelo": string,   
    "ano": number  
}  
  
* DELETE veiculos/{id} => Apaga o registro de veículo específico identificado pelo id  

## Dependências  
  
bluebird, body-parser, cors, express, sqlite3, chai, chai-http, mocha, nodemon, request, should  
  
Use o seguinte comando para instalar as dependèncias acima:  
  
npm install

## Execução da aplicação  
  
npm run  
  
## Execução de Testes

**Testes Unitários**  

Use o seguinte comando para executar os testes unitários (Mocha/Chai)  
  
npm test

**Postman Collection**

[Download](https://www.getpostman.com/collection)

Importe os arquivos de testes e variáveis de ambiente presentes na pasta test/postman:  
* postman_collection.json
* postman_environment.json

Selecione o ambiente "CarManagemntEnv" e execute os testes da Collection "Car Management API".
