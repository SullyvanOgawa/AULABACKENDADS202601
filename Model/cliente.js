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
    this.#id;
  }

  get cpf() {
    this.#cpf;
  }

  get nome() {
    this.#nome;
  }

  get endereco() {
    this.#endereco;
  }

  get bairro() {
    this.#bairro;
  }

  get telefone() {
    this.#telefone;
  }

  get email() {
    this.#email;
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

  // Minuto 50
}
