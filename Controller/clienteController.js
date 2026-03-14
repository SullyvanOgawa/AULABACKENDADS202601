// Nossa API um endpoint para cadastrar um cliente, permitindo que usuários possam, criar, consultar, editar e excluir clientes.
// O endpoint cliente deve ser implementado no padrão MVC.
// POST - (Criar um novo cliente), GET - (Consultar um cliente), PUT ou PATCH - (Editar um cliente), DELETE - (Excluir um cliente).
import Cidade from "../Model/cidade.js";
import Cliente from "../Model/cliente.js";
export default class ClienteController {

    // Requisição do tipo POST
    async gravar(requisicao, resposta) {

        //Para que um requisição seja processada, o seu método (method) deve ser do tipo POST.
                                                        //mimetype - rótulos ou etiquetas para identificar o conteúdo de uma requisição HTTP.
        if(requisicao.method === "POST" && requisicao.is("aplication/json")){
            
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
                        const cidadeObj = new Cidade(cidade.id);
                        const cliente = new Cliente(0, cpf, nome, endereco, bairro, cidadeObj, telefone, email);
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
                "mensagem": "Metodo nao permitido. Consulte a documentação da API."
            });

        }
        
    }

    // Requisição do tipo PUT ou PATCH
    async editar(requisicao, resposta) {}

    // Requisição do tipo DELETE
    async excluir(requisicao, resposta) {}

    // Requisição do tipo GET
    async consultar(requisicao, resposta) {
        
    }
}