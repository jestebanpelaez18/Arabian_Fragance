import { i18n, type Locale } from "@/i18n-config";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type UiLabels = {
  navbar: {
    openMenu: string;
    mobileCloseMenu: string;
    mobileBack: string;
    mobileMenuTitle: string;
    mobileShopTitle: string;
    mobileLanguageTitle: string;
    language: string;
    perfumes: string;
    byCategory: string;
    byCollection: string;
    womenPerfumes: string;
    menPerfumes: string;
    unisexPerfumes: string;
    shopAll: string;
    luxuryCollection: string;
    premiumCollection: string;
    essentialCollection: string;
    oilsAttars: string;
    bathBody: string;
    home: string;
    discovery: string;
    houseOfArabian: string;
    featuredPerfumeAlt: string;
    search: string;
    openBag: string;
    homeAriaLabel: string;
    languageNames: Record<Locale, string>;
  };
  footer: {
    columns: FooterColumn[];
    brandCopy: string;
    allRightsReserved: string;
    newsletter: {
      joinList: string;
      description: string;
      emailPlaceholder: string;
      subscribeAria: string;
      subscribeTitle: string;
    };
    selectCurrency: string;
    logoAlt: string;
  };
  sections: {
    categoryShowcase: {
      womenTitle: string;
      womenSubtitle: string;
      womenAria: string;
      menTitle: string;
      menSubtitle: string;
      menAria: string;
      unisexTitle: string;
      unisexSubtitle: string;
      unisexAria: string;
      shopNow: string;
    };
    discover: {
      womenTab: string;
      menTab: string;
      unisexTab: string;
      viewAllPrefix: string;
    };
    quickNav: {
      newArrivals: string;
      bestSellers: string;
      luxuryCollection: string;
      premiumCollection: string;
      oudSignatures: string;
    };
    showroomSection: {
      leftImageAlt: string;
      rightImageAlt: string;
      label: string;
      heading: string;
      description: string;
      ctaLabel: string;
    };
    showroomHero: {
      imageAlt: string;
      title: string;
      ctaLabel: string;
    };
    invitationHero: {
      ctaLabel: string;
    };
    aboutDefaults: {
      imageAlt: string;
      eyebrow: string;
      title: string;
      description: string;
      ctaLabel: string;
    };
  };
  commerce: {
    breadcrumbs: string;
    cart: {
      addForFreeShipping: string;
      freeShippingSuffix: string;
      freeShippingUnlocked: string;
      productImageAltFallback: string;
      decreaseItemAriaPrefix: string;
      increaseItemAriaPrefix: string;
      removeItemAriaPrefix: string;
      remove: string;
      emptyTitle: string;
      emptyDescription: string;
      shopNow: string;
      bagTitle: string;
      subtotal: string;
      vatIncludedNote: string;
      checkout: string;
      checkoutLoading: string;
      checkoutError: string;
      closeCart: string;
      close: string;
      viewBag: string;
    };
    collection: {
      filtersSort: string;
      closeFilters: string;
      clearAll: string;
      close: string;
      sortBy: string;
      filterBy: string;
      bestSelling: string;
      priceLowToHigh: string;
      priceHighToLow: string;
      all: string;
      women: string;
      men: string;
      unisex: string;
      apply: string;
    };
    recommended: {
      title: string;
    };
    layeringGuide: {
      title: string;
      paragraphs: string[];
    };
    productDetails: {
      mainAccords: string;
      application: string;
      shipping: string;
      returns: string;
      layeringProductsTitle: string;
      perfumeLayeringDescription: string[];
      purchase: {
        addToBag: string;
        outOfStock: string;
        viewBag: string;
      };
      notes: {
        title: string;
        top: string;
        heart: string;
        base: string;
      };
    };
    pdpTabs: {
      descriptionTab: string;
      notesTab: string;
      keyNotes: string;
      ingredientsTab: string;
      packagingTab: string;
      policiesTab: string;
      top: string;
      heart: string;
      base: string;
    };
    searchOverlay: {
      inputPlaceholder: string;
      searching: string;
      noResultsFor: string;
      close: string;
      suggestions: string;
      minimum: string;
      error: string;
      results: string;
      retry: string;
      topProducts: string;
    };
    productHeader: {
      sameDayDispatch: string;
    };
  };
};

