"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartaController = void 0;
const Feitico_1 = require("./model/Feitico");
const Monstro_1 = require("./model/Monstro");
const Armadilha_1 = require("./model/Armadilha");
const ColecaoController_1 = require("./ColecaoController");
class CartaController {
    constructor() {
        this._vetCartas = [];
    }
    criarCartas(responseJson) {
        if (!responseJson) {
            throw new Error("Erro ao pegar dados da api!");
        }
        for (let i = 0; i < responseJson.data.length; i++) {
            try {
                const dados = responseJson.data[i];
                this.criaCarta(dados);
            }
            catch (error) {
                console.log("Erro na criação do objeto: " + error.message);
            }
        }
    }
    criaCarta(dados) {
        const vetColecao = new ColecaoController_1.ColecaoController().criaColecao(dados);
        if (dados.frameType == "spell") {
            const objFeitico = new Feitico_1.Feitico(dados.id, dados.name, dados.card_images[0].image_url, dados.desc, vetColecao, dados.race);
            this._vetCartas.push(objFeitico);
        }
        else if (dados.frameType == "trap") {
            const objArmadilha = new Armadilha_1.Armadilha(dados.id, dados.name, dados.card_images[0].image_url, dados.desc, vetColecao, dados.race);
            this._vetCartas.push(objArmadilha);
        }
        else {
            const objMonstro = new Monstro_1.Monstro(dados.id, dados.name, dados.card_images[0].image_url, dados.desc, vetColecao, dados.atk, dados.def, dados.level, dados.race);
            this._vetCartas.push(objMonstro);
        }
    }
    adicionar(carta) {
        this._vetCartas.push(carta);
    }
    listar() {
        return this._vetCartas.slice();
    }
    atualizar(id, novaCarta) {
        const indice = this._vetCartas.findIndex(obj => obj.id == id);
        if (indice != -1) {
            this._vetCartas[indice] = novaCarta;
        }
    }
    remover(id) {
        let indice = this._vetCartas.findIndex(carta => carta.id == id);
        if (indice != -1) {
            this._vetCartas.splice(indice, 1);
            return true;
        }
        else {
            return false;
        }
    }
    pesquisarPorCriterio(criterio) {
        let vetorFiltrado = this._vetCartas.filter(carta => carta.atendeCriterio(criterio));
        return vetorFiltrado;
    }
}
exports.CartaController = CartaController;
//# sourceMappingURL=CartasController.js.map