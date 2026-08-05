import { atualizarCarta, buscarCarta, criarCarta, listarCartas, removerCarta } from "../service/frontService.js";
let bancoCartas = [];
export async function renderAtualizar(container) {
    container.innerHTML = `
        <section class="pagina-addrem">
            <h1 class="titulo-pagina">Adicionar / Remover Cartas</h1>

            <div class="painel-addrem">
                <div id="formAtualizar" class="form-addrem">
                    <h2>Gerenciar Carta</h2>

                    <div class="grupo-campo">
                        <label for="editId">ID da carta</label>
                        <input type="number" id="editId" placeholder="Ex: 46986414">
                    </div>

                    <div class="grupo-campo">
                        <label for="editNome">Nome da carta</label>
                        <input type="text" id="editNome" placeholder="Ex: Dark Magician">
                    </div>

                    <div class="grupo-campo">
                        <label for="editFrameType">Tipo da carta</label>
                        <input type="text" id="editFrameType" placeholder="Ex: monster, spell, trap">
                    </div>

                    <div class="botoes-form">
                        <button id="btnBuscar" class="btn-form btn-buscar" type="button">BUSCAR</button>
                        <button id="btnCriar" class="btn-form btn-criar" type="button">CRIAR</button>
                        <button id="btnSalvar" class="btn-form btn-salvar" type="button">SALVAR</button>
                        <button id="btnRemover" class="btn-form btn-remover" type="button">REMOVER</button>
                        <button id="btnLimparForm" class="btn-form btn-limpar-form" type="button">LIMPAR</button>
                    </div>

                    <p id="mensagem-form"></p>
                </div>

                <div class="info-addrem">
                    <h2>Como usar?</h2>

                    <p>
                        Para editar uma carta, pesquise abaixo e clique em <strong>EDITAR</strong>.
                        Os dados serão enviados para o formulário.
                    </p>

                    <p>
                        Para criar uma carta, preencha ID, nome e tipo. Para remover, informe o ID
                        ou clique em <strong>REMOVER</strong> no card.
                    </p>
                </div>
            </div>

            <div class="cartas-controles addrem-controles">
                <div class="pesquisa-wrapper">
                    <input 
                        id="inPesquisarAddRem" 
                        class="campo-pesquisa-cartas" 
                        type="text" 
                        placeholder="Pesquisar carta para editar ou remover..."
                    >

                    <button id="btnLimparPesquisaAddRem" class="btn-limpar" type="button">
                        LIMPAR
                    </button>
                </div>
            </div>

            <p id="status-cartas-addrem" class="texto-status">
                Carregando cartas...
            </p>

            <div id="listaCartasAddRem" class="gridCartas"></div>
        </section>
    `;
    configurarEventosFormulario();
    await carregarERenderizarCartas();
    configurarPesquisa();
}
function configurarEventosFormulario() {
    const inputId = document.getElementById("editId");
    const inputNome = document.getElementById("editNome");
    const inputFrameType = document.getElementById("editFrameType");
    document.getElementById("btnBuscar")?.addEventListener("click", async () => {
        const id = obterId(inputId);
        if (id === null) {
            mostrarMensagem("Informe um ID válido.", "erro");
            return;
        }
        const carta = await buscarCarta(id);
        if (!carta) {
            mostrarMensagem("Carta não encontrada.", "erro");
            return;
        }
        preencherFormulario(carta);
        mostrarMensagem(`Carta encontrada: ${carta.nome}`, "sucesso");
    });
    document.getElementById("btnCriar")?.addEventListener("click", async () => {
        const dados = obterDadosFormulario(inputId, inputNome, inputFrameType);
        if (!dados) {
            mostrarMensagem("Preencha ID, nome e tipo da carta.", "erro");
            return;
        }
        const carta = await criarCarta(dados.id, dados.nome, dados.frameType);
        if (!carta) {
            mostrarMensagem("Não foi possível criar a carta.", "erro");
            return;
        }
        mostrarMensagem(`Carta criada com sucesso: ${carta.nome}`, "sucesso");
        await carregarERenderizarCartas();
    });
    document.getElementById("btnSalvar")?.addEventListener("click", async () => {
        const dados = obterDadosFormulario(inputId, inputNome, inputFrameType);
        if (!dados) {
            mostrarMensagem("Preencha ID, nome e tipo da carta.", "erro");
            return;
        }
        const carta = await atualizarCarta(dados.id, dados.nome, dados.frameType);
        if (!carta) {
            mostrarMensagem("Não foi possível atualizar a carta.", "erro");
            return;
        }
        mostrarMensagem(`Carta atualizada com sucesso: ${carta.nome}`, "sucesso");
        await carregarERenderizarCartas();
    });
    document.getElementById("btnRemover")?.addEventListener("click", async () => {
        const id = obterId(inputId);
        if (id === null) {
            mostrarMensagem("Informe um ID válido.", "erro");
            return;
        }
        const confirmar = confirm("Tem certeza que deseja remover esta carta?");
        if (!confirmar)
            return;
        const removida = await removerCarta(id);
        if (!removida) {
            mostrarMensagem("Não foi possível remover a carta.", "erro");
            return;
        }
        limparFormulario();
        mostrarMensagem("Carta removida com sucesso.", "sucesso");
        await carregarERenderizarCartas();
    });
    document.getElementById("btnLimparForm")?.addEventListener("click", () => {
        limparFormulario();
        mostrarMensagem("Formulário limpo.", "neutro");
    });
}
function configurarPesquisa() {
    const inputPesquisa = document.getElementById("inPesquisarAddRem");
    const btnLimparPesquisa = document.getElementById("btnLimparPesquisaAddRem");
    inputPesquisa?.addEventListener("input", () => {
        const termo = inputPesquisa.value.trim().toLowerCase();
        if (!termo) {
            renderizarCartasAtualizar(bancoCartas);
            atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
            return;
        }
        const cartasFiltradas = bancoCartas.filter(carta => {
            return carta.nome.toLowerCase().includes(termo)
                || String(carta.id).includes(termo)
                || (carta.descricao ?? "").toLowerCase().includes(termo);
        });
        renderizarCartasAtualizar(cartasFiltradas);
        atualizarStatus(`${cartasFiltradas.length} resultado(s) encontrado(s).`);
    });
    btnLimparPesquisa?.addEventListener("click", () => {
        if (inputPesquisa) {
            inputPesquisa.value = "";
        }
        renderizarCartasAtualizar(bancoCartas);
        atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
    });
}
async function carregarERenderizarCartas() {
    bancoCartas = await listarCartas();
    atualizarStatus(`${bancoCartas.length} carta(s) carregada(s). Exibindo até 50 por vez.`);
    renderizarCartasAtualizar(bancoCartas);
}
function renderizarCartasAtualizar(cartas) {
    const listaCartas = document.getElementById("listaCartasAddRem");
    if (!listaCartas)
        return;
    listaCartas.innerHTML = "";
    if (cartas.length === 0) {
        listaCartas.innerHTML = `
            <p class="texto-status resultado-vazio">
                Nenhuma carta encontrada.
            </p>
        `;
        return;
    }
    cartas.slice(0, 50).forEach(carta => {
        const div = document.createElement("div");
        div.className = "carta-item carta-gerenciar";
        const imagem = document.createElement("img");
        imagem.src = carta.imagem || carta.imagem || "https://via.placeholder.com/220x320?text=Sem+Imagem";
        imagem.alt = carta.nome;
        imagem.loading = "lazy";
        const titulo = document.createElement("h3");
        titulo.textContent = carta.nome;
        const id = document.createElement("p");
        id.innerHTML = `<small>ID: ${carta.id}</small>`;
        const botoes = document.createElement("div");
        botoes.className = "botoes-card";
        const botaoEditar = document.createElement("button");
        botaoEditar.className = "btn-card btn-card-editar";
        botaoEditar.type = "button";
        botaoEditar.textContent = "EDITAR";
        botaoEditar.addEventListener("click", () => {
            preencherFormulario(carta);
            mostrarMensagem(`Editando carta: ${carta.nome}`, "neutro");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        const botaoRemover = document.createElement("button");
        botaoRemover.className = "btn-card btn-card-remover";
        botaoRemover.type = "button";
        botaoRemover.textContent = "REMOVER";
        botaoRemover.addEventListener("click", async () => {
            const confirmar = confirm(`Tem certeza que deseja remover "${carta.nome}"?`);
            if (!confirmar)
                return;
            const removida = await removerCarta(carta.id);
            if (!removida) {
                mostrarMensagem("Não foi possível remover a carta.", "erro");
                return;
            }
            mostrarMensagem(`Carta removida: ${carta.nome}`, "sucesso");
            await carregarERenderizarCartas();
        });
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoRemover);
        div.appendChild(imagem);
        div.appendChild(titulo);
        div.appendChild(id);
        div.appendChild(botoes);
        listaCartas.appendChild(div);
    });
}
function preencherFormulario(carta) {
    const inputId = document.getElementById("editId");
    const inputNome = document.getElementById("editNome");
    const inputFrameType = document.getElementById("editFrameType");
    if (inputId)
        inputId.value = String(carta.id);
    if (inputNome)
        inputNome.value = carta.nome;
    if (inputFrameType)
        inputFrameType.value = carta.frameType || "monster";
}
function limparFormulario() {
    const inputId = document.getElementById("editId");
    const inputNome = document.getElementById("editNome");
    const inputFrameType = document.getElementById("editFrameType");
    if (inputId)
        inputId.value = "";
    if (inputNome)
        inputNome.value = "";
    if (inputFrameType)
        inputFrameType.value = "";
}
function obterId(inputId) {
    const id = Number(inputId?.value);
    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }
    return id;
}
function obterDadosFormulario(inputId, inputNome, inputFrameType) {
    const id = obterId(inputId);
    const nome = inputNome?.value.trim() || "";
    const frameType = inputFrameType?.value.trim() || "";
    if (id === null || !nome || !frameType) {
        return null;
    }
    return { id, nome, frameType };
}
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem-form");
    if (!mensagem)
        return;
    mensagem.textContent = texto;
    mensagem.className = "";
    if (tipo === "sucesso") {
        mensagem.classList.add("mensagem-sucesso");
    }
    if (tipo === "erro") {
        mensagem.classList.add("mensagem-erro");
    }
    if (tipo === "neutro") {
        mensagem.classList.add("mensagem-neutra");
    }
}
function atualizarStatus(texto) {
    const status = document.getElementById("status-cartas-addrem");
    if (status) {
        status.textContent = texto;
    }
}
