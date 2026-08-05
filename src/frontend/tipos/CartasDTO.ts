export interface CartaDTO {
    id: number;
    nome: string;
    imagem: string;
    descricao: string;
    vetColecao?: unknown[];
    frameType?: string;
}
