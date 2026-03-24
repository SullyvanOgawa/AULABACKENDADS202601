import Cidade from '../Model/cidade.js';

export default class CidadeController {
    
    async gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const uf = requisicao.body.uf;

            if(nome && uf){
                const cidade = new Cidade(null, nome, uf);

                cidade.gravar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Cidade cadastrada com sucesso.",
                        "id": cidade.id
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar a cidade: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas os campos devem ser preenchidas!!!"
                });
            }

        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo nao permitido. Consulte a documentação da API."
            });
        }
    }

    async editar(requisicao, resposta){
        if(requisicao.method === "PUT" || requisicao.method === "PATCH" && requisicao.is("application/json")){
            const id = requisicao.params.id;
            const nome = requisicao.body.nome;
            const uf = requisicao.body.uf;

            if(id > 0 && nome && uf){
                const cidade = new Cidade(id, nome, uf);

                cidade.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cidade atualizada com sucesso."
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a cidade: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!!!"
                });
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo nao permitido. Consulte a documentação da API."
            });
        }
    }
    
    async excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;

            if(id > 0){
                const cidade = new Cidade(id);

                cidade.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cidade excluida com sucesso."
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a cidade: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um id valido. Consulte a documentação da API."
                });
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo não permitido. Consulte a documentação da API."
            });
        }
    }
    
    async consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
            let termo;

            const id = requisicao.params.id;
            if(!isNaN(id)){ 
                termo = id; // id é um número.
            }else{
                termo = ''; // string.
            }

            const cidade = new Cidade();
            cidade.consultar(termo)
            .then(listaCidades =>{
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Consulta realizada com sucesso.",
                    "cidades": listaCidades
                });
            })
            .catch(erro => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar a cidade: " + erro.message
                });
            });
        }
    }
}