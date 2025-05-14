
document.addEventListener('DOMContentLoaded', function() {
  // Category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      // Show all if "All" is selected
      if (category === 'all') {
        menuCategories.forEach(cat => cat.style.display = 'block');
      } else {
        // Hide all categories
        menuCategories.forEach(cat => cat.style.display = 'none');
        
        // Show only selected category
        document.getElementById(category).style.display = 'block';
      }
    });
  });
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartNotification = document.querySelector('.cart-notification');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
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
      
      // Show notification
      showCartNotification();
    });
  });
  
  function showCartNotification() {
    cartNotification.classList.add('show');
    
    setTimeout(() => {
      cartNotification.classList.remove('show');
    }, 3000);
  }
});
