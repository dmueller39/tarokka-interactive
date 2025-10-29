# Fortunes of Ravenloft - Interactive Tarokka Reading

An interactive web application for performing Tarokka card readings for *Curse of Strahd* and *Strahd Must Die Tonight!* campaigns. Features a beautiful animated coverflow card display and automated reading generation.

🎴 **[Live Demo](https://dmueller39.github.io/tarokka-interactive/)**

## About

The Tarokka deck is used in the Dungeons & Dragons adventure module *Curse of Strahd* to determine key locations and allies for the party. This app automates the card reading process with:

- Animated coverflow card display showing the full Tarokka deck
- Support for both **Curse of Strahd** and **Strahd Must Die Tonight!** reading modes
- Automated card drawing with proper deck filtering rules
- Complete reading guide with flavor text and explanations
- Copy-to-clipboard functionality for easy sharing with players

## Game Modes

### Curse of Strahd (Standard)
Draws 5 cards following the standard reading:
- 3 cards from the low deck (glyphs, stars, coins, swords, crowns)
- 2 cards from the high deck
- Card 4 determines Strahd's Enemy (ally)
- Card 5 determines Strahd's location

### Strahd Must Die Tonight!
Modified reading for the one-shot adventure:
- 4 cards from low deck cards with `inRavenloft: true`
- 1 card from high deck
- All treasure locations are within Castle Ravenloft

## Technologies Used

- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vite.dev/)** - Build tool and dev server
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[gh-pages](https://github.com/tschaub/gh-pages)** - GitHub Pages deployment

## Credits & References

- **Game Content**: Based on *Curse of Strahd* by Wizards of the Coast
- **Strahd Must Die Tonight!**: Adventure module reference for the alternative reading mode
- **Card Images**: Beautiful colorized Tarokka card artwork from [this Imgur gallery](https://imgur.com/gallery/color-tarokka-cards-curse-of-strahd-qJhI08z)

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/dmueller39/tarokka-interactive.git
cd tarokka-interactive

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── CardSpread.tsx      # Card reading display component
│   ├── Coverflow.tsx       # Animated card carousel
│   └── Card.tsx            # Individual card component
├── data/
│   ├── cards.ts            # Complete Tarokka deck data
│   └── guide.ts            # Reading guide text
├── types/
│   └── tarokka.ts          # TypeScript interfaces
├── App.tsx                 # Main application
└── main.tsx               # Application entry point
```

## Features

### Animated Coverflow
- Smooth spring-based animations powered by Framer Motion
- Cards automatically cycle through the deck
- Tilted 3D perspective for depth
- Responsive sizing based on viewport height

### Reading Generation
- Complete reading guide with flavor text for each card position
- Support for multiple enemy options (pick one format)
- Automatic formatting with card explanations
- Copy entire reading to clipboard with one click

### Card Data
- 54 card full Tarokka deck
- High deck (14 cards) and low deck suits (40 cards)
- Complete flavor text and location explanations
- Enemy information for all potential ally cards
- `inRavenloft` flag for Strahd Must Die Tonight mode

## Deployment

The app is automatically deployed to GitHub Pages. To deploy updates:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push to the `gh-pages` branch
3. Update the live site at https://dmueller39.github.io/tarokka-interactive/

## License

This is a fan-made tool for the *Curse of Strahd* adventure. All game content is © Wizards of the Coast.

Card artwork from the community-created colorized set.

---

Built with ❤️ for Dungeon Masters running *Curse of Strahd*
