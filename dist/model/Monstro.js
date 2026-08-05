"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monstro = void 0;
const Carta_1 = require("./Carta");
class Monstro extends Carta_1.Carta {
    constructor(id, nome, img, descricao, vetColecao, ataque, defesa, nivel, raca) {
        super(id, nome, img, descricao, vetColecao);
        this._ataque = ataque;
        this._defesa = defesa;
        this._nivel = nivel;
        this._raca = raca;
    }
    get ataque() {
        return this._ataque;
    }
    get defesa() {
        return this._defesa;
    }
    get nivel() {
        return this._nivel;
    }
    get raca() {
        return this._raca;
    }
    set ataque(novoAtaque) {
        if (novoAtaque >= 0) {
            this._ataque = novoAtaque;
        }
        else {
            console.log("O ataque não pode ser negativo!");
        }
    }
    set defesa(novaDefesa) {
        if (novaDefesa >= 0) {
            this._defesa = novaDefesa;
        }
        else {
            console.log("A defesa não pode ser negativa!");
        }
    }
    set nivel(novoNivel) {
        if (novoNivel >= 0) {
            this._nivel = novoNivel;
        }
        else {
            console.log("O Nivel não pode ser negativo!");
        }
    }
    set raca(novaRaca) {
        if (novaRaca.length > 0) {
            this._raca = novaRaca;
        }
        else {
            console.log("A Raça não pode ser uma string vazia!");
        }
    }
    atendeCriterio(racaPesquisada) {
        if (this._raca == racaPesquisada) {
            return true;
        }
        return false;
    }
    toString() {
        return `Monstro: ${super.toString()} - Ataque: ${this._ataque} - Defesa: ${this._defesa} - Nível: ${this._nivel} - Raça: ${this._raca}`;
    }
    isValid() {
        return Boolean(super.id) && super.img !== undefined;
    }
    toPersistence() {
        return {
            ...super.toPersistence(),
            ataque: this.ataque,
            defesa: this.defesa,
            nivel: this.nivel,
            raca: this.raca
        };
    }
}
exports.Monstro = Monstro;
