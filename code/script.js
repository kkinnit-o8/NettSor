document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const services = Array.from(document.querySelectorAll('.service'));
    
    let currentIndex = Math.floor(services.length / 2); // Start with the middle card
    const cardWidth = 320; // 300px card + 20px gap
    const totalCards = services.length;
    
    // Update carousel position and active state
    function updateCarousel() {
    const translateX = -currentIndex * cardWidth + (carousel.parentElement.offsetWidth / 2) - (cardWidth / 2);
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Update active state
    services.forEach((service, index) => {
        service.classList.toggle('active', index === currentIndex);
    });
    }
    
    // Next button click with infinite loop
    nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards; // Loop back to 0 when reaching the end
    updateCarousel();
    });
    
    // Previous button click with infinite loop
    prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Loop to last when going before 0
    updateCarousel();
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 100);
    });
    
    // Add touch/swipe support for mobile with infinite loop
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
        // Swipe left - next (with infinite loop)
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
        } else if (diff < 0) {
        // Swipe right - previous (with infinite loop)
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
        }
    }
    
    isDragging = false;
    });
    
    // Keyboard navigation with infinite loop
    document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }
    });
    
    // Optional: Auto-play functionality (uncomment to enable)
    // setInterval(() => {
    //   currentIndex = (currentIndex + 1) % totalCards;
    //   updateCarousel();
    // }, 4000); // Change slide every 4 seconds
});