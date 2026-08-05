import { renderHome } from "../pages/Home.js";
import { renderCartas } from "../pages/Cartas.js";
import { renderAtualizar } from "../pages/Atualizar.js";
import { renderSobre } from "../pages/Sobre.js";

type Pagina = "home" | "cartas" | "atualizar" | "sobre";

export class Router {
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    async navegar(pagina: string): Promise<void> {
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

    private normalizarPagina(pagina: string): Pagina {
        if (pagina === "cartas" || pagina === "atualizar" || pagina === "sobre") {
            return pagina;
        }

        return "home";
    }

    private marcarMenuAtivo(pagina: Pagina): void {
        const links = document.querySelectorAll<HTMLAnchorElement>(".menu-link");

        links.forEach(link => {
            const estaAtivo = link.dataset.page === pagina;

            link.classList.toggle("ativo", estaAtivo);

            if (estaAtivo) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }
}
