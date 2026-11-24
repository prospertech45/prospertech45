// ======================================
// SHOPORA E-COMMERCE WEBSITE
// ======================================

// PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "Premium Sneakers",
        category: "Fashion",
        price: 79.99,
        rating: 5,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 2,
        name: "Classic Wrist Watch",
        category: "Accessories",
        price: 119.99,
        rating: 5,
        tag: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 89.99,
        rating: 5,
        tag: "Sale",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        id: 4,
        name: "Stylish Handbag",
        category: "Fashion",
        price: 64.99,
        rating: 4,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    },
    {
        id: 5,
        name: "Modern Sunglasses",
        category: "Accessories",
        price: 39.99,
        rating: 5,
        tag: "New",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 6,
        name: "Smartphone",
        category: "Electronics",
        price: 499.99,
        rating: 5,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    },
    {
        id: 7,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 24.99,
        rating: 4,
        tag: "Sale",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 8,
        name: "Luxury Perfume",
        category: "Beauty",
        price: 54.99,
        rating: 5,
        tag: "New",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
    },
    {
        id: 9,
        name: "Leather Shoes",
        category: "Fashion",
        price: 99.99,
        rating: 5,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600"
    },
    {
        id: 10,
        name: "Digital Camera",
        category: "Electronics",
        price: 299.99,
        rating: 4,
        tag: "New",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
    },
    {
        id: 11,
        name: "Elegant Dress",
        category: "Fashion",
        price: 74.99,
        rating: 5,
        tag: "Sale",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
    },
    {
        id: 12,
        name: "Wireless Speaker",
        category: "Electronics",
        price: 69.99,
        rating: 4,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
    }
];


// ======================================
// GET HTML ELEMENTS
// ======================================

const productGrid = document.getElementById("productGrid");
const categoryList = document.getElementById("categoryList");

const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const closeCart = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");

const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");

const sortProducts = document.getElementById("sortProducts");

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");


// ======================================
// SHOPPING CART DATA
// ======================================

let cart = [];

try {
    const savedCart = JSON.parse(localStorage.getItem("shoporaCart") || "[]");

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(item =>
            products.some(product =>
                product.id === item.id
            ) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    }
} catch (error) {
    cart = [];
}

let selectedCategory = "All";


// ======================================
// CATEGORIES
// ======================================

const categories = [
    {
        name: "All",
        icon: "🛍️"
    },
    {
        name: "Fashion",
        icon: "👕"
    },
    {
        name: "Electronics",
        icon: "📱"
    },
    {
        name: "Accessories",
        icon: "⌚"
    },
    {
        name: "Beauty",
        icon: "💄"
    }
];


function displayCategories() {

    categoryList.innerHTML = categories.map(category => {

        return `
            <div
                class="category-card ${selectedCategory === category.name ? "active" : ""}"
                data-category="${category.name}"
            >

                <span>${category.icon}</span>

                <h3>${category.name}</h3>

            </div>
        `;

    }).join("");

}


// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;

    });


    // SORT PRODUCTS

    if (sortProducts.value === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sortProducts.value === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }


    // CHECK IF PRODUCTS EXIST

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <p class="no-products">
                No products found. Try another search.
            </p>
        `;

        return;
    }


    // CREATE PRODUCT CARDS

    productGrid.innerHTML = filteredProducts.map(product => {

        return `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <span class="product-tag">
                        ${product.tag}
                    </span>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="rating">
                        ${"★".repeat(product.rating)}
                        ${"☆".repeat(5 - product.rating)}
                    </div>

                    <div class="product-bottom">

                        <span class="product-price">
                            $${product.price.toFixed(2)}
                        </span>

                        <button
                            class="add-cart"
                            data-id="${product.id}"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");

}


// ======================================
// CATEGORY SELECTION
// ======================================

categoryList.addEventListener("click", function(event) {

    const card = event.target.closest(".category-card");

    if (!card) return;

    selectedCategory = card.dataset.category;

    displayCategories();
    displayProducts();

});


// ======================================
// ADD PRODUCT TO CART
// ======================================

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    updateCart();

}


// ======================================
// PRODUCT BUTTON EVENTS
// ======================================

productGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".add-cart");

    if (!button) return;

    const productId = Number(button.dataset.id);

    addToCart(productId);

    const originalText = button.textContent;

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = originalText;
    }, 1000);

});


// ======================================
// UPDATE SHOPPING CART
// ======================================

function updateCart() {

    localStorage.setItem("shoporaCart", JSON.stringify(cart));

    // TOTAL ITEMS

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;


    // TOTAL PRICE

    const totalPrice = cart.reduce((total, item) => {

        const product = products.find(p => p.id === item.id);

        return total + (product.price * item.quantity);

    }, 0);

    cartTotal.textContent = "$" + totalPrice.toFixed(2);


    // DISPLAY CART ITEMS

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        checkoutButton.disabled = true;

        return;
    }

    checkoutButton.disabled = false;

    cartItems.innerHTML = cart.map(item => {

        const product = products.find(p => p.id === item.id);

        return `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <h4>${product.name}</h4>

                    <p>
                        $${(product.price * item.quantity).toFixed(2)}
                    </p>

                    <div class="quantity-controls">

                        <button data-action="decrease" data-id="${product.id}">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button data-action="increase" data-id="${product.id}">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${product.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


// ======================================
// CART QUANTITY AND REMOVE BUTTONS
// ======================================

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (action === "increase") {

        item.quantity++;

    }

    else if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(item => item.id !== productId);

        }

    }

    else if (action === "remove") {

        cart = cart.filter(item => item.id !== productId);

    }

    updateCart();

});


// ======================================
// OPEN AND CLOSE CART
// ======================================

function openCart() {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

}

function closeCartPanel() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


// ======================================
// SEARCH PRODUCTS
// ======================================

searchToggle.addEventListener("click", function() {

    searchContainer.classList.toggle("active");

    if (searchContainer.classList.contains("active")) {
        searchInput.focus();
    }

});

searchInput.addEventListener("input", displayProducts);


// ======================================
// SORT PRODUCTS
// ======================================

sortProducts.addEventListener("change", displayProducts);


// ======================================
// MOBILE MENU
// ======================================

menuToggle.addEventListener("click", function() {

    navbar.classList.toggle("active");

});

navbar.addEventListener("click", function(event) {

    if (event.target.tagName === "A") {
        navbar.classList.remove("active");
    }

});


// ======================================
// CHECKOUT DEMO
// ======================================

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) return;

    alert(
        "Thank you for shopping with SHOPORA! " +
        "Your cart is ready for checkout. " +
        "We will build the payment system next."
    );

});


// ======================================
// NEWSLETTER DEMO
// ======================================

document.getElementById("newsletterForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    alert("Thank you for subscribing: " + email);

    this.reset();

});


// ======================================
// INITIALIZE WEBSITE
// ======================================

displayCategories();

displayProducts();

updateCart();

console.log("SHOPORA website loaded successfully!");