import { criaSecaoJogos, criarJogos, criaSecaoJogosFiltrados} from "../jogos/jogos.js";
import { navigateTo, addRoute, router } from "./Rotas.js";
import dados from "../jogos/cartas.json" with { type: "json" };

const inItApp = () => {
    const root = document.getElementById("root");

    const linkCSS = document.createElement('link');
    linkCSS.setAttribute("rel", "stylesheet");
    linkCSS.setAttribute("href", "./Componentes/App/App.css");
    document.head.appendChild(linkCSS);

    addRoute("/", renderHome);
    addRoute("/cards", renderCards);
    addRoute("/monstros", renderMonstros);
    addRoute("/sobre", renderSobre);
}


export const paginaJogo = (nome, descricao, url) => {
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.appendChild(criarHeader());
    root.appendChild(criarJogos(nome, descricao, url));
    root.appendChild(criarFooter());
}

const criarHeader = () => {

    const header = document.createElement("header");

    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.textContent = "EXODIA ";

    const nav = document.createElement("nav");
    nav.id = "subnav";

    criarLinkNovo(nav, "Cards", "/cards");
    criarLinkNovo(nav, "HOME", "/");
    criarLinkNovo(nav, "Monstros", "/monstros");
    criarLinkNovo(nav, "Sobre", "/sobre");


    header.appendChild(logo);
    header.appendChild(nav);


    return header;
}


const criarHero = () => {

    const section = document.createElement("section");
    section.classList.add("hero");

    const heroContent = document.createElement("div");
    heroContent.classList.add("hero-content");

    const titulo = document.createElement("h1");
    titulo.textContent = "Banco de Dados Yu-Gi-Oh";

    const texto = document.createElement("p");
    texto.textContent = "Descubra informações detalhadas sobre monstros, feitiços e armadilhas!";

    const botao = document.createElement("button");
    botao.classList.add("cta");
    botao.textContent = "Explorar Grimório";

    heroContent.appendChild(titulo);
    heroContent.appendChild(texto);
    heroContent.appendChild(botao);

    section.appendChild(heroContent);

    return section;
}


const criarLinkNovo = (nav, nome, link) => {
    const linkNovo = document.createElement("a");
    linkNovo.textContent = nome;
    linkNovo.href = link;
    linkNovo.classList.add("subnav-link");

    linkNovo.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(link);
    });

    nav.appendChild(linkNovo);
};

const renderHome = () => {
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.appendChild(criarHeader());
    root.appendChild(criaSecaoJogos());
    root.appendChild(criarFooter());
};

const renderCards = () => {
    const root = document.getElementById("root");

    root.innerHTML = "";

    // HEADER
    root.appendChild(criarHeader());

    // HERO BANNER
    const hero = document.createElement("section");
    hero.classList.add("hero");

    hero.innerHTML = `
        <div class="hero-content">
            <h1>BASE com o yugioh </h1>
            <p>
                Descubra milhares de cartas com detalhes incríveis,
                atributos poderosos, novos decks e coleções especiais.
            </p>

            <button class="cta">
                Explorar Loja
            </button>
        </div>
    `;

    root.appendChild(hero);

    // MENU DE CATEGORIAS
    const generos = document.createElement("section");
    generos.classList.add("generos");

    const tituloCategorias = document.createElement("h2");
    tituloCategorias.textContent = "Navegar por Categoria";

    const gridCategorias = document.createElement("div");
    gridCategorias.classList.add("generos-grid");

    // Lista atualizada para refletir as propriedades de Yu-Gi-Oh (categorias e raças)

    const categoriasLista = [
        "Monstro",
    
        "Armadilha",
        
       "Feitiço",
    ];

    categoriasLista.forEach(genero => {

        const card = document.createElement("div");

        card.classList.add("genero-card");
        card.textContent = genero;

        card.addEventListener("click", () => {
            renderCategoria(genero);
        });

        gridCategorias.appendChild(card);

    });

    const renderCategoria = (genero) => {

        const root = document.getElementById("root");

        root.innerHTML = "";

        root.appendChild(criarHeader());

        root.appendChild(
            criaSecaoJogosFiltrados(genero)
        );

        root.appendChild(criarFooter());

    };

    generos.appendChild(tituloCategorias);
    generos.appendChild(gridCategorias);

    root.appendChild(generos);

    // JOGOS EM DESTAQUE (Atualizado com imagens reais de cartas)
    const destaque = document.createElement("section");
    destaque.classList.add("games");

    destaque.innerHTML = `
        <h2>Cards Lendários em Destaque</h2>

        <div class="game-grid">

            <div class="game-card">
                <div class="game-img">
                    <img src="https://images.ygoprodeck.com/images/cards/89631139.jpg" width="200" alt="Blue-Eyes White Dragon">
                </div>

                <div class="game-info">
                    <h3>Blue-Eyes White Dragon</h3>
                    <p>ATK: 3000 / DEF: 2500</p>
                </div>
            </div>

            <div class="game-card">
                <div class="game-img">
                    <img src="https://images.ygoprodeck.com/images/cards/46986414.jpg" width="200" alt="Dark Magician">
                </div>

                <div class="game-info">
                    <h3>Dark Magician</h3>
                    <p>ATK: 2500 / DEF: 2100</p>
                </div>
            </div>

            <div class="game-card">
                <div class="game-img">
                    <img src="https://images.ygoprodeck.com/images/cards/74677422.jpg" width="200" alt="Red-Eyes Black Dragon">
                </div>

                <div class="game-info">
                    <h3>Red-Eyes Black Dragon</h3>
                    <p>ATK: 2400 / DEF: 2000</p>
                </div>
            </div>

        </div>
    `;

    root.appendChild(destaque);

    // LISTA DE JOGOS (Que agora carrega as cartas através do JSON corrigido)
    root.appendChild(criaSecaoJogos());

    // FOOTER
    root.appendChild(criarFooter());
};

