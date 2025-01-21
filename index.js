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
const total = document.querySelector(".total-cart");
const cartBubble = document.querySelector(".contador");
const buyBtn = document.querySelector(".buy-disabled");
const deleteBtn = document.querySelector(".buy-vaciar");
const successModal = document.querySelector(".add-modal");
const formMessage = document.getElementById("formMessage");
const paisSelect = document.getElementById("pais");
const envioMensaje = document.getElementById("envioMensaje");

// COSTO DE ENVIOS
const shippingRates = [
  { country: "Argentina", cost: 50 },
  { country: "México", cost: 300 },
  { country: "España", cost: 350 },
  { country: "Estados Unidos", cost: 450 },
  { country: "Brasil", cost: 120 },
  { country: "Uruguay", cost: 70 },
  { country: "Resto de Latam", cost: 250 },
];

shippingRates.forEach((rate) => {
  const option = document.createElement("option");
  option.value = rate.cost;
  option.textContent = rate.country;
  paisSelect.appendChild(option);
});

paisSelect.addEventListener("change", () => {
  const selectedCost = paisSelect.value;
  if (selectedCost) {
    envioMensaje.textContent = `El costo de envío a ${paisSelect.selectedOptions[0].text} es de $${selectedCost} USD.`;
  } else {
    envioMensaje.textContent = "Selecciona un país para ver el costo de envío.";
  }
});

// FORMULARIO
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const consulta = document.getElementById("consulta").value.trim();

    if (nombre && correo && telefono && consulta) {
      formMessage.textContent =
        "Su mensaje ha sido enviado con éxito. En breve nos contactaremos con usted.";
      formMessage.className = "success";
      formMessage.classList.remove("hidden");
      document.getElementById("contactForm").reset();
    } else {
      formMessage.textContent = "Error: Faltan completar datos.";
      formMessage.className = "error";
      formMessage.classList.remove("hidden");
    }
  });

// MENÚ HAMBURGUESA
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
  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCart = () => {
  cart = [];
  updateCartState();
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
          <p>Precio ${precio} USD</p>
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

const showMoreProducts = () => {
  const { products, currentProductsIndex, productLimit } = appstate;

  if (currentProductsIndex < productLimit) {
    appstate.currentProductsIndex += 1;
    renderProducts(products[appstate.currentProductsIndex]);
  }

  if (appstate.currentProductsIndex >= productLimit - 1) {
    showMoreButtons.style.display = "none";
  }
};

const renderProducts = (productsList) => {
  productsContainer.innerHTML += productsList
    .map(createProductsTemplate)
    .join("");
};

// CATEGORÍAS Y FILTROS
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

const changeFilterState = (btn) => {
  appstate.activeFilter = btn.dataset.category;
  changeBtnActiveState(appstate.activeFilter);
};

const applyFilter = ({ target }) => {
  if (!isInactiveFilter(target)) return;

  changeFilterState(target);
  productsContainer.innerHTML = "";

  if (appstate.activeFilter) {
    renderedFilteredProducts();
    appstate.currentProductsIndex = 0;
  } else {
    renderProducts(appstate.products[0]);
    appstate.currentProductsIndex = 0;
  }

  checkShowMoreButtonVisibility();
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
  checkShowMoreButtonVisibility();
};

const checkShowMoreButtonVisibility = () => {
  const filteredProducts = appstate.activeFilter
    ? productosLista.filter(
        (product) => product.categoria === appstate.activeFilter
      )
    : productosLista;

  if (filteredProducts.length <= appstate.productLimit) {
    showMoreButtons.style.display = "none";
  } else {
    showMoreButtons.style.display = "block";
  }
};

// CARRITO Y CONTADOR
const createCartProductsTemplate = (cartProduct) => {
  const { id, nombre, imagen, precio, cantidad } = cartProduct;
  return `<div class="cart-item">
      <img src="${imagen}" alt="Producto del carrito" />
      <div class="item-info">
        <h3 class="item-title">${nombre}</h3>
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
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductsTemplate).join("");
};

const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + cur.precio * cur.cantidad, 0);
};

const showCartTotal = () => {
  const totalAmount = getCartTotal();
  total.innerHTML = `${totalAmount.toFixed(2)} USD`;
};

const renderCartBubble = () => {
  const totalQuantity = cart.reduce((acc, cur) => acc + cur.cantidad, 0);
  cartBubble.textContent = totalQuantity;
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
  if (!e.target.classList.contains("btn-add")) return;

  const product = createProductData(e.target.dataset);
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].cantidad += 1;
    showModalSuccess("Se agregó una unidad del producto al carrito");
  } else {
    cart.push({ ...product, cantidad: 1 });
    showModalSuccess("El producto se ha agregado al carrito");
  }

  updateCartState();
};

const showModalSuccess = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

const createProductData = (product) => {
  const { id, nombre, precio, imagen } = product;
  return { id, nombre, precio, imagen };
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

const handleMinusBtnEvent = (id) => {
  const productIndex = cart.findIndex((item) => item.id === id);
  if (cart[productIndex].cantidad === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      cart.splice(productIndex, 1);
      updateCartState();
    }
    return;
  }
  cart[productIndex].cantidad -= 1;
  updateCartState();
};

const handlePlusBtnEvent = (id) => {
  const productIndex = cart.findIndex((item) => item.id === id);
  cart[productIndex].cantidad += 1;
};

const completeBuy = () => {
  if (!cart.length) return;
  if (window.confirm("¿Desea completar su compra?")) {
    cart = [];
    updateCartState();
    alert("¡Gracias por su compra!");
  }
};

const deleteCart = () => {
  if (!cart.length) return;
  if (window.confirm("¿Desea vaciar el carrito?")) {
    cart = [];
    updateCartState();
  }
};

// INICIALIZACIÓN
const init = () => {
  renderProducts(appstate.products[appstate.currentProductsIndex]);
  showMoreButtons.addEventListener("click", showMoreProducts);
  categoriesConteiner.addEventListener("click", applyFilter);
  handleCartEvents();
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  renderCartBubble();
  updateCartState();
};

init();
