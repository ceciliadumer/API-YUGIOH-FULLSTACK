export function criarCardCarta(carta) {
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
    id.className = "card-carta__id";
    id.textContent = `ID: ${carta.id}`;

    conteudo.appendChild(titulo);
    conteudo.appendChild(id);

    card.appendChild(imagem);
    card.appendChild(conteudo);

    return card;
}