import { IPesquisavel } from "./IPesquisavel";

export class Colecao implements IPesquisavel {

    private _id: string;
    private _nome: string;
    private _raridade: string;

    constructor( id: string,nome: string, raridade: string) {
        this._nome = nome;
        this._id = id;
        this._raridade = raridade;
    }

    get nome(): string {
        return this._nome;
    }

    get id(): string {
        return this._id;
    }
    
    get raridade(): string {
        return this._raridade;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    set raridade(raridade: string) {
        this._raridade = raridade;
    }

    atendeCriterio(nomePesquisado: string): boolean {
        if (this._nome == nomePesquisado || this.raridade == nomePesquisado) {
            return true;
        }
        return false;
    }

    toString(): string {
        return `Nome Coleção: ${this._nome}\nCódigo: ${this._id}\nRaridade: ${this._raridade}`;
    }

    
    isValid() {
        return Boolean(this._id?.trim()) && Boolean(this._nome?.trim());
    }

    public toPersistence() {
        return {
            idColecao: this._id,
            nome: this._nome,
            raridade: this._raridade 
        };
    }
}
export default Colecao;