const renderMonstros = () => {

    const root = document.getElementById("root");

    root.innerHTML = "";

    root.appendChild(criarHeader());

    const h1 = document.createElement("h1");
    h1.textContent = "CRUD DE MONSTROS";
    h1.classList.add("crud-title");

    root.appendChild(h1);

    const cartas = [...dados.cartas.filter(c => c.categoria === "Monstro")];

    let indiceEdicao = null;

    const formulario = document.createElement("div");
    formulario.classList.add("crud-form");

    const nome = document.createElement("input");
    nome.placeholder = "Nome";

    const atk = document.createElement("input");
    atk.type = "number";
    atk.placeholder = "ATK";

    const def = document.createElement("input");
    def.type = "number";
    def.placeholder = "DEF";

    const imagem = document.createElement("input");
    imagem.placeholder = "URL da imagem";

    const botoes = document.createElement("div");
    botoes.classList.add("crud-buttons");

    const salvar = document.createElement("button");
    salvar.textContent = "Cadastrar";
    salvar.classList.add("crud-btn");

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.classList.add("crud-btn", "crud-delete");
    excluir.hidden = true;

    botoes.appendChild(salvar);
    botoes.appendChild(excluir);

    formulario.append(
        nome,
        atk,
        def,
        imagem,
        botoes
    );

    root.appendChild(formulario);

    const grid = document.createElement("div");
    grid.classList.add("game-grid", "crud-grid");

    root.appendChild(grid);

    function renderizar(){

        grid.innerHTML = "";

        cartas.forEach((carta,index)=>{

            const card=document.createElement("div");
            card.classList.add("game-card");

            card.innerHTML=`

                <div class="game-img">
                    <img src="${carta.img}">
                </div>

                <div class="game-info">
                    <h3>${carta.nome}</h3>
                    <p>ATK ${carta.ataque} / DEF ${carta.defesa}</p>
                </div>

            `;

            card.onclick=()=>{

                indiceEdicao=index;

                nome.value=carta.nome;
                atk.value=carta.ataque;
                def.value=carta.defesa;
                imagem.value=carta.img;

                salvar.textContent="Atualizar";
                excluir.hidden=false;

            }

            grid.appendChild(card);

        });

    }

    renderizar();

    salvar.onclick=()=>{

        if(indiceEdicao==null){

            cartas.push({

                id:Date.now(),

                categoria:"Monstro",

                nome:nome.value,

                ataque:Number(atk.value),

                defesa:Number(def.value),

                img:imagem.value

            });

        }else{

            cartas[indiceEdicao].nome=nome.value;
            cartas[indiceEdicao].ataque=Number(atk.value);
            cartas[indiceEdicao].defesa=Number(def.value);
            cartas[indiceEdicao].img=imagem.value;

        }

        nome.value="";
        atk.value="";
        def.value="";
        imagem.value="";

        indiceEdicao=null;

        salvar.textContent="Cadastrar";
        excluir.hidden=true;

        renderizar();

    }

    excluir.onclick=()=>{

        cartas.splice(indiceEdicao,1);

        indiceEdicao=null;

        nome.value="";
        atk.value="";
        def.value="";
        imagem.value="";

        salvar.textContent="Cadastrar";
        excluir.hidden=true;

        renderizar();

    }

    root.appendChild(criarFooter());

}

const renderSobre = () => {
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.appendChild(criarHeader());

    // Título
    const h1 = document.createElement("h1");
    h1.className = "crud-title";
    h1.textContent = "Sobre o Projeto";
    root.appendChild(h1);

    // Container principal
    const container = document.createElement("section");
    container.className = "games";

    // Card principal
    const card = document.createElement("div");
    card.className = "oferta-banner";

    card.innerHTML = `
        <div class="oferta-info">
            <div>
                <h3>Quem Somos</h3>
                <p>
                 Somos um grupo de estudantes que denvolveu um projeto, relacionado com o universo de Yu-GI-Oh.
                </p>

                <br>

                <h3>Nossa Missão</h3>
                <p>
                 Tentar cosntruir um protipo funcional conectado com um back-end, que consiga armazenar e exibir informações de cartas do jogo Yu-GI-Oh.
                </p>

                <br>

                <h3>O que você encontrará aqui?</h3>
                <p>
                    • Informações detalhadas sobre cartas de Yu-Gi-Oh, incluindo atributos, efeitos e imagens.
                    • Uma interface amigável para explorar e filtrar cartas por categoria, tipo e atributos.
                </p>

                <br>

                <h3>Tecnologias Utilizadas</h3>
                <p>
                    • Frontend: HTML, CSS, JavaScript e TypeScript.
                    • Backend: Node.js, TypeScript.
                    • Banco de Dados: MySQL Workbench
                </p>

                <br>

            </div>
        </div>
    `;

    container.appendChild(card);

    root.appendChild(container);

    root.appendChild(criarFooter());
};

const criarFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const texto = document.createElement("p");
    texto.textContent = "© Protótipo Yu-Gi-Oh - Base de Dados Integrada";

    footer.appendChild(texto);

    return footer;
}

inItApp();
router();