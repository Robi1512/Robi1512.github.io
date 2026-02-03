document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;

    // Daten abrufen (Simulierter Backend Call)
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Netzwerk-Antwort war nicht ok');
        
        const data = await response.json();
        renderPortfolio(data);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        document.getElementById('hero').innerHTML = '<p style="color:red">Fehler beim Laden der Profildaten.</p>';
    }
}

function renderPortfolio(data) {
    // 1. Hero Section rendern
    const heroSection = document.getElementById('hero');
    heroSection.innerHTML = `
        <h1>Hallo, ich bin <span style="color: var(--accent-color)">${data.profile.name}</span></h1>
        <p class="subtitle">${data.profile.title}</p>
        <p>${data.profile.bio}</p>
        <div style="margin-top: 20px;">
            <a href="mailto:${data.profile.email}" class="tag" style="text-decoration:none; margin-right:10px;">
                <i class="fas fa-envelope"></i> Kontaktieren
            </a>
            <a href="https://${data.profile.github}" target="_blank" class="tag" style="text-decoration:none;">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    `;

    // 2. Skills rendern
    const skillsContainer = document.getElementById('skills-container');
    data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // 3. Experience rendern
    const timelineContainer = document.getElementById('timeline-container');
    data.experience.forEach(job => {
        const div = document.createElement('div');
        div.className = 'job-item';
        div.innerHTML = `
            <h3>${job.role} @ ${job.company}</h3>
            <span class="job-date">${job.period}</span>
            <p>${job.description}</p>
        `;
        timelineContainer.appendChild(div);
    });

    // 4. Projekte rendern
    const projectsGrid = document.getElementById('projects-grid');
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <h3>${project.title}</h3>
            <p style="font-size: 0.9rem; color: #94a3b8; margin: 5px 0;">Stack: ${project.tech}</p>
            <a href="${project.link}" class="project-link">Ansehen &rarr;</a>
        `;
        projectsGrid.appendChild(div);
    });
}
