import obterConexao from "./conexao.js";
import Cliente from "./Model/cliente.js";
export default class ClienteDB {
    // assegura que o atributo passado é a instância de um cliente
    async gravar(cliente) {

        // se for uma instancia de um cliente, então você pega uma conexão. 
        if(cliente instanceof Cliente){
            const sql = `INSERT INTO cliente(cli_cpf, cli_nome, cli_endereco, cli_bairro, cid_id, cli_telefone, cli_email)  
                                             VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
            //lista de parametros para passar os valores de forma segura
            const parametros = [cliente.cpf, 
                                cliente.nome, 
                                cliente.endereco,
                                cliente.bairro, 
                                cliente.cidade.id, // cidade é um objeto, então pega o id dele desse jeito. 
                                cliente.telefone, 
                                cliente.email];
            
            const conexao = await obterConexao();

            // executando a query com os parâmetros
            await conexao.execute(sql, parametros);
            // devolvendo para o pool de conexão
            conexao.release();
        }
        
    }

    async editar(cliente) {
        if(cliente instanceof Cliente){
            const sql = `UPDATE SET cliente(cli_cpf = ?, cli_nome = ?, cli_endereco = ?, cli_bairro = ?, cid_id     = ?,                            cli_telefone = ?, cli_email = ?)  
                                            WHERE cli_id = ?`;
            
            //lista de parametros para passar os valores de forma segura
            const parametros = [cliente.cpf, 
                                cliente.nome, 
                                cliente.endereco,
                                cliente.bairro, 
                                cliente.cidade.id, // cidade é um objeto, então pega o id dele desse jeito. 
                                cliente.telefone, 
                                cliente.email];
            
            const conexao = await obterConexao();

            // executando a query com os parâmetros
            await conexao.execute(sql, parametros);
            // devolvendo para o pool de conexão
            conexao.release();
        }

    }

    async excluir(cliente) {

    }

    async consultar(cliente) {

    }
}