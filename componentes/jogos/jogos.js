import dados from "./cartas.json" with {type : "json"};
import { paginaJogo } from "../app/App.js";

// Função antiga mantida apenas se for usada em algum lugar, corrigindo propriedades
const criaCardHTML = (nome, infoExtra, url) => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="game-card">
                <div class="game-img">
                    <img data-id="2" src="${url}" width="200">
                </div>
                <h3>${nome}</h3>
                <p>${infoExtra}</p>
            </div>`
    return card
}

// 1. Ajustado os parâmetros para refletir uma Carta de Yu-Gi-Oh
const criarCard = (nome, infoExtra, url, id) => {

    const card = document.createElement("div");
    card.classList.add("game-card");

    const imagem = document.createElement("div");
    imagem.classList.add("game-img");

    const gameImagem = document.createElement("img");
    gameImagem.setAttribute("src", url);
    gameImagem.setAttribute("width", "200");
    imagem.appendChild(gameImagem);

    const gameNome = document.createElement("h3");
    gameNome.textContent = nome;

    const gameDesconto = document.createElement("p");
    gameDesconto.textContent = infoExtra; // Exibirá o ATK/DEF ou Categoria

    card.appendChild(imagem);
    card.appendChild(gameNome);
    card.appendChild(gameDesconto);

    card.addEventListener("click", () => {
        mostrarDetalhesJogo(id); // id substitui o appid
    });

    return card;
}

export const criaSecaoJogos = () => {

    const linkCSS = document.createElement('link');
    linkCSS.setAttribute("rel", "stylesheet");
    linkCSS.setAttribute("href", "./Componentes/Jogos/Jogos.css");
    document.head.appendChild(linkCSS);

    const secao = document.createElement("section");
    secao.classList.add("games");

    const h2 = document.createElement("h2");
    h2.textContent = "CARTAS YU GI OH";

    const grid = document.createElement("div");
    grid.classList.add("game-grid");
    grid.id = "cardsGrid";

    /* =========================
       EMBARALHAR CARTAS (Acessando dados.cartas)
    ========================== */
    const cartasAleatorios = [...dados.cartas] 
        .sort(() => Math.random() - 0.5)
        .slice(0, 16);

    /* =========================
       CRIAR OS CARDS COM OS DADOS NOVOS
    ========================== */
    cartasAleatorios.forEach(carta => {
        const card = criarCard(
            carta.nome,
            carta.categoria === "Monstro" ? `ATK: ${carta.ataque} / DEF: ${carta.defesa}` : carta.categoria,
            carta.img,
            carta.id
        );
        grid.appendChild(card);
    });

    secao.appendChild(h2);
    secao.appendChild(grid);

    return secao;
}

export const criaCardAleatorio = (vetorCartas) => {
  // Caso passe o JSON completo, garante pegar a propriedade .cartas
  const lista = vetorCartas.cartas || vetorCartas;
  const aleatorio = Math.floor(Math.random() * lista.length);
  const carta = lista[aleatorio];
  
  return criarCard(
    carta.nome, 
    carta.categoria, 
    carta.img, 
    carta.id
  );
}

// Adaptação da página interna de detalhes da carta
export const criarJogos = (nome, descricao, url) => {
    const secao = document.createElement("section");
    secao.classList.add("jogo");

    const content = document.createElement("div");
    content.classList.add("jogo-content");

    const info = document.createElement("div");
    info.classList.add("jogo-info");

    const titulo = document.createElement("h1")
    titulo.textContent = nome;

    const desc = document.createElement("p");
    desc.textContent = descricao;

    const botao = document.createElement("button");
    botao.classList.add('cta')
    botao.textContent = `Visualizar Deck`; // Alterado de "Comprar" para algo de cartas
    
    const divImagem = document.createElement("div");
    divImagem.classList.add("jogo-imagem");

    const img = document.createElement("img");
    img.setAttribute("src" , url);

    info.appendChild(titulo);
    info.appendChild(desc);
    info.appendChild(botao);

    divImagem.appendChild(img);

    content.appendChild(info);
    content.appendChild(divImagem);

    secao.appendChild(content);

    return secao;
}

export const buscarJogoPorId = (id) => {
    return dados.cartas.find(carta => carta.id == id);
}

export const mostrarDetalhesJogo = (id) => {
    const carta = buscarJogoPorId(id);

    if (!carta) {
        console.log("Carta não encontrada");
        return;
    }

    paginaJogo(
        carta.nome,
        carta.descricao,
        carta.img
    );
}

export const buscarJogosPorGenero = (categoria) => {
    return dados.cartas.filter(carta => carta.categoria === categoria);
};

export const criaSecaoJogosFiltrados = (categoria) => {
    const cartasFiltradas = buscarJogosPorGenero(categoria);

    const secao = document.createElement("section");
    secao.classList.add("games");

    const titulo = document.createElement("h2");
    titulo.textContent = `Categoria: ${categoria}`;

    const grid = document.createElement("div");
    grid.classList.add("game-grid");

    cartasFiltradas.forEach(carta => {
        const card = criarCard(
            carta.nome,
            carta.categoria === "Monstro" ? `ATK: ${carta.ataque}` : carta.categoria,
            carta.img,
            carta.id
        );
        grid.appendChild(card);
    });

    secao.appendChild(titulo);
    secao.appendChild(grid);

    return secao;
};