# JavaScript Interview Questions - Security Camera Solution Project

## 📋 Table of Contents
1. [DOM Manipulation Questions](#dom-manipulation-questions)
2. [Event Handling Questions](#event-handling-questions)
3. [Performance & Optimization](#performance--optimization)
4. [JavaScript Concepts](#javascript-concepts)
5. [Code Structure & Best Practices](#code-structure--best-practices)
6. [Browser APIs](#browser-apis)
7. [Error Handling & Validation](#error-handling--validation)
8. [Advanced Topics](#advanced-topics)

---

## DOM Manipulation Questions

### Q1: Aapne project mein DOM elements ko kaise select kiya hai? `getElementById` vs `querySelector` mein kya difference hai?

**Answer:**
```javascript
// Main ne dono methods use kiye:
const hamburger = document.getElementById('hamburger');  // Single element
const navLinks = document.querySelectorAll('.nav-link'); // Multiple elements
```

**Differences:**
- `getElementById()`: Sirf ID ke liye, single element return karta hai, faster hai
- `querySelector()`: CSS selector use karta hai, pehla matching element return karta hai
- `querySelectorAll()`: Sab matching elements return karta hai (NodeList)

**Kyun use kiya:**
- `getElementById` - jab single unique element chahiye (faster performance)
- `querySelectorAll` - jab multiple elements chahiye (flexible CSS selectors)

---

### Q2: Aapne `classList.toggle()` ka use kyun kiya? `className` se kya problem hai?

**Answer:**
```javascript
hamburger.classList.toggle('active');
```

**`classList` ke advantages:**
- Multiple classes ko easily add/remove kar sakte hain
- `toggle()` automatically check karta hai - agar class hai to remove, nahi to add
- `add()`, `remove()`, `contains()` methods available
- Space-separated strings handle karne ki zarurat nahi

**`className` ki problem:**
- Poori class string replace karni padti hai
- Multiple classes ko manually manage karna padta hai
- Error-prone hai

**Example:**
```javascript
// classList (Better)
element.classList.add('active', 'visible');
element.classList.remove('active');

// className (Not recommended)
element.className = 'active visible'; // Poori string replace
```

---

### Q3: `querySelectorAll` kya return karta hai? Array hai ya NodeList?

**Answer:**
`querySelectorAll()` **NodeList** return karta hai, array nahi.

**Differences:**
```javascript
const navLinks = document.querySelectorAll('.nav-link'); // NodeList

// NodeList - forEach available
navLinks.forEach(link => { ... }); // ✅ Works

// NodeList - map/filter nahi hai
navLinks.map(...); // ❌ Error - map is not a function

// Convert to Array if needed
const linksArray = Array.from(navLinks);
// OR
const linksArray = [...navLinks];
```

**NodeList properties:**
- Live NodeList (agar DOM change ho to automatically update)
- Static NodeList (querySelectorAll returns static)
- Array methods nahi hain, but forEach available

---

## Event Handling Questions

### Q4: Event delegation kya hai? Aapne project mein use kiya hai?

**Answer:**
Event delegation matlab parent element par event listener lagana, jo child elements ke events ko handle kare.

**Mere project mein:**
```javascript
// Direct approach (har element par listener)
navLinks.forEach(link => {
    link.addEventListener('click', () => { ... });
});

// Event delegation (better for dynamic content)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        // Handle click
    }
});
```

**Advantages:**
- Dynamic elements ke liye perfect (jo baad mein add hote hain)
- Memory efficient (kam listeners)
- Better performance for many elements

**Mere project mein use nahi kiya kyunki:**
- Static elements the (page load par hi sab available)
- Small number of elements
- But agar FAQ items dynamically add hote to event delegation better hota

---

### Q5: `preventDefault()` kyun use kiya form submission mein?

**Answer:**
```javascript
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Page reload nahi hoga
    // Form validation and processing
});
```

**Kyun zaroori:**
- Default browser behavior ko stop karta hai
- Form submit par page reload nahi hota
- JavaScript se form handle kar sakte hain
- AJAX/Fetch se data send kar sakte hain without page refresh

**Without preventDefault:**
- Form submit par page reload hota
- Form data URL mein chala jata
- JavaScript validation ka result nahi dikhta

---

### Q6: Multiple event listeners same element par kaise handle kiye?

**Answer:**
Mere project mein multiple scroll listeners hain:

```javascript
// Scroll event 1 - Header sticky
window.addEventListener('scroll', () => {
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    }
});

// Scroll event 2 - Back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    }
});

// Scroll event 3 - Scroll animations
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});
```

**Best Practice:**
- Multiple listeners allowed hain
- But better hai ek listener mein sab handle kare (performance)
- **Debouncing/Throttling** use kare (mere project mein nahi kiya, but should)

**Optimized version:**
```javascript
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // All scroll handlers here
            handleHeader();
            handleBackToTop();
            handleAnimations();
            ticking = false;
        });
        ticking = true;
    }
});
```

---

## Performance & Optimization

### Q7: Scroll events performance ke liye kya kiya? Throttling/Debouncing kya hai?

**Answer:**
**Current code mein:** Throttling/Debouncing nahi kiya (improvement needed)

**Problem:**
- Scroll event bahut baar fire hota hai (har pixel scroll par)
- Multiple handlers se performance issue ho sakta hai

**Solution - Throttling:**
```javascript
// Throttle - har X milliseconds mein ek baar execute
function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    handleScrollAnimation();
}, 100)); // 100ms mein ek baar
```

**Solution - requestAnimationFrame:**
```javascript
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScrollAnimation();
            ticking = false;
        });
        ticking = true;
    }
});
```

**Mere project mein improvement:**
- `requestAnimationFrame` use karna chahiye
- Ya throttle function add karna chahiye

---

### Q8: Lazy loading images kaise implement kiya? IntersectionObserver kya hai?

**Answer:**
```javascript
// Native lazy loading (modern browsers)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback - IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img); // Stop observing
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
```

**IntersectionObserver:**
- Browser API jo check karta hai element viewport mein visible hai ya nahi
- Performance efficient (native browser implementation)
- Callback fire hota hai jab element visible hota hai
- `unobserve()` se stop kar sakte hain

**Benefits:**
- Initial page load fast (images load nahi hote jab tak visible nahi)
- Bandwidth save
- Better user experience

---

### Q9: Event listeners ko remove karna zaroori hai? Memory leaks kaise avoid kare?

**Answer:**
**Mere project mein:** Event listeners remove nahi kiye (static page hai, zarurat nahi)

**Jab remove karna chahiye:**
- Single Page Applications (SPA) mein
- Dynamic elements jo remove ho rahe hain
- Component unmount par

**How to remove:**
```javascript
// Named function use kare (remove ke liye)
function handleClick() {
    console.log('clicked');
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick); // Remove
```

**Memory leak example:**
```javascript
// ❌ Bad - Cannot remove
element.addEventListener('click', () => {
    console.log('clicked');
});

// ✅ Good - Can remove
const handler = () => console.log('clicked');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);
```

**Mere project mein:**
- Static page hai, page unload par sab listeners automatically remove ho jate hain
- But agar SPA hota to remove karna zaroori hota

---

## JavaScript Concepts

### Q10: Arrow functions vs Regular functions - kya difference hai?

**Answer:**
Mere project mein dono use kiye:

```javascript
// Arrow function
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

// Regular function
function showFormMessage(message, type) {
    formMessage.textContent = message;
}
```

**Key Differences:**

1. **`this` binding:**
```javascript
// Regular function - this = calling context
const obj = {
    name: 'Test',
    regular: function() {
        console.log(this.name); // 'Test'
    },
    arrow: () => {
        console.log(this.name); // undefined (window object)
    }
};
```

2. **Arguments object:**
```javascript
// Regular function
function regular() {
    console.log(arguments); // Available
}

// Arrow function
const arrow = () => {
    console.log(arguments); // Error - not available
};
```

3. **Constructor:**
```javascript
// Regular function - constructor ban sakta hai
function Person(name) {
    this.name = name;
}
const p = new Person('John'); // ✅ Works

// Arrow function - constructor nahi ban sakta
const Person = (name) => {
    this.name = name;
};
const p = new Person('John'); // ❌ Error
```

**Mere project mein:**
- Arrow functions - event handlers, callbacks (this binding zaroori nahi)
- Regular functions - named functions, methods

---

### Q11: `const`, `let`, `var` mein kya difference hai? Aapne kya use kiya?

**Answer:**
Mere project mein **`const`** aur **`let`** use kiye, `var` nahi.

```javascript
const hamburger = document.getElementById('hamburger'); // Constant
let lastScroll = 0; // Variable (value change hogi)
```

**Differences:**

1. **Scope:**
```javascript
// var - function scoped
function test() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 (accessible)
}

// let/const - block scoped
function test() {
    if (true) {
        let x = 1;
    }
    console.log(x); // Error (not accessible)
}
```

2. **Hoisting:**
```javascript
// var - hoisted with undefined
console.log(x); // undefined
var x = 5;

// let/const - hoisted but TDZ (Temporal Dead Zone)
console.log(x); // Error - Cannot access before initialization
let x = 5;
```

3. **Re-declaration:**
```javascript
var x = 1;
var x = 2; // ✅ Allowed

let y = 1;
let y = 2; // ❌ Error

const z = 1;
const z = 2; // ❌ Error
```

**Best Practice:**
- `const` - default choice (immutable reference)
- `let` - jab value change karni ho
- `var` - avoid kare (legacy, issues)

---

### Q12: Template literals use kiye? Backticks kyun use kiye?

**Answer:**
Mere project mein template literals use nahi kiye, but should use:

**Current code:**
```javascript
formMessage.className = `form-message ${type}`;
```

**Template literals benefits:**
```javascript
// Old way (string concatenation)
const message = 'Hello ' + name + ', your age is ' + age;

// Template literals (better)
const message = `Hello ${name}, your age is ${age}`;

// Multi-line strings
const html = `
    <div class="card">
        <h3>${title}</h3>
        <p>${description}</p>
    </div>
`;
```

**Advantages:**
- Cleaner syntax
- Multi-line strings easily
- Expression interpolation
- Readable code

---

### Q13: `setTimeout` vs `setInterval` - aapne kya use kiya?

**Answer:**
Mere project mein **`setTimeout`** use kiya:

```javascript
setTimeout(() => {
    formMessage.style.display = 'none';
}, 5000); // 5 seconds baad hide
```

**Differences:**

```javascript
// setTimeout - ek baar execute
setTimeout(() => {
    console.log('Hello');
}, 1000); // 1 second baad ek baar

// setInterval - repeatedly execute
setInterval(() => {
    console.log('Hello');
}, 1000); // Har 1 second par execute
```

**Mere use case:**
- Form message ko 5 seconds baad hide karna
- `setTimeout` perfect hai (ek baar chahiye)

**Clear timeout:**
```javascript
const timeoutId = setTimeout(() => {
    // code
}, 5000);

// Cancel if needed
clearTimeout(timeoutId);
```

---

## Code Structure & Best Practices

### Q14: Code ko kaise organize kiya? Functions kaise structure kiye?

**Answer:**
**Current structure:**
```javascript
// 1. DOM Elements (top)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// 2. Event Listeners
hamburger.addEventListener('click', () => { ... });

// 3. Functions
function showFormMessage(message, type) { ... }
```

**Better structure (improvement):**
```javascript
// 1. Constants
const SELECTORS = {
    hamburger: '#hamburger',
    navMenu: '#navMenu'
};

// 2. DOM Elements
const elements = {
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('navMenu')
};

// 3. Functions
const initMobileMenu = () => { ... };
const initScrollHandlers = () => { ... };

// 4. Initialization
const init = () => {
    initMobileMenu();
    initScrollHandlers();
};

init();
```

**Benefits:**
- Organized code
- Reusable functions
- Easy to maintain
- Better testing

---

### Q15: Form validation kaise kiya? Regex kya hai?

**Answer:**
```javascript
// Basic validation
if (!name || !phone || !email) {
    showFormMessage('Please fill in all required fields.', 'error');
    return;
}

// Email validation with Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
}
```

**Regex explanation:**
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

^          - Start of string
[^\s@]+    - One or more characters (not space, not @)
@          - Literal @ symbol
[^\s@]+    - One or more characters (not space, not @)
\.         - Literal dot (escaped)
[^\s@]+    - One or more characters (not space, not @)
$          - End of string
```

**Better validation:**
```javascript
// Phone validation
const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number

// More comprehensive email
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

---

### Q16: Error handling kaise kiya? Try-catch use kiya?

**Answer:**
**Current code mein:** Error handling nahi kiya (improvement needed)

**Should add:**
```javascript
// DOM element check
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        // code
    });
}

// Better with try-catch
try {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) {
        throw new Error('Hamburger element not found');
    }
    hamburger.addEventListener('click', handleClick);
} catch (error) {
    console.error('Error initializing menu:', error);
}
```

**Error handling best practices:**
```javascript
// 1. Null checks
if (!element) return;

// 2. Try-catch for risky operations
try {
    const data = JSON.parse(response);
} catch (error) {
    console.error('Parse error:', error);
}

// 3. Error boundaries
function safeExecute(fn) {
    try {
        return fn();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
```

---

## Browser APIs

### Q17: IntersectionObserver API kaise use kiya? Kya use cases hain?

**Answer:**
Mere project mein **do jagah** use kiya:

**1. Active Nav Link:**
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            // Update active nav link
        }
    });
}, {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
});

sections.forEach(section => {
    observer.observe(section);
});
```

**2. Lazy Loading Images:**
```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});
```

**IntersectionObserver options:**
- `root`: Viewport (null) ya specific element
- `rootMargin`: Margin around root (like CSS margin)
- `threshold`: 0 to 1 (kitna visible hona chahiye)

**Use cases:**
- Infinite scrolling
- Lazy loading
- Scroll animations
- Analytics tracking
- Ad visibility

---

### Q18: `window.scrollTo()` vs `scrollIntoView()` - kya difference?

**Answer:**
Mere project mein dono use kiye:

**1. `window.scrollTo()`:**
```javascript
window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
});
```
- Specific position par scroll karta hai
- Pixel values use karta hai
- Window level par kaam karta hai

**2. `scrollIntoView()`:**
```javascript
formMessage.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'nearest' 
});
```
- Element ko visible banata hai
- Element level par kaam karta hai
- Options: `block` (start/center/end/nearest), `inline`

**Differences:**
```javascript
// scrollTo - position based
window.scrollTo(0, 500); // Scroll to 500px from top

