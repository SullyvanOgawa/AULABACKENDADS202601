// a Rota serve para colocar parâmetro e requisição nos métodos. 
import {Router} from 'express';
import ClienteController from '../Controller/clienteController.js';

const rotaCliente = Router();
const clienteCtrl = new ClienteController();

//aqui o métoodo é passado como parâmetro
rotaCliente.get("/", clienteCtrl.consultar);
// como a aplicação sabe que esse parâmetro se chama id -  const id = requisicao.params.id; - Esse parâmetro chega aqui neste ponto, e é nesse ponto que ele recebe um nome, ou seja, será detectado como id.É assim que se específica um parâmetro na minha URL - "/:id"; 
rotaCliente.get("/:id", clienteCtrl.consultar);
rotaCliente.post("/", clienteCtrl.gravar);
rotaCliente.put("/:id", clienteCtrl.editar);
rotaCliente.patch("/:id", clienteCtrl.editar);
rotaCliente.delete("/:id", clienteCtrl.excluir);

// exportando a rota do arquivo. 
export default rotaCliente;