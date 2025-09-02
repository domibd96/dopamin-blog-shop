// Shop JavaScript
let cart = [];
let currentFilter = 'all';
let cartCache = null; // Cache für bessere Performance

// Produktdaten
const products = [
  // T-Shirts (26 Stück)
  {
    id: 1,
    name: 'Oversized T-Shirt "ASTRONAUT"',
    category: 'tshirts',
    price: 29.99,
    description: 'Einzigartiges Oversized T-Shirt mit Astronaut-Design. Perfekt für einen lässigen, modernen Look.',
    images: ['img/shop/astronaut2.jpg', 'img/shop/astronaut1.jpg', 'img/shop/astronaut3.jpg', 'img/shop/astronaut4.jpg', 'img/shop/astronaut5.jpg', 'img/shop/astronaut6.jpg'],
    details: 'Dieses Oversized T-Shirt "ASTRONAUT" ist aus hochwertiger Bio-Baumwolle gefertigt und bietet maximalen Komfort. Das einzigartige Design zeigt einen stilisierten Astronauten und ist perfekt für alle, die einen außergewöhnlichen Look suchen.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 2,
    name: 'Oversized T-Shirt "AMALFI"',
    category: 'tshirts',
    price: 29.99,
    description: 'Sommerliches T-Shirt mit psychedelischem Design. Perfekt für Techno Festivals.',
    images: ['img/shop/amalfi2.jpg', 'img/shop/amalfi1.jpg', 'img/shop/amalfi3.jpg', 'img/shop/amalfi4.jpg'],
    details: 'Dieses Oversized T-Shirt "AMALFI" verbindet sommerliche Vibes mit psychedelischen Kunstdrucken. Perfekt für Festivals und Raves.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 3,
    name: 'T-Shirt "STIMULATE"',
    category: 'tshirts',
    price: 29.99,
    description: 'Psychedelic Techno Festival T-Shirt mit trippy Kunstdruck. Für echte Raver.',
    images: ['img/shop/stimulate2.jpg', 'img/shop/stimulate1.jpg', 'img/shop/stimulate4.jpg', 'img/shop/stimulate3.jpg'],
    details: 'Das "STIMULATE" T-Shirt ist ein Statement für alle Techno-Liebhaber. Mit psychedelischem Kunstdruck und trippy Design.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 4,
    name: 'Oversized T-Shirt "BASILICA"',
    category: 'tshirts',
    price: 29.99,
    description: 'Sommerliches T-Shirt mit psychedelischem Basilica-Design. Kunstdruck für Festivals.',
    images: ['img/shop/basilica1.jpg', 'img/shop/basilica2.jpg', 'img/shop/basilica3.jpg', 'img/shop/basilica4.jpg'],
    details: 'Das "BASILICA" T-Shirt kombiniert architektonische Elemente mit psychedelischen Designs. Perfekt für den Sommer.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 5,
    name: 'Oversized T-Shirt "BLUE IVY"',
    category: 'tshirts',
    price: 29.99,
    description: 'Mystisches Design mit blauen Akzenten. Elegant und geheimnisvoll.',
    images: ['img/shop/blueivy2.jpg', 'img/shop/blueivy1.jpg', 'img/shop/blueivy3.jpg', 'img/shop/blueivy4.jpg'],
    details: 'Das "BLUE IVY" T-Shirt kombiniert mystische Eleganz mit modernem Streetwear. Perfekt für alle, die das Außergewöhnliche lieben.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 6,
    name: 'Oversized T-Shirt "TRIP ON THE BEACH"',
    category: 'tshirts',
    price: 29.99,
    description: 'Strand-Vibes mit entspanntem Design. Sommer und Freiheit pur.',
    images: ['img/shop/triponthebeach1.jpg', 'img/shop/triponthebeach2.jpg', 'img/shop/triponthebeach3.jpg', 'img/shop/triponthebeach4.jpg'],
    details: 'Das "TRIP ON THE BEACH" T-Shirt bringt Strand-Vibes und Urlaubsgefühl. Perfekt für entspannte Sommertage.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 7,
    name: 'Oversized T-Shirt "IMPULSIV"',
    category: 'tshirts',
    price: 29.99,
    description: 'Dynamisches Design für spontane Momente. Energetisch und ausdrucksstark.',
    images: ['img/shop/impulsiv1.jpg', 'img/shop/impulsiv2.jpg', 'img/shop/impulsiv3.jpg', 'img/shop/impulsiv4.jpg'],
    details: 'Das "IMPULSIV" T-Shirt steht für spontane Entscheidungen und pure Energie. Ein Statement für Lebendigkeit.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 8,
    name: 'Oversized T-Shirt "VACAY"',
    category: 'tshirts',
    price: 29.99,
    description: 'Urlaubs-Design mit entspannter Atmosphäre. Vacation-Mode aktiviert.',
    images: ['img/shop/vacay1.jpg', 'img/shop/vacay2.jpg', 'img/shop/vacay3.jpg', 'img/shop/vacay4.jpg'],
    details: 'Das "VACAY" T-Shirt bringt Urlaubsstimmung in den Alltag. Für alle, die vom nächsten Trip träumen.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 9,
    name: 'Oversized T-Shirt "SUNSET"',
    category: 'tshirts',
    price: 29.99,
    description: 'Sonnenuntergang-Design mit warmen Farben. Romantisch und atmosphärisch.',
    images: ['img/shop/sunset1.jpg', 'img/shop/sunset2.jpg', 'img/shop/sunset3.jpg', 'img/shop/sunset4.jpg'],
    details: 'Das "SUNSET" T-Shirt fängt die magische Stimmung des Sonnenuntergangs ein. Perfekt für romantische Momente.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 10,
    name: 'Oversized T-Shirt "FUJISAN"',
    category: 'tshirts',
    price: 29.99,
    description: 'Japanisch-inspiriertes Design mit Mount Fuji. Zen und Eleganz.',
    images: ['img/shop/fujisan1.jpg', 'img/shop/fujisan2.jpg', 'img/shop/fujisan3.jpg', 'img/shop/fujisan4.jpg'],
    details: 'Das "FUJISAN" T-Shirt verbindet japanische Ästhetik mit modernem Streetwear. Zen-inspiriert und zeitlos.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 11,
    name: 'Oversized T-Shirt "CLAIRE DE LUNE"',
    category: 'tshirts',
    price: 29.99,
    description: 'Mondschein-Design mit mystischer Ausstrahlung. Elegant und geheimnisvoll.',
    images: ['img/shop/clairedelune2.jpg', 'img/shop/clairedelune1.jpg', 'img/shop/clairedelune3.jpg', 'img/shop/clairedelune4.jpg'],
    details: 'Das "CLAIRE DE LUNE" T-Shirt fängt die Poesie des Mondlichts ein. Mystisch und wunderschön.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 12,
    name: 'Oversized T-Shirt "INFERNO"',
    category: 'tshirts',
    price: 29.99,
    description: 'Feurigen Design mit intensiven Farben. Kraftvoll und leidenschaftlich.',
    images: ['img/shop/inferno1.jpg', 'img/shop/inferno2.jpg', 'img/shop/inferno3.jpg', 'img/shop/inferno4.jpg'],
    details: 'Das "INFERNO" T-Shirt steht für pure Leidenschaft und Intensität. Ein Statement für Feuer und Flamme.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 13,
    name: 'Oversized T-Shirt "MOUNTAIN"',
    category: 'tshirts',
    price: 29.99,
    description: 'Berg-inspiriertes Design mit Gipfeln und Landschaften. Stark und erhaben.',
    images: ['img/shop/mountain1.jpg', 'img/shop/mountain2.jpg', 'img/shop/mountain3.jpg', 'img/shop/mountain4.jpg', 'img/shop/mountain5.jpg', 'img/shop/mountain6.jpg'],
    details: 'Das "MOUNTAIN" T-Shirt symbolisiert Stärke und Erhabenheit der Berge.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 14,
    name: 'Oversized T-Shirt "FOREST"',
    category: 'tshirts',
    price: 29.99,
    description: 'Wald-inspiriertes Design mit Bäumen und Blättern. Organisch und lebendig.',
    images: ['img/shop/forest1.jpg', 'img/shop/forest2.jpg', 'img/shop/forest3.jpg', 'img/shop/forest4.jpg', 'img/shop/forest5.jpg', 'img/shop/forest6.jpg'],
    details: 'Das "FOREST" T-Shirt bringt die Lebendigkeit und Ruhe des Waldes zum Ausdruck.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 15,
    name: 'Oversized T-Shirt "DESERT"',
    category: 'tshirts',
    price: 29.99,
    description: 'Wüsten-inspiriertes Design mit Sand und Kakteen. Warm und mysteriös.',
    images: ['img/shop/desert1.jpg', 'img/shop/desert2.jpg', 'img/shop/desert3.jpg', 'img/shop/desert4.jpg', 'img/shop/desert5.jpg', 'img/shop/desert6.jpg'],
    details: 'Das "DESERT" T-Shirt fängt die Wärme und Mystik der Wüste ein.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 16,
    name: 'Oversized T-Shirt "SUNSET"',
    category: 'tshirts',
    price: 29.99,
    description: 'Sonnenuntergang-Design mit warmen Farben. Romantisch und atmosphärisch.',
    images: ['img/shop/sunset1.jpg', 'img/shop/sunset2.jpg', 'img/shop/sunset3.jpg', 'img/shop/sunset4.jpg', 'img/shop/sunset5.jpg', 'img/shop/sunset6.jpg'],
    details: 'Das "SUNSET" T-Shirt fängt die magische Atmosphäre eines Sonnenuntergangs ein.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 17,
    name: 'Oversized T-Shirt "AURORA"',
    category: 'tshirts',
    price: 29.99,
    description: 'Nordlichter-Design mit leuchtenden Farben. Magisch und hypnotisch.',
    images: ['img/shop/aurora1.jpg', 'img/shop/aurora2.jpg', 'img/shop/aurora3.jpg', 'img/shop/aurora4.jpg', 'img/shop/aurora5.jpg', 'img/shop/aurora6.jpg'],
    details: 'Das "AURORA" T-Shirt bringt die Magie der Nordlichter auf deine Kleidung.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 18,
    name: 'Oversized T-Shirt "VOLCANO"',
    category: 'tshirts',
    price: 29.99,
    description: 'Vulkan-Design mit Feuer und Lava. Kraftvoll und explosiv.',
    images: ['img/shop/volcano1.jpg', 'img/shop/volcano2.jpg', 'img/shop/volcano3.jpg', 'img/shop/volcano4.jpg', 'img/shop/volcano5.jpg', 'img/shop/volcano6.jpg'],
    details: 'Das "VOLCANO" T-Shirt symbolisiert die rohe Kraft und Energie der Natur.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 19,
    name: 'Oversized T-Shirt "GLACIER"',
    category: 'tshirts',
    price: 29.99,
    description: 'Gletscher-Design mit Eis und Kristallen. Kalt und kristallklar.',
    images: ['img/shop/glacier1.jpg', 'img/shop/glacier2.jpg', 'img/shop/glacier3.jpg', 'img/shop/glacier4.jpg', 'img/shop/glacier5.jpg', 'img/shop/glacier6.jpg'],
    details: 'Das "GLACIER" T-Shirt fängt die Klarheit und Kälte der Gletscher ein.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 20,
    name: 'Oversized T-Shirt "THUNDER"',
    category: 'tshirts',
    price: 29.99,
    description: 'Gewitter-Design mit Blitzen und Wolken. Dramatisch und kraftvoll.',
    images: ['img/shop/thunder1.jpg', 'img/shop/thunder2.jpg', 'img/shop/thunder3.jpg', 'img/shop/thunder4.jpg', 'img/shop/thunder5.jpg', 'img/shop/thunder6.jpg'],
    details: 'Das "THUNDER" T-Shirt symbolisiert die dramatische Kraft der Natur.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 21,
    name: 'Oversized T-Shirt "RAINBOW"',
    category: 'tshirts',
    price: 29.99,
    description: 'Regenbogen-Design mit allen Farben. Bunt und lebensfroh.',
    images: ['img/shop/rainbow1.jpg', 'img/shop/rainbow2.jpg', 'img/shop/rainbow3.jpg', 'img/shop/rainbow4.jpg', 'img/shop/rainbow5.jpg', 'img/shop/rainbow6.jpg'],
    details: 'Das "RAINBOW" T-Shirt bringt Freude und Vielfalt zum Ausdruck.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 22,
    name: 'Oversized T-Shirt "METEOR"',
    category: 'tshirts',
    price: 29.99,
    description: 'Meteor-Design mit Sternschnuppen. Schnell und spektakulär.',
    images: ['img/shop/meteor1.jpg', 'img/shop/meteor2.jpg', 'img/shop/meteor3.jpg', 'img/shop/meteor4.jpg', 'img/shop/meteor5.jpg', 'img/shop/meteor6.jpg'],
    details: 'Das "METEOR" T-Shirt symbolisiert Geschwindigkeit und Spektakel.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 23,
    name: 'Oversized T-Shirt "QUANTUM"',
    category: 'tshirts',
    price: 29.99,
    description: 'Quanten-Design mit Teilchen und Wellen. Wissenschaftlich und mysteriös.',
    images: ['img/shop/quantum1.jpg', 'img/shop/quantum2.jpg', 'img/shop/quantum3.jpg', 'img/shop/quantum4.jpg', 'img/shop/quantum5.jpg', 'img/shop/quantum6.jpg'],
    details: 'Das "QUANTUM" T-Shirt bringt die Mystik der Quantenphysik zum Ausdruck.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 24,
    name: 'Oversized T-Shirt "HOLOGRAM"',
    category: 'tshirts',
    price: 29.99,
    description: 'Hologramm-Design mit prismatischen Effekten. Futuristisch und schillernd.',
    images: ['img/shop/hologram1.jpg', 'img/shop/hologram2.jpg', 'img/shop/hologram3.jpg', 'img/shop/hologram4.jpg', 'img/shop/hologram5.jpg', 'img/shop/hologram6.jpg'],
    details: 'Das "HOLOGRAM" T-Shirt bringt futuristische Hologramm-Effekte zum Ausdruck.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 25,
    name: 'Oversized T-Shirt "CRYSTAL"',
    category: 'tshirts',
    price: 29.99,
    description: 'Kristall-Design mit geometrischen Formen. Klar und strukturiert.',
    images: ['img/shop/crystal1.jpg', 'img/shop/crystal2.jpg', 'img/shop/crystal3.jpg', 'img/shop/crystal4.jpg', 'img/shop/crystal5.jpg', 'img/shop/crystal6.jpg'],
    details: 'Das "CRYSTAL" T-Shirt symbolisiert Klarheit und Struktur.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  {
    id: 26,
    name: 'Oversized T-Shirt "PHOENIX"',
    category: 'tshirts',
    price: 29.99,
    description: 'Phönix-Design mit Feuer und Wiedergeburt. Symbolisch und kraftvoll.',
    images: ['img/shop/phoenix1.jpg', 'img/shop/phoenix2.jpg', 'img/shop/phoenix3.jpg', 'img/shop/phoenix4.jpg', 'img/shop/phoenix5.jpg', 'img/shop/phoenix6.jpg'],
    details: 'Das "PHOENIX" T-Shirt symbolisiert Wiedergeburt und Transformation.',
    care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen.'
  },
  
  // Taschen (4 Stück)
  {
    id: 27,
    name: 'Tasche "COSMIC"',
    category: 'bags',
    price: 29.99,
    description: 'Weltraum-inspirierte Tasche mit Galaxie-Design. Perfekt für den Alltag.',
    images: ['img/shop/cosmic-bag1.jpg', 'img/shop/cosmic-bag2.jpg', 'img/shop/cosmic-bag3.jpg', 'img/shop/cosmic-bag4.jpg', 'img/shop/cosmic-bag5.jpg', 'img/shop/cosmic-bag6.jpg'],
    details: 'Die "COSMIC" Tasche bringt das Universum in deinen Alltag. Mit robustem Material und praktischem Design.',
    care: 'Mit feuchtem Tuch abwischen, nicht in der Waschmaschine waschen, vor direkter Sonneneinstrahlung schützen.'
  },
  {
    id: 28,
    name: 'Tasche "URBAN"',
    category: 'bags',
    price: 29.99,
    description: 'Städtische Tasche mit Graffiti-Elementen. Urban und funktional.',
    images: ['img/shop/urban-bag1.jpg', 'img/shop/urban-bag2.jpg', 'img/shop/urban-bag3.jpg', 'img/shop/urban-bag4.jpg', 'img/shop/urban-bag5.jpg', 'img/shop/urban-bag6.jpg'],
    details: 'Die "URBAN" Tasche kombiniert Street-Style mit Funktionalität. Perfekt für den urbanen Lifestyle.',
    care: 'Mit feuchtem Tuch abwischen, nicht in der Waschmaschine waschen, vor direkter Sonneneinstrahlung schützen.'
  },
  {
    id: 29,
    name: 'Tasche "NATURE"',
    category: 'bags',
    price: 29.99,
    description: 'Natur-inspirierte Tasche mit organischen Formen. Verbunden mit der Erde.',
    images: ['img/shop/nature-bag1.jpg', 'img/shop/nature-bag2.jpg', 'img/shop/nature-bag3.jpg', 'img/shop/nature-bag4.jpg', 'img/shop/nature-bag5.jpg', 'img/shop/nature-bag6.jpg'],
    details: 'Die "NATURE" Tasche feiert die Schönheit der Natur mit nachhaltigen Materialien.',
    care: 'Mit feuchtem Tuch abwischen, nicht in der Waschmaschine waschen, vor direkter Sonneneinstrahlung schützen.'
  },
  {
    id: 30,
    name: 'Tasche "MINIMAL"',
    category: 'bags',
    price: 29.99,
    description: 'Minimalistische Tasche mit zeitlosem Design. Elegant und funktional.',
    images: ['img/shop/minimal-bag1.jpg', 'img/shop/minimal-bag2.jpg', 'img/shop/minimal-bag3.jpg', 'img/shop/minimal-bag4.jpg', 'img/shop/minimal-bag5.jpg', 'img/shop/minimal-bag6.jpg'],
    details: 'Die "MINIMAL" Tasche beweist, dass weniger mehr ist. Mit zeitlosem Design und hoher Funktionalität.',
    care: 'Mit feuchtem Tuch abwischen, nicht in der Waschmaschine waschen, vor direkter Sonneneinstrahlung schützen.'
  }
];

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  displayProducts();
  setupFilterButtons();
  updateCartDisplay();
});

