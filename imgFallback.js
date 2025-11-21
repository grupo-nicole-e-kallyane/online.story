// Substitui imagens quebradas por placeholder
document.addEventListener('DOMContentLoaded', function(){
    const placeholder = 'imagens/placeholder.svg';
    document.querySelectorAll('img').forEach(img => {
        // Se já apontar para placeholder, ignore
        if (!img.src) return;
        img.addEventListener('error', function() {
            if (!img.src.includes(placeholder)) img.src = placeholder;
        });
        // Para elementos já com erro de carregamento, forçar substituição
        if (img.complete && img.naturalWidth === 0) {
            if (!img.src.includes(placeholder)) img.src = placeholder;
        }
    });
});
