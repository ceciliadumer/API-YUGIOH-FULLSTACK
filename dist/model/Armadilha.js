"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armadilha = void 0;
const Carta_1 = require("./Carta");
class Armadilha extends Carta_1.Carta {
    constructor(id, nome, img, descricao, vetColecao, tipoArmadilha) {
        super(id, nome, img, descricao, vetColecao);
        this._tipoArmadilha = tipoArmadilha;
    }
    get tipoArmadilha() {
        return this._tipoArmadilha;
    }
    set tipoArmadilha(novoTipoArmadilha) {
        this._tipoArmadilha = novoTipoArmadilha;
    }
    atendeCriterio(tipoPesquisado) {
        if (this._tipoArmadilha == tipoPesquisado) {
            return true;
        }
        return false;
    }
    toString() {
        return `Armadilha: ${super.toString()} - Tipo de Armadilha: ${this._tipoArmadilha}`;
    }
    toPersistence() {
        return {
            ...super.toPersistence(),
            tipoFeitico: this._tipoArmadilha
        };
    }
}
exports.Armadilha = Armadilha;
