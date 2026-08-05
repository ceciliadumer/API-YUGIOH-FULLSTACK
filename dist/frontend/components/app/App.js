import { criarHeader } from "../layout/Header.js";
import { criarFooter } from "../layout/Footer.js";
import { Router } from "../../routerFront/Router.js";
const headerContainer = document.getElementById("layout-header");
const appContainer = document.getElementById("app");
const footerContainer = document.getElementById("layout-footer");
if (!headerContainer || !appContainer || !footerContainer) {
    throw new Error("Estrutura base do HTML não encontrada.");
}
const router = new Router(appContainer);
headerContainer.replaceWith(criarHeader((pagina) => router.navegar(pagina)));
footerContainer.replaceWith(criarFooter());
router.navegar("home");
