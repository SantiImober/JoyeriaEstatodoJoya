// MANIPULACIÓN DEL DOM
const nav = document.querySelector("#nav");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#abrir");
const productsContainer = document.querySelector(".products-container");
const showMoreButtons = document.querySelector(".btn-load");
const categoriesConteiner = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

// MENU HAMBURGUESA
abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

// CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const savecart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const createProductsTemplate = (product) => {
  const { id, nombre, categoria, precio, fabricante, detalle, imagen } =
    product;
  return `<div class="product">
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

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

changeBtnActiveState();

const changeFilterState = (btn) => {
  appstate.activeFilter = btn.dataset.category;
  changeBtnActiveState(appstate.activeFilter);
  setshowMoreVisibility(appstate.activeFilter);
};

const applyFilter = ({ target }) => {
  if (!isInactiveFilter(target)) {
    return;
  }

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
  const filteredProducts = productosLista.filter((product) => {
    return product.categoria === appstate.activeFilter;
  });
  renderProducts(filteredProducts);
};
const init = () => {
  const { products, currentProductsIndex, productLimit } = appstate;

  renderProducts(products[currentProductsIndex]);

  if (productLimit <= 1) {
    showMoreButtons.style.display = "none";
  }

  showMoreButtons.addEventListener("click", showMoreProducts);

  categoriesConteiner.addEventListener("click", applyFilter);
};

init();
