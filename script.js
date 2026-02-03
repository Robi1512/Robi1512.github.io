// 1. Dark Mode Logik
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.innerText = '☀️ Licht an';
    } else {
        themeBtn.innerText = '🌙 Modus wechseln';
    }
});

// 2. Konfetti Logik
document.getElementById('confetti-btn').addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// 3. Witz Generator (Fetch API)
async function getJoke() {
    const jokeText = document.getElementById('joke-text');
    jokeText.innerText = "Lade Witz...";
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        jokeText.innerText = `${data.setup} - ${data.punchline}`;
    } catch (error) {
        jokeText.innerText = "Ups, der Witz-Server schläft gerade!";
    }
}

// 4. Klick Spiel
let count = 0;
const countDisplay = document.getElementById('click-count');
document.getElementById('clicker-btn').addEventListener('click', () => {
    count++;
    countDisplay.innerText = count;
    
    // Kleiner Bonus bei jedem 10. Klick
    if (count % 10 === 0) {
        confetti({ particleCount: 30, spread: 50 });
    }
});