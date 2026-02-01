# GofieVFX Portfolio Website

A professional, single-page portfolio website for GofieVFX - Video Editor & Motion Graphics Artist with nearly 6 years of experience.

## Features

- **Single-page architecture** with smooth scrolling navigation
- **Fully responsive design** (mobile-first approach)
- **Dark cinematic aesthetic** optimized for video editing profession
- **Portfolio slider** with touch/swipe navigation
- **Contact form** with client-side validation
- **Scroll-triggered animations** using Intersection Observer API
- **Performance optimized** with lazy loading and efficient CSS

## Technology Stack

- **HTML5** - Semantic markup for accessibility and SEO
- **CSS3** - Modern layout with Grid and Flexbox, custom properties
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **Intersection Observer API** - Efficient scroll animations and navigation

## Project Structure

```
├── index.html              # Main HTML document
├── styles/
│   └── main.css           # CSS with custom properties and responsive design
├── js/
│   ├── main.js            # JavaScript modules for interactions
│   └── email-config.js    # EmailJS configuration
├── assets/
│   └── portfolio/         # Portfolio images directory
├── package.json           # Development dependencies and scripts
├── EMAILJS_SETUP.md       # Email setup instructions
└── README.md             # Project documentation
```

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   This will start a live server on `http://localhost:3000` with auto-reload.

3. **Alternative start command:**
   ```bash
   npm start
   ```

4. **Set up email functionality:**
   - See `EMAILJS_SETUP.md` for detailed instructions
   - Configure EmailJS to send form submissions to Gofievfx@gmail.com
   - Update credentials in `js/email-config.js`

## CSS Architecture

The project uses a **mobile-first responsive design** with CSS custom properties for maintainable styling:

### Custom Properties (CSS Variables)
- Color palette (dark theme optimized for video editing)
- Typography scale with responsive adjustments
- Spacing system for consistent layouts
- Animation timing and easing functions

### Responsive Breakpoints
- **Mobile**: 320px - 767px (single-column layouts)
- **Tablet**: 768px - 1199px (hybrid layouts)
- **Desktop**: 1200px+ (multi-column layouts)

## JavaScript Modules

The `PortfolioApp` class handles:
- **Smooth scrolling navigation** with active section highlighting
- **Portfolio slider** with touch/mouse navigation
- **Contact form** validation and submission
- **Scroll animations** using Intersection Observer
- **Responsive behavior** across all devices

## Performance Optimizations

- **Lazy loading** for portfolio images
- **CSS animations** using transform and opacity for GPU acceleration
- **Minimal JavaScript** footprint with efficient event handling
- **Optimized images** (WebP with fallbacks recommended)
- **Critical CSS** approach for above-the-fold content

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Content Customization

### Portfolio Images
Replace placeholder files in `assets/portfolio/` with actual screenshots:
- **Recommended dimensions**: 267 x 491 pixels (aspect ratio 0.54:1)
- **Format**: JPG or WebP for optimal performance
- **Naming**: Use descriptive names for better SEO

### Contact Information
Update contact details in the HTML:
- Email address
- Discord/WhatsApp contact
- Portfolio/Drive links

### Content Sections
All content follows the requirements specification and can be updated directly in the HTML while maintaining the semantic structure.

## Deployment

For production deployment:

1. **Optimize images** - Convert to WebP format with fallbacks
2. **Minify CSS and JavaScript** - Use build tools for compression
3. **Test across browsers** - Ensure compatibility
4. **Validate accessibility** - Check WCAG 2.1 AA compliance

## License

MIT License - See LICENSE file for details.

## Contact

For questions about this portfolio website, contact GofieVFX through the contact form or direct channels listed on the site.