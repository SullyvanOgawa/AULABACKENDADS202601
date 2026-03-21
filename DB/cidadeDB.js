import obterConexao from "./conexao.js";
import Cidade from "../Model/cidade.js";

export default class CidadeDB{
   
    async gravar(cidade){
        if(cidade instanceof Cidade){
            const sql = `INSERT INTO cidade(cid_nome, cid_uf) VALUES (?, ?)`;

            const parametros = [cidade.nome, cidade.uf];
            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            cidade.id = resultado[0].insertId;
            conexao.release();
        }           
    }

    async editar(cidade){
        if(cidade instanceof Cidade){
            const sql = `UPDATE cidade SET cid_nome = ?, cid_uf = ? WHERE cid_id = ?`;
            const parametros = [cidade.nome, cidade.uf, cidade.id];
            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async excluir(cidade){
        if(cidade instanceof Cidade){
            const sql = `DELETE FROM cidade WHERE cid_id = ?`;
            const conexao = await obterConexao();
            await conexao.execute(sql, [cidade.id]);
            conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];

        if(!isNaN(Number(termo)) && Number(termo) > 0){
            sql = `SELECT * FROM cidade WHERE cid_id = ?`;
            parametros = [termo];
        }else{
            sql = `SELECT * FROM cidade WHERE cid_nome LIKE ?`;
            parametros = [`%${termo}%`];
        }
        
        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaCidades = [];
        for(const resultado of resultados[0]){
            const cidade = new Cidade(resultado.cid_id, resultado.cid_nome, resultado.cid_uf);
            
            listaCidades.push(cidade);
        }
        
        return listaCidades;
    }
}