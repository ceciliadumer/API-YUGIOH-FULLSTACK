"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchYuGiOh = fetchYuGiOh;
const CartasController_1 = require("../CartasController");
const vetCartas = new CartasController_1.CartaController();
async function fetchYuGiOh() {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const responseJson = await response.json();
        vetCartas.criarCartas(responseJson);
        console.log(vetCartas);
        //console.log(vetCartas.pesquisarPorCriterio("Aqua"));
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=takeData.js.map