const productosLista = [
  {
    id: 1,
    nombre: "Arete Oro",
    categoria: "oro",
    precio: 300,
    fabricante: "Gold Factory",
    detalle:
      "Elegante arete de oro puro, diseñado por Gold Factory. Perfecto para añadir un toque sofisticado a cualquier ocasión.",
    imagen: "./img/arooro1.jpg",
  },
  {
    id: 2,
    nombre: "Aro Cadena de Oro",
    categoria: "oro",
    precio: 330,
    fabricante: "Gold Factory",
    detalle:
      "Hermoso aro de cadena elaborado en oro de alta calidad por Gold Factory.",
    imagen: "./img/arooro2.jpg",
  },
  {
    id: 3,
    nombre: "Aro Triangulo de Oro",
    categoria: "oro",
    precio: 330,
    fabricante: "Golden Boys",
    detalle:
      "Moderno aro con diseño de triángulo en oro fino, creado por Golden Boys",
    imagen: "./img/arooro3.jpg",
  },
  {
    id: 4,
    nombre: "Aro BIG Rose",
    categoria: "rose",
    precio: 380,
    fabricante: "Golden Boys",
    detalle:
      "Aros grandes en oro rosa con diseño elegante, ideales para destacar en cualquier ocasión.",
    imagen: "./img/aroororosa1.jpg",
  },
  {
    id: 5,
    nombre: "Aro Delicate Rose",
    categoria: "rose",
    precio: 270,
    fabricante: "Gold Factory",
    detalle:
      "Aros delicados en oro rosa, perfectos para un estilo sutil y sofisticado",
    imagen: "./img/aroororosa2.jpg",
  },
  {
    id: 6,
    nombre: "Aro detalles dior",
    categoria: "rose",
    precio: 450,
    fabricante: "Goldwin S.A.",
    detalle:
      "Aros en oro rosa con detalles inspirados en la elegancia de Dior, un toque de lujo atemporal.",
    imagen: "./img/aroororosa3.jpg",
  },
  {
    id: 7,
    nombre: "Aro BIG Rose",
    categoria: "plata",
    precio: 120,
    fabricante: "Plata o Plomo srl",
    detalle:
      "Aros grandes en oro rosa con diseño elegante, ideales para destacar en cualquier ocasión.",
    imagen: "./img/aroplata1.jpg",
  },
  {
    id: 8,
    nombre: "Aro Delicate Rose",
    categoria: "plata",
    precio: 120,
    fabricante: "Gold Factory",
    detalle:
      "Aros delicados en oro rosa, perfectos para un estilo sutil y sofisticado",
    imagen: "./img/aroplata2.jpg",
  },
  {
    id: 9,
    nombre: "Aro detalles dior",
    categoria: "plata",
    precio: 195,
    fabricante: "Plata o Plomo srl.",
    detalle:
      "Aros en oro rosa con detalles inspirados en la elegancia de Dior, un toque de lujo atemporal.",
    imagen: "./img/aroplata3.jpg",
  },
  {
    id: 10,
    nombre: "Aro de Diamante",
    categoria: "premiun",
    precio: 450,
    fabricante: "DIAMONDS VELVET",
    detalle:
      "Aro de diamante Premium de DIAMONDS VELVET, símbolo de lujo y elegancia.",
    imagen: "./img/aropremiun1.jpg",
  },
  {
    id: 11,
    nombre: "Ultimatum Diamanto",
    categoria: "premiun",
    precio: 400,
    fabricante: "DIAMONDS VELVET",
    detalle:
      "Ultimatum Diamanto: Producto Premium de Diamantes de Terciopelo, que destaca por su lujo y exclusividad",
    imagen: "./img/aropremiun2.jpg",
  },
  {
    id: 12,
    nombre: "ARO BEAUTY QUEEN",
    categoria: "premiun",
    precio: 600,
    fabricante: "Gold Factory",
    detalle:
      "ARO BEAUTY QUEEN: Un elegante accesorio Premium de Gold Factory, diseñado para resaltar tu belleza con un toque de lujo",
    imagen: "./img/aropremiun3.jpg",
  },
  {
    id: 13,
    nombre: "El Cadenon",
    categoria: "oro",
    precio: 800,
    fabricante: "Golden Boys",
    detalle:
      "El Cadenon de Golden Boys es un robusto collar de oro, diseñado para quienes aprecian la elegancia y durabilidad de las piezas clásicas",
    imagen: "./img/oro1.jpg",
  },
  {
    id: 14,
    nombre: "Rayo dorado",
    categoria: "oro",
    precio: 650,
    fabricante: "Golden Boys",
    detalle:
      "El Rayo dorado de Golden Boys es un collar de oro con un diseño moderno y audaz, ideal para resaltar con un toque único",
    imagen: "./img/oro2.jpg",
  },
  {
    id: 15,
    nombre: "Holy Cruz",
    categoria: "oro",
    precio: 790,
    fabricante: "Gold Factory",
    detalle:
      "La Holy Cruz de Gold Factory es una cruz de oro que combina estilo y simbolismo, perfecta para quienes buscan una pieza con significado",
    imagen: "./img/oro3.jpg",
  },
  {
    id: 16,
    nombre: "Rosemary",
    categoria: "rose",
    precio: 1000,
    fabricante: "Golden Boys",
    detalle:
      "El Rosemary de Golden Boys es una sofisticada pieza en oro rosa, ideal para quienes buscan un diseño elegante con un toque moderno",
    imagen: "./img/ororose1.jpg",
  },
  {
    id: 17,
    nombre: "Golder Hearth",
    categoria: "rose",
    precio: 850,
    fabricante: "Gold Factory",
    detalle:
      "El Golder Hearth de Gold Factory combina la calidez del oro rosa con un diseño romántico, perfecto para destacar en cualquier ocasión",
    imagen: "./img/ororose2.jpg",
  },
  {
    id: 18,
    nombre: "Lotus Flower",
    categoria: "rose",
    precio: 990,
    fabricante: "Gold Factory",
    detalle:
      "La Lotus Flower de Gold Factory es una joya inspirada en la naturaleza, hecha en oro rosa, que destaca por su delicadeza y belleza simbólica.",
    imagen: "./img/ororose3.jpg",
  },
  {
    id: 19,
    nombre: "Estrella del Sur",
    categoria: "plata",
    precio: 500,
    fabricante: "Golden Boys",
    detalle:
      "La Estrella del Sur de Golden Boys es una pieza en plata pura, diseñada con líneas elegantes que evocan brillo y distinción.",
    imagen: "./img/plata1.jpg",
  },
  {
    id: 20,
    nombre: "ATOMIC PLATE",
    categoria: "plata",
    precio: 750,
    fabricante: "DIAMONDS VELVET",
    detalle:
      "El ATOMIC PLATE de Diamonds Velvet es un accesorio de plata moderna, ideal para quienes buscan un diseño contemporáneo",
    imagen: "./img/plata2.jpg",
  },
  {
    id: 21,
    nombre: "Snake",
    categoria: "plata",
    precio: 900,
    fabricante: "Plata o Plomo srl",
    detalle:
      "El Snake de Plata o Plomo SRL es una joya audaz en plata, con un diseño inspirado en la fuerza y la fluidez de una serpiente.",
    imagen: "./img/plata3.jpg",
  },
  {
    id: 22,
    nombre: "Black Widow",
    categoria: "premiun",
    precio: 2500,
    fabricante: "Gold Factory",
    detalle:
      "La Black Widow de Gold Factory es una joya exclusiva de diseño audaz y sofisticado, ideal para quienes buscan distinción y lujo.",
    imagen: "./img/premiun1.jpg",
  },
  {
    id: 23,
    nombre: "Diamante en Bruto",
    categoria: "premiun",
    precio: 3750,
    fabricante: "DIAMONDS VELVET",
    detalle:
      "El Diamante en Bruto de Diamonds Velvet es una pieza Premium que combina elegancia y originalidad, destacando la belleza del diseño puro y sin pulir",
    imagen: "./img/premiun2.jpg",
  },
  {
    id: 24,
    nombre: "Gota en el Desierto",
    categoria: "premiun",
    precio: 2900,
    fabricante: "DIAMOND VELVET",
    detalle:
      "La Gota en el Desierto de Diamonds Velvet es una creación única que refleja rareza y sofisticación, perfecta para momentos inolvidables.",
    imagen: "./img/premiun3.jpg",
  },
];

const divideProductsInParts = (size) => {
  const partes = [];
  for (let i = 0; i < productosLista.length; i += size) {
    partes.push(productosLista.slice(i, i + size));
  }
  return partes;
};

const appstate = {
  products: divideProductsInParts(4),
  productLimit: divideProductsInParts(4).length,
  currentProductsIndex: 0,
  activeFilter: null,
};
