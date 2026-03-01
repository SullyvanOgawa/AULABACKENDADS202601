import Cliente from "./Model/cliente.js"

const cliente_atual = new Cliente(1, "359.769.588.42", "Sullyvan Ogawa", "rua1", "bairro1", "cidade1", "uf1", "telefone1", "email1");

console.log(cliente_atual.toString());