# UmmahHacks Landing Page

A production-ready React landing page for a Muslim-focused hackathon, built with modern web technologies.

## Tech Stack

- **React 18** + **TypeScript** - Type-safe UI framework
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **lucide-react** - Beautiful icon library
- **shadcn/ui** - Reusable UI components (Button, Card, Accordion, Tabs, Badge)

## Features

- 🎨 Modern, premium design with tasteful animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible (proper headings, ARIA labels)
- ⚡ Fast and optimized
- 🎯 Single-page layout with smooth scrolling
- 🌙 Dark theme by default

## Sections

- **Sticky Navbar** - Responsive navigation with mobile menu
- **Hero** - Eye-catching headline with CTAs and stats
- **Partners/Sponsors** - Grayscale sponsor logos with hover effects
- **About** - Value proposition with feature cards
- **Tracks** - 6 challenge tracks with icons and descriptions
- **Schedule** - Day 1/Day 2 timeline with tabs
- **Prizes** - Main prizes and category awards
- **Mentors** - Speaker and mentor profiles
- **FAQ** - Accordion with common questions
- **CTA** - Final call-to-action section
- **Footer** - Links, contact info, and social media

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

All content is centralized in `src/siteConfig.ts`. Update this file to customize:

- Event name, date, location
- Application and Discord links
- Social media links
- Tracks and challenges
- Schedule (Day 1 and Day 2)
- Prizes
- Mentors/Speakers
- FAQ items
- Sponsors

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── AnimatedBackground.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SectionHeader.tsx
│   ├── TrackCard.tsx
│   ├── ScheduleTabs.tsx
│   ├── FAQAccordion.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts      # Utility functions
├── siteConfig.ts     # All content configuration
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Customization

### Changing Colors

Edit `src/index.css` to modify the color scheme. The theme uses CSS variables for easy customization.

### Adding Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Update the navbar links if needed

### Modifying Animations

Animations use Framer Motion. Adjust timing and effects in individual components.

## Code of Conduct

The landing page includes a placeholder link to a Code of Conduct. Update the link in the Footer component when ready.

## License

This project is open source and available for use.

## Support

For questions or issues, please contact: hello@ummahhacks.com

