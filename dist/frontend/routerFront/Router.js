import { renderHome } from "../pages/Home.js";
import { renderCartas } from "../pages/Cartas.js";
import { renderAtualizar } from "../pages/Atualizar.js";
import { renderSobre } from "../pages/Sobre.js";
export class Router {
    constructor(container) {
        this.container = container;
    }
    async navegar(pagina) {
        const paginaEscolhida = this.normalizarPagina(pagina);
        this.marcarMenuAtivo(paginaEscolhida);
        switch (paginaEscolhida) {
            case "home":
                renderHome(this.container);
                break;
            case "cartas":
                await renderCartas(this.container);
                break;
            case "atualizar":
                renderAtualizar(this.container);
                break;
            case "sobre":
                renderSobre(this.container);
                break;
        }
    }
    normalizarPagina(pagina) {
        if (pagina === "cartas" || pagina === "atualizar" || pagina === "sobre") {
            return pagina;
        }
        return "home";
    }
    marcarMenuAtivo(pagina) {
        const links = document.querySelectorAll(".menu-link");
        links.forEach(link => {
            const estaAtivo = link.dataset.page === pagina;
            link.classList.toggle("ativo", estaAtivo);
            if (estaAtivo) {
                link.setAttribute("aria-current", "page");
            }
            else {
                link.removeAttribute("aria-current");
            }
        });
    }
}
