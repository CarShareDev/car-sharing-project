document.addEventListener('DOMContentLoaded', () => {
    // 1. Splitting for Hero Text animation (only on index.html)
    const heroText = document.getElementById('heroText');
    if (heroText) {
        // Initialize Splitting and Animation
        Splitting({ target: heroText, by: 'chars' });
        anime({
            targets: '.char',
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 30 * i
        });

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
    }

    // 3. Global Language Toggle (Applied to all pages)
    const langToggle = document.getElementById('langToggle');
    // نعتبر أن اللغة الافتراضية هي الإنجليزية (false)
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
        
        // إعداد اللغة العربية كإعداد افتراضي عند التحميل
        langToggle.click(); 
    }
});
