# Perfect Security Camera Solution - Website

A premium, modern, and fully responsive static website for a security camera company.

## 📁 Project Structure

```
perfect-security-camera-solution/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles (mobile-first responsive)
├── js/
│   └── script.js      # Interactive features & functionality
├── assets/
│   ├── logo.png       # Company logo (add your logo here)
│   ├── about-image.jpg
│   ├── product-*.jpg  # Product images
│   └── gallery-*.jpg  # Gallery images
└── README.md          # This file
```

## 🚀 How to Open Locally

1. **Simple Method:**
   - Double-click `index.html` to open in your default browser
   - Or right-click → "Open with" → Choose your browser

2. **Using a Local Server (Recommended):**
   - **Python:** Open terminal in project folder and run:
     ```bash
     python -m http.server 8000
     ```
     Then visit: `http://localhost:8000`
   
   - **Node.js:** Install `http-server` globally:
     ```bash
     npm install -g http-server
     http-server
     ```
     Then visit the URL shown in terminal

   - **VS Code:** Install "Live Server" extension, then right-click `index.html` → "Open with Live Server"

## 🌐 How to Deploy

### Option 1: Netlify (Easiest)
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up/login
3. Drag and drop your project folder onto Netlify
4. Your site will be live instantly with a free URL!

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "New Project"
4. Upload your project folder
5. Deploy!

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be at: `https://yourusername.github.io/repository-name`

### Option 4: Any Web Hosting
- Upload all files via FTP to your hosting provider
- Make sure `index.html` is in the root directory

## ✏️ Customization Guide

### Update Contact Information
Edit these in `index.html`:
- **Phone:** Search for `tel:+910000000000` and replace with your number
- **WhatsApp:** Search for `wa.me/910000000000` and replace with your number
- **Email:** Search for `info@perfectsecurity.com` and replace with your email
- **Address:** Search for "Your Business Address Here" and update

### Add Your Logo
1. Place your logo file in `assets/` folder
2. Name it `logo.png` (or update the filename in HTML)
3. Recommended size: 200x60px or similar aspect ratio

### Update Images
- Replace images in `assets/` folder with your own
- Keep the same filenames, or update paths in `index.html`
- Recommended formats: JPG, PNG, WebP
- Optimize images for web (use tools like TinyPNG)

### Change Colors
Edit CSS variables in `css/style.css` (top of file):
```css
:root {
    --primary-color: #0066cc;    /* Main brand color */
    --secondary-color: #00a8cc;  /* Secondary color */
    --accent-color: #00d4ff;     /* Accent/highlight color */
    --dark-bg: #0a0e27;          /* Dark background */
}
```

### Update Google Map
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your business address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in the Contact section of `index.html`

## 📱 Mobile Responsiveness

The website is fully responsive and tested for:
- Mobile phones (320px, 375px, 425px)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1200px+)

## ✨ Features Included

- ✅ Sticky navigation bar
- ✅ Mobile hamburger menu
- ✅ Smooth scrolling
- ✅ Active nav link highlighting
- ✅ FAQ accordion
- ✅ Contact form (frontend only - no backend)
- ✅ Floating WhatsApp button
- ✅ Back to top button
- ✅ Mobile bottom action bar
- ✅ Scroll reveal animations
- ✅ Responsive image gallery
- ✅ Modern, premium design

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (No frameworks)
- Google Fonts (Poppins)

## 📝 Notes

- The contact form shows a success message but doesn't actually send emails (no backend)
- To enable form submissions, integrate with a service like:
  - Formspree
  - EmailJS
  - Netlify Forms
  - Your own backend API

## 🎨 Design Features

- Modern dark theme with blue accents
- Smooth animations and transitions
- Professional typography
- Clean, organized layout
- Mobile-first responsive design
- Fast loading and lightweight

## 📞 Support

For questions or customization help, refer to the code comments in each file.

---

**© 2026 Perfect Security Camera Solution. All Rights Reserved.**
