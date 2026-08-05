export function renderSobre(container) {
    container.innerHTML = `
        <section class="pagina-sobre">
            <div class="sobre-hero">
                <h1>Sobre o Projeto EXODIA</h1>
                <p>
                    Um sistema web inspirado no universo de Yu-Gi-Oh!, desenvolvido
                    para consultar, pesquisar, criar, atualizar e remover cartas usando
                    TypeScript, backend Express e banco de dados.
                </p>
            </div>

            <div class="sobre-container">
                <section class="sobre-card sobre-destaque">
                    <h2>O Mundo de Yu-Gi-Oh!</h2>

                    <p>
                        Yu-Gi-Oh! é uma franquia mundialmente conhecida por seus duelos,
                        monstros icônicos, cartas mágicas, armadilhas e estratégias.
                        O jogo permite que cada duelista monte seu próprio deck e use
                        combinações para vencer seus oponentes.
                    </p>

                    <p>
                        Este projeto foi inspirado nesse universo, trazendo uma interface
                        visual temática para organizar e manipular cartas de forma prática.
                    </p>
                </section>

                <section class="sobre-grid">
                    <article class="sobre-card">
                        <h2>Objetivo</h2>
                        <p>
                            Criar uma aplicação completa que conecta frontend, backend e banco
                            de dados, permitindo listar, pesquisar, adicionar, atualizar e remover
                            cartas.
                        </p>
                    </article>

                    <article class="sobre-card">
                        <h2>Frontend</h2>
                        <p>
                            A interface foi construída em TypeScript puro, sem React, manipulando
                            o DOM diretamente e usando rotas internas para trocar as páginas.
                        </p>
                    </article>

                    <article class="sobre-card">
                        <h2>Backend</h2>
                        <p>
                            O backend foi desenvolvido com Node.js e Express, expondo rotas para
                            consulta, criação, atualização e remoção de cartas.
                        </p>
                    </article>

                    <article class="sobre-card">
                        <h2>Banco de Dados</h2>
                        <p>
                            As cartas são armazenadas no banco de dados, e o frontend as puxa novamente.
                        </p>
                    </article>
                </section>

                <section class="sobre-card fluxo-sistema">
                    <h2>Como o sistema funciona?</h2>

                    <div class="fluxo-itens">
                        <div class="fluxo-item">API</div>
                        <span>→</span>
                        <div class="fluxo-item">Backend</div>
                        <span>→</span>
                        <div class="fluxo-item">Banco</div>
                        <span>→</span>
                        <div class="fluxo-item">Backend</div>
                         <span>→</span>
                        <div class="fluxo-item">Frontend</div>

                    </div>

                </section>

                <section class="sobre-card tecnologias">
                    <h2>Tecnologias Utilizadas</h2>

                    <div class="tecnologias-lista">
                        <span>HTML</span>
                        <span>CSS</span>
                        <span>TypeScript</span>
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>Banco de Dados</span>
                    </div>
                </section>
            </div>
        </section>
    `;
}
