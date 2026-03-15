import obterConexao from "./conexao.js";
import Cliente from "../Model/cliente.js";
import Cidade from "../Model/cidade.js"; // caminho relativo para o projeto/";
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
            // pegando o id gerado pelo banco, ou seja, atualizando o id do cliente
            const resultado = await conexao.execute(sql, parametros);
            cliente.id = resultado[0].insertId;
            
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
            // devolvendo para o pool de conexão, ou seja, libero a conexão
            conexao.release();
        }

    }

    async excluir(cliente) {
        if(cliente instanceof Cliente){
            const sql = `DELETE FROM cliente WHERE cli_id = ?;`;
            const conexao = await obterConexao();
            await conexao.execute(sql, [cliente.id]);
            conexao.release();
        }

    }

    async consultar(termo) {

        let sql = "";
        let parametros = [];
        
        if(!isNaN(Number(termo)) && Number(termo) > 0){
            // caso não seja um número consultar pelo código
            sql = `SELECT * FROM cliente as cli
                            INNER JOIN cidade as cid
                            ON cli.cid_id = cid.cid_id
                            WHERE cli.cli_id = ?`;
            parametros = [termo];
        }
        else{
            // consulta verrificara se termo é um número ou uma string.
            // ele pergunta se termo nao é um número
            sql = `SELECT * FROM cliente as cli
                            INNER JOIN cidade as cid
                            ON cli.cid_id = cid.cid_id
                            WHERE cli.cli_nome LIKE ?`;
            parametros = [`%${termo}%`];
            
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaClientes = [];
        for(const resultado of resultados[0]){
            const cidade = new Cidade(resultado.cid_id, resultado.cid_nome, resultado.cid_uf);
            const cliente = new Cliente(resultado.cli_id, 
                                        resultado.cli_cpf, 
                                        resultado.cli_nome, 
                                        resultado.cli_endereco, 
                                        resultado.cli_bairro, 
                                        cidade, 
                                        resultado.cli_telefone, 
                                        resultado.cli_email);
            
            // cada novo cliente gerado eu adiciono um cliente nessa lista
            listaClientes.push(cliente);
        }

        return listaClientes;

    }
}