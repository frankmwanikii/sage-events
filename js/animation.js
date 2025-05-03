/**
 * Sage Events Ltd - Animations JavaScript File
 * Contains all the animation-related functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    stat.textContent = target;
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    increment();
                    observer.unobserve(stat);
                }
            });
            
            observer.observe(stat);
        });
    }

    // Animate Elements on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .reason-card, .process-step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .reason-card, .process-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Portfolio Modal
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-content .modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    if (portfolioItems.length > 0 && projectModal && modalContent && closeModal) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // In a real implementation, you would fetch project details
                // Here we're just showing a sample modal
                const projectTitle = this.querySelector('h3').textContent;
                const projectType = this.querySelector('.project-type').textContent;
                const projectDesc = this.querySelector('.project-description').textContent;
                
                modalContent.innerHTML = `
                    <h2>${projectTitle}</h2>
                    <div class="project-meta">
                        <span><strong>Type:</strong> ${projectType}</span>
                    </div>
                    <div class="project-description">
                        <p>${projectDesc}</p>
                    </div>
                    <div class="project-gallery">
                        <img src="/images/9.jpg" alt="${projectTitle}">
                        <img src="/images/IMG-20250219-WA0025.jpg" alt="${projectTitle}">
                        <img src="/images/IMG-20250219-WA0017.jpg" alt="${projectTitle}">
                    </div>
                    <div class="project-details">
                        <div class="details-card">
                            <h4>Project Details</h4>
                            <ul>
                                <li>Client: ${projectTitle.split(' ')[0]}</li>
                                <li>Date: January 2023</li>
                                <li>Category: ${projectType}</li>
                                <li>Location: Nairobi, Kenya</li>
                            </ul>
                        </div>
                        <div class="details-card">
                            <h4>Our Services</h4>
                            <ul>
                                <li>Event Planning</li>
                                <li>Live Streaming</li>
                                <li>Technical Support</li>
                                <li>Branding</li>
                            </ul>
                        </div>
                    </div>
                    <button class="btn-primary">View Full Case Study</button>
                `;
                
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});