var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../../server/app');
var should = chai.should();

const baseUrl = 'http://localhost:8000/api/v1/veiculos';

const code200 = 200;
const code201 = 201;
const code404 = 404;
const code500 = 500;
const objectType = 'object';
const arrayType = 'array';

let createdId;

chai.use(chaiHttp);

describe('Testes Unitários da API - Sucesso', function() {

    // Testes do 'caminho feliz'
    beforeEach(function(done){
        // Cria 2 veículos para execução dos testes e armazena o id
        for(var i=0; i<2; i++)
        {
            chai.request(baseUrl)
            .post('')
            .send({
                'placa': 'HBU-040' + i,
                'chassi': '6MMTW8D425T00627'+ i,
                'renavam': '62345678' + i,
                'modelo': 'Santana',
                'marca': 'Volkswagen',
                'ano': 2008 + i
            })
            .end(function (err, res) {
                checkResponse(res, code201, objectType);
                createdId = res.body.id;
            });
        }
        done();
    });

    it('Deve listar todos os veiculos a partir de /veiculos GET', function(done) {
        chai.request(baseUrl)
        .get('')
        .end(function(err, res){

            checkResponse(res, code200, arrayType);

            var _body = res.body;

            expect(_body).to.have.lengthOf.at.least(2);
                
            // Verificar se retornou as propriedades para cada item
            for(var i=0; i<_body.length; i++)
            {
                checkResponseParameters(_body[i]);
            }
            done(); 
        });
    });
        
    it('Deve recuperar os dados de um único veículo a partir de /veiculos/<id> GET', function(done) {
        chai.request(baseUrl)
        .get('/'+createdId)
        .end(function(err, res){

            checkResponse(res, code200, objectType);
            checkResponseParameters(res.body);

            done()
        });
        
    });

    it('Deve criar um veículo em /veiculos POST', function(done) {
        chai.request(baseUrl)
        .post('')
        .send({
            'placa': 'HBU-0404',
            'chassi': '6MMTW8D425T006272',
            'renavam': '623456781',
            'modelo': 'Voyage',
            'marca': 'Volkswagen',
            'ano': 2010
        })
        .end(function (err, res) {

            checkResponse(res, code201, objectType);
            checkResponseParameters(res.body);

            done(err);
        });
    });

    it('Deve atualizar um veículo em /veiculos/{id} PUT', function(done) {
        var updatedValues = 
        {
            'id': createdId,
            'placa': 'HBU-0402',
            'chassi': '6MMTW8D425T006271',
            'renavam': '623456780',
            'modelo': 'Fusion',
            'marca': 'Ford',
            'ano': 2015
        };
        chai.request(baseUrl)
        .put('/'+ createdId)
        .send(updatedValues)
        .end(function (err, res) {
            checkResponse(res, code200, objectType);
            checkResponseParameters(res.body);

            expect(res.body).to.eql(updatedValues)

            done(err);
        });
    });

    it('Deve apagar o registro de um veículo a partir de /veiculos/<id> DELETE', function(done) {
        chai.request(baseUrl)
        .delete('/'+createdId)
        .end(function(err, res){

            checkResponse(res, code200, objectType);

            done()
        });
        
    });

    it('Deve retornar 200 OK ao tentar apagar registro inexistente a partir de /veiculos/<id> DELETE', function(done) {
        chai.request(baseUrl)
        .delete('/'+createdId)
        .end(function(err, res){

            checkResponse(res, code200, objectType);

            done()
        });
        
    });

});

describe('Testes Unitários da API - Exceções', function() {

    it('Erro 404 para Id inválido a partir de /veiculos/<id> GET', function(done) {
        chai.request(baseUrl)
        .get('/invalidId')
        .end(function(err, res){

            checkResponse(res, code404, objectType);

            done()
        });
        
    });

    it('Erro 500 ao enviar id inconsistente para /veiculos POST', function(done) {
        var updatedValues = 
        {
            'id': 20000,
            'placa': 'HBU-0402',
            'chassi': '6MMTW8D425T006271',
            'renavam': '623456780',
            'modelo': 'Fusion',
            'marca': 'Ford',
            'ano': 2015
        };
        chai.request(baseUrl)
        .put('/'+ createdId)
        .send(updatedValues)
        .end(function (err, res) {
            checkResponse(res, code500, objectType);

            done(err);
        });
    });


    it('Erro 404 ao enviar id inválido para /veiculos/<id> PUT', function(done) {
        var updatedValues = 
        {
            'id': 20000,
            'placa': 'HBU-0402',
            'chassi': '6MMTW8D425T006271',
            'renavam': '623456780',
            'modelo': 'Fusion',
            'marca': 'Ford',
            'ano': 2015
        };
        chai.request(baseUrl)
        .put('/'+ 20000)
        .send(updatedValues)
        .end(function (err, res) {
            checkResponse(res, code404, objectType);

            done(err);
        });
    });


});

function checkResponse(res, code, type) {
    res.should.have.status(code);
    res.should.be.json;
    res.body.should.be.a(type);
}

function checkResponseParameters(body) {
    expect(body).to.have.property('placa');
    expect(body).to.have.property('chassi');
    expect(body).to.have.property('renavam');
    expect(body).to.have.property('marca');
    expect(body).to.have.property('modelo');
    expect(body).to.have.property('ano');
    expect(body).to.have.property('id');
}


