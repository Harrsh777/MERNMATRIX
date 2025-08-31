# MERN Matrix Club Website

A modern, responsive website for the MERN Matrix Club built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern UI/UX**: Beautiful animations and interactions using Framer Motion
- **Performance Optimized**: Next.js Image optimization and lazy loading
- **Dark Theme**: Elegant dark purple and black color scheme
- **Interactive Components**: Carousel, animations, and smooth transitions
- **SEO Ready**: Meta tags and proper semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps
1. **Push to GitHub**: Ensure all changes are committed and pushed
2. **Vercel Dashboard**: Go to your Vercel dashboard
3. **Import Project**: Import your GitHub repository
4. **Environment Variables**: Add any required environment variables
5. **Deploy**: Click deploy and wait for build completion

### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Environment Variables (if needed)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Local Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production Preview
```bash
npm run start
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── components/         # Reusable components
│   ├── dashboard/          # Dashboard page
│   ├── events/             # Events page
│   ├── hackathon-details/  # Hackathon details page
│   ├── Ideation/           # Ideation page
│   ├── join/               # Join page
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── team/               # Team page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # Shared components
│   ├── ui/                 # UI components
│   └── magicui/            # Magic UI components
├── lib/                     # Utility functions
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
└── package.json            # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#9333EA)
- **Secondary**: Pink (#EC4899)
- **Background**: Black (#000000) to Purple (#1E0345)
- **Text**: White (#FFFFFF) to Gray (#E0E0E0)

### Typography
- **Font Family**: Poppins
- **Headings**: Bold weights (600, 700)
- **Body**: Regular weight (400, 500)

### Spacing
- **Mobile**: 16px base spacing
- **Tablet**: 24px base spacing
- **Desktop**: 32px base spacing

## 📱 Mobile-First Approach

The website is built with a mobile-first approach ensuring:
- Touch-friendly interactions
- Optimized images for mobile
- Responsive navigation
- Proper viewport settings
- Mobile-optimized carousels

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Images load only when needed
- **Code Splitting**: Automatic route-based code splitting
- **Minification**: Production builds are minified
- **Caching**: Proper cache headers for static assets

## 🔍 SEO & Accessibility

- **Meta Tags**: Proper title, description, and Open Graph tags
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Proper accessibility labels for interactive elements
- **Keyboard Navigation**: Full keyboard navigation support

## 🐛 Known Issues & Solutions

### Image Blur Issue (Fixed)
- **Problem**: First 3 team member images appeared blurred
- **Solution**: Updated BlurImage component to use Next.js Image with proper priority loading

### Server-Side Rendering (Fixed)
- **Problem**: ReferenceError: index is not defined
- **Solution**: Added proper index prop handling in BlurImage component

## 📞 Support

For any issues or questions:
1. Check the known issues section above
2. Review the console for error messages
3. Ensure all dependencies are properly installed
4. Verify environment variables are set correctly

## 📄 License

This project is licensed under the MIT License.

---

**Ready for Production Deployment! 🚀**
