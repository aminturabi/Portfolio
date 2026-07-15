document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    });

    // Hover effect for interactive elements
    // Keep the simple dot only; no outline hover effects
    const interactives = document.querySelectorAll('a, button, .interactive-card, input, textarea');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Handle cursor leaving the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorDot.style.opacity = 0;
        }
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = 1;
    });

    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleIcon = themeToggleBtn.querySelector('i');
        
        const updateToggleIcon = (theme) => {
            if (theme === 'dark') {
                themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
                themeToggleIcon.style.color = 'var(--accent)';
            } else {
                themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
                themeToggleIcon.style.color = 'var(--primary)';
            }
        };

        // Set initial icon based on document attribute set by inline script
        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        updateToggleIcon(currentTheme);

        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }

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
        // Particle Network background
        (function(){
                const bgCanvas = document.getElementById('bg-canvas');
                if(!bgCanvas) return;

                const getParticleOpts = (theme)=>{
                        const isMobile = window.innerWidth < 768;
                        if(theme === 'dark'){
                                return {
                                        density: isMobile ? 30 : 90,
                                        linkDistance: isMobile ? 85 : 130,
                                        speed: isMobile ? 1.5 : 3,
                                        particleColor: '52,227,176',
                                        linkColor: '130,150,170',
                                        cursorColor: '177,140,255',
                                        cursorRadius: isMobile ? 80 : 160,
                                        cursorForce: isMobile ? 0.4 : 0.6,
                                        dotSize: isMobile ? [0.8, 1.8] : [1.1,2.6]
                                };
                        }
                        // light theme opts (higher contrast on pale backgrounds)
                        return {
                                density: isMobile ? 30 : 88,
                                linkDistance: isMobile ? 90 : 150,
                                speed: isMobile ? 1.2 : 2.2,
                                particleColor: '33,80,160',   // darker blue for contrast on light bg
                                linkColor: '70,95,150',       // darker link color
                                particleAlpha: 1.0,
                                linkAlpha: 0.9,
                                glowBlur: isMobile ? 8 : 14,
                                glowColor: '33,80,160',
                                cursorColor: '67,97,238',     // bright accent cursor
                                cursorRadius: isMobile ? 70 : 120,
                                cursorForce: isMobile ? 0.3 : 0.45,
                                dotSize: isMobile ? [1.1, 2.2] : [1.6,3.2]
                        };
                };

                class ParticleNetwork{
                    constructor(canvas, opts={}){
                        this.canvas = canvas;
                        this.ctx = canvas.getContext('2d');
                        this.opts = Object.assign({
                            density: 90,
                            linkDistance: 130,
                            speed: 3,
                            particleColor: '52,227,176',
                            linkColor: '130,150,170',
                            cursorColor: '177,140,255',
                            cursorRadius: 160,
                            cursorForce: 0.6,
                            dotSize: [1.1, 2.6],
                        }, opts);

                        this.mouse = { x: -9999, y: -9999, active:false };
                        this.particles = [];
                        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
                        this.isMobileDevice = window.innerWidth < 768;

                        this._resize = this._resize.bind(this);
                        this._onMove = this._onMove.bind(this);
                        this._onLeave = this._onLeave.bind(this);
                        this._tick = this._tick.bind(this);

                        window.addEventListener('resize', this._resize);
                        window.addEventListener('mousemove', this._onMove);
                        window.addEventListener('mouseleave', this._onLeave);
                        
                        // Mobile touch support to interact with particles
                        window.addEventListener('touchstart', (e)=>{ if(e.touches[0]) this._onMove(e.touches[0]); }, {passive:true});
                        window.addEventListener('touchmove', (e)=>{ if(e.touches[0]) this._onMove(e.touches[0]); }, {passive:true});
                        window.addEventListener('touchend', this._onLeave);
                        window.addEventListener('touchcancel', this._onLeave);

                        this._resize();
                        requestAnimationFrame(this._tick);
                    }

                    updateOptions(newOpts){ this.opts = Object.assign(this.opts, newOpts); }

                    _resize(){
                        const { canvas, dpr } = this;
                        const wasMobile = this.isMobileDevice;
                        this.isMobileDevice = window.innerWidth < 768;

                        this.w = canvas.width = window.innerWidth * dpr;
                        this.h = canvas.height = window.innerHeight * dpr;
                        canvas.style.width = window.innerWidth + 'px';
                        canvas.style.height = window.innerHeight + 'px';

                        // If transitioning between mobile and desktop layout, or first load, recreate particles
                        if (wasMobile !== this.isMobileDevice || this.particles.length === 0) {
                            const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
                            this.updateOptions(getParticleOpts(currentTheme));
                            this._spawn();
                        }
                    }

                    _spawn(){
                        const n = this.opts.density;
                        this.particles = new Array(n).fill(0).map(()=>{
                            const [minR, maxR] = this.opts.dotSize;
                            return {
                                x: Math.random()*this.w,
                                y: Math.random()*this.h,
                                vx: (Math.random()-0.5) * this.opts.speed * this.dpr * 0.15,
                                vy: (Math.random()-0.5) * this.opts.speed * this.dpr * 0.15,
                                r: (minR + Math.random()*(maxR-minR)) * this.dpr,
                            };
                        });
                    }

                    _onMove(e){
                        const rect = this.canvas.getBoundingClientRect();
                        this.mouse.x = (e.clientX - rect.left) * this.dpr;
                        this.mouse.y = (e.clientY - rect.top) * this.dpr;
                        this.mouse.active = true;
                    }
                    _onLeave(){ this.mouse.active = false; this.mouse.x=-9999; this.mouse.y=-9999; }

                    _tick(){
                        const { ctx, w, h, particles, mouse, dpr } = this;
                        const opts = this.opts;
                        ctx.clearRect(0,0,w,h);

                        for(let i=0;i<particles.length;i++){
                            const p = particles[i];
                            p.x += p.vx; p.y += p.vy;
                            if(p.x < 0 || p.x > w) p.vx *= -1;
                            if(p.y < 0 || p.y > h) p.vy *= -1;
                            p.x = Math.max(0, Math.min(w, p.x));
                            p.y = Math.max(0, Math.min(h, p.y));

                            if(mouse.active){
                                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                                const dist = Math.hypot(dx,dy);
                                const cr = opts.cursorRadius * dpr;
                                if(dist < cr && dist > 0.001){
                                    const force = (1 - dist/cr) * opts.cursorForce;
                                    p.x += (dx/dist) * force * 6;
                                    p.y += (dy/dist) * force * 6;
                                }
                            }

                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                            const pAlpha = (opts.particleAlpha !== undefined) ? opts.particleAlpha : 0.85;
                            if(opts.glowBlur && opts.glowColor){
                                ctx.shadowBlur = (opts.glowBlur || 0) * dpr;
                                ctx.shadowColor = `rgba(${opts.glowColor},${pAlpha * 0.9})`;
                            } else {
                                ctx.shadowBlur = 0;
                                ctx.shadowColor = 'rgba(0,0,0,0)';
                            }
                            ctx.fillStyle = `rgba(${opts.particleColor},${pAlpha})`;
                            ctx.fill();
                            // reset shadow to avoid affecting other drawings
                            ctx.shadowBlur = 0;
                            ctx.shadowColor = 'rgba(0,0,0,0)';
                        }

                        const maxD = opts.linkDistance * dpr;
                        for(let i=0;i<particles.length;i++){
                            for(let j=i+1;j<particles.length;j++){
                                const a = particles[i], b = particles[j];
                                const dx=a.x-b.x, dy=a.y-b.y;
                                const dist = Math.hypot(dx,dy);
                                if(dist < maxD){
                                    const linkBase = (opts.linkAlpha !== undefined) ? opts.linkAlpha : 0.5;
                                    const alpha = (1 - dist/maxD) * linkBase;
                                    ctx.beginPath();
                                    ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
                                    ctx.strokeStyle = `rgba(${opts.linkColor},${alpha})`;
                                    ctx.lineWidth = 1 * dpr;
                                    ctx.stroke();
                                }
                            }
                        }

                        if(mouse.active){
                            const cr = opts.cursorRadius * dpr;
                            const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, cr);
                            grad.addColorStop(0, `rgba(${opts.cursorColor},0.10)`);
                            grad.addColorStop(1, `rgba(${opts.cursorColor},0)`);
                            ctx.beginPath();
                            ctx.fillStyle = grad;
                            ctx.arc(mouse.x, mouse.y, cr, 0, Math.PI*2);
                            ctx.fill();

                            for(let i=0;i<particles.length;i++){
                                const p = particles[i];
                                const dist = Math.hypot(p.x-mouse.x, p.y-mouse.y);
                                if(dist < cr){
                                    const alpha = (1 - dist/cr) * 0.45;
                                    ctx.beginPath();
                                    ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y);
                                    ctx.strokeStyle = `rgba(${opts.cursorColor},${alpha})`;
                                    ctx.lineWidth = 1 * dpr;
                                    ctx.stroke();
                                }
                            }
                        }

                        requestAnimationFrame(this._tick);
                    }
                }

                // initialize with current theme
                const initialTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
                const network = new ParticleNetwork(bgCanvas, getParticleOpts(initialTheme));

                // watch for theme attribute changes and update particle colors/options
                const obs = new MutationObserver((mutations)=>{
                        mutations.forEach(m=>{
                                if(m.attributeName === 'data-bs-theme'){
                                        const newTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
                                        network.updateOptions(getParticleOpts(newTheme));
                                }
                        });
                });
                obs.observe(document.documentElement, { attributes: true });
        })();
});
