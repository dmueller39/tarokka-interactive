import { useState } from 'react';
import { motion } from 'framer-motion';
import { CardSpread } from './components/CardSpread';
import { tarokkaDeck, drawCards } from './data/cards';
import { TarokkaCard } from './types/tarokka';
import './App.css';

function App() {
  const [drawnCards, setDrawnCards] = useState<TarokkaCard[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [strahdMode, setStrahdMode] = useState(false);

  const handleDrawCards = () => {
    let cards: TarokkaCard[];

    if (strahdMode) {
      // Draw 4 cards from low deck with inRavenloft = true
      const lowDeckRavenloft = tarokkaDeck.filter(
        card => card.suit !== 'high' && card.inRavenloft === true
      );
      const fourLowCards = drawCards(lowDeckRavenloft, 4);

      // Draw 1 card from high deck
      const highDeck = tarokkaDeck.filter(card => card.suit === 'high');
      const oneHighCard = drawCards(highDeck, 1);

      // Combine: first 4 are low deck, 5th is high deck
      cards = [...fourLowCards, ...oneHighCard];
    } else {
      // Draw 3 cards from low deck (any suit except high)
      const lowDeck = tarokkaDeck.filter(card => card.suit !== 'high');
      const threeLowCards = drawCards(lowDeck, 3);

      // Draw 2 cards from high deck
      const highDeck = tarokkaDeck.filter(card => card.suit === 'high');
      const twoHighCards = drawCards(highDeck, 2);

      // Combine: first 3 are low deck, last 2 are high deck
      cards = [...threeLowCards, ...twoHighCards];
    }

    // Log card information to console
    console.log('=== TAROKKA READING ===');
    cards.forEach((card, index) => {
      console.log(`\nCard ${index + 1}: ${card.name}`);

      // For normal mode, 4th card (index 3) shows enemy info
      if (!strahdMode && index === 3) {
        console.log(`Flavor: ${card.enemyFlavorText}`);
        console.log(`Enemy: ${card.enemyName}`);
      } else {
        console.log(`Flavor: ${card.flavorText}`);
        console.log(`Explanation: ${card.explanation}`);
      }
    });
    console.log('\n=======================');

    setDrawnCards(cards);
    setIsReading(true);
  };

  const handleReset = () => {
    setIsReading(false);
    setDrawnCards([]);
  };

  return (
    <div className="app">
      {!isReading ? (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tarokka Reading
          </motion.h1>
          <motion.label
            className="checkbox-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="checkbox"
              checked={strahdMode}
              onChange={(e) => setStrahdMode(e.target.checked)}
            />
            <span>Strahd Must Die Tonight</span>
          </motion.label>
          <motion.button
            className="draw-button"
            onClick={handleDrawCards}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.6
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Draw Cards
          </motion.button>
        </motion.div>
      ) : (
        <CardSpread cards={drawnCards} />
      )}
    </div>
  );
}

export default App;
