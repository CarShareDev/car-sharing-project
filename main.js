document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------------------------------
    // 1. Language Toggle (EN/AR)
    // ------------------------------------------------------------------
    const langToggle = document.getElementById('langToggle');
    let isEnglish = true;
    
    // Function to apply the language change
    function setLanguage(lang) {
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const translation = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            if (translation) {
                element.textContent = translation;
            }
        });
        
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('arabic', lang === 'ar');
        document.body.classList.toggle('english', lang === 'en');
        isEnglish = lang === 'en';
        langToggle.textContent = isEnglish ? 'EN / عربي' : 'AR / English';
    }

    // Toggle button click handler
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(isEnglish ? 'ar' : 'en');
        });
    }

    // Set initial language to English
    setLanguage('en'); 

    // ------------------------------------------------------------------
    // 2. Stats Counter Animation
    // ------------------------------------------------------------------
    const statsCounters = document.querySelectorAll('.stats-counter');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const start = 0;
        const duration = 2000; 

        anime({
            targets: el,
            innerHTML: [start, target],
            easing: 'linear',
            round: 1, // Round to the nearest integer
            duration: duration,
        });
    };

    // Use Intersection Observer to animate when in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    statsCounters.forEach(counter => {
        observer.observe(counter);
    });

    // ------------------------------------------------------------------
    // 3. Car Data Handling (Disabled to remove sample cars)
    // ------------------------------------------------------------------
    const carGrid = document.getElementById('carGrid');
    const noCarsMessage = document.getElementById('noCarsMessage');
    
    // NOTE: The 'carsData' array has been removed from this file.
    // If you add a server-side API later, you can fetch real data here.

    // Show 'No Cars' message since the data array is empty/removed
    if (carGrid) {
        carGrid.innerHTML = ''; // Ensure the grid is completely empty
        if (noCarsMessage) {
             // Since noCarsMessage is initially hidden in index.html, we show it
             noCarsMessage.classList.remove('hidden');
        }
        
        // This will display the message that there are no cars.
        // We will manually append the message to the grid if it exists
        if (noCarsMessage && carGrid) {
             carGrid.appendChild(noCarsMessage);
        }
    }
});
