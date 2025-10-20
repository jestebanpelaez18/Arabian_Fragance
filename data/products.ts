export type ProductStatus = "draft" | "active";

export type Gender = "women" | "men" | "unisex";

export type Note =
  | "Woody"
  | "Floral"
  | "Amber"
  | "Spice"
  | "Musk"
  | "Citrus"
  | "Sweet"
  | "Fresh"
  | "Fruity"
  | "Aquatic"
  | "Gourmand"
  | "Earthy"
  | "Herbal"
  | "Powdery"
  | "Leather"
  | "Tobacco"
  | "Vanilla"
  | "Oud"
  | "Smoky";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string | null;
  images?: string[];
  gender: "women" | "men" | "unisex";
  notes?: Note[];
  description?: string;
  pyramid?: {
    top?: string[];
    heart?: string[];
    base?: string[];
  };
  ingredients?: string;
  bestSeller?: boolean;
  sku?: string;
  volumeMl?: number;
  stock?: number;
  stripe_price_id?: string;
  status?: ProductStatus;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "honey-musk",
    name: "Honey Musk",
    price: 65,
    image: "/catalog/Bottle_2.png",
    gender: "women",
    notes: ["Amber", "Musk", "Sweet", "Vanilla", "Tobacco"],
    description:
      "Honey Musk is a captivating blend of golden honey, sensual musk, and creamy vanilla wrapped in a warm amber glow. This luxurious fragrance opens with luminous bergamot and honey accords, revealing a heart of jasmine, tobacco, and subtle spices. As it settles, notes of oud and musk create a deep, lasting trail that exudes elegance and confidence. Perfect for those who desire a sweet yet sophisticated scent that lingers throughout the day.",
    pyramid: {
      top: ["Bergamot", "Honey Accord"],
      heart: ["Jasmine", "Tobacco", "Warm Spices"],
      base: ["Vanilla", "Musk", "Oud", "Amber"],
    },
    ingredients:
      "Alcohol Denat, Parfum, Pogostemon Cablin Oil, Citrus Aurantium Bergamia Peel Oil, Citrus Limon Peel Oil, Benzyl Benzoate, Coumarin, Limonene, Vanillin, Linalyl Acetate, Linalool, Beta-Caryophyllene, Pinene, Pelargonium Graveolens Flower Oil, Citral, Citronellol, Terpineol, Rose Ketones, Eugenol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 100,
    stock: 40,
    status: "active",
  },
  {
    id: "p2",
    slug: "oud-hawa",
    name: "Oud Hawa",
    price: 65,
    image: "/catalog/Bottle_3.png",
    gender: "women",
    notes: ["Oud", "Woody", "Leather", "Musk", "Citrus"],
    description:
      "Oud Hawa, meaning ‘Oud Eve’, celebrates the essence of the first woman — graceful, bold, and timeless. This refined fragrance opens with a fresh burst of citrus and warm spices, evolving into a heart of smooth oud and soft woods. Hints of leather and musk create a sensual depth, balanced by powdery undertones that linger elegantly on the skin. A perfect harmony of strength and femininity wrapped in the allure of oud.",
    pyramid: {
      top: ["Lemon", "Pink Pepper", "Cardamom"],
      heart: ["Oud", "Cedarwood", "Leather"],
      base: ["Musk", "Amber", "Powdery Notes", "Tonka Bean"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citral, Coumarin, Geraniol, Cinnamal, Benzyl Benzoate, Eugenol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p3",
    slug: "jamila",
    name: "Jamila",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "women",
    notes: ["Floral", "Citrus", "Musk", "Woody", "Sweet"],

    description:
      "Jamila, meaning ‘Beautiful’, is a radiant fragrance that embodies elegance and grace through its delicate balance of citrus, white florals, and soft musk. It opens with a sparkling burst of bergamot and green notes, revealing a romantic heart of rose and jasmine. The base of warm woods and powdery musk creates a lasting impression of refined beauty and timeless femininity. Perfect for those who adore fresh, floral scents with a luxurious touch.",

    pyramid: {
      top: ["Bergamot", "Green Notes", "Pink Pepper"],
      heart: ["Rose", "Jasmine", "White Flowers"],
      base: ["Musk", "Cedarwood", "Amber", "Powdery Notes"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Benzyl Alcohol, Citral, Farnesol, Eugenol",

    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p4",
    slug: "rose-dalia",
    name: "Rose Dalia",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "women",
    notes: ["Floral", "Vanilla", "Musk", "Woody"],

    description:
      "Rose Dalia, meaning ‘Flower of All Flowers’, is a graceful and romantic fragrance that blends the timeless beauty of rose with the comforting sweetness of vanilla. It opens with a soft citrus sparkle that brightens the petals of rose and jasmine, resting on a warm base of musk and woods. Elegant, powdery, and irresistibly feminine, Rose Dalia captures the essence of pure floral perfection.",

    pyramid: {
      top: ["Citrus Zest", "Rose Petals"],
      heart: ["Rose", "Jasmine", "Vanilla Orchid"],
      base: ["Musk", "Sandalwood", "Powdery Notes"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Benzyl Alcohol, Citral, Farnesol, Eugenol",

    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p5",
    slug: "amber-amber",
    name: "Amber Amber",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "women",
    notes: ["Woody", "Amber", "Sweet", "Vanilla", "Spice"],
    description:
      "A decadent blend of cherry and creamy vanilla wrapped in warm woods and amber. The fragrance opens with a juicy cherry sparkle and a hint of spice, unfolding into a velvety heart of vanilla cream, heliotrope, and almond. A balsamic base of sandalwood, benzoin, and tonka bean creates a smooth, comforting trail with a powdery finish. Perfect for those who love sweet, cozy perfumes with a refined, woody depth.",
    pyramid: {
      top: ["Cherry", "Bergamot", "Pink Pepper"],
      heart: ["Vanilla Cream", "Heliotrope", "Almond", "Cinnamon"],
      base: ["Sandalwood", "Benzoin", "Tonka Bean", "Amber", "Cashmere Musk"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Benzyl Salicylate, Citral, Geraniol, Eugenol",
    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p6",
    slug: "oud-sharif",
    name: "Oud Sharif",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "men",
    notes: ["Oud", "Woody", "Amber", "Leather", "Spice"],
    description:
      "Oud Sharif captures the essence of nobility and power through a refined balance of tobacco, leather, and precious oud. The fragrance opens with a vibrant blend of aromatic spices and amber, leading into a heart of smoky tobacco wrapped in warm woods. Its deep base of oud, leather, and balsamic resins leaves a commanding yet sophisticated trail — a scent crafted for the modern gentleman of strength and distinction.",
    pyramid: {
      top: ["Black Pepper", "Cardamom", "Amber"],
      heart: ["Tobacco", "Cedarwood", "Leather", "Oud"],
      base: ["Patchouli", "Labdanum", "Musk", "Tonka Bean", "Oud Accord"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Cinnamal, Benzyl Benzoate, Citral, Geraniol, Eugenol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p7",
    slug: "colosseum",
    name: "Colosseum",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "men",
    notes: ["Leather", "Woody", "Oud", "Amber", "Spice"],

    description:
      "Colosseum, inspired by the valor of ancient gladiators, is a powerful and commanding fragrance that unites the strength of leather, tobacco, and oud. It opens with fresh and aromatic spices, leading into a bold heart of smoky woods and warm amber. The base reveals deep notes of leather and balsamic resins, leaving a trail that speaks of courage, dominance, and timeless masculinity.",

    pyramid: {
      top: ["Black Pepper", "Cardamom", "Aromatic Herbs"],
      heart: ["Leather", "Tobacco", "Oud"],
      base: ["Amber", "Woody Notes", "Balsamic Resins", "Musk"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",

    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p8",
    slug: "oud-najah",
    name: "Oud Najah",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "men",
    notes: ["Oud", "Amber", "Floral", "Woody", "Musk"],

    description:
      "Oud Najah, meaning ‘Success and Achievement’, is a refined fragrance that symbolizes triumph and elegance. The scent opens with warm spices and delicate rose petals, revealing a heart of rich oud and amber. Patchouli and balsamic woods add depth and sophistication, while soft musk leaves a smooth, confident trail. A luxurious composition for those who embody ambition, grace, and accomplishment.",

    pyramid: {
      top: ["Saffron", "Rose", "Warm Spices"],
      heart: ["Oud", "Amber", "Patchouli"],
      base: ["Balsamic Woods", "Musk", "Powdery Notes", "Sandalwood"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Eugenol",

    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p9",
    slug: "atlas-aswad",
    name: "Atlas Aswad",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "men",
    notes: ["Amber", "Smoky", "Woody", "Oud", "Tobacco"],

    description:
      "Atlas Aswad, inspired by the strength and majesty of the mountains, is a dark and captivating fragrance that embodies power and sophistication. Opening with earthy green notes and warm spices, it reveals a deep heart of oud, tobacco, and smoky resins. The base is enriched with amber and balsamic woods, leaving a bold, hypnotic trail that lingers with timeless confidence. A masterpiece for those who command presence and respect.",

    pyramid: {
      top: ["Green Notes", "Cannabis Accord", "Warm Spices"],
      heart: ["Oud", "Tobacco", "Smoky Woods"],
      base: ["Amber", "Balsamic Resins", "Sandalwood", "Tonka Bean"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",

    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p10",
    slug: "shajaa",
    name: "Shajaa",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "men",
    notes: ["Woody", "Amber", "Oud", "Vanilla", "Spice"],
    description:
      "Shajaa embodies courage and strength through a bold fusion of warm spices, smoky woods, and rich oud. The fragrance opens with a burst of fresh spices and amber warmth, revealing a powerful heart of oud and vanilla that radiates depth and confidence. Its base of sandalwood, balsamic resins, and soft musk leaves a lingering trail of sophistication and fearlessness. A truly majestic scent for those who dare to stand out.",
    pyramid: {
      top: ["Cardamom", "Saffron", "Bergamot"],
      heart: ["Oud", "Vanilla", "Amber"],
      base: ["Sandalwood", "Balsamic Resins", "Musk", "Tonka Bean"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Linalool, Limonene, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Eugenol, Geraniol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p11",
    slug: "oud-crimson",
    name: "Oud Crimson",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Oud", "Amber", "Floral", "Leather", "Spice"],
    description:
      "Oud Crimson fuses the fiery elegance of saffron with velvety rose and dark oud. A luminous, slightly metallic opening unfolds into a warm heart of rose, leather, and spice, while amber and musk create a deep, long-lasting trail. Sophisticated and bold, this composition is crafted for those who want a modern oriental signature with power and refinement.",
    pyramid: {
      top: ["Saffron", "Pink Pepper", "Metallic Accord"],
      heart: ["Rose", "Oud", "Leather"],
      base: ["Amber", "Musk", "Tobacco", "Sandalwood"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Cinnamal, Benzyl Benzoate, Benzyl Alcohol, Citral, Eugenol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p12",
    slug: "divane-rüh",
    name: "Divane Rüh",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Leather", "Oud", "Vanilla", "Amber", "Smoky"],
    description:
      "Divane Ruh, meaning ‘Passionate Soul’, is a bold and sensual fragrance where smoky leather intertwines with the depth of oud and the softness of vanilla. It opens with a dark, mysterious aura, revealing a heart of rich resins and warm spices. The base lingers with creamy vanilla and smooth amber, leaving an addictive trail of intensity and allure. A scent for those who embrace their inner fire and fearless spirit.",
    pyramid: {
      top: ["Saffron", "Incense", "Leather Accord"],
      heart: ["Oud", "Vanilla", "Patchouli"],
      base: ["Amber", "Smoky Woods", "Tonka Bean", "Musk"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",
    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p13",
    slug: "amor",
    name: "Amor",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Amber", "Musk", "Floral", "Woody"],

    description:
      "Amor captures the awakening of the heart — that moment when warmth, sweetness, and desire intertwine. This enchanting fragrance opens with soft spices and golden honey, unfolding into a tender heart of white florals and creamy woods. The base of amber and musk embraces the skin with a comforting sensuality, leaving a gentle yet captivating trail. A fragrance that speaks the language of love and emotion.",

    pyramid: {
      top: ["Honey", "Soft Spices", "Fruity Notes"],
      heart: ["White Florals", "Woody Notes", "Amber"],
      base: ["Musk", "Vanilla", "Powdery Notes", "Animalic Accord"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Citronellol, Geraniol, Cinnamal, Citral, Eugenol",

    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p14",
    slug: "unico",
    name: "Unico",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Vanilla", "Amber", "Sweet", "Floral", "Spice"],
    description:
      "Unico, meaning ‘The One and Only’, is a tender yet powerful fragrance that celebrates love as both a feeling and a choice. It opens with bright citrus and warm cinnamon, blending into a heart of creamy vanilla and delicate white florals. The base of amber and soft musk adds depth and sensuality, creating an unforgettable scent that wraps the skin in warmth, comfort, and devotion. A tribute to the beauty of true connection.",
    pyramid: {
      top: ["Citrus Zest", "Cinnamon", "Aromatic Spices"],
      heart: ["Vanilla", "White Florals", "Amber"],
      base: ["Musk", "Powdery Notes", "Tonka Bean", "Warm Woods"]
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p15",
    slug: "eterno",
    name: "Eterno",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Woody", "Vanilla", "Amber", "Musk", "Sweet"],

    description:
      "Eterno is a timeless fragrance that embodies the essence of everlasting love — deep, warm, and infinite. It opens with smooth spices and creamy vanilla, unveiling a heart of amber and woods that radiates serenity and strength. The base of musk, tonka bean, and balsamic notes leaves a soft yet enduring trail, symbolizing a love that knows no end. Elegant, comforting, and eternal.",
    
    pyramid: {
      top: ["Warm Spices", "Vanilla", "Nutty Accord"],
      heart: ["Amber", "Woody Notes", "Balsamic Resins"],
      base: ["Musk", "Tonka Bean", "Powdery Notes", "Sweet Amber"]
    },
    
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",
    
    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p16",
    slug: "oud-dhahab",
    name: "Oud Dhahab",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Woody", "Floral", "Fruity", "Sweet", "Citrus"],

    description:
      "Oud Dhahab, meaning ‘The Friendship of Oud and Gold’, is a radiant and luxurious fragrance that blends the brightness of citrus and fruit with the depth of oud and woods. Opening with sparkling bergamot and juicy pear, it unfolds into a heart of golden florals and soft iris. The base reveals warm woody notes and a powdery sweetness that lingers with graceful sophistication. A golden harmony of freshness and opulence.",

    pyramid: {
      top: ["Bergamot", "Pear", "Pink Pepper"],
      heart: ["Iris", "Yellow Florals", "Rose"],
      base: ["Oud", "Cedarwood", "Powdery Notes", "Amber"],
    },

    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Benzyl Alcohol, Citral, Farnesol, Eugenol",

    bestSeller: true,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
  {
    id: "p17",
    slug: "oud-eden",
    name: "Oud Eden",
    price: 75,
    image: "/catalog/Bottle_3.png",
    gender: "unisex",
    notes: ["Oud", "Fruity", "Amber", "Leather", "Sweet"],

    description:
      "Oud Eden, meaning ‘Paradise’, is an exotic and captivating fragrance that unites the richness of oud with the vibrancy of tropical fruits. It opens with a juicy burst of passion fruit and warm spices, revealing a heart of leather and amber that adds depth and sensuality. The base of woody notes and sweet musk leaves a smooth, irresistible trail — a heavenly blend of warmth, elegance, and indulgence.",
    pyramid: {
      top: ["Passion Fruit", "Pineapple", "Warm Spices"],
      heart: ["Oud", "Leather", "Amber"],
      base: ["Woody Notes", "Sweet Musk", "Vanilla", "Tonka Bean"],
    },
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Limonene, Linalool, Coumarin, Benzyl Benzoate, Cinnamal, Citral, Geraniol, Eugenol",
    bestSeller: false,
    sku: "AF-DR-50",
    volumeMl: 50,
    stock: 40,
    status: "active",
  },
];
