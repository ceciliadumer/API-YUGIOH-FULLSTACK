import { listarCartas } from "../service/frontService.js";
import { criarCardCarta } from "../components/cartas/CardCarta.js";
import type { CartaDTO } from "../tipos/CartasDTO.js";

let bancoCartas: CartaDTO[] = [];

export async function renderCartas(container: HTMLElement): Promise<void> {
    container.innerHTML = `
        <section class="pagina-cartas">
            <h1 class="titulo-pagina">Cartas</h1>

            <div class="cartas-controles">
                <div class="pesquisa-wrapper">
                    <input 
                        id="inPesquisar" 
                        class="campo-pesquisa-cartas" 
                        type="text" 
                        placeholder="Pesquisar carta pelo nome, ID ou descrição..."
                    >

                    <button id="btnPesquisar" class="btn-pesquisa" type="button">
                        PESQUISAR
                    </button>

                    <button id="btnLimpar" class="btn-limpar" type="button">
                        LIMPAR
                    </button>
                </div>
            </div>

            <p id="status-cartas" class="texto-status">
                Carregando cartas do banco...
            </p>

            <div id="listaCartas" class="gridCartas"></div>
        </section>
    `;

    const inputPesquisa = document.getElementById("inPesquisar") as HTMLInputElement | null;
    const btnPesquisar = document.getElementById("btnPesquisar") as HTMLButtonElement | null;
    const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement | null;
    const status = document.getElementById("status-cartas") as HTMLParagraphElement | null;

    bancoCartas = await listarCartas();

    console.log("Cartas recebidas no frontend:", bancoCartas);
    console.log("Quantidade:", bancoCartas.length);
    console.log("Primeira carta:", bancoCartas[0]);

    if (status) {
        status.textContent = `${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`;
    }

    renderizarCartas(bancoCartas);

    btnPesquisar?.addEventListener("click", () => {
        pesquisarCartas();
    });

    inputPesquisa?.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            pesquisarCartas();
        }
    });

    inputPesquisa?.addEventListener("input", () => {
        if (inputPesquisa.value.trim() === "") {
            renderizarCartas(bancoCartas);
            atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
        }
    });

    btnLimpar?.addEventListener("click", () => {
        if (inputPesquisa) {
            inputPesquisa.value = "";
        }

        renderizarCartas(bancoCartas);
        atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
    });
}

function pesquisarCartas(): void {
    const inputPesquisa = document.getElementById("inPesquisar") as HTMLInputElement | null;

    if (!inputPesquisa) return;

    const termo = inputPesquisa.value.trim().toLowerCase();

    if (!termo) {
        renderizarCartas(bancoCartas);
        atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
        return;
    }

    const cartasFiltradas = bancoCartas.filter(carta => {
        return carta.nome.toLowerCase().includes(termo)
            || String(carta.id).includes(termo)
            || (carta.descricao ?? "").toLowerCase().includes(termo);
    });

    renderizarCartas(cartasFiltradas);

    atualizarStatus(`${cartasFiltradas.length} resultado(s) encontrado(s) para "${inputPesquisa.value}".`);
}

function renderizarCartas(cartas: CartaDTO[]): void {
    const listaCartas = document.getElementById("listaCartas");

    if (!listaCartas) return;

    listaCartas.innerHTML = "";

    if (cartas.length === 0) {
        listaCartas.innerHTML = `
            <p class="texto-status resultado-vazio">
                Nenhuma carta encontrada.
            </p>
        `;
        return;
    }

    const cartasParaMostrar = cartas.slice(0, 50);

    cartasParaMostrar.forEach(carta => {
        listaCartas.appendChild(criarCardCarta(carta));
    });
}

function atualizarStatus(texto: string): void {
    const status = document.getElementById("status-cartas") as HTMLParagraphElement | null;

    if (status) {
        status.textContent = texto;
    }
}