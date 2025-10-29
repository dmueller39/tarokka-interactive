import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarokkaCard } from '../types/tarokka';
import { shuffleDeck } from '../data/cards';
import './Coverflow.css';

interface CoverflowProps {
  cards: TarokkaCard[];
}

export const Coverflow: React.FC<CoverflowProps> = ({ cards }) => {
  const [shuffledCards, setShuffledCards] = useState<TarokkaCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Shuffle cards on mount
  useEffect(() => {
    setShuffledCards(shuffleDeck(cards));
  }, [cards]);

  // Preload all card images
  useEffect(() => {
    if (cards.length === 0) return;

    const imagePromises = cards.map((card) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block loading
        img.src = card.imageUrl;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [cards]);

  // Auto-advance with 2 second pause after animation completes (~3s animation + 2s pause)
  useEffect(() => {
    if (shuffledCards.length === 0) return;

    let interval: number;

    // Initial advance after 2 seconds
    const initialTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);

      // Start regular interval after initial advance
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
      }, 5000);
    }, 2000);

    return () => {
      clearTimeout(initialTimeout);
      if (interval) clearInterval(interval);
    };
  }, [shuffledCards]);

  if (shuffledCards.length === 0 || !imagesLoaded) return null;

  // Calculate positions for visible cards
  const getCardStyle = (offset: number) => {
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    return {
      x: offset * 250,
      scale: isCenter ? 1.0 : 0.75,
      rotateY: -offset * 25,
      opacity: absOffset <= 3 ? Math.max(0, 1 - absOffset * 0.25) : 0.25,
      zIndex: 10 - absOffset,
    };
  };

  // Show 13 cards: 6 before center, center, 6 after center (extra cards off-screen for smooth enter/exit)
  const visibleRange = 6;
  const visibleCards = [];

  for (let i = -visibleRange; i <= visibleRange; i++) {
    const index = (currentIndex + i + shuffledCards.length) % shuffledCards.length;
    visibleCards.push({
      card: shuffledCards[index],
      offset: i,
      index: index, // Use actual card index as key for smooth transitions
    });
  }

  return (
    <motion.div
      className="coverflow-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="coverflow-stage">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleCards.map(({ card, offset, index }) => {
            const style = getCardStyle(offset);
            const initialStyle = { ...style, opacity: 0 };

            return (
              <motion.div
                key={index}
                className="coverflow-card"
                initial={initialStyle}
                animate={style}
                exit={style}
                transition={{
                  type: "spring",
                  stiffness: 65,
                  damping: 18,
                  mass: 1.5,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">
                        <rect width="200" height="300" fill="#2a1a4a"/>
                        <text x="50%" y="50%" text-anchor="middle" fill="#fff" font-size="16">${card.name}</text>
                      </svg>`
                    );
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
