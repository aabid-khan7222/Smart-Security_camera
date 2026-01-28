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
        
        // Set Products nav link as active
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#products') {
                link.classList.add('active');
            }
        });
        
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
        
        // Reset nav link to Home when closing
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
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

// Handle "See All Products" / "Close" button toggle
const seeAllProductsBtn = document.getElementById('seeAllProductsBtn');
const showcaseProductsGrid = document.getElementById('showcaseProductsGrid');

if (seeAllProductsBtn && showcaseProductsGrid) {
    const allProducts = showcaseProductsGrid.querySelectorAll('.showcase-product-card');
    
    // Initially hide products beyond first 5
    allProducts.forEach((product, index) => {
        if (index >= 5) {
            product.style.display = 'none';
        }
    });
    
    // Add click event listener
    seeAllProductsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get current state
        const isShowingAll = showcaseProductsGrid.classList.contains('show-all');
        
        // Get button spans
        const spans = this.querySelectorAll('span');
        const buttonText = spans[0];
        const buttonArrow = spans[1] || this.querySelector('.btn-arrow');
        
        if (isShowingAll) {
            // Currently showing all - hide products beyond first 5
            showcaseProductsGrid.classList.remove('show-all');
            allProducts.forEach((product, index) => {
                if (index >= 5) {
                    product.style.display = 'none';
                }
            });
            // Update button to "See All Products"
            if (buttonText) buttonText.textContent = 'See All Products';
            if (buttonArrow) buttonArrow.textContent = '↓';
        } else {
            // Currently showing only 5 - show all products
            showcaseProductsGrid.classList.add('show-all');
            allProducts.forEach((product) => {
                product.style.display = 'flex';
            });
            // Update button to "Close" immediately
            if (buttonText) buttonText.textContent = 'Close';
            if (buttonArrow) buttonArrow.textContent = '×';
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

// Store original function for later use
let originalOpenProductShowcase = openProductShowcase;

// Product Search Functionality
function initializeProductSearch() {
    const productSearchInput = document.getElementById('productSearchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    
    if (!productSearchInput) return;
    
    function filterProducts(searchTerm) {
        const grid = document.getElementById('showcaseProductsGrid');
        if (!grid) return;
        
        const products = grid.querySelectorAll('.showcase-product-card');
        const searchLower = searchTerm.toLowerCase().trim();
        let visibleCount = 0;
        
        // If search is empty, show all products (reset to default behavior)
        if (!searchLower) {
            products.forEach(product => {
                product.classList.remove('hidden');
                product.classList.remove('search-match');
                visibleCount++;
            });
            // Remove search-active class from grid
            grid.classList.remove('search-active');
        } else {
            // Add search-active class to grid when searching
            grid.classList.add('search-active');
            // Filter products based on search term
            products.forEach(product => {
                const title = product.querySelector('.showcase-product-title')?.textContent.toLowerCase() || '';
                const description = product.querySelector('.showcase-product-description')?.textContent.toLowerCase() || '';
                const features = Array.from(product.querySelectorAll('.showcase-product-features li'))
                    .map(li => li.textContent.toLowerCase())
                    .join(' ');
                
                const searchableText = `${title} ${description} ${features}`;
                
                // Check if search term matches (partial match)
                if (searchableText.includes(searchLower)) {
                    product.classList.remove('hidden');
                    product.classList.add('search-match');
                    visibleCount++;
                } else {
                    product.classList.add('hidden');
                    product.classList.remove('search-match');
                }
            });
        }
        
        // Update results info
        if (searchResultsInfo) {
            if (searchTerm.trim()) {
                if (visibleCount === 0) {
                    searchResultsInfo.textContent = `No products found for "${searchTerm}"`;
                    searchResultsInfo.style.color = '#ff4444';
                } else {
                    searchResultsInfo.textContent = `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''} for "${searchTerm}"`;
                    searchResultsInfo.style.color = 'var(--text-secondary)';
                }
                searchResultsInfo.classList.remove('hidden');
            } else {
                searchResultsInfo.classList.add('hidden');
            }
        }
        
        // Show/hide clear button
        if (searchClearBtn) {
            searchClearBtn.style.display = searchTerm.trim() ? 'flex' : 'none';
        }
    }
    
    // Immediate search on every keystroke (real-time)
    productSearchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value;
        filterProducts(searchValue);
    }, { passive: true });
    
    // Also trigger on paste
    productSearchInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            filterProducts(e.target.value);
        }, 0);
    });
    
    // Clear search
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            productSearchInput.value = '';
            filterProducts('');
            productSearchInput.focus();
        });
    }
    
    // Enter key to scroll to first result
    productSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const grid = document.getElementById('showcaseProductsGrid');
            if (grid) {
                const firstVisible = grid.querySelector('.showcase-product-card:not(.hidden)');
                if (firstVisible) {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    });
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProductSearch);
} else {
    initializeProductSearch();
}

