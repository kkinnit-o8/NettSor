cards_content = {
    "Utvikling": `
        <h2>Utvikling</h2>
        <p>Vi bygger moderne, responsive nettsider fra bunnen av med fokus på ytelse og brukervennlighet.</p>
        <p>Våre utviklere har erfaring med HTML, CSS, JavaScript, databaser og mye mer.</p>
        <p>Enten du trenger en enkel nettside eller en kompleks webapplikasjon, kan vi hjelpe deg.</p>
        `
    
}

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const services = Array.from(document.querySelectorAll('.service'));
    
    let currentIndex = Math.floor(services.length / 2); // Start with the middle card
    const cardWidth = 320; // 300px card + 20px gap
    const totalCards = services.length;


    function closeModal(overlay, modal) {

        overlay.classList.add('exit');
        modal.classList.add('exit');

        setTimeout(() => {
            overlay.remove();
        }, 300); // Match the exit animation duration1
    }

    function showModal(service) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const effect = document.createElement('div');
        effect.classList.add('mouse-effect');
        overlay.appendChild(effect);

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalcontent = document.createElement('div');
        modalcontent.classList.add('modal-content');

        const name = service.querySelector('h3').textContent;
        modalcontent.innerHTML = cards_content[name];
        modalcontent.innerHTML += `
            <div class="close-modal-btn">Lukk</div>
        `;

        modal.appendChild(modalcontent);
        overlay.appendChild(modal);

        overlay.addEventListener('mousemove', (e) => {
            const isOverModal = modalcontent.contains(e.target);
            if (isOverModal) return;

            const trail = document.createElement('div');
            trail.classList.add('trail');
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            overlay.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 500);
        });

        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            closeModal(overlay, modalcontent);
        });

        // ✅ Click on overlay background closes modal
        overlay.addEventListener('click', (e) => {
            const isOverModal = modalcontent.contains(e.target);
            if (isOverModal) return;
            closeModal(overlay, modalcontent);
        });

        document.body.appendChild(overlay);
    }



    
    services.forEach((service, index) => {
        service.addEventListener('click', () => {
            if (index === currentIndex) {
                // Card is already active → show modal
                showModal(service);
            } else {
                // Card is not active → scroll to it
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
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

