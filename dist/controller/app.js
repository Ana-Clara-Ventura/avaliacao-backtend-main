"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Veiculo_1 = require("../model/Veiculo");
const bancoDeDados_1 = require("./bancoDeDados");
// Inicializa uma lista de Veiculos
(0, bancoDeDados_1.inicializarVeiculos)();
// Cria o servidor express
const app = (0, express_1.default)();
// Define a porta que o servidor vai escutar as requisições
const port = 3000;
app.use((0, cors_1.default)());
// Habilitando o uso de JSON no servidor express
app.use(express_1.default.json());
// Primeira rota, a rota principal do servidor
app.get('/', (req, res) => {
    console.log('Recebi sua requisição');
    res.send({ mensagem: "Estou devolvendo a resposta para sua requisição" });
});
// Rota para cadastrar uma pessoa
app.post('/cadastro', (req, res) => {
    // Recuperando as informações JSON que vieram no corpo (body) da requisição (req) e desestruturando essa informação para cada atributo
    const { tipo, marca, modelo, placa, combustivel, anodefabricacao, cor, quilometragem } = req.body;
    // Criando um novo objeto do tipo Pessoa com as informações recuperadas da requisição
    const veiculo = new Veiculo_1.Veiculo(tipo, marca, modelo, placa, combustivel, anodefabricacao, cor, quilometragem);
    // Apenas imprimindo as informações do objeto no console do servidor
    console.log(veiculo);
    // Chamando a função para persistir (salvar) os dados da pessoa no banco de dados
    (0, bancoDeDados_1.persistirVeiculo)(veiculo);
    // Resposta que o servidor irá enviar ao front-end (A resposta será estrutura em um JSON)
    res.json({ mensagem: "Veiculo cadastrado com sucesso" });
});
// Rota para consultar veículos
app.get('/veiculo', (req, res) => {
    const listaDeVeiculos = (0, bancoDeDados_1.listarVeiculos)();
    console.log(`Retornando a lista dos veículos cadastrados`);
    res.json(listaDeVeiculos);
});
// Servidor sendo executado
app.listen(port, () => {
    console.log(`Servidor Express ouvindo na endereço http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map