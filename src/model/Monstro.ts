import { Carta } from "./Carta";
import { Colecao } from "./Colecao";


export class Monstro extends Carta {

    private _ataque: number;
    private _defesa: number
    private _nivel: number;
    private _raca: string;

    constructor(id: number, nome: string, img: string, descricao: string, vetColecao: Array<Colecao>, ataque: number, defesa: number, nivel: number, raca: string) {

        super(id, nome, img, descricao, vetColecao);

        this._ataque = ataque;
        this._defesa = defesa;
        this._nivel = nivel;
        this._raca = raca;
    }

    public get ataque(): number {
        return this._ataque;
    }


    public get defesa(): number {
        return this._defesa;
    }


    public get nivel(): number {
        return this._nivel;
    }


    public get raca(): string {
        return this._raca;
    }


    public set ataque(novoAtaque: number) {
        if (novoAtaque >= 0) {
            this._ataque = novoAtaque;
        }
        else {
            console.log("O ataque não pode ser negativo!");
        }
    }

    public set defesa(novaDefesa: number) {
        if (novaDefesa >= 0) {
            this._defesa = novaDefesa;
        }
        else {
            console.log("A defesa não pode ser negativa!");
        }
    }

    public set nivel(novoNivel: number) {
        if (novoNivel >= 0) {
            this._nivel = novoNivel;
        }
        else {
            console.log("O Nivel não pode ser negativo!");
        }
    }

    public set raca(novaRaca: string) {
        if (novaRaca.length > 0) {
            this._raca = novaRaca;
        }
        else {
            console.log("A Raça não pode ser uma string vazia!");
        }
    }

    atendeCriterio(racaPesquisada: string): boolean {
        if (this._raca == racaPesquisada) {
            return true;
        }
        return false;
    }


    toString(): string {
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
