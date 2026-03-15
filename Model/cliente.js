import ClienteDB from '../DB/clienteDB.js';
export default class Cliente {
  #id;
  #cpf;
  #nome;
  #endereco;
  #bairro;
  #cidade;
  #telefone;
  #email;

  get id() {
    return this.#id;
  }

  set id(novoId){
    this.#id = novoId;
  }
  get cpf() {
    return this.#cpf;
  }

  get nome() {
    return this.#nome;
  }

  get endereco() {
    return this.#endereco;
  }

  get bairro() {
    return this.#bairro;
  }

  get cidade() {
    return this.#cidade;
  }

  get telefone() {
    return this.#telefone;
  }

  get email() {
    return this.#email;
  }

  constructor(id,cpf,nome,endereco,bairro,cidade,telefone,email) {
    this.#id = id;
    this.#cpf = cpf;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#telefone = telefone;
    this.#email = email;
  }

  //Overhide

  toString(){
    return `Cliente: ${this.#nome}
            CPF: ${this.#cpf}
            Endereço: ${this.#endereco}
            Bairro: ${this.#bairro}
            Cidade: ${this.#cidade}`
  }

  async gravar() {
    const clienteDB = new ClienteDB();
    await clienteDB.gravar(this);
  }

  async editar() {
    const clienteDb = new ClienteDB();
    await clienteDb.editar(this);
  }

  async excluir(){
    const clienteDb = new ClienteDB();
    await clienteDb.excluir(this);
  }

  async consultar(termo) {
    const clienteDb = new ClienteDB();
    return await clienteDb.consultar(termo);
  }

  //override bi nétodo jason
  toJSON() {
    return {
      id: this.#id,
      cpf: this.#cpf,
      nome: this.#nome,
      endereco: this.#endereco,
      bairro: this.#bairro,
      cidade: this.#cidade,
      telefone: this.#telefone,
      email: this.#email
    };
  }
 
}
