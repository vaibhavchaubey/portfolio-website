document.addEventListener('DOMContentLoaded', () => {

    // 0. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon   = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.classList.remove('light-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const next    = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });

    // 1. Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks  = document.querySelector('.nav-links');
    const navItems  = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // 3. Navbar Scroll Effect & Active Link Highlighting
    const navbar   = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (current && a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 4. Typewriter Effect
    const roles    = ["Full Stack Developer.", "Backend Engineer.", "Microservices Architect.", "Open to New Roles."];
    let roleIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;
    const typeElem = document.getElementById('typewriter-text');

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typeElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed  = 2000;   // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
            typeSpeed  = 500;    // pause before next word
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000); // initial delay

    // 5. Scroll Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 6. Number Counter Animation
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target    = +entry.target.getAttribute('data-target');
                let count       = 0;
                const increment = target / (2000 / 16); // 2 s at ~60 fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

});
