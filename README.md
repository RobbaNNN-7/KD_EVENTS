# HD Events - React Application

A modern, React-based event management website for HD Events, featuring professional event planning, decor, and management services in Islamabad.

## 🚀 Features

- **Modern React Architecture** - Built with React 18 and Vite for fast development and optimized production builds
- **Client-Side Routing** - Seamless navigation using React Router v6
- **Responsive Design** - Mobile-first design that works on all devices
- **Interactive Components** - Video backgrounds, testimonial sliders, FAQ accordions, and more
- **Contact Form** - Integrated with EmailJS for form submissions
- **Component-Based** - Modular, reusable components for easy maintenance

## 📁 Project Structure

```
react-app/
├── public/
│   └── assets/
│       ├── images/        # All images and logos
│       └── videos/        # Event videos
├── src/
│   ├── components/
│   │   ├── layout/       # Header, Footer, MainLayout
│   │   ├── sections/     # Hero, About, Services, etc.
│   │   └── shared/       # Reusable components
│   ├── pages/            # HomePage, GalleryPage, CorporatePage
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS files
│   ├── App.jsx           # Main App component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
└── package.json
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd /Users/robbannn/Desktop/PROJECTS/KD_EVENTS1/KD_EVENTS/react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS** (for contact form)
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Update `src/components/sections/Contact.jsx` with your credentials:
     ```javascript
     const serviceID = 'YOUR_SERVICE_ID';
     const templateID = 'YOUR_TEMPLATE_ID';
     const publicKey = 'YOUR_PUBLIC_KEY';
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview production build
```bash
npm run preview
```

## 🎨 Customization

### Updating Content

- **Team Members**: Edit `src/components/sections/Team.jsx`
- **Services**: Edit `src/components/sections/Services.jsx`
- **Projects**: Edit `src/components/sections/RecentProjects.jsx`
- **Testimonials**: Edit `src/components/sections/Testimonials.jsx`
- **FAQ**: Edit `src/components/sections/FAQ.jsx`

### Styling

- Global styles: `src/index.css`
- Component styles: `src/styles/*.css`
- Original styles are imported from the vanilla version

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.jsx`:
   ```javascript
   <Route path="/your-page" element={<YourPage />} />
   ```

## 📱 Routes

- `/` - Home page (all sections)
- `/gallery` - Full gallery of events
- `/corporate` - Corporate events information

## 🔧 Technologies Used

- **React** 18.x - UI library
- **Vite** - Build tool and dev server
- **React Router** 6.x - Client-side routing
- **EmailJS** - Contact form email service
- **Font Awesome** - Icons
- **Google Fonts** (Poppins) - Typography

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

### Migration from Vanilla HTML/CSS/JS

This React application is a conversion of the original vanilla HTML/CSS/JavaScript website. Key changes:

- **URL Structure**: `/gallery.html` → `/gallery`, `/corporate.html` → `/corporate`
- **Single Page Application**: All pages now load within a single HTML file with client-side routing
- **Component-Based**: Previously monolithic HTML files are now broken into reusable React components
- **State Management**: JavaScript event listeners replaced with React hooks (useState, useEffect)

### Known Issues/TODOs

- [ ] Configure EmailJS with actual credentials
- [ ] Add AOS (Animate On Scroll) library for scroll animations
- [ ] Optimize video loading for mobile devices
- [ ] Add image lazy loading
- [ ] Set up deployment configuration

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Netlify
1. Build: `npm run build`
2. Deploy the `dist/` folder

### GitHub Pages
1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📞 Contact

- **Email**: info@eventsbykd.com, hdsuppliess@gmail.com
- **Phone**: +92 3265445388, 0341-2888684
- **Location**: E-11 Islamabad, Pakistan

## 📄 License

© 2024 EVENTS BY KD. All rights reserved.
