// 1. Der Typing Effekt (Schreibmaschinen-Effekt)
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
        // Aktueller Index des Wortes
        const current = this.wordIndex % this.words.length;
        // Das volle Wort
        const fullTxt = this.words[current];

        // Check ob löschen oder schreiben
        if (this.isDeleting) {
            // Zeichen entfernen
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Zeichen hinzufügen
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Text in das Element einfügen
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Geschwindigkeit initialisieren
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // Wenn Wort fertig geschrieben
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait; // Pause am Ende
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++; // Nächstes Wort
            typeSpeed = 500; // Pause bevor neues Wort startet
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Typing Effect wenn DOM geladen
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Startet den Effekt
    new TypeWriter(txtElement, words, wait);
}


// 2. Scroll Animation (Intersection Observer)
// Das sorgt dafür, dass Elemente erst sichtbar werden, wenn man hinscrollt
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 10% des Elements müssen sichtbar sein
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Animation nur einmal abspielen
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
