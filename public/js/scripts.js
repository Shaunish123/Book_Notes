// This file is intentionally left blank.

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Star Rating System
    const ratingInput = document.getElementById('rating');
    const ratingStars = document.querySelectorAll('.rating-stars i');
    
    if (ratingStars.length > 0) {
        // Set initial stars based on input value
        updateStars(parseInt(ratingInput.value));
        
        // Add click events to stars
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                updateStars(rating);
            });
        });
        
        // Update rating input when changed manually
        ratingInput.addEventListener('change', function() {
            updateStars(parseInt(this.value));
        });
    }
    
    function updateStars(rating) {
        ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }

    // Book Search Functionality
    const searchInput = document.getElementById('searchBooks');
    const bookCards = document.querySelectorAll('.book-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            bookCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Book Sort Functionality
    const sortSelect = document.getElementById('sortBooks');
    const bookGrid = document.querySelector('.book-grid');
    
    if (sortSelect && bookGrid) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const cards = Array.from(bookCards);
            
            cards.sort((a, b) => {
                if (sortBy === 'title') {
                    const titleA = a.querySelector('h3').textContent.toLowerCase();
                    const titleB = b.querySelector('h3').textContent.toLowerCase();
                    return titleA.localeCompare(titleB);
                } else if (sortBy === 'author') {
                    const authorA = a.querySelector('.book-author').textContent.toLowerCase();
                    const authorB = b.querySelector('.book-author').textContent.toLowerCase();
                    return authorA.localeCompare(authorB);
                } else if (sortBy === 'rating') {
                    const ratingA = a.querySelectorAll('.book-rating .fas.fa-star').length;
                    const ratingB = b.querySelectorAll('.book-rating .fas.fa-star').length;
                    return ratingB - ratingA; // Highest first
                }
                return 0;
            });
            
            // Remove all book cards from grid
            bookCards.forEach(card => card.remove());
            
            // Append sorted cards
            cards.forEach(card => bookGrid.appendChild(card));
        });
    }

    // Delete button in edit page
    const deleteBookBtn = document.getElementById('deleteBook');
    if (deleteBookBtn) {
        deleteBookBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this book?')) {
                const bookId = window.location.pathname.split('/').pop();
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/books/delete/${bookId}`;
                document.body.appendChild(form);
                form.submit();
            }
        });
    }
});