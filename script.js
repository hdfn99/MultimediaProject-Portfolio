// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjects();
    initEventListeners();
});

// Theme functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Project data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        category: "web",
        image: "https://via.placeholder.com/400x300",
        description: "A full-featured e-commerce platform built with MERN stack.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        link: "#"
    },
    {
        id: 2,
        title: "Mobile Banking App",
        category: "mobile",
        image: "https://via.placeholder.com/400x300",
        description: "Secure mobile banking application with real-time transactions.",
        technologies: ["React Native", "Firebase", "Node.js"],
        link: "#"
    },
    {
        id: 3,
        title: "AI Image Recognition",
        category: "ai",
        image: "https://via.placeholder.com/400x300",
        description: "Machine learning model for image classification.",
        technologies: ["Python", "TensorFlow", "OpenCV"],
        link: "#"
    }
];

// Initialize projects
function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Add filter buttons click handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterProjects(category);
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Initial load of all projects
    filterProjects('all');
}

// Filter projects by category
function filterProjects(category) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    filteredProjects.forEach(project => {
        const projectCard = `
            <div class="project-card fade-in" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="btn primary">View Project</a>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectCard;
    });
}

// Initialize event listeners
function initEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-mode') ? 'dark' : 'light'
            );
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showFormMessage('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                showFormMessage('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Helper function to show form messages
function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 3000);
}

// Team member interaction
document.querySelectorAll('.member-panel').forEach(panel => {
    panel.addEventListener('click', () => {
        panel.classList.toggle('expanded');
    });
});

// Smooth scroll functionality
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('#team').scrollIntoView({
        behavior: 'smooth'
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    // Force reflow
    modal.offsetHeight;
    modal.classList.add('show');

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Team member data (replace with actual member data)
const teamMembers = {
    member1: {
        name: 'John Doe',
        role: 'Full Stack Developer',
        bio: 'John is a passionate full-stack developer with 5 years of experience in web development.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
        projects: [
            {
                name: 'E-commerce Platform',
                description: 'Built a scalable e-commerce platform using MERN stack.'
            },
            {
                name: 'Task Management System',
                description: 'Developed a team collaboration tool using React and Firebase.'
            }
        ],
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com'
        }
    },
    // Add data for other team members similarly
};

// Open modal with member details
function openMemberModal(memberId) {
    const member = teamMembers[memberId];
    if (!member) return;

    const content = `
        <div class="member-profile">
            <div class="profile-header">
                <img src="https://via.placeholder.com/300" alt="${member.name}">
                <h2>${member.name}</h2>
                <p class="role">${member.role}</p>
            </div>
            <div class="profile-body">
                <div class="bio">
                    <h3>About</h3>
                    <p>${member.bio}</p>
                </div>
                <div class="skills">
                    <h3>Skills</h3>
                    <div class="skills-list">
                        ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="projects">
                    <h3>Projects</h3>
                    ${member.projects.map(project => `
                        <div class="project-card">
                            <h4>${project.name}</h4>
                            <p>${project.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="social-links">
                    <a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
    `;

    const modal = document.getElementById('memberModal');
    const modalContent = modal.querySelector('.profile-content');
    modalContent.innerHTML = content;
    openModal('memberModal');
}

// Add click event listeners to team members
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', () => {
        const memberId = member.dataset.member;
        openMemberModal(memberId);
    });
});

// Close modal functionality
document.getElementById('memberModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('memberModal')) {
        closeModal('memberModal');
    }
});

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('memberModal')) {
        closeModal('memberModal');
    }
});

// Add some animation when scrolling
window.addEventListener('scroll', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        const rect = member.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }
    });
});

// Get all member panels
const memberPanels = document.querySelectorAll('.member-panel');

// Add smooth scroll on hover
memberPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        // Smooth scroll to the panel
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.member-panel')) {
        memberPanels.forEach(panel => {
            panel.classList.remove('active');
        });
    }
});

// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
