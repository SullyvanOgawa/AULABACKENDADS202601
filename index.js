// import Cliente from "./Model/cliente.js";
// import Cidade from "./Model/cidade.js";

// const cidade = new Cidade(1, "Presidente Prudente", "SP");
// const cliente_atual = new Cliente(1, "359.769.588.42", "Sullyvan Ogawa", "rua1", "bairro1", cidade, "telefone1", "email1");
// const cliente_novo = new Cliente(2, "359.769.588.42", "Juliana Ogawa", "rua2", "bairro2", cidade, "telefone2", "email2");

// // cliente_novo.gravar()
// // .then(() => {
// //     console.log("Cliente Gravado com sucesso!")

// // })
// // .catch(err => console.log(err));

// // cliente_atual.gravar()
// // .then(() => {
// //     console.log("Cliente Gravado com sucesso!")

// // })
// // .catch(err => console.log(err));


// // cliente_atual.consultar("Juliana Ogawa")
// // .then((lista) => {
// //     for (const cliente of lista) {
// //         console.log(cliente.toString());
// //     }
// // })
// // .catch((erro) => console.log(erro.menssage));

import express from "express";

const localhost = '0.0.0.0';
const port = 4000;
const app = express();

app.listen(port, localhost, () => console.log(`API Executando na porta ${port}`));