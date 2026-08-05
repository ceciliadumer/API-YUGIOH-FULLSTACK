"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const carta_routes_1 = __importDefault(require("./routes/carta.routes"));
const controllerInstance_1 = require("./controller/controllerInstance");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/cartas", carta_routes_1.default);
const PORT = process.env.PORT || 3000;
async function iniciar() {
    await (0, db_1.testConnection)();
    await controllerInstance_1.controller.carregarDoBanco();
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
iniciar();
async function fetchECriar() {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const responseJson = await response.json();
        controllerInstance_1.controller.criarCartas(responseJson);
    }
    catch (error) {
        console.log("Erro ao buscar dados da API: " + error.message);
    }
}
//fetchECriar();
// ! Chamar fetch criar somente quando quiser inserir no banco!
// await controller.fetchECriar();
// const resultado = controller.pesquisarPorCriterio("Wyrm");
// console.log(resultado)
// ------------------------------------------ Testes ---------------------------------------------------------------------
/*
1. Adicionar
await controller.carregarDoBanco();
const monstro = new Monstro(1,"chubaka","....","cabeludo", [], 1,3,12,"srd");
controller.adicionar(monstro);

const monstroIdRepetido = new Monstro(1003028,"chubaka","....","cabeludo", [], 1,3,12,"srd");
controller.adicionar(monstro);

2. Atualizar
await controller.carregarDoBanco();
const monstro = new Monstro(1,"chubaka","....","cabeludo", [], 1,3,12,"srd");
controller.adicionar(monstro);
const monstro2 = new Monstro(1,"testeAtualizar","....","cabeludo", [], 1,3,12,"srd");
controller.atualizar(1,monstro2);


3. Remover
controller.remover(1);



5. Metodo de Ipesquisavel que pesquisa cartas que atendem determinado criterio
console.log(controller.pesquisarPorCriterio("Wyrm"));


6. Metodo Ipesquisavel que pesquisa cartas que estao em determinada colecao
const cartasDaColecao = controller.pesquisarCartasPorColecao("Battles of Legend: Relentless Revenge");
console.log(cartasDaColecao);

*/
;
