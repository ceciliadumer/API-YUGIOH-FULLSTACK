"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColecaoController = void 0;
const Colecao_1 = require("./model/Colecao");
class ColecaoController {
    constructor() {
        this._vetColecao = [];
    }
    criaColecao(dados) {
        if (!dados.card_sets) {
            throw new Error("Erro ao pegar dados da coleção!");
        }
        for (let index = 0; index < dados.card_sets.length; index++) {
            const dadosColecao = dados.card_sets[index];
            const objColecao = new Colecao_1.Colecao(dadosColecao.set_name, dadosColecao.set_code, dadosColecao.set_rarity);
            this._vetColecao.push(objColecao);
        }
        return this.listar();
    }
    adicionar(novaColecao) {
        this._vetColecao.push(novaColecao);
    }
    listar() {
        return this._vetColecao.slice();
    }
    atualizar(id, novaColecao) {
        const indice = this._vetColecao.findIndex(obj => obj.id == id);
        if (indice != -1) {
            this._vetColecao[indice] = novaColecao;
        }
    }
    remover(id) {
        let indice = this._vetColecao.findIndex(obj => obj.id == id);
        if (indice != -1) {
            this._vetColecao.splice(indice, 1);
            return true;
        }
        else {
            return false;
        }
    }
    pesquisarPorCriterio(criterio) {
        let vetorFiltrado = this._vetColecao.filter(obj => obj.atendeCriterio(criterio));
        return vetorFiltrado;
    }
}
exports.ColecaoController = ColecaoController;
//# sourceMappingURL=ColecaoController.js.map