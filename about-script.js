// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeHeader();
    initializeScrollAnimations();
    initializeCounters();
    initializeTimelineAnimations();
    initializeTeamHoverEffects();
    initializeVideoModal();
    initializeMobileMenu();
    initializeProgressiveLoading();
});

// Header scroll effect
function initializeHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 25px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Scroll animations for sections
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.mvv-card, .team-member, .impact-card, .partnership-category, .story-image, .story-text'
    );

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Counter animation for impact metrics
function initializeCounters() {
    const counters = document.querySelectorAll('.metric-number, .stat-number');
    const speed = 200;
    
    const countUp = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const count = parseFloat(counter.textContent);
        const increment = target / speed;
        
        if (count < target) {
            if (target > 1000) {
                counter.textContent = Math.ceil(count + increment).toLocaleString();
            } else {
                counter.textContent = (count + increment).toFixed(1);
            }
            setTimeout(() => countUp(counter), 1);
        } else {
            if (target > 1000) {
                counter.textContent = target.toLocaleString();
            } else {
                counter.textContent = target.toString();
            }
        }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    setTimeout(() => countUp(counter), 500);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach((counter) => {
        // Set initial values
        const target = parseFloat(counter.getAttribute('data-target'));
        if (!target) {
            const textContent = counter.textContent;
            counter.setAttribute('data-target', textContent);
        }
        counter.textContent = '0';
        counterObserver.observe(counter);
    });
}

// Timeline animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const isLeft = item.classList.contains('left');
                
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                // Add a small delay for staggered animation
                setTimeout(() => {
                    item.querySelector('.timeline-content').style.transform = 'scale(1)';
                    item.querySelector('.timeline-content').style.opacity = '1';
                }, 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        const isLeft = item.classList.contains('left');
        
        // Set initial states
        item.style.opacity = '0';
        item.style.transform = isLeft ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        
        const content = item.querySelector('.timeline-content');
        content.style.transform = 'scale(0.9)';
        content.style.opacity = '0.7';
        content.style.transition = 'all 0.4s ease';
        
        timelineObserver.observe(item);
    });
}

// Team member hover effects
function initializeTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const memberImage = member.querySelector('.member-image');
        const memberOverlay = member.querySelector('.member-overlay');
        
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            memberOverlay.style.opacity = '1';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            memberOverlay.style.opacity = '0';
        });
    });
}

// Video modal functionality
function initializeVideoModal() {
    const storyImage = document.querySelector('.story-image');
    
    if (storyImage) {
        storyImage.addEventListener('click', function() {
            showVideoModal();
        });
    }
}

function showVideoModal() {
    // Create modal HTML
    const modalHTML = `
        <div class="video-modal" id="videoModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeVideoModal()">&times;</button>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allowfullscreen>
                    </iframe>
                </div>
                <h3>Our Story: Powering Yemen's Future</h3>
                <p>Watch how GreenPower Solutions has been transforming communities across Yemen with sustainable energy solutions.</p>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                color: #666;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .video-container {
                position: relative;
                width: 100%;
                height: 0;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                margin-bottom: 20px;
            }
            
            .video-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
            
            .modal-content h3 {
                color: #2d5f3f;
                margin-bottom: 10px;
                font-size: 1.5rem;
            }
            
            .modal-content p {
                color: #666;
                line-height: 1.6;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Close modal when clicking overlay
    document.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu button if it doesn't exist
    const navContent = document.querySelector('.nav-content');
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2d5f3f;
            cursor: pointer;
        `;
        navContent.appendChild(mobileMenuBtn);
    }
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 20px 0;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                gap: 0;
            }
            
            .nav-menu.active {
                display: flex;
            }
            
            .nav-menu li {
                width: 100%;
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .nav-menu li:last-child {
                border-bottom: none;
            }
        }
    `;
    
    if (!document.querySelector('#mobileStyles')) {
        mobileStyles.id = 'mobileStyles';
        document.head.appendChild(mobileStyles);
    }
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// Progressive loading for images
function initializeProgressiveLoading() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            imageObserver.observe(img);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('button');
    const newsletterInput = newsletterForm.querySelector('input');
    
    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = newsletterInput.value;
        
        if (email && validateEmail(email)) {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.style.background = '#4a7c59';
                newsletterInput.value = '';
                
                setTimeout(() => {
                    this.innerHTML = 'Subscribe';
                    this.style.background = '';
                    this.disabled = false;
                }, 3000);
            }, 2000);
        } else {
            // Show error animation
            newsletterInput.style.borderColor = '#ff4757';
            newsletterInput.style.animation = 'shake 0.5s ease';
            
            setTimeout(() => {
                newsletterInput.style.borderColor = '';
                newsletterInput.style.animation = '';
            }, 500);
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.about-hero');
    
    parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.backgroundPosition = `center ${rate}px`;
    });
});

// Add loading animations to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Skip if it's the newsletter button or has specific functionality
        if (this.closest('.newsletter-form') || this.onclick) {
            return;
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
        }
    }
`;
document.head.appendChild(rippleStyles);

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const nextSection = document.querySelector('.company-story');
        if (nextSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = nextSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Hide scroll indicator after scrolling past hero
    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.about-hero').offsetHeight;
        if (window.scrollY > heroHeight - 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Enhanced team member interaction
document.querySelectorAll('.team-member .social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show contact info (placeholder)
        const memberName = this.closest('.team-member').querySelector('h4').textContent;
        alert(`Connect with ${memberName}! (This would normally open their profile)`);
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize lazy loading for better performance
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
        });
    }
}

// Call lazy loading initialization
initializeLazyLoading();

// Add fade-in animation for page load
document.body.style.opacity = '0';
window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal) {
            closeVideoModal();
        }
    }
    
    // Navigate with arrow keys (optional feature)
    if (e.key === 'ArrowDown') {
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            scrollToSection(nextSection);
        }
    }
    
    if (e.key === 'ArrowUp') {
        const currentSection = getCurrentSection();
        const prevSection = getPreviousSection(currentSection);
        if (prevSection) {
            scrollToSection(prevSection);
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            return section;
        }
    }
    return null;
}

function getNextSection(currentSection) {
    if (!currentSection) return null;
    return currentSection.nextElementSibling;
}

function getPreviousSection(currentSection) {
    if (!currentSection) return null;
    return currentSection.previousElementSibling;
}

function scrollToSection(section) {
    if (!section) return;
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}