// Nossa API um endpoint para cadastrar um cliente, permitindo que usuários possam, criar, consultar, editar e excluir clientes.
// O endpoint cliente deve ser implementado no padrão MVC.
// POST - (Criar um novo cliente), GET - (Consultar um cliente), PUT ou PATCH - (Editar um cliente), DELETE - (Excluir um cliente).
import Cidade from "../Model/cidade.js";
import Cliente from "../Model/cliente.js";
export default class ClienteController {

    // Requisição do tipo POST
    gravar(requisicao, resposta) {

        //Para que um requisição seja processada, o seu método (method) deve ser do tipo POST.
                                                        //mimetype - rótulos ou etiquetas para identificar o conteúdo de uma requisição HTTP.
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            
                    const cpf = requisicao.body.cpf;
                    const nome = requisicao.body.nome;
                    const endereco = requisicao.body.endereco;
                    const bairro = requisicao.body.bairro;
                    // cidade é um atributo objeto aninhado ao objeto cliente
                    const cidade = requisicao.body.cidade;
                    const telefone = requisicao.body.telefone;
                    const email = requisicao.body.email;

                    // pseudo validação dos dados
                    if(cpf && nome && endereco && bairro && cidade && telefone && email){
                        // Por ser uma entidade (objeto). Nesse momento pegamos apenas o id da cidade especificada ao cliente.Em suma, para criar um cliente eu preciso do objeto cidade.
                        // instanciando os objetos cidade e cliente.
                        const cidadeObj = new Cidade(cidade.id);
                        // quando um campo é AUTO_INCREMENT,  o banco gera o id automaticamente. Então no momento de criar o objeto no Node, você não deve enviar um id fixo. 
                        const cliente = new Cliente(null, cpf, nome, endereco, bairro, cidadeObj, telefone, email);

                        // Não bloquear a execução enquanto o banco de dados não responde, o que deve ser feito é um agendamento de funções anônimas que erão processadas quando houver uma resposta. 
                        cliente.gravar().
                        then(() => {
                            resposta.status(201).json({
                                "status": true,
                                "mensagem": "Cliente cadastrado com sucesso.",
                                "id": cliente.id
                            });
                            
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Erro ao gravar o cliente: " + erro.message
                            })
                        });
                        
                    }
                    else{
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Todos os campos devem ser preenchidos."
                        });
                    }
        }
        else{
            // Caso a requisição não seja do tipo POST, então teremos uma resposta que indica um status, ou código  protocolo HTTP que em nosso caso será o 405 Method Not Allowed - método não é permitido.
            
            // developer.mozilla.org/en-US/docs/Web/HTTP/Reference/status.
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo não permitido. Consulte a documentação da API."
            });

        }
        
    }

    // Requisição do tipo PUT ou PATCH
    editar(requisicao, resposta) {
        // deveria ser implementado para substituir completamente um recurso no servidor. 
        // deveria ser implementado para alterar parte de um recurso existente no servidor.
        // fakestorestapi.com/docs
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            // pelo padrão rest o id do cliente deve ser buscado na URL, e nâo no corpo da requisição.
            // params - parâmetros da URL.
            const id = requisicao.params.id; // o id está na URL da requisição.
            // o resto das informações do cliente vem no corpo da requisição.
            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if (id > 0 && cpf && nome && endereco && bairro && cidade && telefone && email){
                // instanciando os objetos cidade e cliente.
                const cidadeObj = new Cidade(cidade.id);
                const cliente = new Cliente(id, cpf, nome, endereco, bairro, cidadeObj, telefone, email);

                cliente.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso."
                    })
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao editar o cliente: " + erro.message
                    })
                });

                
            }else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os dados do cliente são obrigatórios. Consulte a documentação da API."
                });
            }

        }else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo nao permitido. Consulte a documentação da API."
            });
        }
     }

    // Requisição do tipo DELETE
     excluir(requisicao, resposta) {
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;
            if(id > 0){
                const cliente = new Cliente(id);
                cliente.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluido com sucesso."
                    })
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente: " + erro.message
                    })
                });

            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um id válido. Consulte a documentação da API."
                });
            }

        }else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo nao permitido. Consulte a documentação da API."
            });
        }
     }

    // Requisição do tipo GET
     consultar(requisicao, resposta) {
        if(requisicao.method === "GET"){
            // a identificação da existência de um id na URL, provocará a consulta por id (consultar por pessoa especifica).
            // sem id a consulta será genérica.

            let termo;

            const id = requisicao.params.id;
            if(!isNaN(id)){ // id é um número?

                termo = id;

            }else{
                 termo = ''; // string vazia.
            }

            const cliente = new Cliente();
            cliente.consultar(termo)
            .then((listaClientes) => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Consulta realizada com sucesso.",
                    "clientes": listaClientes
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o cliente: " + erro.message
                })
            });
            
        }

    }

    
    
}

