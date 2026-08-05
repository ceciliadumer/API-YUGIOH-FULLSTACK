"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Monstro_1 = require("../model/Monstro");
const Feitico_1 = require("../model/Feitico");
const Armadilha_1 = require("../model/Armadilha");
const carta_repository_1 = __importDefault(require("../repositories/carta.repository"));
const monstro_repository_1 = __importDefault(require("../repositories/monstro.repository"));
const feitico_repository_1 = __importDefault(require("../repositories/feitico.repository"));
const armadilha_repository_1 = __importDefault(require("../repositories/armadilha.repository"));
class CartaService {
    async salvar(carta) {
        console.log("Service");
        await carta_repository_1.default.create({
            idCarta: carta.id,
            nome: carta.nome,
            imagem: carta.img,
            descricao: carta.descricao,
            //vetColecao: carta.vetColecao
        });
        if (carta instanceof Monstro_1.Monstro) {
            await monstro_repository_1.default.create({
                idCarta: carta.id,
                ataque: carta.ataque,
                defesa: carta.defesa,
                nivel: carta.nivel,
                raca: carta.raca
            });
        }
        else if (carta instanceof Feitico_1.Feitico) {
            await feitico_repository_1.default.create({
                idCarta: carta.id,
                tipoFeitico: carta.tipoFeitico
            });
        }
        else if (carta instanceof Armadilha_1.Armadilha) {
            await armadilha_repository_1.default.create({
                idCarta: carta.id,
                tipoArmadilha: carta.tipoArmadilha
            });
        }
        if (carta.vetColecao.length > 0) {
            await carta_repository_1.default.inserirColecoes(carta.id, carta.vetColecao);
        }
    }
    async listar() {
        const [monstros, feiticos, armadilhas] = await Promise.all([
            monstro_repository_1.default.findAll(),
            feitico_repository_1.default.findAll(),
            armadilha_repository_1.default.findAll()
        ]);
        const resultado = [];
        for (const row of monstros) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Monstro_1.Monstro(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.ataque, row.defesa, row.nivel, row.raca));
        }
        for (const row of feiticos) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Feitico_1.Feitico(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.tipoFeitico));
        }
        for (const row of armadilhas) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Armadilha_1.Armadilha(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.tipoArmadilha));
        }
        return resultado;
    }
    async buscarPorId(id) {
        const monstro = await monstro_repository_1.default.findById(id);
        if (monstro) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(id);
            return new Monstro_1.Monstro(monstro.idCarta, monstro.nome, monstro.imagem, monstro.descricao, colecoes, monstro.ataque, monstro.defesa, monstro.nivel, monstro.raca);
        }
        const feitico = await feitico_repository_1.default.findById(id);
        if (feitico) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(id);
            return new Feitico_1.Feitico(feitico.idCarta, feitico.nome, feitico.imagem, feitico.descricao, colecoes, feitico.tipoFeitico);
        }
        const armadilha = await armadilha_repository_1.default.findById(id);
        if (armadilha) {
            const colecoes = await carta_repository_1.default.buscarColecoesPorCarta(id);
            return new Armadilha_1.Armadilha(armadilha.idCarta, armadilha.nome, armadilha.imagem, armadilha.descricao, colecoes, armadilha.tipoArmadilha);
        }
        return null;
    }
    async atualizar(id, carta) {
        const atualizada = await carta_repository_1.default.update(id, {
            nome: carta.nome,
            imagem: carta.img,
            descricao: carta.descricao
        });
        if (!atualizada) {
            return null;
        }
        if (carta instanceof Monstro_1.Monstro) {
            await monstro_repository_1.default.update(id, { ataque: carta.ataque, defesa: carta.defesa, nivel: carta.nivel, raca: carta.raca });
        }
        else if (carta instanceof Feitico_1.Feitico) {
            await feitico_repository_1.default.update(id, { tipoFeitico: carta.tipoFeitico });
        }
        else if (carta instanceof Armadilha_1.Armadilha) {
            await armadilha_repository_1.default.update(id, { tipoArmadilha: carta.tipoArmadilha });
        }
        return this.buscarPorId(id);
    }
    async deletar(id) {
        await monstro_repository_1.default.remove(id);
        await feitico_repository_1.default.remove(id);
        await armadilha_repository_1.default.remove(id);
        await carta_repository_1.default.removerColecoes(id);
        return carta_repository_1.default.remove(id);
    }
}
exports.default = new CartaService();
