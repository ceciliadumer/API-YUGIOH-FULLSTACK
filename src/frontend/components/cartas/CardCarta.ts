import { CartaDTO } from "../../tipos/CartasDTO.js";

export function criarCardCarta(carta: CartaDTO): HTMLElement {
    const card = document.createElement("article");
    card.className = "card-carta";

    const imagem = document.createElement("img");
    imagem.className = "card-carta__imagem";
    imagem.src = carta.imagem || "https://via.placeholder.com/220x320?text=Sem+Imagem";
    imagem.alt = carta.nome;

    const conteudo = document.createElement("div");
    conteudo.className = "card-carta__conteudo";

    const titulo = document.createElement("h3");
    titulo.textContent = carta.nome;

    const id = document.createElement("p");
    id.textContent = `ID: ${carta.id}`;

    const descricao = document.createElement("p");
    descricao.className = "card-carta__descricao";
    descricao.textContent = carta.descricao || "Sem descrição cadastrada.";

    conteudo.appendChild(titulo);
    conteudo.appendChild(id);
    conteudo.appendChild(descricao);

    card.appendChild(imagem);
    card.appendChild(conteudo);

    return card;
}
