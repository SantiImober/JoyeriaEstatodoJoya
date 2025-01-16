// MANIPULACIÓN DEL DOM
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const productsContainer = document.querySelector(".products-container");
const showMoreButtons = document.querySelector(".btn-load");
const categoriesConteiner = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const cartIcon = document.querySelector(".carro-compra img");
const cartMenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const closeCartButton = document.querySelector(".buy-vaciar");
const closeButton = document.querySelector(".btn-close-cart");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const cartBubble = document.querySelector(".contador");
const buyBtn = document.querySelector(".buy-disabled");
const deleteBtn = document.querySelector(".buy-vaciar");
const successModal = document.querySelector(".add-modal");

// MENU HAMBURGUESA
abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !abrir.contains(e.target)) {
    nav.classList.remove("visible");
  }
});

// FUNCIONES DEL CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCart = () => {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";
  document.querySelector(".contador").textContent = "0";
  document.querySelector(".total-cart").textContent = "0 USD";
};

const openCart = () => {
  cartMenu.classList.add("open-cart");
  overlay.classList.add("active");
};

const closeCart = () => {
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("active");
};

// EVENTOS DEL CARRITO
const handleCartEvents = () => {
  cartIcon.addEventListener("click", openCart);

  overlay.addEventListener("click", closeCart);

  closeButton.addEventListener("click", closeCart);

  closeCartButton.addEventListener("click", clearCart);
};

// MANIPULACIÓN DE PRODUCTOS
const createProductsTemplate = (product) => {
  const { id, nombre, categoria, precio, fabricante, detalle, imagen } =
    product;
  return `
    <div class="product">
      <img src="${imagen}" alt="${nombre}" />
      <div class="product-info">
        <div class="product-top">
          <h2>${nombre}</h2>
          <p>${detalle}</p>
        </div>
        <div class="product-mid">
          <p>${categoria}</p>
          <p>${fabricante}</p>
        </div>
        <div class="product-bott">
          <p>Id ${id}</p>
          <p>Precio ${precio} usd</p>
        </div>
        <button class="btn-add"
          data-id=${id}
          data-nombre="${nombre}"
          data-precio="${precio}"
          data-imagen="${imagen}">
          Agregar
        </button>
      </div>
    </div>`;
};

const renderProducts = (productsList) => {
  productsContainer.insertAdjacentHTML(
    "beforeend",
    productsList.map(createProductsTemplate).join("")
  );
};

const showMoreProducts = () => {
  const { products, currentProductsIndex, productLimit } = appstate;

  if (currentProductsIndex < productLimit - 1) {
    appstate.currentProductsIndex += 1;
    renderProducts(products[appstate.currentProductsIndex]);
  }

  if (appstate.currentProductsIndex >= productLimit - 1) {
    showMoreButtons.style.display = "none";
  }
};

const setshowMoreVisibility = () => {
  if (!appstate.activeFilter) {
    showMoreButtons.style.display = "block";
  } else {
    showMoreButtons.style.display = "none";
  }
};

// FILTROS Y CATEGORÍAS
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
    } else {
      categoryBtn.classList.add("active");
    }
  });
};

changeBtnActiveState();

const changeFilterState = (btn) => {
  appstate.activeFilter = btn.dataset.category;
  changeBtnActiveState(appstate.activeFilter);
  setshowMoreVisibility(appstate.activeFilter);
};

const applyFilter = ({ target }) => {
  if (!isInactiveFilter(target)) return;

  changeFilterState(target);
  productsContainer.innerHTML = "";

  if (appstate.activeFilter) {
    renderedFilteredProducts();
    appstate.currentProductsIndex = 0;
    return;
  }
  renderProducts(appstate.products[0]);
};

const isInactiveFilter = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const renderedFilteredProducts = () => {
  const filteredProducts = productosLista.filter(
    (product) => product.categoria === appstate.activeFilter
  );
  renderProducts(filteredProducts);
};

const createCartProductsTemplate = (cartProduct) => {
  const { id, nombre, imagen, precio, cantidad } = cartProduct;
  return `<div class="cart-item">
      <img src="${imagen}" alt="Joya del carrito" />
      <div class="item-info">
        <h3 class="item-title">${nombre}</h3>
        <p class="item-bid">Current bid</p>
        <span class="item-price">${precio} USD</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id="${id}">-</span>
        <span class="item-quantity">${cantidad}</span>
        <span class="quantity-handler up" data-id="${id}">+</span>
      </div>
    </div>`;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empy-msg">No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductsTemplate).join("");
};

const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);
};

const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("nohabilitado");
  } else {
    btn.classList.remove("nohabilitado");
  }
};

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

const addProduct = (e) => {
  if (e.target.classList.contains("btn-add")) {
    return;
  }
  const product = createProductData(e.target.dataset);
};

const createProductData = (product) => {
  const { id, nombre, precio, imagen } = product;
  return { id, nombre, precio, imagen };
};

// INICIALIZACIÓN
const init = () => {
  const { products, currentProductsIndex, productLimit } = appstate;

  renderProducts(products[currentProductsIndex]);

  if (productLimit <= 1) {
    showMoreButtons.style.display = "none";
  }

  showMoreButtons.addEventListener("click", showMoreProducts);
  categoriesConteiner.addEventListener("click", applyFilter);
  handleCartEvents();

  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  renderCartBubble();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

init();
