"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carta_service_1 = __importDefault(require("../services/carta.service"));
const controllerInstance_1 = require("./controllerInstance");
async function mostrarCartas(req, res) {
    const cartas = await carta_service_1.default.listar();
    return res.json(cartas.map(carta => carta.toPersistence()));
}
async function buscarCartaIndice(req, res) {
    const carta = await carta_service_1.default.buscarPorId(Number(req.params.id));
    if (!carta) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }
    return res.json(carta.toPersistence());
}
async function remover(req, res) {
    const removida = await carta_service_1.default.deletar(Number(req.params.id));
    if (!removida) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }
    return res.status(204).send();
}
async function criar(req, res) {
    console.log(1);
    const carta = controllerInstance_1.controller.construirCartaDeParams(req.params);
    validate(carta);
    await carta_service_1.default.salvar(carta);
    return res.status(201).json(carta.toPersistence());
}
async function atualizar(req, res) {
    const carta = controllerInstance_1.controller.construirCartaDeParams(req.params);
    const atualizada = await carta_service_1.default.atualizar(Number(req.params.id), carta);
    if (!atualizada) {
        return res.status(404).json({ message: "Carta não encontrada." });
    }
    return res.json(atualizada.toPersistence());
}
async function pesquisar(req, res) {
    const criterio = req.params.criterio;
    if (!criterio) {
        return res.status(400).json({ message: "Critério não informado." });
    }
    const resultado = controllerInstance_1.controller.pesquisarPorCriterio(criterio);
    return res.json(resultado.map(c => c.toString()));
}
async function pesquisarCartaPorColecao(req, res) {
    const criterio = req.params.criterio;
    if (!criterio) {
        return res.status(400).json({ message: "Critério não informado." });
    }
    const resultado = controllerInstance_1.controller.pesquisarCartasPorColecao(criterio);
    return res.json(resultado.map(c => c.toString()));
}
function validate(carta) {
    if (!carta.isValid()) {
        const error = new Error('Os campos id e nome são obrigatórios.');
        throw error;
    }
}
exports.default = { mostrarCartas, buscarCartaIndice, criar, atualizar, remover, pesquisar, pesquisarCartaPorColecao };
