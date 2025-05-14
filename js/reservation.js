
document.addEventListener('DOMContentLoaded', function() {
  // Initialize date picker
  if (typeof flatpickr !== 'undefined') {
    flatpickr(".datepicker", {
      minDate: "today",
      dateFormat: "Y-m-d",
      disable: [
        function(date) {
          // Disable Mondays if restaurant is closed
          // return date.getDay() === 1;
          return false; // Currently no disabled dates
        }
      ],
      locale: {
        firstDayOfWeek: 1 // Start week on Monday
      }
    });
  }
  
  // Form submission
  const reservationForm = document.getElementById('reservation-form');
  const confirmationModal = document.getElementById('confirmation-modal');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateForm()) {
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const specialRequests = document.getElementById('special-requests').value;
        
        // In a real application, you would send this data to the server
        // For this demonstration, we'll just show the confirmation
        
        // Update confirmation modal
        document.getElementById('confirm-name').textContent = name;
        document.getElementById('confirm-date').textContent = formatDate(date);
        document.getElementById('confirm-time').textContent = formatTime(time);
        document.getElementById('confirm-guests').textContent = formatGuests(guests);
        
        // Show confirmation modal
        confirmationModal.style.display = 'block';
        
        // Reset form
        reservationForm.reset();
      }
    });
  }
});

// Validate form
function validateForm() {
  // Get form fields
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const guests = document.getElementById('guests').value;
  
  // Basic validation
  if (!name || !email || !phone || !date || !time || !guests) {
    alert('Please fill in all required fields');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  // Phone validation
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number');
    return false;
  }
  
  return true;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Format time for display
function formatTime(timeString) {
  // Convert 24-hour time to 12-hour format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Format guests for display
function formatGuests(guestsString) {
  if (guestsString === '1') {
    return '1 Person';
  } else if (guestsString === '7+') {
    return '7+ People';
  } else {
    return `${guestsString} People`;
  }
}
