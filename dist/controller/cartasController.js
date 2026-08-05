"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartaController = void 0;
const Monstro_1 = require("../model/Monstro");
const Feitico_1 = require("../model/Feitico");
const Armadilha_1 = require("../model/Armadilha");
const Colecao_1 = require("../model/Colecao");
const carta_service_1 = __importDefault(require("../services/carta.service"));
class CartaController {
    constructor() {
        this._vetCartas = [];
    }
    async criarCartas(responseJson) {
        if (!responseJson) {
            throw new Error("Erro ao pegar dados da api!");
        }
        for (let i = 0; i < responseJson.data.length; i++) {
            try {
                const dados = responseJson.data[i];
                const carta = this.construirCarta(dados);
                await carta_service_1.default.salvar(carta);
                console.log(`Carta "${carta.nome}" salva.`);
            }
            catch (error) {
                console.error(`Erro ao salvar carta: ${error.message}`);
            }
        }
    }
    construirCartaDeParams(dados) {
        const id = Number(dados.id);
        const nome = dados.nome;
        const img = "";
        const descricao = "";
        const colecao = [];
        if (dados.frameType === "spell") {
            return new Feitico_1.Feitico(id, nome, img, descricao, colecao, "");
        }
        else if (dados.frameType === "trap") {
            return new Armadilha_1.Armadilha(id, nome, img, descricao, colecao, "");
        }
        else {
            return new Monstro_1.Monstro(id, nome, img, descricao, colecao, 0, 0, 0, "");
        }
    }
    construirCarta(dados) {
        const colecao = [];
        console.log(dados);
        if (dados.card_sets) {
            for (let i = 0; i < dados.card_sets.length; i++) {
                const objColecao = new Colecao_1.Colecao(dados.card_sets[i].set_code, dados.card_sets[i].set_name, dados.card_sets[i].set_rarity);
                colecao.push(objColecao);
            }
        }
        if (dados.frameType === "spell") {
            return new Feitico_1.Feitico(dados.id, dados.name, dados.image_url, dados.desc, colecao, dados.race);
        }
        else if (dados.frameType === "trap") {
            return new Armadilha_1.Armadilha(dados.id, dados.name, dados.card_images[0].image_url, dados.desc, colecao, dados.race);
        }
        else {
            return new Monstro_1.Monstro(dados.id, dados.name, dados.card_images[0].image_url, dados.desc, colecao, dados.atk, dados.def, dados.level, dados.race);
        }
    }
    async carregarDoBanco() {
        this._vetCartas = await carta_service_1.default.listar();
        console.log(this._vetCartas.length + " cartas carregadas do banco.");
        return this._vetCartas.slice();
    }
    adicionar(cartaParametro) {
        const cartaRepetida = this._vetCartas.find(carta => carta.id == cartaParametro.id);
        if (cartaRepetida) {
            console.log('Existe uma carta com o mesmo ID no vetor!');
            return false;
        }
        this._vetCartas.push(cartaParametro);
        console.log("Carta: " + cartaParametro.nome + " adicionada com sucesso!");
        return true;
    }
    listar() {
        return this._vetCartas.slice();
    }
    atualizar(id, novaCarta) {
        const indice = this._vetCartas.findIndex(obj => obj.id === id);
        if (indice !== -1) {
            this._vetCartas[indice] = novaCarta;
            console.log(novaCarta.nome);
            return true;
        }
        return false;
    }
    remover(id) {
        const indice = this._vetCartas.findIndex(c => c.id === id);
        if (indice !== -1) {
            this._vetCartas.splice(indice, 1);
            console.log(this._vetCartas[indice]?.nome + "Removido com sucesso!");
            return true;
        }
        return false;
    }
    pesquisarPorCriterio(criterio) {
        return this._vetCartas.filter(c => c.atendeCriterio(criterio));
    }
    pesquisarCartasPorColecao(criterio) {
        return this._vetCartas.filter(carta => {
            for (let i = 0; i < carta.vetColecao.length; i++) {
                if (carta.vetColecao[i]?.atendeCriterio(criterio)) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.CartaController = CartaController;
exports.default = CartaController;
