import CidadeDB from '../DB/cidadeDB.js';
export default class Cidade{
    #id;
    #nome;
    #uf;
    constructor(id,nome,uf){
        this.#id = id;
        this.#nome = nome;
        this.#uf = uf;
    }

    get id(){
        return this.#id;
    }

    get nome(){
        return this.#nome;
    }
    
    get uf(){
        return this.#uf;
    }

    set id(novoId){
        this.#id = novoId;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }
    
    set uf(novoUf){
        this.#uf = novoUf;
    }

    toString(){
        return `${this.#nome}/UF: ${this.#uf}`
    }

    async gravar(){
        const cidadeDB = new CidadeDB();
        await cidadeDB.gravar(this);
    }

    async editar(){
        const cidadeDB = new CidadeDB();
        await cidadeDB.editar(this);
    }

    async excluir(){
        const cidadeDB = new CidadeDB();
        await cidadeDB.excluir(this);
    }

    async consultar(termo){
        const cidadeDB = new CidadeDB();
        return await cidadeDB.consultar(termo);
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "uf": this.#uf
        }
    }
}