// Cleanup - alle Slideshows stoppen wenn Seite verlassen wird
window.addEventListener('beforeunload', function() {
  slideshowTimers.forEach((timer, productId) => {
    clearInterval(timer);
  });
  slideshowTimers.clear();
  currentImageIndex.clear();
});

// Produkte anzeigen
function displayProducts() {
  // Alle aktiven Slideshows stoppen vor Neuladung
  slideshowTimers.forEach((timer) => {
    clearInterval(timer);
  });
  slideshowTimers.clear();
  currentImageIndex.clear();
  
  const container = document.getElementById('productsContainer');
  const filteredProducts = currentFilter === 'all' 
    ? products 
    : products.filter(product => product.category === currentFilter);
  
  container.innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="openProductPage(${product.id})" 
         onmouseenter="startSlideshow(${product.id})" 
         onmouseleave="stopSlideshow(${product.id})"
         data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}" onerror="this.style.display='none'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">€${product.price.toFixed(2)}</div>
        <div class="product-actions">
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartFromShop(${product.id})">
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter-Buttons einrichten
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      displayProducts();
    });
  });
}

// Warenkorb aus localStorage laden
function loadCart() {
  if (cartCache !== null) {
    cart = cartCache;
    return;
  }
  const stored = localStorage.getItem('cart');
  cart = stored ? JSON.parse(stored) : [];
  cartCache = cart;
}

