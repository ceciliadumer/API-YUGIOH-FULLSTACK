import { Request, Response } from "express";
import cartaService from "../services/carta.service";
import { controller } from "./controllerInstance";
import { Carta } from "../model/Carta";

async function mostrarCartas(req: Request, res: Response) {
    const cartas = await cartaService.listar();
    return res.json(cartas.map(carta => carta.toPersistence()));
}

// MÉTODO DE FUNÇÃO USANDO O NEXT.JS 
async function listarCartas() {
    const cartas = await cartaService.listar();

    return cartas.map(carta => carta.toPersistence());
}

async function buscarCartaIndice(req: Request, res: Response) {
    const carta = await cartaService.buscarPorId(Number(req.params.id));
    if (!carta) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }
    return res.json(carta.toPersistence());
}

async function remover(req: Request, res: Response) {
    const removida = await cartaService.deletar(Number(req.params.id));

    if (!removida) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }

    return res.status(204).send();
}


async function criar(req: Request, res: Response) {

    console.log(1)

    const carta: Carta = controller.construirCartaDeParams(req.params);


    validate(carta);

    await cartaService.salvar(carta);

    return res.status(201).json(carta.toPersistence());

}


async function atualizar(req: Request, res: Response) {
    const carta = controller.construirCartaDeParams(req.params);

    const atualizada = await cartaService.atualizar(Number(req.params.id), carta);

    if (!atualizada) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }

    return res.json(atualizada.toPersistence());
}


async function pesquisar(req: Request, res: Response) {

    const criterio = req.params.criterio as string;

    if (!criterio) {
        return res.status(400).json({ message: "Critério não informado." });
    }

    const resultado = controller.pesquisarPorCriterio(criterio);

    return res.json(resultado.map(c => c.toString()));
}



async function pesquisarCartaPorColecao(req: Request, res: Response) {

    const criterio = req.params.criterio as string;

    if (!criterio) {
        return res.status(400).json({ message: "Critério não informado." });
    }

    const resultado = controller.pesquisarCartasPorColecao(criterio);
    return res.json(resultado.map(c => c.toString()));
}


function validate(carta: Carta) {
    if (!carta.isValid()) {
        const error = new Error('Os campos id e nome são obrigatórios.');
        throw error;
    }
}

export default { mostrarCartas, buscarCartaIndice, criar, atualizar, remover, pesquisar, pesquisarCartaPorColecao, listarCartas };