// Sistema de Busca Global

class SearchManager {
    constructor() {
        this.allProducts = [];
        this.searchInput = document.querySelector('.search-input');
        this.searchButton = document.querySelector('.search-button');
        
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }
        
        if (this.searchButton) {
            this.searchButton.addEventListener('click', () => this.performSearch());
        }
    }

    performSearch() {
        const query = this.searchInput?.value.trim().toLowerCase();
        if (!query) {
            alert('Digite algo para buscar');
            return;
        }
        
        // Redirecionar para página de resultados com query
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    new SearchManager();
});
