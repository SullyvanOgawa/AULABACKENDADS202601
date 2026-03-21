import {Router} from 'express';
import CidadeController from '../Controller/cidadeController.js';

const rotaCidade = Router();
const cidadeCtrl = new CidadeController();

rotaCidade.get("/", cidadeCtrl.consultar);
rotaCidade.get("/:id", cidadeCtrl.consultar);
rotaCidade.post("/", cidadeCtrl.gravar);
rotaCidade.put("/:id", cidadeCtrl.editar);
rotaCidade.patch("/:id", cidadeCtrl.editar);
rotaCidade.delete("/:id", cidadeCtrl.excluir);

export default rotaCidade;