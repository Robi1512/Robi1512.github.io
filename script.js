document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE LOGIC ---
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = toggleBtn.querySelector('i');

    // Prüfen, ob bereits eine Einstellung gespeichert ist
    const savedTheme = localStorage.getItem('theme');
    
    // Wenn 'dark' gespeichert ist, anwenden
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Wechsel zu Light
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            // Wechsel zu Dark
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });


    // --- 2. TYPING EFFECT ---
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


    // --- 3. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
