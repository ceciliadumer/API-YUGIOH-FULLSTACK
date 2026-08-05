"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feitico = void 0;
const Carta_1 = require("./Carta");
class Feitico extends Carta_1.Carta {
    constructor(id, nome, img, descricao, vetColecao, tipoFeitico) {
        super(id, nome, img, descricao, vetColecao);
        this._tipoFeitico = tipoFeitico;
    }
    get tipoFeitico() {
        return this._tipoFeitico;
    }
    set tipoFeitico(tipoFeitico) {
        this._tipoFeitico = tipoFeitico;
    }
    atendeCriterio(tipoPesquisado) {
        if (this._tipoFeitico == tipoPesquisado) {
            return true;
        }
        return false;
    }
    toString() {
        return `Feitiço: ${super.toString()} - Tipo de Feitiço: ${this._tipoFeitico}`;
    }
    toPersistence() {
        return {
            ...super.toPersistence(),
            tipoFeitico: this._tipoFeitico
        };
    }
}
exports.Feitico = Feitico;
