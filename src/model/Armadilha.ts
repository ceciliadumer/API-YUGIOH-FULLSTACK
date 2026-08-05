import { Carta } from "./Carta";
import { Colecao } from "./Colecao";


export class Armadilha extends Carta {

    private _tipoArmadilha: string;

    constructor(id: number, nome: string, img: string, descricao: string, vetColecao: Array<Colecao>, tipoArmadilha: string) {

        super(id, nome, img, descricao, vetColecao);

        this._tipoArmadilha = tipoArmadilha;
    }

    get tipoArmadilha(): string {
        return this._tipoArmadilha;
    }

    set tipoArmadilha(novoTipoArmadilha: string) {
        this._tipoArmadilha = novoTipoArmadilha;
    }

    atendeCriterio(tipoPesquisado: string): boolean {
        if (this._tipoArmadilha == tipoPesquisado) {
            return true;
        }
        return false;
    }

    toString(): string {
        return `Armadilha: ${super.toString()} - Tipo de Armadilha: ${this._tipoArmadilha}`;
    }

    toPersistence() {
    return {
        ...super.toPersistence(),
        tipoFeitico: this._tipoArmadilha
    };
  }
}
