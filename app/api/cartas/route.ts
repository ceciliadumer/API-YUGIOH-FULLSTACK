import { Router } from "express";
import cartaController from "../../../src/controller/carta.routes.controller";

const router = Router();

router.get("/", cartaController.mostrarCartas);