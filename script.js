// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Fully Loaded');
    initTheme();
    initProjects();
    initEventListeners();
    initializeProjectCards();
    initScrollAnimations();
    setupProjectNavigation();
    
    // Additional debug check
    setTimeout(debugNavigation, 1000);
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
        title: "Analytics Dashboard",
        description: "Real-time analytics dashboard providing comprehensive business insights through interactive visualizations.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        technologies: ["Vue.js", "D3.js", "Firebase"],
        category: "web",
        link: "project-analytics-dashboard.html"
    },
    {
        id: 2,
        title: "Healthcare Management System",
        description: "Comprehensive healthcare management system for hospitals and clinics with patient records and appointment scheduling.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        technologies: ["Angular", "Python", "PostgreSQL"],
        category: "web",
        link: "project-healthcare-management.html"
    },
    {
        id: 3,
        title: "Food Delivery App",
        description: "Mobile application for food ordering and delivery with real-time tracking and payment integration.",
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800",
        technologies: ["React Native", "Node.js", "MongoDB"],
        category: "mobile",
        link: "project-food-delivery.html"
    },
    {
        id: 4,
        title: "E-commerce Platform",
        description: "Full-featured e-commerce platform with inventory management, payment processing, and analytics.",
        image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800",
        technologies: ["React", "Node.js", "MongoDB"],
        category: "web",
        link: "project-ecommerce.html"
    }
];

// Debug function to help diagnose navigation issues
function debugNavigation() {
    console.log('Debug: Project Navigation Check');
    console.log('Current URL:', window.location.href);
    console.log('Project Files in Directory:');
    const projectFiles = [
        'project-analytics-dashboard.html',
        'project-healthcare-management.html',
        'project-food-delivery.html',
        'project-ecommerce.html'
    ];
    
    projectFiles.forEach(file => {
        const fullPath = new URL(file, window.location.href).href;
        fetch(fullPath)
            .then(response => {
                console.log(`File ${file}: ${response.ok ? 'EXISTS' : 'NOT FOUND'}`, fullPath);
            })
            .catch(error => {
                console.error(`Error checking ${file}:`, error);
            });
    });
}

// Enhanced navigation handler
function setupProjectNavigation() {
    console.log('Setting up project navigation');
    const projectLinks = document.querySelectorAll('.projects .project-card .btn.primary');
    
    if (projectLinks.length === 0) {
        console.error('No project links found!');
        return;
    }

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            console.group('Project Link Click');
            console.log('Clicked href:', href);
            console.log('Current base URL:', window.location.origin);
            console.log('Full navigation URL:', new URL(href, window.location.href).href);
            
            try {
                // Use window.location.assign for more robust navigation
                window.location.href = href;
            } catch (error) {
                console.error('Navigation error:', error);
                alert(`Unable to navigate to ${href}. Please check the file path.`);
            }
            console.groupEnd();
        });
    });
}

// Initialize projects
function initProjects() {
    console.log('Initializing Projects');
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid not found during initialization!');
        debugNavigation();
        return;
    }

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
    if (!projectsGrid) {
        console.error('Projects grid not found!');
        return;
    }
    projectsGrid.innerHTML = '';
    
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card fade-in`;
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn primary">View Project</a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Call setup after rendering projects
    setupProjectNavigation();
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

// Function to populate member modal project highlights
function populateMemberModalProjects(memberId, projects) {
    const modal = document.getElementById(memberId);
    if (!modal) return;

    const projectsGrid = modal.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing projects
    projectsGrid.innerHTML = '';

    // Define project mapping for each member (you can customize this)
    const memberProjects = {
        'modal1': ['E-commerce Platform', 'Analytics Dashboard'],
        'modal2': ['Food Delivery App', 'Mobile App Development'],
        'modal3': ['Healthcare Management System', 'API Development'],
        'modal4': ['Frontend Web App', 'Responsive Design Project'],
        'modal5': ['UI/UX Design Project', 'E-commerce Redesign'],
        'modal6': ['DevOps Infrastructure', 'Cloud Migration']
    };

    const projectTitles = memberProjects[memberId] || [];

    projectTitles.forEach(title => {
        // Find matching project from main projects array
        const project = projects.find(p => p.title.includes(title));
        
        if (project) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" target="_blank">View Project</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        }
    });
}

// Modify openMemberModal to include project population
function openMemberModal(memberId) {
    const modal = document.getElementById(memberId);
    if (!modal) return;

    // Populate projects before showing modal
    populateMemberModalProjects(memberId, projects);

    // Show modal
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
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

// Add scroll-based animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', entry.target.dataset.animation);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animation]').forEach((element) => {
        observer.observe(element);
    });
}

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
