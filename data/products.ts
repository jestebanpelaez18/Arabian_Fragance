export type Product = {
    id: string;
    slug: string;
    name: string;
    price: number;           
    image?: string | null;   
    gender: "women" | "men" | "unisex";
    bestSeller?: boolean;
    stripe_price_id?: string; 
  };
  
  export const PRODUCTS: Product[] = [
    {
      id: "p1",
      slug: "desert-rose",
      name: "Desert Rose",
      price: 55,
      image: "/products/desert-rose.jpg",
      gender: "women",
      bestSeller: true,
      stripe_price_id: "price_xxx",
    },
    {
      id: "p2",
      slug: "golden-sands",
      name: "Golden Sands",
      price: 65,
      image: "/products/golden-sands.jpg",
      gender: "men",
      bestSeller: false,
      stripe_price_id: "price_xxx",
    },
    {
      id: "p3",
      slug: "rose-of-dubai",
      name: "Rose of Dubai",
      price: 75,
      image: "/products/rose-of-dubai.jpg",
      gender: "unisex",
      bestSeller: true,
      stripe_price_id: "price_xxx",
    },
  ];
  