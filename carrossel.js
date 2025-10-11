document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.advantage-container');
    const cards = document.querySelectorAll('.advantage-card');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    let cardWidth = cards[0].offsetWidth + 15; // card + gap
    let scrollAmount = 0;
    let visibleCards = Math.floor(container.offsetWidth / cardWidth);

    function updateArrows() {
        // Atualiza o estado das setas
        if (container.scrollLeft <= 0) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }
    }

    rightArrow.addEventListener('click', function() {
        cardWidth = cards[0].offsetWidth + 15;
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    leftArrow.addEventListener('click', function() {
        cardWidth = cards[0].offsetWidth + 15;
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    container.addEventListener('scroll', updateArrows);

    window.addEventListener('resize', function() {
        cardWidth = cards[0].offsetWidth + 15;
        visibleCards = Math.floor(container.offsetWidth / cardWidth);
        updateArrows();
    });

    // Inicializa o estado das setas
    updateArrows();
});
