// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeHeader();
    initializeCounters();
    initializeCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
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

// Calculator functionality
function calculateSavings() {
    const solutionType = document.getElementById('solution-type').value;
    const size = document.getElementById('size').value;
    const result = document.getElementById('calculator-result');
    
    // Sample calculation data
    const savings = {
        lpg: { small: 25, medium: 40, large: 65, business: 150 },
        solar: { small: 45, medium: 75, large: 120, business: 350 },
        borehole: { small: 30, medium: 50, large: 80, business: 200 },
        biogas: { small: 35, medium: 55, large: 90, business: 180 }
    };
    
    const co2Savings = {
        lpg: { small: 180, medium: 290, large: 450, business: 1200 },
        solar: { small: 320, medium: 520, large: 850, business: 2400 },
        borehole: { small: 150, medium: 250, large: 400, business: 900 },
        biogas: { small: 280, medium: 450, large: 720, business: 1800 }
    };
    
    const monthlySavings = savings[solutionType][size];
    const co2Reduction = co2Savings[solutionType][size];
    
    // Update the display
    document.querySelector('.savings-amount').textContent = `$${monthlySavings}`;
    document.querySelector('.co2-savings').textContent = co2Reduction;
    
    // Show result with animation
    result.style.display = 'block';
    result.style.opacity = '0';
    result.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        result.style.transition = 'all 0.5s ease';
        result.style.opacity = '1';
        result.style.transform = 'translateY(0)';
    }, 100);
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // Animation speed
    
    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.textContent);
        const increment = target / speed;
        
        if (count < target) {
            counter.textContent = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 1);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    countUp(counter);
                }
            }
        });
    });
    
    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

// Customer stories carousel
let slideIndex = 1;

function initializeCarousel() {
    showSlide(slideIndex);
    
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        slideIndex++;
        if (slideIndex > 3) slideIndex = 1;
        showSlide(slideIndex);
    }, 5000);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.story-card');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Poll submission
function submitPoll() {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
    if (!selectedOption) {
        alert('Please select an option before voting.');
        return;
    }
    
    const pollWidget = document.querySelector('.poll-widget');
    const resultHTML = `
        <div style="text-align: center; padding: 20px;">
            <h4 style="color: #4a7c59; margin-bottom: 10px;">Thank you for voting!</h4>
            <p>You voted for: <strong>${selectedOption.value}</strong></p>
            <p style="font-size: 0.9rem; color: #666;">Your voice helps us prioritize our expansion efforts.</p>
        </div>
    `;
    
    pollWidget.innerHTML = resultHTML;
}

// Scroll animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.solution-card, .insight-card, .conversation-panel');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu button
    const navContent = document.querySelector('.nav-content');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #2d5f3f;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
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
            
            .dropdown-content {
                position: static;
                display: block;
                box-shadow: none;
                background: #f8f9fa;
                margin-top: 10px;
                border-radius: 0;
            }
            
            .dropdown:hover .dropdown-content {
                display: block;
            }
        }
    `;
    
    document.head.appendChild(mobileStyles);
    navContent.appendChild(mobileMenuBtn);
    
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter subscription
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.querySelector('.newsletter-form input').value;
    
    if (email && validateEmail(email)) {
        this.textContent = 'Subscribed!';
        this.style.background = '#4a7c59';
        document.querySelector('.newsletter-form input').value = '';
        
        setTimeout(() => {
            this.textContent = 'Subscribe';
            this.style.background = '';
        }, 3000);
    } else {
        alert('Please enter a valid email address.');
    }
});

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Form interactions
document.querySelectorAll('.form-group select').forEach(select => {
    select.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    select.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('btn-calculate') || this.textContent.includes('Subscribe')) {
            return; // Skip for buttons with specific functionality
        }
        
        // Add loading effect for demo purposes
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.opacity = '0.7';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.opacity = '1';
        }, 1500);
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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add subtle parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual img');
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Initialize intersection observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    fadeInObserver.observe(section);
});

// Add CSS for fade-in animation
const fadeInStyles = document.createElement('style');
fadeInStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
    
    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;
document.head.appendChild(fadeInStyles);