/* ============================================
   Perfect Security Camera Solution - JavaScript
   Interactive Features & Functionality
   ============================================ */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const faqItems = document.querySelectorAll('.faq-item');

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Sticky Header on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('.section, .hero');
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !phone || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all required fields.',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Phone validation - only digits, exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid 10-digit phone number (digits only).',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Simulate form submission (since no backend)
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you! Your message has been sent. We will contact you soon.',
            confirmButtonColor: '#0066cc',
            confirmButtonText: 'OK'
        });
        
        // Reset form
        contactForm.reset();
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    });
});

// Scroll Reveal Animation
const scrollElements = document.querySelectorAll('.service-card, .product-card, .why-us-item, .package-card, .review-card, .gallery-item, .showcase-product-card');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - offset)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('fade-in', 'visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

// Initial check
window.addEventListener('load', () => {
    handleScrollAnimation();
});

// Scroll event
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Add fade-in class to elements on page load
scrollElements.forEach(el => {
    el.classList.add('fade-in');
});

// Prevent form submission on Enter key in textarea
const textarea = document.getElementById('message');
if (textarea) {
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            // Allow Enter for new lines, but prevent accidental form submission
            // Form will only submit on button click
        }
    });
}

// Lazy loading for images (if browser supports it)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons on click
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Only add loading state for form buttons or quote buttons
        if (this.type === 'submit' || this.textContent.includes('Quote') || this.textContent.includes('Enquire')) {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Product Showcase Functionality
const browseProductsBtn = document.getElementById('browseProductsBtn');
const productShowcase = document.getElementById('productShowcase');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const mainContent = document.querySelector('body');

// Function to open product showcase
function openProductShowcase() {
    if (productShowcase && mainContent) {
        productShowcase.classList.add('active');
        mainContent.classList.add('product-showcase-active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Reset back button visibility when opening
        if (backToHomeBtn) {
            setTimeout(() => {
                backToHomeBtn.style.opacity = '1';
                backToHomeBtn.style.pointerEvents = 'auto';
                backToHomeBtn.style.transform = 'translateX(0)';
            }, 100);
        }
    }
}

// Function to close product showcase
function closeProductShowcase() {
    if (productShowcase && mainContent) {
        productShowcase.classList.remove('active');
        mainContent.classList.remove('product-showcase-active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Event listeners
if (browseProductsBtn) {
    browseProductsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openProductShowcase();
    });
}

if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeProductShowcase();
    });
    
    // Hide/show back button on scroll (only in product showcase)
    let scrollHandler = () => {
        // Only handle scroll in product showcase
        if (!productShowcase || !productShowcase.classList.contains('active')) {
            return;
        }
        
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide button when scrolling down past 100px
        if (currentScroll > 100) {
            backToHomeBtn.style.opacity = '0';
            backToHomeBtn.style.pointerEvents = 'none';
            backToHomeBtn.style.transform = 'translateX(-20px)';
        } else {
            // Show button when at top
            backToHomeBtn.style.opacity = '1';
            backToHomeBtn.style.pointerEvents = 'auto';
            backToHomeBtn.style.transform = 'translateX(0)';
        }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Make closeProductShowcase available globally for onclick handlers
window.closeProductShowcase = closeProductShowcase;

// Handle CTA button in product showcase
const productCtaQuote = document.getElementById('productCtaQuote');
if (productCtaQuote) {
    productCtaQuote.addEventListener('click', (e) => {
        e.preventDefault();
        closeProductShowcase();
        // Wait for transition, then scroll to contact
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = contactSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    });
}

// Handle "See All Products" / "Show Less" button toggle
const seeAllProductsBtn = document.getElementById('seeAllProductsBtn');
const showcaseProductsGrid = document.getElementById('showcaseProductsGrid');
const seeAllProductsWrapper = document.getElementById('seeAllProductsWrapper');

if (seeAllProductsBtn && showcaseProductsGrid) {
    const allProducts = showcaseProductsGrid.querySelectorAll('.showcase-product-card');
    
    // Initially hide products beyond first 5
    allProducts.forEach((product, index) => {
        if (index >= 5) {
            product.style.display = 'none';
        }
    });
    
    seeAllProductsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isShowingAll = showcaseProductsGrid.classList.contains('show-all');
        
        // Get button elements fresh each time to ensure we have the right references
        const spans = seeAllProductsBtn.querySelectorAll('span');
        const buttonText = spans[0]; // First span contains the text
        const buttonArrow = seeAllProductsBtn.querySelector('.btn-arrow') || spans[1]; // Second span is arrow
        
        if (isShowingAll) {
            // Hide products beyond first 5
            showcaseProductsGrid.classList.remove('show-all');
            allProducts.forEach((product, index) => {
                if (index >= 5) {
                    product.style.display = 'none';
                }
            });
            // Update button text
            if (buttonText) {
                buttonText.textContent = 'See All Products';
            }
            if (buttonArrow) {
                buttonArrow.textContent = '↓';
            }
        } else {
            // Show all products
            showcaseProductsGrid.classList.add('show-all');
            allProducts.forEach((product) => {
                product.style.display = 'flex';
            });
            // Update button text
            if (buttonText) {
                buttonText.textContent = 'Close';
            }
            if (buttonArrow) {
                buttonArrow.textContent = '×';
            }
        }
    });
}

