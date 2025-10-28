# Tarokka Interactive Setup

## Your Interactive Tarokka Deck is Ready!

This project is built with:

- **Vite** - Lightning-fast dev server
- **React + TypeScript** - Type-safe component development
- **Framer Motion** - Smooth spring-based animations

## Getting Started

### 1. Run the development server:

```bash
npm run dev
```

Then open your browser to the URL shown (usually http://localhost:5173)

### 2. Add Your Card Images

Place your PNG images in the `public/assets/cards/` directory with these filenames:

- artifact.png
- beast.png
- broken-one.png
- darklord.png
- donjon.png
- executioner.png
- ghost.png
- horseman.png
- innocent.png
- marionette.png
- mists.png
- raven.png
- seer.png
- tempter.png
- etc

If you don't have images yet, the app will show placeholder cards with the card names.

### 3. Customize Your Deck

Edit `src/data/cards.ts` to:

- Add more cards to the deck
- Change card names and suits
- Update image paths
- Add card meanings/descriptions

## Features

✨ **Animated Card Drawing** - Cards fly in and spread out with spring physics
🎴 **Interactive Flip** - Click any card to reveal it
🔄 **Shuffle & Redraw** - Get a new reading anytime
📱 **Responsive** - Works on desktop, tablet, and mobile

## Project Structure

```
src/
├── components/
│   ├── Card.tsx          # Individual card with flip animation
│   ├── Card.css
│   ├── CardSpread.tsx    # 5-card layout manager
│   └── CardSpread.css
├── types/
│   └── tarokka.ts        # TypeScript interfaces
├── data/
│   └── cards.ts          # Card definitions & shuffle logic
├── App.tsx               # Main app logic
└── App.css
```

## Customization Ideas

### Change Animation Timing

In `Card.tsx`, adjust the `transition` properties:

```typescript
transition={{
  type: "spring",
  stiffness: 100,  // Higher = snappier
  damping: 15,     // Higher = less bouncy
  delay: delay,
}}
```

### Modify Card Layout

In `CardSpread.tsx`, change the spread position calculation:

```typescript
x: spreadPosition * 180 - 360; // Adjust spacing
```

### Update Colors

Edit the gradient colors in `App.css` and `Card.css`

### Add Card Meanings

Add a `meaning` field in `cards.ts` and display it when cards are revealed

## Build for Production

```bash
npm run build
```

The optimized app will be in the `dist/` folder, ready to deploy!

## Next Steps

1. Add all your tarokka card images
2. Expand the card deck in `cards.ts`
3. Customize colors and animations to match your style
4. Consider adding sound effects for card flips
5. Add card meanings/interpretations

Enjoy your digital tarokka deck! 🔮
