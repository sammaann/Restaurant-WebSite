
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.nav-links')) {
      if (navLinks && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuBtn.classList.remove('active');
      }
    }
  });

  // Close modals when clicking on close button or outside
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close-modal');
  const closeConfirmBtn = document.querySelector('.close-confirm-btn');
  
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      modals.forEach(modal => {
        modal.style.display = 'none';
      });
    });
  });
  
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener('click', function() {
      document.getElementById('confirmation-modal').style.display = 'none';
    });
  }
  
  window.addEventListener('click', function(event) {
    modals.forEach(modal => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
});

// Animate elements on scroll
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.feature-box, .dish-card, .menu-item, .testimonial');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.classList.add('show');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
