import { Router } from "express";
import cartaController from "../controller/carta.routes.controller";

const router = Router();

router.get("/", cartaController.mostrarCartas);
router.get("/pesquisar/:criterio", cartaController.pesquisar);
router.get("/colecao/:criterio", cartaController.pesquisarCartaPorColecao); // http://localhost:3000/cartas/colecao/Secret%20Rare
router.get("/criar/:id/:nome/:frameType", cartaController.criar);
router.get("/atualizar/:id/:nome/:frameType", cartaController.atualizar);
router.get("/:id", cartaController.buscarCartaIndice);
router.delete("/:id", cartaController.remover);

export default router;