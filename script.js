document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE LOGIC ---
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = toggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // --- 2. SCROLL TO TOP BUTTON ---
    const toTopBtn = document.querySelector('.to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            toTopBtn.classList.add('active');
        } else {
            toTopBtn.classList.remove('active');
        }
    });

    // --- 3. TYPING EFFECT ---
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = 100;
            if (this.isDeleting) typeSpeed /= 2;

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    new TypeWriter(txtElement, words, wait);

    // --- 4. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 5. CONTACT FORM HANDLING (AJAX) ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Verhindert das Neuladen der Seite

            // Button Feedback "Laden"
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sende... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Daten sammeln
            const formData = new FormData(contactForm);

            // An Netlify senden
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // ERFOLG
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--primary)';
                formStatus.textContent = 'Vielen Dank! Ihre Nachricht wurde gesendet.';
                
                // Button Reset
                submitBtn.innerHTML = 'Gesendet <i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = 'var(--primary)';
                
                // Formular leeren
                contactForm.reset();

                // Nach 3 Sekunden Status ausblenden und Button zurücksetzen
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 5000);
            })
            .catch((error) => {
                // FEHLER
                console.error('Formular Fehler:', error);
                formStatus.style.display = 'block';
                formStatus.style.color = 'red';
                formStatus.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.';
                
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

});
