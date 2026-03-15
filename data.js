// Comprehensive Product Database covering multiple fields
const productsDatabase = [
    // === ELECTRONICS ===
    {
        id: "e1",
        category: "electronics",
        tag: "laptop",
        budget: "high",
        useCase: "professional",
        title: "MacBook Pro 16-inch (M3 Max)",
        brand: "Apple",
        desc: "The ultimate pro laptop with mind-blowing performance, amazing battery life, and a stunning Liquid Retina XDR display.",
        price: "$3,499",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
        matchReason: "Top-tier performance for professionals"
    },
    {
        id: "e2",
        category: "electronics",
        tag: "laptop",
        budget: "medium",
        useCase: "casual",
        title: "MacBook Air 15-inch (M3)",
        brand: "Apple",
        desc: "Incredibly thin and light, featuring a silent fanless design and the powerful M3 chip for everyday tasks.",
        price: "$1,299",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600",
        matchReason: "Perfect balance of portability and power"
    },
    {
        id: "e3",
        category: "electronics",
        tag: "audio",
        budget: "premium",
        useCase: "casual",
        title: "Sony WH-1000XM5",
        brand: "Sony",
        desc: "Industry-leading noise cancellation, exceptional sound quality, and all-day comfort for immersive listening.",
        price: "$398",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600",
        matchReason: "The gold standard for noise-canceling headphones"
    },
    {
        id: "e4",
        category: "electronics",
        tag: "smartphone",
        budget: "premium",
        useCase: "professional",
        title: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        desc: "The ultimate Android experience with AI features, a built-in S Pen, and an unmatched camera system.",
        price: "$1,299",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600",
        matchReason: "Best-in-class features"
    },

    // === FASHION ===
    {
        id: "f1",
        category: "fashion",
        tag: "shoes",
        style: "casual",
        title: "Nike Air Force 1 '07",
        brand: "Nike",
        desc: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best.",
        price: "$115",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
        matchReason: "A timeless, versatile classic"
    },
    {
        id: "f2",
        category: "fashion",
        tag: "outerwear",
        style: "professional",
        title: "Arcteryx Beta AR Jacket",
        brand: "Arc'teryx",
        desc: "Versatile GORE-TEX PRO shell providing highly durable, waterproof, breathable protection in harsh environments.",
        price: "$600",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
        matchReason: "Premium weather protection"
    },
    {
        id: "f3",
        category: "fashion",
        tag: "accessories",
        style: "elegant",
        title: "Minimalist Leather Tote",
        brand: "Cuyana",
        desc: "Crafted from premium Italian pebble leather, featuring a spacious interior and timeless silhouette.",
        price: "$248",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
        matchReason: "Elegant everyday carry"
    },

    // === HOME & LIVING ===
    {
        id: "h1",
        category: "home",
        tag: "furniture",
        room: "living",
        title: "Mid-Century Modern Lounge Chair",
        brand: "Herman Miller",
        desc: "A masterpiece of 20th-century design combining luxurious comfort with timeless aesthetics.",
        price: "$1,495",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600",
        matchReason: "Iconic design piece"
    },
    {
        id: "h2",
        category: "home",
        tag: "appliances",
        room: "kitchen",
        title: "Breville Barista Express",
        brand: "Breville",
        desc: "Create third wave specialty coffee at home – from bean to espresso – in less than a minute.",
        price: "$699",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1585200371661-0ae10b42f277?auto=format&fit=crop&q=80&w=600",
        matchReason: "Cafe-quality coffee at home"
    },
    {
        id: "h3",
        category: "home",
        tag: "decor",
        room: "bedroom",
        title: "Linen Duvet Cover Set",
        brand: "Brooklinen",
        desc: "Expertly crafted in Portugal from 100% European Flax, offering a relaxed look with incredible softness.",
        price: "$279",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
        matchReason: "Ultimate comfort and breathability"
    },

    // === HEALTH & FITNESS ===
    {
        id: "hf1",
        category: "fitness",
        tag: "equipment",
        level: "beginner",
        title: "Adjustable Dumbbells Set",
        brand: "Bowflex",
        desc: "Replaces 15 sets of weights. Adjust from 5 to 52.5 lbs with the turn of a dial.",
        price: "$429",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600",
        matchReason: "Space-saving home gym essential"
    },
    {
        id: "hf2",
        category: "fitness",
        tag: "wearable",
        level: "advanced",
        title: "Garmin Fenix 7 Pro",
        brand: "Garmin",
        desc: "Ultimate multisport GPS smartwatch with solar charging capability and advanced training features.",
        price: "$799",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
        matchReason: "The best tracker for serious athletes"
    },
    {
        id: "hf3",
        category: "fitness",
        tag: "recovery",
        level: "intermediate",
        title: "Theragun Pro",
        brand: "Therabody",
        desc: "Deep muscle treatment with commercial-grade performance to enhance muscle recovery.",
        price: "$599",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600",
        matchReason: "Premium active recovery"
    }
];
