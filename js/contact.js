document.addEventListener('DOMContentLoaded', function() {
  // Get reference to the contact form
  const contactForm = document.getElementById('contact-form');
  
  // Get reference to the notification element
  const messageNotification = document.getElementById('message-notification');
  
  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      // Prevent the default form submission
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      
      // Convert FormData to a regular object
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // In a real application, you would send the data to the server here
      // For demonstration purposes, we'll just simulate a successful submission
      
      // Simulate form processing with a slight delay
      setTimeout(function() {
        // Show the success notification
        messageNotification.classList.add('show');
        
        // Reset the form
        contactForm.reset();
        
        // Hide notification after 5 seconds
        setTimeout(function() {
          messageNotification.classList.remove('show');
        }, 5000);
      }, 1000);
    });
  }
  
  // Close notification when clicking the close button
  const closeNotificationBtn = document.querySelector('.close-notification');
  if (closeNotificationBtn) {
    closeNotificationBtn.addEventListener('click', function() {
      messageNotification.classList.remove('show');
    });
  }
  
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
});