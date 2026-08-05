
// PARA TESTAR RODE npx ts-node src/testeRequisicoes.ts


import {
    listarCartas,
    pesquisarCartasCriterio,
    pesquisarCartasPorColecao,
    buscarCarta,
    criarCarta,
    atualizarCarta,
    removerCarta
} from "./frontend/service/frontService";

import {CartaService} from "./services/carta.service";

// ===========================testes banco de dados ====================
async function testeBD() {
    const cartaService = new CartaService();

    var buscar = await cartaService.buscarPorId(2095764);
    console.log(buscar);
}

testeBD();
// =================================================================




async function testarListarCartas() {
    const cartas = await listarCartas();

    console.log("=== LISTAR CARTAS ===");
    console.log(cartas);
}



async function testarPesquisarPorCriterio() {
    const resultado = await pesquisarCartasCriterio("Wyrm");

    console.log("=== PESQUISAR POR CRITÉRIO ===");
    console.log(resultado);
}



async function testarPesquisarPorColecao() {
    const resultado = await pesquisarCartasPorColecao("Secret Rare");

    console.log("=== PESQUISAR POR COLEÇÃO ===");
    console.log(resultado);
}


async function testarBuscarCarta() {
    const carta = await buscarCarta(2095764); //2095764

    console.log("=== BUSCAR CARTA ===");
    console.log(carta);
}
//testarBuscarCarta();


async function testarCriarCarta() {
    const carta = await criarCarta(
        999999999,
        "CartaTeste",
        "monster"
    );

    console.log("=== CRIAR CARTA ===");
    console.log(carta);
}




async function testarAtualizarCarta() {
    const carta = await atualizarCarta(
        999999999,
        "CartaAtualizada",
        "monster"
    );

    console.log("=== ATUALIZAR CARTA ===");
    console.log(carta);
}




async function testarRemoverCarta() {
    const removida = await removerCarta(999999999);

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