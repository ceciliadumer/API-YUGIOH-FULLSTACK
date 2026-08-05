export function renderHome(container) {
    container.innerHTML = `
        <section class="home-container">
            <section class="banner">
                <img 
                    src="https://static0.dualshockersimages.com/wordpress/wp-content/uploads/wm/2023/10/yu-gi-oh-best-cards-feature.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5" 
                    alt="Banner Yu-Gi-Oh!"
                >
            </section>

            <section class="descricao">
                <p>
                    Explore milhares de cartas de Yu-Gi-Oh!, descubra
                    combinações poderosas e construa o Deck perfeito
                    para dominar qualquer duelo.
                </p>
            </section>

            <section class="galeria">
                <div class="card">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/pt/d/dc/YuGiOh-1999-P%C3%B4ster.JPG" 
                        alt="Yu-Gi-Oh! pôster"
                    >
                </div>

                <div class="card">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-2Qycd8RNKl6Bme1M0fg8Draf2ePfvz5iWYk3RbyVHf3kUOADh4sM8yj&s=10" 
                        alt="Yu-Gi-Oh! carta"
                    >
                </div>

                <div class="card">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5QoR605F5Tt8WnDa0b1SntyovmYGQWFJCcicifE22kA&s=10" 
                        alt="Yu-Gi-Oh! personagem"
                    >
                </div>
            </section>
        </section>
    `;
}
