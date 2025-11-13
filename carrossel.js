document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.advantage-container');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');

    function getCards() { return container ? container.querySelectorAll('.advantage-card') : [] }
    function cardWidth() {
        const c = getCards()[0];
        return c ? c.offsetWidth + 15 : 200;
    }

    function updateArrows() {
        if (!container || !leftArrow || !rightArrow) return;
        leftArrow.disabled = container.scrollLeft <= 0;
        rightArrow.disabled = container.scrollLeft >= container.scrollWidth - container.clientWidth - 5;
    }

    // Navegação por setas
    rightArrow && rightArrow.addEventListener('click', function() {
        container.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });
    leftArrow && leftArrow.addEventListener('click', function() {
        container.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });

    // Dados de produtos com preço
    const productPrices = {
        'Camisa Oficial 2025': { price: 199.90, sizes: ['P', 'M', 'G', 'GG'], colors: ['Vermelho', 'Branco'] },
        'Camisa Retrô': { price: 149.90, sizes: ['P', 'M', 'G', 'GG'], colors: ['Vermelho e Preto'] },
        'Boné Flamengo': { price: 79.90, sizes: ['Único'], colors: ['Vermelho', 'Preto'] },
        'Agasalho Rubro-Negro': { price: 249.90, sizes: ['P', 'M', 'G', 'GG'], colors: ['Vermelho e Preto'] },
        'Infantil': { price: 129.90, sizes: ['2', '4', '6', '8', '10'], colors: ['Vermelho'] },
        'Chaveiros e Acessórios': { price: 29.90, sizes: ['Único'], colors: ['Vermelho e Preto'] }
    };

    // Produtos relacionados por categoria
    const relatedProducts = {
        'Chaveiros e Acessórios': [
            { name: 'Chaveiro Escudo', image: 'imagens/chaveiroFla.jpg', price: 29.90 },
            { name: 'Mochila Rubro-Negra', image: 'imagens/logo1.jpg', price: 199.90 },
            { name: 'Pulseira Flamengo', image: 'imagens/chaveiroFla.jpg', price: 19.90 },
            { name: 'Boné Escudo', image: 'imagens/BoneFla.jpg', price: 79.90 },
            { name: 'Meião Flamengo', image: 'imagens/BoneFla.jpg', price: 39.90 },
            { name: 'Toalha de Banho', image: 'imagens/camisaFla.jpg', price: 59.90 }
        ],
        'Boné Flamengo': [
            { name: 'Boné Snapback', image: 'imagens/BoneFla.jpg', price: 89.90 },
            { name: 'Boné Oficial', image: 'imagens/BoneFla.jpg', price: 79.90 },
            { name: 'Boné de Aba Reta', image: 'imagens/BoneFla.jpg', price: 69.90 },
            { name: 'Boné Infantil', image: 'imagens/BoneFla.jpg', price: 49.90 },
            { name: 'Chapéu Flamengo', image: 'imagens/logo1.jpg', price: 89.90 },
            { name: 'Viseira Flamengo', image: 'imagens/BoneFla.jpg', price: 39.90 }
        ],
        'Agasalho Rubro-Negro': [
            { name: 'Jaqueta Rubro-Negra', image: 'imagens/AgasalhoFla.png', price: 279.90 },
            { name: 'Agasalho Oficial', image: 'imagens/AgasalhoFla.png', price: 249.90 },
            { name: 'Jaqueta de Treino', image: 'imagens/AgasalhoFla.png', price: 199.90 },
            { name: 'Moletom Flamengo', image: 'imagens/AgasalhoFla.png', price: 129.90 },
            { name: 'Blusa de Frio', image: 'imagens/AgasalhoFla.png', price: 99.90 },
            { name: 'Casaco Infantil', image: 'imagens/AgasalhoFla.png', price: 89.90 }
        ]
    };

    // Ao clicar em botão, abrir modal
    container && container.addEventListener('click', function(e) {
        const btn = e.target.closest('.advantage-button');
        if (!btn) return;
        e.preventDefault();
        const card = btn.closest('.advantage-card');
        if (!card) return;
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const imgEl = card.querySelector('img');
        const title = titleEl ? titleEl.textContent.trim() : 'Produto';
        const description = descEl ? descEl.textContent.trim() : '';
        const image = imgEl ? imgEl.src : '';
        const priceData = productPrices[title] || { price: 199.90, sizes: ['P', 'M', 'G', 'GG'], colors: ['Vermelho'] };
        const related = relatedProducts[title] || [];
        // Abrir modal com os dados do produto e produtos relacionados
        openProductModal(title, description, image, priceData.price, priceData.sizes, priceData.colors, related);
    });

    container && container.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();
});

