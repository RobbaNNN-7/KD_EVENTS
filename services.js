document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation class
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            // Remove animation class
            this.style.transform = 'translateY(0)';
        });

        // Add click handler
        card.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});