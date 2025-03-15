document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    const navbar = document.querySelector('.navbar');
    const carousel = document.getElementById('mainCarousel');
    
    // Handle navbar background on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Initialize lightbox for all carousel images
    document.querySelectorAll('[data-toggle="lightbox"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            new Lightbox(el);
        });
    });

    // Handle carousel slide animations
    carousel.addEventListener('slide.bs.carousel', event => {
        const currentSlide = event.from;
        const nextSlide = event.to;
        
        // Remove animations from current slide
        const currentCaption = document.querySelectorAll('.carousel-item')[currentSlide]
            .querySelector('.carousel-caption');
        currentCaption.querySelectorAll('.animate__animated').forEach(el => {
            el.style.opacity = '0';
            el.classList.remove('animate__fadeInUp');
        });

        // Add animations to next slide
        const nextCaption = document.querySelectorAll('.carousel-item')[nextSlide]
            .querySelector('.carousel-caption');
        nextCaption.querySelectorAll('.animate__animated').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.classList.add('animate__fadeInUp');
            }, index * 200);
        });
    });

    // Handle initial slide animations
    setTimeout(() => {
        const activeCaption = document.querySelector('.carousel-item.active .carousel-caption');
        activeCaption.querySelectorAll('.animate__animated').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.classList.add('animate__fadeInUp');
            }, index * 200);
        });
    }, 500);
});
