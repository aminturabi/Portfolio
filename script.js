document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Hover effect for interactive elements
    const interactives = document.querySelectorAll('a, button, .interactive-card, input, textarea');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Handle cursor leaving the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorDot.style.opacity = 0;
            cursorOutline.style.opacity = 0;
        }
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
    });


    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120; // Trigger slightly earlier for smoother feel

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load to show initial elements
    setTimeout(revealOnScroll, 100);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link, a.navbar-brand, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if(targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Calculate offset taking fixed navbar into account
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active state for navigation links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - navHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Handle form submission using FormSubmit
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ms-2"></i>';
            btn.disabled = true;

            // Call FormSubmit API
            fetch("https://formsubmit.co/ajax/aminturabi594@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: "New Message from Portfolio Website!"
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check ms-2"></i>';
                btn.classList.replace('btn-gradient', 'btn-success');
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-success', 'btn-gradient');
                    btn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error("Form submission error:", error);
                btn.innerHTML = 'Error! Try Again <i class="fas fa-times ms-2"></i>';
                btn.classList.replace('btn-gradient', 'btn-danger');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-danger', 'btn-gradient');
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
