import { Carta } from "./Carta";
import { Colecao } from "./Colecao";
import { IPesquisavel } from "./IPesquisavel";

export class Feitico extends Carta{

    private _tipoFeitico: string;

    constructor(id: number, nome: string, img: string, descricao: string, vetColecao: Array<Colecao>, tipoFeitico: string) {
        
        super(id, nome, img, descricao, vetColecao);
        
        this._tipoFeitico = tipoFeitico;
    }

    get tipoFeitico(): string {
        return this._tipoFeitico;
    }

    set tipoFeitico(tipoFeitico: string) {
        this._tipoFeitico = tipoFeitico;
    }

    atendeCriterio(tipoPesquisado: string): boolean {
        if (this._tipoFeitico == tipoPesquisado) {
            return true;
        }
        return false;
    }

    toString(): string {
        return `Feitiço: ${super.toString()} - Tipo de Feitiço: ${this._tipoFeitico}`;
    }
    
    toPersistence() {
    return {
        ...super.toPersistence(),
        tipoFeitico: this._tipoFeitico
    };
  }
}

