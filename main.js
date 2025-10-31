document.addEventListener('DOMContentLoaded', () => {
    // 1. Splitting for Hero Text animation
    const heroText = document.getElementById('heroText');
    if (heroText) {
        Splitting({ target: heroText, by: 'chars' });
        anime({
            targets: '.char',
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 30 * i
        });
    }

    // 2. Stats Counter
    const counters = document.querySelectorAll('.stats-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTimestamp = performance.now();

        const step = (timestamp) => {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * target);
            
            counter.textContent = currentCount.toString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    });

    // 3. Language Toggle (Simplified)
    const langToggle = document.getElementById('langToggle');
    let isArabic = false;

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            isArabic = !isArabic;
            document.body.classList.toggle('arabic', isArabic);
            document.body.classList.toggle('rtl', isArabic);

            // Update all elements with data-en/data-ar attributes
            const elements = document.querySelectorAll('[data-en], [data-ar]');
            elements.forEach(el => {
                const text = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
                if (text) {
                    el.textContent = text;
                }
            });
            
            langToggle.textContent = isArabic ? 'EN / عربي' : 'EN / عربي';
        });
        
        // Initial setup for Arabic default (based on previous requests)
        // If you prefer English default, remove the following lines:
        if (langToggle) {
            langToggle.click(); // Click once to set to Arabic initially
        }
    }
});
