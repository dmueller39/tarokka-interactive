import { useState } from 'react';
import { motion } from 'framer-motion';
import { TarokkaCard } from '../types/tarokka';
import { Card } from './Card';
import './CardSpread.css';

interface CardSpreadProps {
  cards: TarokkaCard[];
}

// Cross formation positions:
// Position 0: Left
// Position 1: Top
// Position 2: Right
// Position 3: Bottom
// Position 4: Center
const getCardPosition = (index: number): { x: number; y: number } => {
  // Vertically: 3 cards + 2 gaps (10px each) + 2 edge gaps (10px each) = 3 cards + 40px
  // Card dimensions: height = (100vh - 40px) / 3, width = height * 0.667
  // Spacing between cards: 10px
  const cardHeight = (window.innerHeight - 40) / 3;
  const cardWidth = cardHeight * 0.667;

  const horizontalSpacing = cardWidth + 10;  // Card width + 10px gap
  const verticalSpacing = cardHeight + 10;   // Card height + 10px gap

  const positions = [
    { x: -horizontalSpacing, y: 0 },    // Left
    { x: 0, y: -verticalSpacing },      // Top
    { x: horizontalSpacing, y: 0 },     // Right
    { x: 0, y: verticalSpacing },       // Bottom
    { x: 0, y: 0 },                     // Center
  ];

  return positions[index] || { x: 0, y: 0 };
};

export const CardSpread: React.FC<CardSpreadProps> = ({ cards }) => {
  const [currentRevealIndex, setCurrentRevealIndex] = useState<number>(-1);
  const [zoomedCardIndex, setZoomedCardIndex] = useState<number | null>(null);

  const handleClick = () => {
    // If a card is zoomed, return it to position
    if (zoomedCardIndex !== null) {
      setZoomedCardIndex(null);
      return;
    }

    // If we have more cards to reveal, zoom the next one
    if (currentRevealIndex < cards.length - 1) {
      const nextIndex = currentRevealIndex + 1;
      setZoomedCardIndex(nextIndex);

      // After zoom animation (0.6s), flip the card and update reveal index
      setTimeout(() => {
        setCurrentRevealIndex(nextIndex);
      }, 600);
    }
  };

  return (
    <motion.div
      className="card-spread"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="cards-container-cross">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            isRevealed={index <= currentRevealIndex}
            delay={index * 0.2}
            position={getCardPosition(index)}
            isZoomed={zoomedCardIndex === index}
          />
        ))}
      </div>
    </motion.div>
  );
};
