export function criarHeader(navegar) {
    const header = document.createElement("header");
    header.className = "layout-header";
    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = "EXODIA";
    const nav = document.createElement("nav");
    nav.className = "menu-principal";
    const links = [
        { texto: "HOME", pagina: "home" },
        { texto: "CARTAS", pagina: "cartas" },
        { texto: "ATUALIZAR", pagina: "atualizar" },
        { texto: "SOBRE", pagina: "sobre" },
    ];
    links.forEach(link => {
        const item = document.createElement("a");
        item.href = "#";
        item.textContent = link.texto;
        item.dataset.page = link.pagina;
        item.className = "menu-link";
        item.addEventListener("click", (evento) => {
            evento.preventDefault();
            navegar(link.pagina);
        });
        nav.appendChild(item);
    });
    header.appendChild(logo);
    header.appendChild(nav);
    return header;
}
