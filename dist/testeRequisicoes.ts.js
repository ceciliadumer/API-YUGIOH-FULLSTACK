"use strict";
// PARA TESTAR RODE npx ts-node src/testeRequisicoes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const frontService_1 = require("./frontend/service/frontService");
async function testarListarCartas() {
    const cartas = await (0, frontService_1.listarCartas)();
    console.log("=== LISTAR CARTAS ===");
    console.log(cartas);
}
async function testarPesquisarPorCriterio() {
    const resultado = await (0, frontService_1.pesquisarCartasCriterio)("Wyrm");
    console.log("=== PESQUISAR POR CRITÉRIO ===");
    console.log(resultado);
}
async function testarPesquisarPorColecao() {
    const resultado = await (0, frontService_1.pesquisarCartasPorColecao)("Secret Rare");
    console.log("=== PESQUISAR POR COLEÇÃO ===");
    console.log(resultado);
}
async function testarBuscarCarta() {
    const carta = await (0, frontService_1.buscarCarta)(2095764);
    console.log("=== BUSCAR CARTA ===");
    console.log(carta);
}
async function testarCriarCarta() {
    const carta = await (0, frontService_1.criarCarta)(999999999, "CartaTeste", "monster");
    console.log("=== CRIAR CARTA ===");
    console.log(carta);
}
async function testarAtualizarCarta() {
    const carta = await (0, frontService_1.atualizarCarta)(999999999, "CartaAtualizada", "monster");
    console.log("=== ATUALIZAR CARTA ===");
    console.log(carta);
}
async function testarRemoverCarta() {
    const removida = await (0, frontService_1.removerCarta)(999999999);
    console.log("=== REMOVER CARTA ===");
    console.log(removida);
}
//testarListarCartas();
//testarPesquisarPorCriterio();
//testarPesquisarPorColecao();
//testarBuscarCarta();
//testarCriarCarta();
//testarAtualizarCarta();
//testarRemoverCarta();
