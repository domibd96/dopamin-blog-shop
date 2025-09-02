// Product Page JavaScript
let currentImageIndex = 0;
let productImages = [];
let currentProduct = null;
let cartCache = null; // Cache für bessere Performance

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  loadProductData();
  setupEventListeners();
  updateCartDisplay(); // Warenkorb-Anzeige beim Laden aktualisieren
});

// Produktdaten laden
function loadProductData() {
  // Produkt-ID aus URL extrahieren
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || getProductIdFromUrl();
  
  if (productId) {
    // Produktdaten aus localStorage oder API laden
    const productData = getProductData(productId);
    if (productData) {
      currentProduct = productData;
      productImages = productData.images || [];
      displayProduct();
    }
  }
}

// Produkt-ID aus URL extrahieren
function getProductIdFromUrl() {
  const path = window.location.pathname;
  const match = path.match(/product-(\d+)\.html/);
  return match ? parseInt(match[1]) : null;
}

// Produktdaten abrufen
function getProductData(productId) {
  // Hier würden normalerweise die Produktdaten aus einer API oder Datenbank geladen
  // Für Demo-Zwecke verwenden wir statische Daten
  const products = [
    {
      id: 1,
      name: 'Oversized T-Shirt "ASTRONAUT"',
      price: 29.99,
      description: 'Einzigartiges Oversized T-Shirt mit Astronaut-Design. Perfekt für einen lässigen, modernen Look. Das Design zeigt einen stilisierten Astronauten und ist ideal für alle, die einen außergewöhnlichen Look suchen.',
      images: [
        'img/shop/astronaut1.jpg',
        'img/shop/astronaut2.jpg', 
        'img/shop/astronaut3.jpg',
        'img/shop/astronaut4.jpg',
        'img/shop/astronaut5.jpg',
        'img/shop/astronaut6.jpg'
      ],
      details: 'Dieses Oversized T-Shirt "ASTRONAUT" ist aus hochwertiger Bio-Baumwolle gefertigt und bietet maximalen Komfort. Das einzigartige Design zeigt einen stilisierten Astronauten und ist perfekt für alle, die einen außergewöhnlichen Look suchen. Die Oversized-Passform sorgt für einen lässigen, modernen Look, während die hochwertige Verarbeitung für Langlebigkeit steht.',
      care: 'Maschinenwäsche bei 30°C, nicht bleichen, bei niedriger Temperatur bügeln, nicht chemisch reinigen. Am besten auf links waschen, um das Design zu schonen. Nicht im Trockner trocknen, sondern an der Luft trocknen lassen.'
    }
    // Weitere Produkte würden hier hinzugefügt
  ];
  
  return products.find(p => p.id === parseInt(productId));
}

// Produkt anzeigen
function displayProduct() {
  if (!currentProduct) return;
  
  // Titel und Preis setzen
  document.getElementById('productTitle').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = `€${currentProduct.price.toFixed(2)}`;
  document.getElementById('productDescription').textContent = currentProduct.description;
  document.getElementById('productDetails').textContent = currentProduct.details;
  document.getElementById('careInstructions').textContent = currentProduct.care;
  
  // Bilder anzeigen
  displayImages();
  
  // Seitentitel aktualisieren
  document.title = `${currentProduct.name} - DailyDopamin`;
}

// Bilder anzeigen
function displayImages() {
  if (productImages.length === 0) return;
  
  // Hauptbild setzen
  const mainImage = document.getElementById('mainImage');
  mainImage.src = productImages[currentImageIndex];
  mainImage.alt = currentProduct.name;
  
  // Thumbnails erstellen
  const thumbnailContainer = document.getElementById('thumbnailContainer');
  thumbnailContainer.innerHTML = productImages.map((image, index) => `
    <img src="${image}" 
         alt="${currentProduct.name} - Bild ${index + 1}" 
         class="thumbnail ${index === currentImageIndex ? 'active' : ''}"
         onclick="changeImage(${index - currentImageIndex})"
         onerror="this.style.display='none'">
  `).join('');
}

// Bild ändern
function changeImage(direction) {
  if (productImages.length === 0) return;
  
  if (direction === -1) {
    // Vorheriges Bild
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
  } else if (direction === 1) {
    // Nächstes Bild
    currentImageIndex = currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0;
  } else {
    // Direkter Sprung zu einem Bild
    currentImageIndex = direction;
  }
  
  displayImages();
}

