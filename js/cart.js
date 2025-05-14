
document.addEventListener('DOMContentLoaded', function() {
  // Load menu items
  loadMenuItems();
  
  // Load cart
  loadCart();
  
  // Category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      // Filter menu items
      filterMenuItems(category);
    });
  });
  
  // Checkout button functionality
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  
  checkoutBtn.addEventListener('click', function() {
    if (!this.hasAttribute('disabled')) {
      // Update hidden form fields with order details
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      document.getElementById('order-details').value = JSON.stringify(cart);
      document.getElementById('order-total').value = calculateTotal().total;
      
      // Display checkout modal
      checkoutModal.style.display = 'block';
    }
  });
  
  // Payment method change
  const paymentSelect = document.getElementById('payment');
  const cardDetails = document.getElementById('card-details');
  
  if (paymentSelect && cardDetails) {
    paymentSelect.addEventListener('change', function() {
      if (this.value === 'credit' || this.value === 'debit') {
        cardDetails.classList.remove('hidden');
      } else {
        cardDetails.classList.add('hidden');
      }
    });
  }
  
  // Form submission
  const checkoutForm = document.getElementById('checkout-form');
  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally send the data to the server
      // For demonstration, we'll just show a success message
      alert('Thank you for your order! It will be ready shortly.');
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Close modal
      checkoutModal.style.display = 'none';
      
      // Reload cart
      loadCart();
      
      // Redirect to index page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }
});

// Load menu items from a sample data (in a real app, this would come from a server)
function loadMenuItems() {
  const menuItems = [
    {
      id: 'app1',
      name: 'Tomato Bruschetta',
      price: 12,
      category: 'appetizers',
      image: 'images/tomato-bruschetta.jpg',
      description: 'Toasted sourdough bread topped with diced tomatoes, fresh basil, and garlic'
    },
    {
      id: 'app2',
      name: 'Crispy Calamari',
      price: 14,
      category: 'appetizers',
      image: 'images/Calamari-5.jpg',
      description: 'Lightly fried calamari served with lemon aioli and marinara sauce'
    },
    {
      id: 'main1',
      name: 'Grilled Salmon',
      price: 28,
      category: 'main-courses',
      image: 'images/grilled salmon.jpg',
      description: 'Wild-caught salmon with lemon butter sauce, served with asparagus and rice pilaf'
    },
    {
      id: 'main2',
      name: 'Filet Mignon',
      price: 34,
      category: 'main-courses',
      image: 'images/Filet-Mignon.jpg',
      description: '8oz grass-fed beef tenderloin with red wine reduction, served with truffle mashed potatoes'
    },
    {
      id: 'dessert1',
      name: 'Classic Tiramisu',
      price: 10,
      category: 'desserts',
      image: 'images/Classic Tiramisu.avif',
      description: 'Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder'
    },
    {
      id: 'drink1',
      name: 'House Red Wine',
      price: 9,
      category: 'drinks',
      image: 'images/HOUSE-WINES.jpg',
      description: 'Glass of our house selection Cabernet Sauvignon'
    }
  ];
  
  const menuContainer = document.querySelector('.menu-items-container');
  
  if (menuContainer) {
    let menuHTML = '';
    
    menuItems.forEach(item => {
      menuHTML += `
        <div class="menu-item" data-category="${item.category}">
          <div class="menu-item-img" style="background-image: url('${item.image}')"></div>
          <div class="menu-item-info">
            <div class="menu-item-header">
              <h3>${item.name}</h3>
              <span class="price">$${item.price}</span>
            </div>
            <p class="description">${item.description}</p>
            <button class="btn small-btn add-to-cart" 
              data-id="${item.id}" 
              data-name="${item.name}" 
              data-price="${item.price}">
              Add to Order
            </button>
          </div>
        </div>
      `;
    });
    
    menuContainer.innerHTML = menuHTML;
    
    // Add click event listeners to the add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }
}

// Filter menu items based on category
function filterMenuItems(category) {
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Add item to cart
function addToCart() {
  const id = this.getAttribute('data-id');
  const name = this.getAttribute('data-name');
  const price = parseFloat(this.getAttribute('data-price'));
  
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if item already in cart
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart display
  loadCart();
}

// Load cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (cartItems) {
    // Update cart count
    cartCount.textContent = `(${cart.reduce((total, item) => total + item.quantity, 0)})`;
    
    if (cart.length === 0) {
      // Empty cart message
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
          <p class="hint">Add items from the menu to get started</p>
        </div>
      `;
      checkoutBtn.setAttribute('disabled', 'disabled');
    } else {
      let cartHTML = '';
      
      cart.forEach(item => {
        cartHTML += `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn increase">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="remove-item"><i class="fas fa-times"></i></div>
          </div>
        `;
      });
      
      cartItems.innerHTML = cartHTML;
      checkoutBtn.removeAttribute('disabled');
      
      // Add event listeners for quantity controls
      document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
      });
      
      document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
      });
      
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
      });
    }
    
    // Update total
    updateTotal();
  }
}

// Increase item quantity
function increaseQuantity() {
  const id = this.closest('.cart-item').getAttribute('data-id');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

// Decrease item quantity
function decreaseQuantity() {
  const id = this.closest('.cart-item').getAttribute('data-id');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity -= 1;
    
    if (item.quantity <= 0) {
      cart = cart.filter(cartItem => cartItem.id !== id);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

// Remove item from cart
function removeItem() {
  const id = this.closest('.cart-item').getAttribute('data-id');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Update total price
function updateTotal() {
  const { subtotal, tax, total } = calculateTotal();
  
  document.getElementById('subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax-amount').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
}

// Calculate totals
function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
}
