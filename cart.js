// Sistema de Carrinho com localStorage

class ShoppingCart {
    constructor() {
        this.cartKey = 'flamengoDJCart';
        this.cart = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem(this.cartKey);
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
        this.updateCartBadge();
    }

    addItem(product) {
        const existing = this.cart.find(item => 
            item.name === product.name && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        this.saveCart();
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.cart[index].quantity = quantity;
            this.saveCart();
        }
    }

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    clear() {
        this.cart = [];
        this.saveCart();
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        const count = this.getItemCount();
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    getCartForCheckout() {
        return {
            items: this.cart,
            subtotal: this.getTotal(),
            shipping: 50, // Frete padrão (grátis se > 200)
            total: this.getTotal() + (this.getTotal() < 200 ? 50 : 0)
        };
    }
}

// Instância global do carrinho
const cart = new ShoppingCart();

// Inicializar badge do carrinho
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartBadge();

    // Clique no ícone do carrinho abre página de checkout
    const cartIcon = document.querySelector('.cart-icon-container');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }
});