// Warenkorb in localStorage speichern
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCache = cart; // Cache aktualisieren
}

// Zum Warenkorb hinzufügen (vom Shop)
function addToCartFromShop(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    saveCart();
    updateCartDisplay();
    morphCartIcon();
    showNotification(`${product.name} zum Warenkorb hinzugefügt!`);
  }
}

// Warenkorb-Anzeige aktualisieren
function updateCartDisplay() {
  loadCart();
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Cart Modal öffnen
function openCartModal() {
  loadCart();
  const modal = document.getElementById('cartModal');
  modal.classList.add('active');
  updateCartModal();
}

// Cart Modal schließen
function closeCartModal() {
  const modal = document.getElementById('cartModal');
  modal.classList.remove('active');
}

// Cart Modal aktualisieren
function updateCartModal() {
  loadCart();
  const cartItems = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #cccccc;">Dein Warenkorb ist leer</p>';
    cartSubtotal.textContent = '€0.00';
    cartTotal.textContent = '€4.99';
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">€${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="changeCartQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="changeCartQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 4.99;
  cartSubtotal.textContent = `€${subtotal.toFixed(2)}`;
  cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Warenkorb-Menge ändern
function changeCartQuantity(productId, change) {
  loadCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    saveCart();
    updateCartDisplay();
    updateCartModal();
  }
}

// PayPal Checkout - Direkt öffnen
function processPayPalCheckout() {
  loadCart();
  if (cart.length === 0) {
    showNotification('Dein Warenkorb ist leer!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 4.99;
  
  // PayPal Checkout URL - URL-enkodiert für bessere Kompatibilität
  const itemName = encodeURIComponent('DailyDopamin Bestellung');
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=dominik.trausmuth@gmail.com&item_name=${itemName}&amount=${total.toFixed(2)}&currency_code=EUR&no_shipping=1&return=http://localhost/success.html&cancel_return=http://localhost/cancel.html`;
  
  // PayPal direkt öffnen - kein zusätzlicher Button
  const newWindow = window.open(paypalUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
  if (newWindow) {
    newWindow.focus();
  }
  
  closeCartModal();
  showNotification('PayPal wird geöffnet...');
  
  // Warenkorb leeren
  setTimeout(() => {
    cart = [];
    saveCart();
    updateCartDisplay();
  }, 1500);
}

// E-Mail-Bestätigung entfernt - vereinfacht für bessere Performance
// Bestellnummer generieren
function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `DD-${timestamp}-${random}`;
}

// Produktseite öffnen
function openProductPage(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    // Produktseite URL erstellen
    const productPageUrl = `product-${productId}.html`;
    window.location.href = productPageUrl;
  }
}

// Benachrichtigung anzeigen
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 120px;
    right: 20px;
    background: linear-gradient(135deg, #4A90E2, #6BB6FF);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    z-index: 10001;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(255, 79, 154, 0.4);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// CSS für Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// --- Produktdaten: Drei von vier Taschen als Bauchtaschen markieren ---
// Im products-Array:
// id: 27, 28, 29 sind jetzt Bauchtaschen
products.forEach(product => {
  if (product.category === 'bags' && [27,28,29].includes(product.id)) {
    product.name = product.name.replace('Tasche', 'Bauchtasche');
    product.description = 'Bauchtasche: ' + product.description;
    product.details = 'Bauchtasche. ' + product.details;
  }
});

// Performance-optimierte Hover-Slideshow
const slideshowTimers = new Map();
const currentImageIndex = new Map();

function startSlideshow(productId) {
  // Bestehenden Timer stoppen falls vorhanden
  stopSlideshow(productId);
  
  const product = products.find(p => p.id === productId);
  if (!product || product.images.length <= 1) return;
  
  // Index auf 0 setzen
  currentImageIndex.set(productId, 0);
  
  // Timer für Bildwechsel alle 2 Sekunden
  const timer = setInterval(() => {
    const currentIndex = currentImageIndex.get(productId) || 0;
    const nextIndex = (currentIndex + 1) % product.images.length;
    currentImageIndex.set(productId, nextIndex);
    
    // Direkter Bildwechsel ohne Animationen
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
      const img = productCard.querySelector('.product-image img');
      if (img) {
        img.src = product.images[nextIndex];
      }
    }
  }, 2000);
  
  slideshowTimers.set(productId, timer);
}

function stopSlideshow(productId) {
  const timer = slideshowTimers.get(productId);
  if (timer) {
    clearInterval(timer);
    slideshowTimers.delete(timer);
  }
  
  // Zurück zum ersten Bild
  const product = products.find(p => p.id === productId);
  if (product) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
      const img = productCard.querySelector('.product-image img');
      if (img && img.src !== product.images[0]) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = product.images[0];
          setTimeout(() => {
            img.style.opacity = '1';
          }, 50);
        }, 400);
      }
    }
  }
  
  currentImageIndex.delete(productId);
}

// Morphing Cart Icon Function
function morphCartIcon() {
  const cartBtn = document.querySelector('.cart-icon-btn');
  const icon = cartBtn.querySelector('.icon');
  
  // Step 1: Morph to loading
  cartBtn.classList.add('morphing');
  
  setTimeout(() => {
    // Step 2: Change to checkmark
    icon.textContent = '✓';
    cartBtn.classList.remove('morphing');
    cartBtn.classList.add('success');
    
    setTimeout(() => {
      // Step 3: Pulse effect
      cartBtn.classList.add('pulse');
      
      setTimeout(() => {
        // Step 4: Return to cart
        cartBtn.classList.remove('pulse', 'success');
        cartBtn.classList.add('morphing');
        
        setTimeout(() => {
          icon.textContent = '🛒';
          cartBtn.classList.remove('morphing');
        }, 200);
      }, 600);
    }, 400);
  }, 200);
}