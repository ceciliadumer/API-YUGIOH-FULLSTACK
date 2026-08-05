import { Carta } from "../model/Carta";
import { Monstro } from "../model/Monstro";
import { Feitico } from "../model/Feitico";
import { Armadilha } from "../model/Armadilha";
import { Colecao } from "../model/Colecao";
import { IPesquisavel } from "../model/IPesquisavel";
import cartaService from "../services/carta.service";

export class CartaController {

    _vetCartas: Array<Carta> = [];



    async criarCartas(responseJson: any): Promise<void> {

        if (!responseJson) {
            throw new Error("Erro ao pegar dados da api!");
        }

        for (let i = 0; i < responseJson.data.length; i++) {

            try {
                const dados = responseJson.data[i];
                const carta = this.construirCarta(dados);
                await cartaService.salvar(carta);

                console.log(`Carta "${carta.nome}" salva.`);
            }
            catch (error: any) {
                console.error(`Erro ao salvar carta: ${error.message}`);
            }
        }

    }
    construirCartaDeParams(dados: any): Carta {
        const id = Number(dados.id);
        const nome = dados.nome;
        const img = "";
        const descricao = "";
        const colecao: Colecao[] = [];

        if (dados.frameType === "spell") {
            return new Feitico(id, nome, img, descricao, colecao, "");
        }
        else if (dados.frameType === "trap") {
            return new Armadilha(id, nome, img, descricao, colecao, "");
        }
        else {
            return new Monstro(id, nome, img, descricao, colecao, 0, 0, 0, "");
        }
    }

    construirCarta(dados: any): Carta {
        const colecao: Colecao[] = [];
        console.log(dados);
        if (dados.card_sets) {
            for (let i = 0; i < dados.card_sets.length; i++) {

                const objColecao = new Colecao(dados.card_sets[i].set_code, dados.card_sets[i].set_name, dados.card_sets[i].set_rarity);
                colecao.push(objColecao);

            }
        }

        if (dados.frameType === "spell") {

            return new Feitico(
                dados.id,
                dados.name,
                dados.image_url,
                dados.desc, colecao,
                dados.race
            );

        }
        else if (dados.frameType === "trap") {

            return new Armadilha(
                dados.id,
                dados.name,
                dados.card_images[0].image_url,
                dados.desc,
                colecao,
                dados.race
            );
        }
        else {

            return new Monstro(
                dados.id,
                dados.name,
                dados.card_images[0].image_url,
                dados.desc,
                colecao,
                dados.atk,
                dados.def,
                dados.level,
                dados.race
            );
        }
    }



    async carregarDoBanco(): Promise<Array<Carta>> {
        this._vetCartas = await cartaService.listar();

        console.log(this._vetCartas.length + " cartas carregadas do banco.");

        return this._vetCartas.slice();
    }



    adicionar(cartaParametro: Carta): boolean {
        const cartaRepetida = this._vetCartas.find(carta => carta.id == cartaParametro.id);

        if (cartaRepetida) {
            console.log('Existe uma carta com o mesmo ID no vetor!');
            return false;
        }

        this._vetCartas.push(cartaParametro)
        console.log("Carta: " + cartaParametro.nome + " adicionada com sucesso!");
        return true;
    }



    listar(): Array<Carta> {
        return this._vetCartas.slice();
    }



    atualizar(id: number, novaCarta: Carta): boolean {
        const indice = this._vetCartas.findIndex(obj => obj.id === id);

        if (indice !== -1) {
            this._vetCartas[indice] = novaCarta;
            console.log(novaCarta.nome);
            return true;
        }
        return false;
    }



    remover(id: number): boolean {
        const indice = this._vetCartas.findIndex(c => c.id === id);

        if (indice !== -1) {
            this._vetCartas.splice(indice, 1);

            console.log(this._vetCartas[indice]?.nome + "Removido com sucesso!");

            return true;
        }
        return false;
    }



    pesquisarPorCriterio(criterio: string): Array<IPesquisavel> {
        return this._vetCartas.filter(c => c.atendeCriterio(criterio));
    }



    pesquisarCartasPorColecao(criterio: string): Array<IPesquisavel> {
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

export default CartaController;