// scrollIntoView - element based
element.scrollIntoView(); // Element ko visible kare
```

---

### Q19: `FormData` API kya hai? Kaise use kiya?

**Answer:**
```javascript
const formData = new FormData(contactForm);
const name = formData.get('name');
const phone = formData.get('phone');
const email = formData.get('email');
```

**FormData benefits:**
- Form values easily access kar sakte hain
- File uploads handle kar sakta hai
- URLSearchParams se convert kar sakte hain
- Fetch API ke saath directly use kar sakte hain

**Methods:**
```javascript
const formData = new FormData(form);

formData.get('name');        // Get value
formData.set('name', 'John'); // Set value
formData.has('email');       // Check if exists
formData.delete('phone');    // Delete
formData.append('file', file); // Append file

// Iterate
for (let [key, value] of formData) {
    console.log(key, value);
}
```

**Fetch API ke saath:**
```javascript
fetch('/api/contact', {
    method: 'POST',
    body: formData // Direct use
});
```

---

## Advanced Topics

### Q20: Closures kya hain? Aapne project mein use kiye?

**Answer:**
**Closure** matlab function jo outer scope ke variables ko access kar sakta hai.

**Mere project mein example:**
```javascript
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};
```

**Closure example:**
```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return function() {
        count++; // Closure - outer scope access
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Real-world use:**
- Event handlers
- Callbacks
- Module pattern
- Data privacy

---

### Q21: `this` keyword kaise kaam karta hai? Arrow functions mein kya hota hai?

**Answer:**
**`this`** current execution context ko refer karta hai.

**Regular function:**
```javascript
const obj = {
    name: 'Test',
    regular: function() {
        console.log(this.name); // 'Test' (obj)
    }
};
obj.regular();
```

**Arrow function:**
```javascript
const obj = {
    name: 'Test',
    arrow: () => {
        console.log(this.name); // undefined (window)
    }
};
obj.arrow();
```

**Event handlers mein:**
```javascript
// Regular function - this = element
button.addEventListener('click', function() {
    console.log(this); // <button> element
});

// Arrow function - this = window
button.addEventListener('click', () => {
    console.log(this); // Window object
});
```

**Mere project mein:**
- Arrow functions use kiye event handlers mein
- `this` binding zaroori nahi thi
- Agar `this` chahiye hota to regular function use karte

---

### Q22: Async/Await vs Promises - kya difference? Aapne kya use kiya?

**Answer:**
**Mere project mein:** Async operations nahi hain (static website)

**But agar backend hota:**
```javascript
// Promise
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await (better)
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

**Differences:**
- Async/await - cleaner syntax, easier to read
- Promises - more flexible, chaining
- Both same thing hain, different syntax

**Mere project mein:**
- Form submission ko async banaya ja sakta hai
- Fetch API use karke backend ko data send kar sakte hain

---

### Q23: Code ko kaise test kare? Unit testing kya hai?

**Answer:**
**Current project:** Testing nahi kiya (static website)

**Testing types:**
1. **Unit Testing** - Individual functions test
2. **Integration Testing** - Multiple functions together
3. **E2E Testing** - Complete user flow

**Example with Jest:**
```javascript
// script.test.js
describe('Form Validation', () => {
    test('should validate email', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test('test@example.com')).toBe(true);
        expect(emailRegex.test('invalid')).toBe(false);
    });
    
    test('should show error for empty fields', () => {
        // Test implementation
    });
});
```

**Manual testing:**
- Different browsers mein check kiya
- Mobile/Desktop responsiveness
- Form validation
- Scroll animations

---

### Q24: Code ko production-ready banane ke liye kya improvements chahiye?

**Answer:**
**Current improvements needed:**

1. **Error Handling:**
```javascript
try {
    // code
} catch (error) {
    console.error('Error:', error);
    // User-friendly error message
}
```

2. **Performance:**
```javascript
// Throttle scroll events
function throttle(func, limit) { ... }

