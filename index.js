import Cliente from "./Model/cliente.js";
import Cidade from "./Model/cidade.js";

const cidade = new Cidade(1, "Presidente Prudente", "SP");
const cliente_atual = new Cliente(1, "359.769.588.42", "Sullyvan Ogawa", "rua1", "bairro1", cidade, "uf1", "telefone1", "email1");

console.log(cliente_atual.toString());

cliente_atual.cidade = new Cidade(2, "São Paulo", "SP");
console.log(cliente_atual.toString());

// 1:42:27 - clienteDB.js - excluir