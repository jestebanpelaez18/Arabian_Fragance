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
    signatureCollection: string;
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
    showroomSection: {
      leftImageAlt: string;
      rightImageAlt: string;
      label: string;
      heading: string;
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
      closeCart: string;
      close: string;
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
    pdpTabs: {
      ariaLabel: string;
      descriptionTab: string;
      notesTab: string;
      ingredientsTab: string;
      packagingTab: string;
      policiesTab: string;
      defaultDescription: string;
      top: string;
      heart: string;
      base: string;
      notesPrefix: string;
      ingredientsHeading: string;
      showLess: string;
      showMore: string;
      ingredientsUnavailable: string;
      packagingLine1: string;
      noPolicies: string;
    };
    searchOverlay: {
      inputPlaceholder: string;
      searching: string;
      noResultsFor: string;
      trendingNow: string;
      topProducts: string;
    };
    productHeader: {
      concentration: string;
      size: string;
      dispatch: string;
      sameDayDispatch: string;
      policies: string[];
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
      signatureCollection: "The Signature Collection",
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
      showroomSection: {
        leftImageAlt: "Arabian Fragrance showroom",
        rightImageAlt: "Showroom detail",
        label: "VISIT US",
        heading: "IN HELSINKI",
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
        closeCart: "Close cart",
        close: "Close",
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
      pdpTabs: {
        ariaLabel: "Product information",
        descriptionTab: "DESCRIPTION",
        notesTab: "NOTES",
        ingredientsTab: "INGREDIENTS",
        packagingTab: "PACKAGING & CARE",
        policiesTab: "POLICIES",
        defaultDescription:
          "A timeless composition crafted with refined notes.",
        top: "Top",
        heart: "Heart",
        base: "Base",
        notesPrefix: "Notes",
        ingredientsHeading: "Ingredients",
        showLess: "Show less",
        showMore: "Show more",
        ingredientsUnavailable:
          "Ingredients information is not available for this product.",
        packagingLine1:
          "All items are packaged in our signature Arabian Fragrance box, with complimentary gift wrap for a refined presentation.",
        noPolicies: "No additional policies.",
      },
      searchOverlay: {
        inputPlaceholder: "Search...",
        searching: "Searching...",
        noResultsFor: "No results for",
        trendingNow: "Trending now",
        topProducts: "Top products",
      },
      productHeader: {
        concentration: "Concentration",
        size: "Size",
        dispatch: "Dispatch",
        sameDayDispatch: "Same-day dispatch",
        policies: [
          "VAT included. Shipping from Helsinki.",
          "Free shipping in the EU from EUR80.",
          "Returns within 14 days.",
        ],
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
      signatureCollection: "Signature-kokoelma",
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
            { label: "Kayttoehdot", href: "/policies/terms-conditions" },
            { label: "Tietosuojakaytanto", href: "/policies/privacy-policy" },
            { label: "Evastekaytanto", href: "/cookies" },
          ],
        },
        {
          title: "Tietoa meista",
          links: [
            { label: "Ota yhteytta", href: "/contact" },
            { label: "Brandi", href: "/about" },
            { label: "Myymala", href: "/showroom" },
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
        "Arabian Fragrance on moderni parfymitalo, joka luo mieleenpainuvia tuoksuja eettisesti hankituista raaka-aineista. Tutustu tunnustuoksuihin, kerroksellisiin rituaaleihin ja rajoitettuihin eriin verkossa tai myymalassa.",
      allRightsReserved: "Kaikki oikeudet pidatetaan.",
      newsletter: {
        joinList: "Liity listalle",
        description:
          "Saa paivityksia uutuuksista, yksityisista tapahtumista ja eksklusiivisista julkaisuista.",
        emailPlaceholder: "Sahkopostiosoite",
        subscribeAria: "Tilaa",
        subscribeTitle: "Tilaa",
      },
      selectCurrency: "Valitse valuutta",
      logoAlt: "Arabian Fragrance",
    },
    sections: {
      categoryShowcase: {
        womenTitle: "OSTA HANELLE",
        womenSubtitle:
          "Aistillisia kukkaistuoksuja, lammin amber ja pehmea oud.",
        womenAria: "Osta naisten tuoksuja",
        menTitle: "OSTA HANELLE",
        menSubtitle:
          "Intensiivista amberia, syvia puunuotteja ja hienostuneita mausteita.",
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
        viewAllPrefix: "Nayta kaikki",
      },
      showroomSection: {
        leftImageAlt: "Arabian Fragrancen showroom",
        rightImageAlt: "Showroom-yksityiskohta",
        label: "VIERAILE MEILLA",
        heading: "HELSINGISSA",
        ctaLabel: "Myymalamme",
      },
      showroomHero: {
        imageAlt: "Arabian Fragrancen showroomin sisatila",
        title: "SHOWROOM",
        ctaLabel: "Varaa vierailu",
      },
      invitationHero: {
        ctaLabel: "Tutustu nyt",
      },
      aboutDefaults: {
        imageAlt: "Tarinamme",
        title: "TARINAMME YLELLISISTA ARABIALAISISTA TUOKSUISTA",
        description:
          "Dubain sydamessa syntynyt brandomme yhdistaa perinteet ja ylellisyyden luodakseen ainutlaatuisia tuoksuja, jotka huokuvat eleganssia ja hienostuneisuutta.",
        ctaLabel: "Lue lisaa",
      },
    },
    commerce: {
      breadcrumbs: "Polku",
      cart: {
        addForFreeShipping: "Lisaa",
        freeShippingSuffix: "ilmaista toimitusta varten",
        freeShippingUnlocked: "Sait ilmaisen toimituksen!",
        productImageAltFallback: "Tuotekuva",
        decreaseItemAriaPrefix: "Vahenna",
        increaseItemAriaPrefix: "Lisaa",
        removeItemAriaPrefix: "Poista",
        remove: "Poista",
        emptyTitle: "Ostoskorisi on tyhja",
        emptyDescription: "Tutustu tuoksuihimme ja lisaa suosikkisi.",
        shopNow: "Osta nyt",
        bagTitle: "Ostoskorisi",
        subtotal: "Valisumma",
        vatIncludedNote: "ALV sisaltyy. Toimitus lasketaan kassalla.",
        checkout: "Kassa",
        closeCart: "Sulje ostoskori",
        close: "Sulje",
      },
      collection: {
        filtersSort: "Suodattimet ja lajittelu",
        closeFilters: "Sulje suodattimet",
        clearAll: "Tyhjenna kaikki",
        close: "Sulje",
        sortBy: "Lajittele",
        filterBy: "Suodata",
        bestSelling: "Myydyimmat",
        priceLowToHigh: "Hinta, matalasta korkeaan",
        priceHighToLow: "Hinta, korkeasta matalaan",
        all: "Kaikki",
        women: "Naiset",
        men: "Miehet",
        unisex: "Unisex",
        apply: "Kayta",
      },
      recommended: {
        title: "Saatat myos pita",
      },
      pdpTabs: {
        ariaLabel: "Tuotetiedot",
        descriptionTab: "KUVAUS",
        notesTab: "NUOTIT",
        ingredientsTab: "AINESOSAT",
        packagingTab: "PAKKAUS JA HOITO",
        policiesTab: "KAYTANNOT",
        defaultDescription: "Ajaton koostumus hienostuneilla nuoteilla.",
        top: "Ylanuotti",
        heart: "Sydannuotti",
        base: "Pohjanuotti",
        notesPrefix: "Nuotit",
        ingredientsHeading: "Ainesosat",
        showLess: "Nayta vahemman",
        showMore: "Nayta lisaa",
        ingredientsUnavailable:
          "Ainesosatietoja ei ole saatavilla tasta tuotteesta.",
        packagingLine1:
          "Kaikki tuotteet pakataan Arabian Fragrancen tunnuslaatikkoon ja viimeistellaan ilmaisella lahjapaketoinnilla.",
        noPolicies: "Ei lisakaytantoja.",
      },
      searchOverlay: {
        inputPlaceholder: "Hae...",
        searching: "Haetaan...",
        noResultsFor: "Ei tuloksia haulle",
        trendingNow: "Nyt pinnalla",
        topProducts: "Suosituimmat tuotteet",
      },
      productHeader: {
        concentration: "Pitoisuus",
        size: "Koko",
        dispatch: "Toimitus",
        sameDayDispatch: "Lahetys samana paivana",
        policies: [
          "ALV sisaltyy. Toimitus Helsingista.",
          "Ilmainen toimitus EU:ssa yli 80 EUR tilauksiin.",
          "Palautus 14 paivan sisalla.",
        ],
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
      signatureCollection: "Signature-kollektionen",
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
      showroomSection: {
        leftImageAlt: "Arabian Fragrance showroom",
        rightImageAlt: "Showroom-detalj",
        label: "BESOK OSS",
        heading: "I HELSINGFORS",
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
        title: "VAR HISTORIA OM LYXIGA ARABISKA DOFTER",
        description:
          "Fodd i Dubai, hjartat av arabisk parfymkonst, forenar vart varumarke tradition och lyx for att skapa unika dofter med elegans och sofistikation.",
        ctaLabel: "Las mer",
      },
    },
    commerce: {
      breadcrumbs: "Navigering",
      cart: {
        addForFreeShipping: "Lagg till",
        freeShippingSuffix: "for fri frakt",
        freeShippingUnlocked: "Du fick fri frakt!",
        productImageAltFallback: "Produktbild",
        decreaseItemAriaPrefix: "Minska",
        increaseItemAriaPrefix: "Oka",
        removeItemAriaPrefix: "Ta bort",
        remove: "Ta bort",
        emptyTitle: "Din vaska ar tom",
        emptyDescription: "Upptack vara dofter och lagg till dina favoriter.",
        shopNow: "Handla nu",
        bagTitle: "Din vaska",
        subtotal: "Delsumma",
        vatIncludedNote: "Moms ingar. Frakt beraknas i kassan.",
        checkout: "Kassa",
        closeCart: "Stang vaska",
        close: "Stang",
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
      pdpTabs: {
        ariaLabel: "Produktinformation",
        descriptionTab: "BESKRIVNING",
        notesTab: "NOTER",
        ingredientsTab: "INGREDIENSER",
        packagingTab: "FORPACKNING OCH SKOTSEL",
        policiesTab: "POLICYER",
        defaultDescription: "En tidlos komposition med forfinade noter.",
        top: "Topp",
        heart: "Hjarta",
        base: "Bas",
        notesPrefix: "Noter",
        ingredientsHeading: "Ingredienser",
        showLess: "Visa mindre",
        showMore: "Visa mer",
        ingredientsUnavailable:
          "Ingrediensinformation ar inte tillganglig for denna produkt.",
        packagingLine1:
          "Alla produkter levereras i var signaturlada fran Arabian Fragrance med kostnadsfri presentinslagning.",
        noPolicies: "Inga ytterligare policyer.",
      },
      searchOverlay: {
        inputPlaceholder: "Sok...",
        searching: "Soker...",
        noResultsFor: "Inga resultat for",
        trendingNow: "Trendigt nu",
        topProducts: "Topp-produkter",
      },
      productHeader: {
        concentration: "Koncentration",
        size: "Storlek",
        dispatch: "Leverans",
        sameDayDispatch: "Skickas samma dag",
        policies: [
          "Moms ingar. Leverans fran Helsingfors.",
          "Fri frakt i EU fran 80 EUR.",
          "Retur inom 14 dagar.",
        ],
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