// Debounce form submission
function debounce(func, delay) { ... }
```

3. **Code Organization:**
```javascript
// Module pattern
const App = {
    init: function() { ... },
    handleMenu: function() { ... }
};
```

4. **Accessibility:**
```javascript
// ARIA attributes
button.setAttribute('aria-label', 'Toggle menu');
button.setAttribute('aria-expanded', 'false');
```

5. **Browser Compatibility:**
```javascript
// Polyfills for older browsers
if (!IntersectionObserver) {
    // Fallback implementation
}
```

6. **Minification:**
- Production mein minified code use kare
- Remove console.logs
- Optimize images

---

## Quick Reference - Key Concepts

### DOM Methods Used:
- `getElementById()` - Single element by ID
- `querySelector()` - First matching element
- `querySelectorAll()` - All matching elements
- `getAttribute()` - Get attribute value
- `setAttribute()` - Set attribute value

### Event Methods:
- `addEventListener()` - Add event listener
- `removeEventListener()` - Remove event listener
- `preventDefault()` - Stop default behavior
- `stopPropagation()` - Stop event bubbling

### Class Methods:
- `classList.add()` - Add class
- `classList.remove()` - Remove class
- `classList.toggle()` - Toggle class
- `classList.contains()` - Check if class exists

### Window Methods:
- `window.scrollTo()` - Scroll to position
- `window.requestAnimationFrame()` - Smooth animations
- `setTimeout()` - Execute after delay
- `setInterval()` - Execute repeatedly

### Browser APIs:
- **IntersectionObserver** - Element visibility
- **FormData** - Form data handling
- **Fetch API** - HTTP requests (not used in project)

---

## Common Interview Follow-ups

### Q25: Agar aapko ye project dobara banana ho, kya changes karenge?

**Answer:**
1. **Modular Code Structure:**
   - Separate files for different features
   - ES6 modules use kare
   - Better organization

2. **Performance Optimizations:**
   - Throttle/Debounce scroll events
   - Lazy load images properly
   - Code splitting

3. **Error Handling:**
   - Try-catch blocks
   - Null checks
   - User-friendly error messages

4. **Accessibility:**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

5. **Testing:**
   - Unit tests
   - Integration tests
   - Browser compatibility tests

6. **Build Tools:**
   - Webpack/Vite for bundling
   - Babel for transpilation
   - Minification for production

---

### Q26: JavaScript mein memory management kaise hota hai?

**Answer:**
**Automatic Garbage Collection:**
- JavaScript automatically memory manage karta hai
- Unused objects ko remove karta hai

**Memory Leaks Avoid:**
```javascript
// 1. Remove event listeners
element.removeEventListener('click', handler);

// 2. Clear intervals/timeouts
clearInterval(intervalId);
clearTimeout(timeoutId);

// 3. Null references
element = null;

// 4. Avoid global variables
// Bad
var data = []; // Global

// Good
(function() {
    const data = []; // Local scope
})();
```

**Mere project mein:**
- Static page hai, automatic cleanup
- But SPA hota to manual cleanup zaroori

---

## Summary - Key Points to Remember

1. **DOM Manipulation:** `getElementById`, `querySelector`, `classList`
2. **Event Handling:** `addEventListener`, `preventDefault`, event delegation
3. **Performance:** Throttle, debounce, `requestAnimationFrame`
4. **APIs:** IntersectionObserver, FormData, Fetch
5. **Concepts:** Closures, `this` binding, arrow functions
6. **Best Practices:** Error handling, code organization, accessibility

---

**Good Luck with your interview! 🚀**

*Remember: Code explain karte waqt confidently boliye, examples dijiye, aur agar kuch nahi pata to honestly boliye ki "I'll learn that" - ye positive impression deta hai.*
