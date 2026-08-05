"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carta = void 0;
class Carta {
    constructor(id, nome, img, descricao, vetColecao) {
        this._vetColecao = [];
        this._id = id;
        this._nome = nome;
        this._img = img;
        this._descricao = descricao;
        this._vetColecao = vetColecao;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get img() {
        return this._img;
    }
    get descricao() {
        return this._descricao;
    }
    get vetColecao() {
        return this._vetColecao;
    }
    set nome(nome) {
        this._nome = nome;
    }
    set img(img) {
        this._img = img;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
    set vetColecao(vetColecao) {
        this._vetColecao = vetColecao;
    }
    toString() {
        return `ID: ${this._id} - Nome: ${this._nome} - Imagem: ${this._img} - Descrição: ${this._descricao}`;
    }
    isValid() {
        console.log(this._nome !== undefined && this._id !== undefined);
        return this._nome !== undefined && this._id !== undefined; //Boolean(this._nome) && this._id !== undefined;
    }
    toPersistence() {
        return {
            id: this.id,
            nome: this.nome,
            imagem: this.img,
            descricao: this.descricao,
            vetColecao: this.vetColecao,
        };
    }
}
exports.Carta = Carta;
