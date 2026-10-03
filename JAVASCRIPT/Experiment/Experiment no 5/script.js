
const products = [
    { id: 1, name: "Wireless Headphones", price: 1999 },
    { id: 2, name: "Smart Watch", price: 2499 },
    { id: 3, name: "Laptop Stand", price: 899 },
    { id: 4, name: "Bluetooth Speaker", price: 1499 },
    { id: 5, name: "USB-C Hub", price: 1199 }
];

let cart = [];

// Display products
function displayProducts() {
    const container = document.getElementById("products");

    container.innerHTML = products.map(product => `
        <div class="product">
            <div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>
            </div>
            <button class="add-btn"
                onclick="addToCart(${product.id})">
                + Add
            </button>
        </div>
    `).join("");
}

// Add product to cart
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Remove product
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Calculate subtotal, discount and delivery
function calculateTotal() {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    let rate = 0;

    if (subtotal >= 5000) {
        rate = 0.15;
    } else if (subtotal >= 3000) {
        rate = 0.10;
    } else if (subtotal >= 1500) {
        rate = 0.05;
    }

    const discount = subtotal * rate;

    const delivery =
        subtotal === 0 || subtotal >= 3000 ? 0 : 99;

    const total = subtotal - discount + delivery;

    return { subtotal, discount, delivery, total };
}

// Format currency
function money(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Update cart and total
function updateCart() {
    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty">
                Your cart is empty.<br><br>
                Add a product to begin!
            </div>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <small>
                        ${money(item.price)} × ${item.quantity}
                    </small>
                </div>
                <div>
                    <strong>
                        ${money(item.price * item.quantity)}
                    </strong>
                    <br><br>
                    <button class="remove-btn"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `).join("");
    }

    const result = calculateTotal();

    document.getElementById("subtotal").textContent =
        money(result.subtotal);

    document.getElementById("discount").textContent =
        "− " + money(result.discount);

    document.getElementById("delivery").textContent =
        money(result.delivery);

    document.getElementById("total").textContent =
        money(result.total);

    let message = "Add products to unlock discounts.";

    if (result.subtotal >= 5000) {
        message = "🎉 15% discount unlocked!";
    } else if (result.subtotal >= 3000) {
        message = "✨ 10% discount unlocked!";
    } else if (result.subtotal >= 1500) {
        message = "🎁 5% discount unlocked!";
    } else if (result.subtotal > 0) {
        message = `Add ${money(1500 - result.subtotal)}
                   more to unlock your first discount.`;
    }

    document.getElementById("discountMessage").textContent =
        message;
}

// Clear all cart items
function clearCart() {
    cart = [];
    updateCart();
}

// Checkout demonstration
function checkout() {
    const result = calculateTotal();

    if (cart.length === 0) {
        alert("Please add products to your cart first!");
        return;
    }

    alert(
        "CHECKOUT SUMMARY\n\n" +
        "Subtotal: " + money(result.subtotal) + "\n" +
        "Discount: " + money(result.discount) + "\n" +
        "Delivery: " + money(result.delivery) + "\n" +
        "Final Total: " + money(result.total)
    );
}

// Run when page loads
displayProducts();
updateCart();