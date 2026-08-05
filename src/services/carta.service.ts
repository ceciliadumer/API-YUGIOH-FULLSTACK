import { Carta } from "../model/Carta";
import { Monstro } from "../model/Monstro";
import { Feitico } from "../model/Feitico";
import { Armadilha } from "../model/Armadilha";
import cartaRepo from "../repositories/carta.repository";
import monstroRepo from "../repositories/monstro.repository";
import feiticoRepo from "../repositories/feitico.repository";
import armadilhaRepo from "../repositories/armadilha.repository";

export class CartaService {

    async salvar(carta: Carta): Promise<void> {
        console.log("Service");

        await cartaRepo.create({
            idCarta: carta.id,
            nome: carta.nome,
            imagem: carta.img,
            descricao: carta.descricao,
            //vetColecao: carta.vetColecao
        });

        if (carta instanceof Monstro) {
            await monstroRepo.create({
                idCarta: carta.id,
                ataque: carta.ataque,
                defesa: carta.defesa,
                nivel: carta.nivel,
                raca: carta.raca
            });
        }
        else if (carta instanceof Feitico) {
            await feiticoRepo.create({
                idCarta: carta.id,
                tipoFeitico: carta.tipoFeitico
            });
        }
        else if (carta instanceof Armadilha) {
            await armadilhaRepo.create({
                idCarta: carta.id,
                tipoArmadilha: carta.tipoArmadilha
            });
        }

        if (carta.vetColecao.length > 0) {
            await cartaRepo.inserirColecoes(carta.id, carta.vetColecao);
        }
    }

    async listar(): Promise<Array<Carta>> {
        const [monstros, feiticos, armadilhas] = await Promise.all([
            monstroRepo.findAll(),
            feiticoRepo.findAll(),
            armadilhaRepo.findAll()
        ]);

        const resultado: Array<Carta> = [];

        for (const row of monstros) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Monstro(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.ataque, row.defesa, row.nivel, row.raca));
        }

        for (const row of feiticos) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Feitico(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.tipoFeitico));
        }

        for (const row of armadilhas) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(row.idCarta);
            resultado.push(new Armadilha(row.idCarta, row.nome, row.imagem, row.descricao, colecoes, row.tipoArmadilha));
        }

        return resultado;
    }

    async buscarPorId(id: number): Promise<Carta | null> {
        const monstro = await monstroRepo.findById(id);

        if (monstro) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(id);
            return new Monstro(monstro.idCarta, monstro.nome, monstro.imagem, monstro.descricao, colecoes, monstro.ataque, monstro.defesa, monstro.nivel, monstro.raca);
        }

        const feitico = await feiticoRepo.findById(id);

        if (feitico) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(id);
            return new Feitico(feitico.idCarta, feitico.nome, feitico.imagem, feitico.descricao, colecoes, feitico.tipoFeitico);
        }

        const armadilha = await armadilhaRepo.findById(id);

        if (armadilha) {
            const colecoes = await cartaRepo.buscarColecoesPorCarta(id);
            return new Armadilha(armadilha.idCarta, armadilha.nome, armadilha.imagem, armadilha.descricao, colecoes, armadilha.tipoArmadilha);
        }

        return null;
    }

    async atualizar(id: number, carta: Carta): Promise<Carta | null> {
        const atualizada = await cartaRepo.update(id, {
            nome: carta.nome,
            imagem: carta.img,
            descricao: carta.descricao
        });

        if (!atualizada) {
            return null;
        }

        if (carta instanceof Monstro) {

            await monstroRepo.update(id, { ataque: carta.ataque, defesa: carta.defesa, nivel: carta.nivel, raca: carta.raca });
        }
        else if (carta instanceof Feitico) {

            await feiticoRepo.update(id, { tipoFeitico: carta.tipoFeitico });
        }
        else if (carta instanceof Armadilha) {
            
            await armadilhaRepo.update(id, { tipoArmadilha: carta.tipoArmadilha });
        }

        return this.buscarPorId(id);
    }

    async deletar(id: number): Promise<boolean> {

        await monstroRepo.remove(id);
        await feiticoRepo.remove(id);
        await armadilhaRepo.remove(id);
        await cartaRepo.removerColecoes(id);
        return cartaRepo.remove(id);
    }
}

export default new CartaService();