// Enquiry Modal Functionality
const enquiryModal = document.getElementById('enquiryModal');
const enquiryModalClose = document.getElementById('enquiryModalClose');
const enquiryForm = document.getElementById('enquiryForm');
const enquiryFormMessage = document.getElementById('enquiryFormMessage');
const enquiryProductName = document.getElementById('enquiryProductName');
const enquiryPhone = document.getElementById('enquiryPhone');
const enquiryEmail = document.getElementById('enquiryEmail');

// Function to open enquiry modal
function openEnquiryModal(productName = '') {
    if (enquiryModal && enquiryProductName) {
        enquiryProductName.value = productName;
        enquiryModal.classList.add('active');
        // Prevent background scroll
        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add('modal-open');
    }
}

// Function to close enquiry modal
function closeEnquiryModal() {
    if (enquiryModal) {
        enquiryModal.classList.remove('active');
        // Restore background scroll
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.classList.remove('modal-open');
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        if (enquiryForm) {
            enquiryForm.reset();
        }
        if (enquiryFormMessage) {
            enquiryFormMessage.style.display = 'none';
        }
    }
}

// Event listeners for modal
if (enquiryModalClose) {
    enquiryModalClose.addEventListener('click', closeEnquiryModal);
}

// Close modal when clicking overlay
if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
        if (e.target === enquiryModal || e.target.classList.contains('enquiry-modal-overlay')) {
            closeEnquiryModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('active')) {
        closeEnquiryModal();
    }
});

// Phone number validation - only digits, max 10 digits
if (enquiryPhone) {
    enquiryPhone.addEventListener('input', (e) => {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
    
    // Prevent paste of non-numeric content
    enquiryPhone.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const numericValue = paste.replace(/\D/g, '').slice(0, 10);
        e.target.value = numericValue;
    });
    
    // Prevent typing non-numeric characters
    enquiryPhone.addEventListener('keypress', (e) => {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}

// Email validation - real-time
if (enquiryEmail) {
    enquiryEmail.addEventListener('blur', (e) => {
        const email = e.target.value.trim();
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.target.style.borderColor = '#ff4444';
            } else {
                e.target.style.borderColor = '';
            }
        }
    });
    
    enquiryEmail.addEventListener('input', (e) => {
        // Reset border color on input
        if (e.target.style.borderColor === 'rgb(255, 68, 68)') {
            e.target.style.borderColor = '';
        }
    });
}