// Menge ändern
function changeQuantity(change) {
  const quantityInput = document.getElementById('quantity');
  let newQuantity = parseInt(quantityInput.value) + change;
  
  // Grenzen einhalten
  newQuantity = Math.max(1, Math.min(10, newQuantity));
  
  quantityInput.value = newQuantity;
}

// Event Listeners einrichten
function setupEventListeners() {
  // Menge-Input Event
  const quantityInput = document.getElementById('quantity');
  quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
      this.value = 1;
    } else if (value > 10) {
      this.value = 10;
    }
  });
  
  // Keyboard Navigation für Bilder
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      changeImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeImage(1);
    }
  });
  
  // Touch Events für Bilder
  let touchStartX = 0;
  let touchEndX = 0;
  
  const mainImageContainer = document.querySelector('.main-image-container');
  
  mainImageContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  mainImageContainer.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe nach links - nächstes Bild
        changeImage(1);
      } else {
        // Swipe nach rechts - vorheriges Bild
        changeImage(-1);
      }
    }
  }
}

// Warenkorb aus localStorage laden
function loadCart() {
  if (cartCache !== null) {
    return cartCache;
  }
  const stored = localStorage.getItem('cart');
  const cart = stored ? JSON.parse(stored) : [];
  cartCache = cart;
  return cart;
}

// Warenkorb in localStorage speichern
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCache = cart; // Cache aktualisieren
}

// Warenkorb-Anzeige aktualisieren
function updateCartDisplay() {
  const cart = loadCart();
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Cart Modal öffnen
function openCartModal() {
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
  const cart = loadCart();
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
  let cart = loadCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    saveCart(cart);
    updateCartDisplay();
    updateCartModal();
  }
}

// PayPal Checkout - verwendet gleiche Logik wie Shop
function processPayPalCheckout() {
  const cart = loadCart();
  if (cart.length === 0) {
    showNotification('Dein Warenkorb ist leer!');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 4.99;
  
  // Vereinfachte PayPal URL
  const paypalUrl = `https://www.paypal.me/dopamin7/${total.toFixed(2)}EUR`;
  
  // Zeige Hinweis und Button
  const paypalHint = document.createElement('div');
  paypalHint.innerHTML = '<p style="color:#FF4F9A;margin:20px 0 10px 0;font-weight:bold;">Klicke auf den Button, um zu PayPal zu gelangen.</p>';
  
  const paypalBtn = document.createElement('button');
  paypalBtn.textContent = 'Zu PayPal';
  paypalBtn.className = 'paypal-checkout-btn';
  paypalBtn.style.cssText = `
    background: linear-gradient(135deg, #0070BA, #005EA6);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin: 10px 0;
    transition: all 0.3s ease;
  `;
  
  paypalBtn.onmouseover = function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 8px 20px rgba(0, 112, 186, 0.4)';
  };
  
  paypalBtn.onmouseout = function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  };
  
  paypalBtn.onclick = function() {
    // Nur bei Klick öffnen - verhindert Bot-Erkennung
    window.open(paypalUrl, '_blank');
    closeCartModal();
    showNotification('Bestellung erfolgreich! Du wirst zu PayPal weitergeleitet.');
    
    // Warenkorb leeren nach erfolgreicher Bestellung
    setTimeout(() => {
      const emptyCart = [];
      saveCart(emptyCart);
      updateCartDisplay();
    }, 1000);
  };
  
  // Modal leeren und neuen Inhalt einfügen
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  cartItems.appendChild(paypalHint);
  cartItems.appendChild(paypalBtn);
}

// Zum Warenkorb hinzufügen
function addToCart() {
  if (!currentProduct) return;
  const quantity = parseInt(document.getElementById('quantity').value);
  let cart = loadCart();
  
  // Prüfen ob Produkt bereits im Warenkorb ist
  const existingItem = cart.find(item => item.id === currentProduct.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      quantity: quantity
    });
  }
  
  // Warenkorb speichern
  saveCart(cart);
  updateCartDisplay();
  
  // Benachrichtigung anzeigen
  showNotification(`${quantity}x ${currentProduct.name} zum Warenkorb hinzugefügt!`);
  
  // Menge zurücksetzen
  document.getElementById('quantity').value = 1;
}

// Benachrichtigung anzeigen
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 120px;
    right: 20px;
    background: linear-gradient(135deg, #FF4F9A, #FF69B4);
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