const uiLabels: Record<Locale, UiLabels> = {
  en: {
    navbar: {
      openMenu: "Open menu",
      mobileCloseMenu: "Close menu",
      mobileBack: "Back",
      mobileMenuTitle: "Menu",
      mobileShopTitle: "Shop",
      mobileLanguageTitle: "Language",
      language: "Language",
      perfumes: "Perfumes",
      byCategory: "By category",
      byCollection: "By collection",
      womenPerfumes: "Women's Perfumes",
      menPerfumes: "Men's Perfumes",
      unisexPerfumes: "Unisex Perfumes",
      shopAll: "Shop all",
      luxuryCollection: "The Luxury Collection",
      premiumCollection: "The Premium Collection",
      essentialCollection: "The Essential Collection",
      oilsAttars: "Oils & Attars",
      bathBody: "Bath & Body",
      home: "Home",
      discovery: "Discovery",
      houseOfArabian: "House of Arabian",
      featuredPerfumeAlt: "Featured perfume",
      search: "Search",
      openBag: "Open bag",
      homeAriaLabel: "Arabian Fragrance home",
      languageNames: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    footer: {
      columns: [
        {
          title: "Customer care",
          links: [
            { label: "Shipping", href: "/policies/shipping-policy" },
            { label: "Returns & refunds", href: "/policies/refund-policy" },
            { label: "FAQs", href: "/faq" },
            { label: "Terms & conditions", href: "/policies/terms-conditions" },
            { label: "Privacy policy", href: "/policies/privacy-policy" },
            { label: "Cookies policy", href: "/cookies" },
          ],
        },
        {
          title: "About",
          links: [
            { label: "Contact us", href: "/contact" },
            { label: "Brand profile", href: "/about" },
            { label: "Store", href: "/showroom" },
          ],
        },
        {
          title: "Social",
          links: [
            { label: "Instagram", href: "https://instagram.com/" },
            { label: "Facebook", href: "https://facebook.com/" },
            { label: "Pinterest", href: "https://pinterest.com/" },
          ],
        },
      ],
      brandCopy:
        "Arabian Fragrance is a contemporary perfumery house crafting evocative scents with ethically sourced ingredients. Explore signature blends, layered rituals and limited editions in-store or online.",
      allRightsReserved: "All rights reserved.",
      newsletter: {
        joinList: "Join the list",
        description:
          "Receive updates on new arrivals, exclusive events, and private releases.",
        emailPlaceholder: "Email address",
        subscribeAria: "Subscribe",
        subscribeTitle: "Subscribe",
      },
      selectCurrency: "Select currency",
      logoAlt: "Arabian Fragrance",
    },
    sections: {
      categoryShowcase: {
        womenTitle: "SHOP FOR HER",
        womenSubtitle: "Sensual florals blended with warm amber and soft oud.",
        womenAria: "Shop women fragrances",
        menTitle: "SHOP FOR HIM",
        menSubtitle: "Intense amber, deep woods and refined oriental spices.",
        menAria: "Shop men fragrances",
        unisexTitle: "UNISEX",
        unisexSubtitle:
          "Balanced compositions where rose, spice and oud unite.",
        unisexAria: "Shop unisex fragrances",
        shopNow: "Shop now",
      },
      discover: {
        womenTab: "WOMEN",
        menTab: "MEN",
        unisexTab: "UNISEX",
        viewAllPrefix: "View all",
      },
      quickNav: {
        newArrivals: "New Arrivals",
        bestSellers: "Best Sellers",
        luxuryCollection: "Luxury Collection",
        premiumCollection: "Premium Collection",
        oudSignatures: "Oud Signatures",
      },
      showroomSection: {
        leftImageAlt: "Arabian Fragrance showroom",
        rightImageAlt: "Showroom detail",
        label: "VISIT US",
        heading: "IN HELSINKI",
        description:
          "Experience the art of Arabian perfumery in person. Visit our Helsinki boutique to discover our rare ingredients and signature collections.",
        ctaLabel: "Our Shop",
      },
      showroomHero: {
        imageAlt: "Arabian Fragrance showroom interior",
        title: "SHOWROOM",
        ctaLabel: "Book a visit",
      },
      invitationHero: {
        ctaLabel: "Explore now",
      },
      aboutDefaults: {
        imageAlt: "Our story",
        eyebrow: "Savoir-Faire",
        title: "OUR STORY OF LUXURIOUS ARABIAN FRAGRANCES",
        description:
          "Born in Dubai, the heart of Arabian perfumery, our brand blends tradition and luxury to create unique fragrances that embody elegance and sophistication. Each scent is carefully crafted with exquisite ingredients, capturing the essence of Arabian perfume artistry and delivering an exclusive olfactory experience that lasts over time.",
        ctaLabel: "Read more",
      },
    },
    commerce: {
      breadcrumbs: "Breadcrumb",
      cart: {
        addForFreeShipping: "Add",
        freeShippingSuffix: "for free shipping",
        freeShippingUnlocked: "You got free shipping!",
        productImageAltFallback: "Product image",
        decreaseItemAriaPrefix: "Decrease",
        increaseItemAriaPrefix: "Increase",
        removeItemAriaPrefix: "Remove",
        remove: "Remove",
        emptyTitle: "Your bag is empty",
        emptyDescription: "Discover our fragrances and add your favorites.",
        shopNow: "Shop now",
        bagTitle: "Your Bag",
        subtotal: "Subtotal",
        vatIncludedNote: "VAT included. Shipping calculated at checkout.",
        checkout: "Checkout",
        checkoutLoading: "Redirecting…",
        checkoutError: "We could not open checkout. Please try again.",
        closeCart: "Close cart",
        close: "Close",
        viewBag: "View Bag",
      },
      collection: {
        filtersSort: "Filters & Sort",
        closeFilters: "Close filters",
        clearAll: "Clear all",
        close: "Close",
        sortBy: "Sort by",
        filterBy: "Filter by",
        bestSelling: "Best selling",
        priceLowToHigh: "Price, low to high",
        priceHighToLow: "Price, high to low",
        all: "All",
        women: "Women",
        men: "Men",
        unisex: "Unisex",
        apply: "Apply",
      },
      recommended: {
        title: "You may also like",
      },
      layeringGuide: {
        title: "The Art of Layering",
        paragraphs: [
          "Layering is the art of wearing two fragrances together on the skin to explore a different scent combination. Pairing a perfume oil with a spray fragrance allows their individual characters to interact, bringing different facets of the composition into focus.",
          "Our tolas can be enjoyed on their own or combined with a perfume. Our suggested pairings offer a starting point for exploration: try a small amount and discover the balance you prefer.",
        ],
      },
      productDetails: {
        mainAccords: "Main Accords",
        application: "The Art of Application",
        shipping: "Shipping",
        returns: "Returns & refunds",
        layeringProductsTitle: "Layer With",
        perfumeLayeringDescription: [
          "Discover another expression of this fragrance. Layering combines a perfume oil with your spray fragrance, allowing you to explore different nuances and create a more personal scent combination. The oils below have been selected to complement this perfume.",
          "Apply a small amount of your chosen oil first, allow it to settle, then apply the spray fragrance lightly.",
        ],
        purchase: {
          addToBag: "Add to Bag",
          outOfStock: "Out of stock",
          viewBag: "View Bag",
        },
        notes: {
          title: "Olfactory Notes",
          top: "Top Notes",
          heart: "Heart Notes",
          base: "Base Notes",
        },
      },
      pdpTabs: {
        descriptionTab: "DESCRIPTION",
        notesTab: "NOTES",
        keyNotes: "Key Notes",
        ingredientsTab: "INGREDIENTS",
        packagingTab: "PACKAGING & CARE",
        policiesTab: "POLICIES",
        top: "Top",
        heart: "Heart",
        base: "Base",
      },
      searchOverlay: {
        inputPlaceholder: "Search...",
        searching: "Searching...",
        noResultsFor: "No results for",
        close: "Close search",
        suggestions: "Discover",
        minimum: "Enter at least two characters to search.",
        error: "We could not load the products. Please try again.",
        results: "Search results",
        retry: "Try again",
        topProducts: "Top products",
      },
      productHeader: {
        sameDayDispatch: "Same-day dispatch",
      },
    },
  },
  fi: {
    navbar: {
      openMenu: "Avaa valikko",
      mobileCloseMenu: "Sulje valikko",
      mobileBack: "Takaisin",
      mobileMenuTitle: "Valikko",
      mobileShopTitle: "Kauppa",
      mobileLanguageTitle: "Kieli",
      language: "Kieli",
      perfumes: "Hajuvedet",
      byCategory: "Kategorian mukaan",
      byCollection: "Kokoelman mukaan",
      womenPerfumes: "Naisten hajuvedet",
      menPerfumes: "Miesten hajuvedet",
      unisexPerfumes: "Unisex-hajuvedet",
      shopAll: "Osta kaikki",
      luxuryCollection: "Luxury-kokoelma",
      premiumCollection: "Premium-kokoelma",
      essentialCollection: "Essential-kokoelma",
      oilsAttars: "Oils & Attars",
      bathBody: "Bath & Body",
      home: "Koti",
      discovery: "Discovery",
      houseOfArabian: "House of Arabian",
      featuredPerfumeAlt: "Esittelytuoksu",
      search: "Haku",
      openBag: "Avaa ostoskori",
      homeAriaLabel: "Arabian Fragrance etusivu",
      languageNames: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    footer: {
      columns: [
        {
          title: "Asiakaspalvelu",
          links: [
            { label: "Toimitus", href: "/policies/shipping-policy" },
            {
              label: "Palautukset ja hyvitykset",
              href: "/policies/refund-policy",
            },
            { label: "UKK", href: "/faq" },
            { label: "Käyttöehdot", href: "/policies/terms-conditions" },
            { label: "Tietosuojakäytäntö", href: "/policies/privacy-policy" },
            { label: "Evästekäytäntö", href: "/cookies" },
          ],
        },
        {
          title: "Tietoa meistä",
          links: [
            { label: "Ota yhteyttä", href: "/contact" },
            { label: "Brandi", href: "/about" },
            { label: "Myymälä", href: "/showroom" },
          ],
        },
        {
          title: "Sosiaalinen media",
          links: [
            { label: "Instagram", href: "https://instagram.com/" },
            { label: "Facebook", href: "https://facebook.com/" },
            { label: "Pinterest", href: "https://pinterest.com/" },
          ],
        },
      ],
      brandCopy:
        "Arabian Fragrance on moderni parfymitalo, joka luo mieleenpainuvia tuoksuja eettisesti hankituista raaka-aineista. Tutustu tunnustuoksuihin, kerroksellisiin rituaaleihin ja rajoitettuihin eriin verkossa tai myymälässä.",
      allRightsReserved: "Kaikki oikeudet pidätetään.",
      newsletter: {
        joinList: "Liity listalle",
        description:
          "Saa päivityksiä uutuuksista, yksityisistä tapahtumista ja eksklusiivisista julkaisuista.",
        emailPlaceholder: "Sähköpostiosoite",
        subscribeAria: "Tilaa",
        subscribeTitle: "Tilaa",
      },
      selectCurrency: "Valitse valuutta",
      logoAlt: "Arabian Fragrance",
    },
    sections: {
      categoryShowcase: {
        womenTitle: "OSTA HÄNELLE",
        womenSubtitle:
          "Aistillisia kukkaistuoksuja, lämmin amber ja pehmeä oud.",
        womenAria: "Osta naisten tuoksuja",
        menTitle: "OSTA HÄNELLE",
        menSubtitle:
          "Intensiivistä amberia, syviä puunuotteja ja hienostuneita mausteita.",
        menAria: "Osta miesten tuoksuja",
        unisexTitle: "UNISEX",
        unisexSubtitle:
          "Tasapainoisia yhdistelmia, joissa ruusu, mausteet ja oud kohtaavat.",
        unisexAria: "Osta unisex-tuoksuja",
        shopNow: "Osta nyt",
      },
      discover: {
        womenTab: "NAISET",
        menTab: "MIEHET",
        unisexTab: "UNISEX",
        viewAllPrefix: "Näytä kaikki",
      },
      quickNav: {
        newArrivals: "Uutuudet",
        bestSellers: "Myydyimmät",
        luxuryCollection: "Luxury-kokoelma",
        premiumCollection: "Premium-kokoelma",
        oudSignatures: "Oud-signatuurit",
      },
      showroomSection: {
        leftImageAlt: "Arabian Fragrancen showroom",
        rightImageAlt: "Showroom-yksityiskohta",
        label: "VIERAILE MEILLÄ",
        heading: "HELSINGISSÄ",
        description:
          "Koe arabialaisen hajuvesitaiteen maailma paikan päällä. Vieraile Helsingin myymälässämme ja tutustu harvinaisiin raaka-aineisiin sekä tunnustuoksuihin.",
        ctaLabel: "Myymälämme",
      },
      showroomHero: {
        imageAlt: "Arabian Fragrancen showroomin sisätila",
        title: "SHOWROOM",
        ctaLabel: "Varaa vierailu",
      },
      invitationHero: {
        ctaLabel: "Tutustu nyt",
      },
      aboutDefaults: {
        imageAlt: "Tarinamme",
        eyebrow: "Savoir-Faire",
        title: "TARINAMME YLELLISISTÄ ARABIALAISISTA TUOKSUISTA",
        description:
          "Dubain sydämessä syntynyt brandomme yhdistää perinteet ja ylellisyyden luodakseen ainutlaatuisia tuoksuja, jotka huokuvat eleganssia ja hienostuneisuutta.",
        ctaLabel: "Lue lisää",
      },
    },
    commerce: {
      breadcrumbs: "Polku",
      cart: {
        addForFreeShipping: "Lisää",
        freeShippingSuffix: "ilmaista toimitusta varten",
        freeShippingUnlocked: "Sait ilmaisen toimituksen!",
        productImageAltFallback: "Tuotekuva",
        decreaseItemAriaPrefix: "Vähennä",
        increaseItemAriaPrefix: "Lisää",
        removeItemAriaPrefix: "Poista",
        remove: "Poista",
        emptyTitle: "Ostoskorisi on tyhjä",
        emptyDescription: "Tutustu tuoksuihimme ja lisää suosikkisi.",
        shopNow: "Osta nyt",
        bagTitle: "Ostoskorisi",
        subtotal: "Välisumma",
        vatIncludedNote: "ALV sisältyy. Toimitus lasketaan kassalla.",
        checkout: "Kassa",
        checkoutLoading: "Siirrytään kassalle…",
        checkoutError: "Kassaa ei voitu avata. Yritä uudelleen.",
        closeCart: "Sulje ostoskori",
        close: "Sulje",
        viewBag: "Näytä ostoskori",
      },
      collection: {
        filtersSort: "Suodattimet ja lajittelu",
        closeFilters: "Sulje suodattimet",
        clearAll: "Tyhjenna kaikki",
        close: "Sulje",
        sortBy: "Lajittele",
        filterBy: "Suodata",
        bestSelling: "Myydyimmät",
        priceLowToHigh: "Hinta, matalasta korkeaan",
        priceHighToLow: "Hinta, korkeasta matalaan",
        all: "Kaikki",
        women: "Naiset",
        men: "Miehet",
        unisex: "Unisex",
        apply: "Käytä",
      },
      recommended: {
        title: "Saatat myös pitää",
      },
      layeringGuide: {
        title: "Tuoksujen kerrostaminen",
        paragraphs: [
          "Tuoksujen kerrostaminen tarkoittaa kahden tuoksun käyttämistä yhdessä iholla uuden tuoksuyhdistelmän löytämiseksi. Kun yhdistät hajusteöljyn suihkutettavaan hajuveteen, niiden ominaispiirteet kohtaavat ja tuovat esiin koostumuksen eri vivahteita.",
          "Tola-hajusteöljyjämme voi käyttää sellaisenaan tai yhdessä hajuveden kanssa. Suosittelemamme yhdistelmät tarjoavat lähtökohdan kokeilulle: aloita pienellä määrällä ja löydä itsellesi mieluisa tasapaino.",
        ],
      },
      productDetails: {
        mainAccords: "Tuoksun pääsoinnut",
        application: "Tuoksun käyttö",
        shipping: "Toimitus",
        returns: "Palautukset ja hyvitykset",
        layeringProductsTitle: "Yhdistä tuoksuun",
        perfumeLayeringDescription: [
          "Löydä tästä tuoksusta uusia vivahteita. Kerrostamisessa hajusteöljy yhdistetään suihkutettavaan tuoksuun, jolloin voit tutkia erilaisia sävyjä ja luoda persoonallisen tuoksuyhdistelmän. Alla olevat öljyt on valittu täydentämään tätä hajuvettä.",
          "Levitä ensin pieni määrä valitsemaasi öljyä, anna sen asettua iholle ja suihkuta sitten hajuvettä kevyesti.",
        ],
        purchase: {
          addToBag: "Lisää ostoskoriin",
          outOfStock: "Loppuunmyyty",
          viewBag: "Näytä ostoskori",
        },
        notes: {
          title: "Tuoksunuotit",
          top: "Alkunuotit",
          heart: "Sydännuotit",
          base: "Pohjanuotit",
        },
      },
      pdpTabs: {
        descriptionTab: "KUVAUS",
        notesTab: "NUOTIT",
        keyNotes: "Keskeiset tuoksunuotit",
        ingredientsTab: "AINESOSAT",
        packagingTab: "PAKKAUS JA HOITO",
        policiesTab: "KÄYTÄNNÖT",
        top: "Ylänuotti",
        heart: "Sydännuotti",
        base: "Pohjanuotti",
      },
      searchOverlay: {
        inputPlaceholder: "Hae...",
        searching: "Haetaan...",
        noResultsFor: "Ei tuloksia haulle",
        close: "Sulje haku",
        suggestions: "Tutustu",
        minimum: "Kirjoita vähintään kaksi merkkiä.",
        error: "Tuotteita ei voitu ladata. Yritä uudelleen.",
        results: "Hakutulokset",
        retry: "Yritä uudelleen",
        topProducts: "Suosituimmat tuotteet",
      },
      productHeader: {
        sameDayDispatch: "Lähetys samana päivänä",
      },
    },
  },
  sv: {
    navbar: {
      openMenu: "Oppna meny",
      mobileCloseMenu: "Stang meny",
      mobileBack: "Tillbaka",
      mobileMenuTitle: "Meny",
      mobileShopTitle: "Butik",
      mobileLanguageTitle: "Sprak",
      language: "Sprak",
      perfumes: "Parfymer",
      byCategory: "Efter kategori",
      byCollection: "Efter kollektion",
      womenPerfumes: "Damparfymer",
      menPerfumes: "Herrparfymer",
      unisexPerfumes: "Unisexparfymer",
      shopAll: "Handla alla",
      luxuryCollection: "Luxury-kollektionen",
      premiumCollection: "Premium-kollektionen",
      essentialCollection: "Essential-kollektionen",
      oilsAttars: "Oils & Attars",
      bathBody: "Bath & Body",
      home: "Hem",
      discovery: "Discovery",
      houseOfArabian: "House of Arabian",
      featuredPerfumeAlt: "Utvald parfym",
      search: "Sok",
      openBag: "Oppna vaskan",
      homeAriaLabel: "Arabian Fragrance startsida",
      languageNames: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    footer: {
      columns: [
        {
          title: "Kundservice",
          links: [
            { label: "Leverans", href: "/policies/shipping-policy" },
            {
              label: "Returer och aterbetalning",
              href: "/policies/refund-policy",
            },
            { label: "Vanliga fragor", href: "/faq" },
            { label: "Villkor", href: "/policies/terms-conditions" },
            { label: "Integritetspolicy", href: "/policies/privacy-policy" },
            { label: "Cookiepolicy", href: "/cookies" },
          ],
        },
        {
          title: "Om oss",
          links: [
            { label: "Kontakta oss", href: "/contact" },
            { label: "Varumarke", href: "/about" },
            { label: "Butik", href: "/showroom" },
          ],
        },
        {
          title: "Socialt",
          links: [
            { label: "Instagram", href: "https://instagram.com/" },
            { label: "Facebook", href: "https://facebook.com/" },
            { label: "Pinterest", href: "https://pinterest.com/" },
          ],
        },
      ],
      brandCopy:
        "Arabian Fragrance ar ett modernt parfymhus som skapar uttrycksfulla dofter med etiskt framtagna ingredienser. Upptack signaturblandningar, lagerbyggda ritualer och limiterade utgavor i butik eller online.",
      allRightsReserved: "Alla rattigheter forbehalls.",
      newsletter: {
        joinList: "Ga med i listan",
        description:
          "Fa uppdateringar om nyheter, exklusiva event och privata lanseringar.",
        emailPlaceholder: "E-postadress",
        subscribeAria: "Prenumerera",
        subscribeTitle: "Prenumerera",
      },
      selectCurrency: "Valj valuta",
      logoAlt: "Arabian Fragrance",
    },
    sections: {
      categoryShowcase: {
        womenTitle: "HANDLA FOR HENNE",
        womenSubtitle:
          "Sensuella blommor blandade med varm amber och mjuk oud.",
        womenAria: "Handla damdofter",
        menTitle: "HANDLA FOR HONOM",
        menSubtitle:
          "Intensiv amber, djupa tradofter och forfinade orientaliska kryddor.",
        menAria: "Handla herrdofter",
        unisexTitle: "UNISEX",
        unisexSubtitle:
          "Balanserade kompositioner dar ros, kryddor och oud forenas.",
        unisexAria: "Handla unisexdofter",
        shopNow: "Handla nu",
      },
      discover: {
        womenTab: "DAM",
        menTab: "HERR",
        unisexTab: "UNISEX",
        viewAllPrefix: "Visa alla",
      },
      quickNav: {
        newArrivals: "Nyheter",
        bestSellers: "Bastsaljare",
        luxuryCollection: "Luxury-kollektionen",
        premiumCollection: "Premium-kollektionen",
        oudSignatures: "Oud-signaturer",
      },
      showroomSection: {
        leftImageAlt: "Arabian Fragrance showroom",
        rightImageAlt: "Showroom-detalj",
        label: "BESOK OSS",
        heading: "I HELSINGFORS",
        description:
          "Upplev konsten av arabisk parfym pa plats. Besok var butik i Helsingfors och upptack vara sallsynta ingredienser och signaturkollektioner.",
        ctaLabel: "Var butik",
      },
      showroomHero: {
        imageAlt: "Arabian Fragrance showroom interior",
        title: "SHOWROOM",
        ctaLabel: "Boka ett besok",
      },
      invitationHero: {
        ctaLabel: "Utforska nu",
      },
      aboutDefaults: {
        imageAlt: "Var historia",
        eyebrow: "Savoir-Faire",
        title: "VAR HISTORIA OM LYXIGA ARABISKA DOFTER",
        description:
          "Fodd i Dubai, hjartat av arabisk parfymkonst, forenar vart varumarke tradition och lyx for att skapa unika dofter med elegans och sofistikation.",
        ctaLabel: "Las mer",
      },
    },
    commerce: {
      breadcrumbs: "Navigering",
      cart: {
        addForFreeShipping: "Lägg till",
        freeShippingSuffix: "för fri frakt",
        freeShippingUnlocked: "Du har fri frakt!",
        productImageAltFallback: "Produktbild",
        decreaseItemAriaPrefix: "Minska",
        increaseItemAriaPrefix: "Öka",
        removeItemAriaPrefix: "Ta bort",
        remove: "Ta bort",
        emptyTitle: "Din varukorg är tom",
        emptyDescription: "Upptäck våra dofter och lägg till dina favoriter.",
        shopNow: "Handla nu",
        bagTitle: "Din varukorg",
        subtotal: "Delsumma",
        vatIncludedNote: "Moms ingår. Frakt beräknas i kassan.",
        checkout: "Kassa",
        checkoutLoading: "Öppnar kassan…",
        checkoutError: "Det gick inte att öppna kassan. Försök igen.",
        closeCart: "Stäng varukorgen",
        close: "Stäng",
        viewBag: "Visa varukorg",
      },
      collection: {
        filtersSort: "Filter och sortering",
        closeFilters: "Stang filter",
        clearAll: "Rensa alla",
        close: "Stang",
        sortBy: "Sortera efter",
        filterBy: "Filtrera efter",
        bestSelling: "Bastsaljare",
        priceLowToHigh: "Pris, lagst till hogst",
        priceHighToLow: "Pris, hogst till lagst",
        all: "Alla",
        women: "Dam",
        men: "Herr",
        unisex: "Unisex",
        apply: "Anvand",
      },
      recommended: {
        title: "Du kanske ocksa gillar",
      },
      layeringGuide: {
        title: "Konsten att kombinera dofter",
        paragraphs: [
          "Att kombinera dofter innebär att bära två dofter tillsammans på huden för att utforska en ny doftkombination. När en parfymolja kombineras med en sprayparfym möts deras individuella karaktärer och framhäver olika nyanser i kompositionen.",
          "Våra tola-parfymoljor kan användas på egen hand eller tillsammans med en parfym. Våra föreslagna kombinationer är en utgångspunkt för att utforska: börja med en liten mängd och hitta den balans du föredrar.",
        ],
      },
      productDetails: {
        mainAccords: "Doftackord",
        application: "Konsten att applicera",
        shipping: "Leverans",
        returns: "Returer och återbetalningar",
        layeringProductsTitle: "Kombinera med",
        perfumeLayeringDescription: [
          "Upptäck ett nytt uttryck för denna doft. Genom att kombinera en parfymolja med din sprayparfym kan du utforska olika nyanser och skapa en mer personlig doftkombination. Oljorna nedan har valts ut för att komplettera denna parfym.",
          "Applicera först en liten mängd av den valda oljan, låt den sätta sig på huden och spraya sedan parfymen lätt.",
        ],
        purchase: {
          addToBag: "Lägg i varukorgen",
          outOfStock: "Slut i lager",
          viewBag: "Visa varukorg",
        },
        notes: {
          title: "Doftnoter",
          top: "Toppnoter",
          heart: "Hjärtnoter",
          base: "Basnoter",
        },
      },
      pdpTabs: {
        descriptionTab: "BESKRIVNING",
        notesTab: "NOTER",
        keyNotes: "Framträdande doftnoter",
        ingredientsTab: "INGREDIENSER",
        packagingTab: "FÖRPACKNING OCH SKÖTSEL",
        policiesTab: "POLICYER",
        top: "Topp",
        heart: "Hjärta",
        base: "Bas",
      },
      searchOverlay: {
        inputPlaceholder: "Sok...",
        searching: "Soker...",
        noResultsFor: "Inga resultat for",
        close: "Stäng sökningen",
        suggestions: "Upptäck",
        minimum: "Ange minst två tecken för att söka.",
        error: "Produkterna kunde inte laddas. Försök igen.",
        results: "Sökresultat",
        retry: "Försök igen",
        topProducts: "Topp-produkter",
      },
      productHeader: {
        sameDayDispatch: "Skickas samma dag",
      },
    },
  },
};

export function getLocaleFromPathname(pathname: string | null): Locale {
  const localeSegment = pathname?.split("/")[1] as Locale | undefined;
  return i18n.locales.includes(localeSegment as Locale)
    ? (localeSegment as Locale)
    : i18n.defaultLocale;
}

export function getUiLabels(locale: Locale): UiLabels {
  return uiLabels[locale] ?? uiLabels[i18n.defaultLocale];
}