// Override openProductShowcase to initialize search (if not already overridden)
if (typeof originalOpenProductShowcase === 'undefined') {
    originalOpenProductShowcase = openProductShowcase;
}

const enhancedOpenProductShowcase = function() {
    if (originalOpenProductShowcase) {
        originalOpenProductShowcase();
    }
    // Setup enquire buttons
    setTimeout(setupEnquireButtons, 200);
    // Initialize search and reset when opening
    setTimeout(() => {
        initializeProductSearch();
        const productSearchInput = document.getElementById('productSearchInput');
        if (productSearchInput) {
            productSearchInput.value = '';
            const grid = document.getElementById('showcaseProductsGrid');
            if (grid) {
                const products = grid.querySelectorAll('.showcase-product-card');
                products.forEach(product => {
                    product.classList.remove('hidden');
                });
            }
        }
    }, 200);
};

// Only override if not already done
if (openProductShowcase.toString().indexOf('enhancedOpenProductShowcase') === -1) {
    openProductShowcase = enhancedOpenProductShowcase;
}

// Hero Slideshow Functionality
function initializeHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const indicators = document.querySelectorAll('.hero-slideshow .indicator');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval = null;
    let slideTimeout = null;
    let glowTimeout = null;
    const slideDuration = 3000; // 3 seconds
    const slideTransitionMs = 750; // image transition ~0.7s - glow isi ke baad start
    const glowDurationMs = 2200;
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    function showSlide(index) {
        // Clear any existing timeouts/intervals
        if (slideTimeout) {
            clearTimeout(slideTimeout);
            slideTimeout = null;
        }
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        if (glowTimeout) {
            clearTimeout(glowTimeout);
            glowTimeout = null;
        }
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
        
        // Chamak image change ke BAAD start - pehle image transition (0.75s), phir glow
        if (slideshowContainer) {
            slideshowContainer.classList.remove('glow');
            glowTimeout = setTimeout(() => {
                glowTimeout = null;
                void slideshowContainer.offsetWidth;
                slideshowContainer.classList.add('glow');
                setTimeout(() => {
                    slideshowContainer.classList.remove('glow');
                }, glowDurationMs);
            }, slideTransitionMs);
        }
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        scheduleNextSlide();
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        scheduleNextSlide();
    }
    
    function scheduleNextSlide() {
        // Clear any existing timeout
        if (slideTimeout) {
            clearTimeout(slideTimeout);
        }
        // Schedule next slide after exactly 3 seconds
        slideTimeout = setTimeout(() => {
            nextSlide();
        }, slideDuration);
    }
    
    function startSlideshow() {
        // Clear any existing intervals/timeouts
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        if (slideTimeout) {
            clearTimeout(slideTimeout);
        }
        // Schedule the first transition after 3 seconds
        scheduleNextSlide();
    }
    
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        if (slideTimeout) {
            clearTimeout(slideTimeout);
            slideTimeout = null;
        }
    }
    
    // Swipe: left = next, right = prev (touch on mobile + mouse drag on desktop/laptop)
    let startX = 0;
    let endX = 0;
    let mouseDragActive = false;
    const minSwipePx = 50;
    function handleSwipe() {
        const diff = startX - endX;
        if (diff > minSwipePx) nextSlide();
        else if (diff < -minSwipePx) prevSlide();
    }
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        slideshowContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        slideshowContainer.addEventListener('mousedown', (e) => {
            mouseDragActive = true;
            startX = e.clientX;
        });
        slideshowContainer.addEventListener('mouseup', (e) => {
            if (mouseDragActive) {
                endX = e.clientX;
                handleSwipe();
            }
            mouseDragActive = false;
        });
        slideshowContainer.addEventListener('mouseleave', () => {
            mouseDragActive = false;
        });
    }
    
    // Pause on hover (desktop)
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start automatic slideshow after a small delay to ensure first slide is visible
    setTimeout(() => {
        startSlideshow();
    }, 100);
    
    // Handle visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else {
            // Restart from current slide
            startSlideshow();
        }
    });
}

// Initialize slideshow when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeroSlideshow);
} else {
    initializeHeroSlideshow();
}

// Console welcome message
console.log('%c🔒 Perfect Security Camera Solution', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cProfessional CCTV Installation & Monitoring', 'color: #b8c5d6; font-size: 14px;');
