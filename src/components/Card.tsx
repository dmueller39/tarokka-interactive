import { motion } from 'framer-motion';
import { TarokkaCard } from '../types/tarokka';
import './Card.css';

interface CardProps {
  card: TarokkaCard;
  isRevealed: boolean;
  onClick?: () => void;
  delay?: number;
  position?: { x: number; y: number };
  isZoomed?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  isRevealed,
  delay = 0,
  position = { x: 0, y: 0 },
  isZoomed = false
}) => {
  // Calculate zoomed dimensions: 66vh height, maintain aspect ratio
  const zoomedHeight = window.innerHeight * 0.66;
  const zoomedWidth = zoomedHeight * 0.667;

  return (
    <motion.div
      className="card-container"
      initial={{
        x: -200,
        y: -100,
        scale: 0.5,
        opacity: 0
      }}
      animate={
        isZoomed
          ? {
              x: 0,
              y: 0,
              width: zoomedWidth,
              height: zoomedHeight,
              scale: 1,
              opacity: 1,
              zIndex: 100
            }
          : {
              x: position.x,
              y: position.y,
              width: (window.innerHeight - 40) / 3 * 0.667,
              height: (window.innerHeight - 40) / 3,
              scale: 1,
              opacity: 1,
              zIndex: isRevealed ? 10 : 1
            }
      }
      transition={
        isZoomed
          ? {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0
            }
          : {
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: delay
            }
      }
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        className="card-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <div className="card-back">
          <img
            src={`${import.meta.env.BASE_URL}assets/cards/back.png`}
            alt="Card back"
          />
        </div>
        <div className="card-front">
          <img
            src={card.imageUrl}
            alt={card.name}
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">
                  <rect width="200" height="300" fill="#2a1a4a"/>
                  <text x="50%" y="50%" text-anchor="middle" fill="#fff" font-size="16">${card.name}</text>
                </svg>`
              );
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