// Funções do Modal (globais)
function openProductModal(title, description, image, price, sizes, colors, relatedProducts = []) {
    const modal = document.getElementById('productModal');
    const modalTabs = document.getElementById('modalTabs');
    if (!modal) return;
    document.getElementById('modalProductTitle').textContent = title;
    document.getElementById('modalProductDescription').textContent = description;
    document.getElementById('modalProductImage').src = image;
    document.getElementById('modalProductPrice').textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    
    // Tamanhos
    const sizesDiv = document.getElementById('modalProductSizes');
    sizesDiv.innerHTML = `<label>Tamanho:</label><div class="size-options">${sizes.map(s => `<button class="size-btn" onclick="selectSize(this)">${s}</button>`).join('')}</div>`;
    
    // Cores
    const colorsDiv = document.getElementById('modalProductColors');
    colorsDiv.innerHTML = `<label>Cor:</label><div class="color-options">${colors.map(c => `<button class="color-btn" onclick="selectColor(this)">${c}</button>`).join('')}</div>`;
    
    // Selecionar primeira opção por padrão
    document.querySelector('.size-btn')?.classList.add('active');
    document.querySelector('.color-btn')?.classList.add('active');
    
    // Mostrar/ocultar abas baseado em produtos relacionados
    if (relatedProducts && relatedProducts.length > 0) {
        modalTabs.style.display = 'block';
        const grid = document.getElementById('relatedProductsGrid');
        grid.innerHTML = relatedProducts.map(p => `
            <div class="related-product-card" onclick="selectRelatedProduct('${p.name}', '${p.image}', ${p.price})">
                <img src="${p.image}" alt="${p.name}" />
                <p>${p.name}</p>
                <p class="related-product-price">R$ ${p.price.toFixed(2).replace('.', ',')}</p>
            </div>
        `).join('');
    } else {
        modalTabs.style.display = 'none';
    }
    
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.style.display = 'none';
}

function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function selectColor(btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function switchTab(tabName) {
    // Desativar todas as abas
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Ativar a aba selecionada
    const pane = document.getElementById(`tab-${tabName}`);
    const btn = document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`);
    if (pane) pane.classList.add('active');
    if (btn) btn.classList.add('active');
}

function selectRelatedProduct(name, image, price) {
    // Atualizar modal com produto relacionado
    document.getElementById('modalProductTitle').textContent = name;
    document.getElementById('modalProductImage').src = image;
    document.getElementById('modalProductPrice').textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    // Voltar à aba de detalhes
    switchTab('details');
}

function addToCart() {
    const title = document.getElementById('modalProductTitle').textContent;
    const price = parseFloat(document.getElementById('modalProductPrice').textContent.replace('R$ ', '').replace(',', '.'));
    const qty = parseInt(document.getElementById('modalProductQty').value) || 1;
    const size = document.querySelector('.size-btn.active')?.textContent || 'Único';
    const color = document.querySelector('.color-btn.active')?.textContent || '';

    // Adicionar ao carrinho (usando objeto global 'cart' de cart.js)
    if (typeof cart !== 'undefined') {
        cart.addItem({
            name: title,
            price: price,
            quantity: qty,
            size: size,
            color: color,
            image: document.getElementById('modalProductImage').src
        });
        alert(`${qty}x ${title} adicionado ao carrinho!`);
    } else {
        alert(`${qty}x ${title} (${size}, ${color}) adicionado ao carrinho!`);
    }
    
    closeProductModal();
}

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    if (modal && e.target === modal) closeProductModal();
});
