# MERN Matrix Club Website

A modern, interactive website for the MERN Matrix Club featuring stunning animations, 3D graphics, and a responsive design.

## Features

- 🎨 Modern UI with Framer Motion animations
- 🌟 Interactive 3D background with Three.js
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React 19
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, @react-three/fiber
- **Icons**: React Icons, Tabler Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harrsh777/MERNMATRIX.git
cd MERNMATRIX
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

No environment variables are required for basic functionality.

### Build Configuration

The project includes optimized build settings:
- `.npmrc` with network retry settings for Vercel
- `vercel.json` with build configuration
- Optimized package imports for better performance

## Troubleshooting

### Build Errors

If you encounter build errors:

1. **Clear cache**: Delete `.next` folder and `node_modules`
2. **Reinstall dependencies**: `npm ci`
3. **Check Node version**: Ensure you're using Node.js 18+

### SSR Issues

The project includes proper client-side guards for all browser APIs:
- All `window` access is protected with `typeof window !== 'undefined'`
- Components using browser APIs are marked with `"use client"`

### Network Issues on Vercel

The `.npmrc` file includes:
- Network retry settings
- Extended timeouts
- Registry configuration

## Project Structure

```
mern/
├── app/                    # Next.js 13+ app directory
│   ├── components/        # Reusable components
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Shared components
│   ├── ui/               # UI components
│   └── magicui/          # Magic UI components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
