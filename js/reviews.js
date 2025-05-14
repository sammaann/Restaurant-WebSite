
document.addEventListener('DOMContentLoaded', function() {
  // Sort reviews functionality
  const sortSelect = document.getElementById('sort-reviews');
  const reviewsGrid = document.querySelector('.reviews-grid');
  const reviewCards = document.querySelectorAll('.review-card');
  
  if (sortSelect && reviewsGrid) {
    sortSelect.addEventListener('change', function() {
      const sortValue = this.value;
      const reviewsArray = Array.from(reviewCards);
      
      // Sort the reviews based on the selected option
      reviewsArray.sort(function(a, b) {
        const aRating = countStars(a.querySelector('.review-rating'));
        const bRating = countStars(b.querySelector('.review-rating'));
        const aDate = new Date(a.querySelector('.review-date').textContent);
        const bDate = new Date(b.querySelector('.review-date').textContent);
        
        if (sortValue === 'newest') {
          return bDate - aDate;
        } else if (sortValue === 'highest') {
          return bRating - aRating || bDate - aDate;
        } else if (sortValue === 'lowest') {
          return aRating - bRating || bDate - aDate;
        }
      });
      
      // Re-append the sorted reviews to the grid
      reviewsGrid.innerHTML = '';
      reviewsArray.forEach(function(review) {
        reviewsGrid.appendChild(review);
      });
    });
  }
  
  // Function to count stars in a rating element
  function countStars(ratingElement) {
    const fullStars = ratingElement.querySelectorAll('.fa-star').length;
    const halfStars = ratingElement.querySelectorAll('.fa-star-half-alt').length;
    return fullStars + (halfStars * 0.5);
  }
  
  // Review form submission
  const reviewForm = document.getElementById('review-form');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('reviewer-name').value;
      const email = document.getElementById('reviewer-email').value;
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const reviewText = document.getElementById('review-text').value;
      
      // Basic validation
      if (!name || !email || !rating || !reviewText) {
        alert('Please fill in all fields and select a rating');
        return;
      }
      
      // In a real application, you would send this data to the server via AJAX
      // For demonstration, we'll just show a success message
      alert('Thank you for your review! It will be published after moderation.');
      
      // Reset form
      reviewForm.reset();
    });
  }
  
  // Rating selection interaction
  const ratingLabels = document.querySelectorAll('.rating-select label');
  
  ratingLabels.forEach(function(label, index) {
    label.addEventListener('mouseover', function() {
      // Highlight this star and all previous ones
      for (let i = 0; i <= index; i++) {
        ratingLabels[i].classList.add('hover');
      }
    });
    
    label.addEventListener('mouseout', function() {
      // Remove highlight from all stars
      ratingLabels.forEach(function(label) {
        label.classList.remove('hover');
      });
    });
  });
  
  // Pagination functionality
  const paginationLinks = document.querySelectorAll('.pagination a');
  
  paginationLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      paginationLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // In a real application, you would fetch and display the reviews for the selected page
      // For demonstration, we'll just scroll back to the top of the reviews section
      document.querySelector('.reviews-list').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
