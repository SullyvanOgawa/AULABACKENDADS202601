export default class Cliente {
  #id;
  #cpf;
  #nome;
  #endereco;
  #bairro;
  #cidade;
  #unidadeFederativa;
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

  get cidade() {
    this.#cidade;
  }

  get unidadeFederativa() {
    this.#unidadeFederativa;
  }

  get telefone() {
    this.#telefone;
  }

  get email() {
    this.#email;
  }

  constructor(id,cpf,nome,endereco,bairro,cidade,unidadeFederativa,telefone,email) {
    this.#id = id;
    this.#cpf = cpf;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#unidadeFederativa = unidadeFederativa;
    this.#telefone = telefone;
    this.#email = email;
  }

  //Overhide

  toString(){
    return `Cliente: ${this.#nome}
            CPF: ${this.#cpf}
            Cidade: ${this.#cidade}
            UF: ${this.#unidadeFederativa}`;
  }

  // Minuto 50
}
