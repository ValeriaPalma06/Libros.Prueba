import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cien Años de Soledad",
    category: "Ficción",
    description: "La obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía en Macondo.",
    price: 19990,
    offerPrice: 15990,
    stock: 12,
    image: "https://i5.walmartimages.cl/asr/6c97a6e8-8b3d-4137-8846-64662b4596b2.d1c0b85ca5cfbb1a13e56bc4bb7a952b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    isFeatured: true
  },
  {
    id: 2,
    name: "El Principito",
    category: "Infantil / Filosofía",
    description: "Un relato poético acompañado de ilustraciones hechas con acuarelas por el propio Saint-Exupéry.",
    price: 9990,
    stock: 25,
    image: "https://i5.walmartimages.cl/asr/3839ecc5-5619-44dc-88b7-3fa52e99603f.b08ff8a0aed06ec6ec3e843c83bbb87a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    isFeatured: true
  },
  {
    id: 3,
    name: "1984",
    category: "Ciencia Ficción",
    description: "Una novela distópica clásica sobre la vigilancia masiva y el control totalitario.",
    price: 14990,
    offerPrice: 11990,
    stock: 8,
    image: "https://www.antartica.cl/media/catalog/product/9/7/9789566165194_1_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    isFeatured: true
  },
  {
    id: 4,
    name: "Don Quijote de la Mancha",
    category: "Clásicos",
    description: "Las aventuras del famoso hidalgo don Quijote de la Mancha y su fiel escudero Sancho Panza.",
    price: 24990,
    stock: 5,
    image: "https://i5.walmartimages.cl/asr/7dedb5c6-07f5-4724-a1f7-c48f0fe6c3b6.46d011179473b23418f88c7e7fe30107.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
  },
  {
    id: 5,
    name: "Hábitos Atómicos",
    category: "Autoayuda",
    description: "Un método sencillo y comprobado para desarrollar buenos hábitos y romper los malos.",
    price: 18990,
    offerPrice: 16990,
    stock: 15,
    image: "https://www.tiendacopec.cl/cdn/shop/files/1_4c5ac577-5782-4e48-bef7-6422644118c4.jpg?v=1734526444&width=1200"
  },
  {
    id: 6,
    name: "Sapiens: De animales a dioses",
    category: "Historia",
    description: "Una breve historia de la humanidad desde la Edad de Piedra hasta la era moderna.",
    price: 21990,
    stock: 10,
    image: "https://i5.walmartimages.cl/asr/d31503bf-ad24-4ebe-b1ed-407704dd27b9.6e5f37c4f77b0802a97442369a059afe.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
  }
];