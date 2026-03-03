export default class cidade{
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

    async gravar() {}

    async atualizar() {}

    async excluir() {}

    async consultar() {
        return "";
    }
}