// Handle enquiry form submission
if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(enquiryForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const message = formData.get('message');
        const productName = formData.get('productName');
        
        // Basic validation
        if (!name || !phone || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all required fields.',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Phone validation - only digits, exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid 10-digit phone number (digits only).',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            if (enquiryPhone) {
                enquiryPhone.focus();
                enquiryPhone.style.borderColor = '#ff4444';
            }
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#0066cc',
                confirmButtonText: 'OK'
            });
            if (enquiryEmail) {
                enquiryEmail.focus();
                enquiryEmail.style.borderColor = '#ff4444';
            }
            return;
        }
        
        // Simulate form submission
        const enquiryMessage = productName 
            ? `Your enquiry for "${productName}" has been sent successfully!`
            : 'Your enquiry has been sent successfully!';
        
        Swal.fire({
            icon: 'success',
            title: 'Enquiry Sent!',
            text: enquiryMessage + ' We will contact you soon.',
            confirmButtonColor: '#0066cc',
            confirmButtonText: 'OK'
        }).then(() => {
            enquiryForm.reset();
            // Reset border colors
            if (enquiryPhone) enquiryPhone.style.borderColor = '';
            if (enquiryEmail) enquiryEmail.style.borderColor = '';
            closeEnquiryModal();
        });
    });
}

// Phone validation for contact form
const contactPhone = document.getElementById('phone');
if (contactPhone) {
    contactPhone.addEventListener('input', (e) => {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
    
    // Prevent paste of non-numeric content
    contactPhone.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const numericValue = paste.replace(/\D/g, '').slice(0, 10);
        e.target.value = numericValue;
    });
    
    // Prevent typing non-numeric characters
    contactPhone.addEventListener('keypress', (e) => {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}

// Make openEnquiryModal available globally
window.openEnquiryModal = openEnquiryModal;

// Add event listeners to all "Enquire Now" buttons
function setupEnquireButtons() {
    // Find all "Enquire Now" buttons with onclick handlers
    const enquireButtons = document.querySelectorAll('.showcase-product-button[onclick], a.btn-outline[href="#contact"]');
    
    enquireButtons.forEach(button => {
        // Check if button text contains "Enquire Now" or similar
        const buttonText = button.textContent.trim().toLowerCase();
        if (buttonText.includes('enquire') || buttonText.includes('enquiry')) {
            // Store product name before removing onclick
            let productName = '';
            const productCard = button.closest('.product-card, .showcase-product-card');
            if (productCard) {
                const titleElement = productCard.querySelector('.product-title, .showcase-product-title');
                if (titleElement) {
                    productName = titleElement.textContent.trim();
                }
            }
            
            // Remove onclick attribute
            button.removeAttribute('onclick');
            button.setAttribute('href', 'javascript:void(0)');
            
            // Add new event listener
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openEnquiryModal(productName);
            }, true); // Use capture phase to execute before any other handlers
        }
    });
    
    // Also handle buttons in main products section
    const mainProductButtons = document.querySelectorAll('#products .btn-outline[href="#contact"]');
    mainProductButtons.forEach(button => {
        if (button.textContent.trim().toLowerCase().includes('enquire')) {
            let productName = '';
            const productCard = button.closest('.product-card');
            if (productCard) {
                const titleElement = productCard.querySelector('.product-title');
                if (titleElement) {
                    productName = titleElement.textContent.trim();
                }
            }
            
            button.setAttribute('href', 'javascript:void(0)');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openEnquiryModal(productName);
            }, true);
        }
    });
}

// Setup buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEnquireButtons);
} else {
    setupEnquireButtons();
}

// Also setup buttons when product showcase opens (for dynamically loaded content)
const originalOpenProductShowcase = openProductShowcase;
openProductShowcase = function() {
    originalOpenProductShowcase();
    setTimeout(setupEnquireButtons, 200);
};

// Console welcome message
console.log('%c🔒 Perfect Security Camera Solution', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cProfessional CCTV Installation & Monitoring', 'color: #b8c5d6; font-size: 14px;');
