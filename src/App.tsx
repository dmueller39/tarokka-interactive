import { useState } from "react";
import { motion } from "framer-motion";
import { CardSpread } from "./components/CardSpread";
import { Coverflow } from "./components/Coverflow";
import { tarokkaDeck, drawCards } from "./data/cards";

import { readingGuide } from "./data/guide";
import { TarokkaCard } from "./types/tarokka";
import "./App.css";

function App() {
  const [drawnCards, setDrawnCards] = useState<TarokkaCard[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [readingText, setReadingText] = useState<string>("");
  const [showCopied, setShowCopied] = useState(false);

  const handleDrawCards = (isStrahdMustDie: Boolean) => {
    let cards: TarokkaCard[];

    if (isStrahdMustDie) {
      // Draw 4 cards from low deck with inRavenloft = true
      const lowDeckRavenloft = tarokkaDeck.filter(
        (card) => card.suit !== "high" && card.inRavenloft === true
      );
      const fourLowCards = drawCards(lowDeckRavenloft, 4);

      // Draw 1 card from high deck
      const highDeck = tarokkaDeck.filter((card) => card.suit === "high");
      const oneHighCard = drawCards(highDeck, 1);

      // Combine: first 4 are low deck, 5th is high deck
      cards = [...fourLowCards, ...oneHighCard];
    } else {
      // Draw 3 cards from low deck (any suit except high)
      const lowDeck = tarokkaDeck.filter((card) => card.suit !== "high");
      const threeLowCards = drawCards(lowDeck, 3);

      // Draw 2 cards from high deck
      const highDeck = tarokkaDeck.filter((card) => card.suit === "high");
      const twoHighCards = drawCards(highDeck, 2);

      // Combine: first 3 are low deck, last 2 are high deck
      cards = [...threeLowCards, ...twoHighCards];
    }

    // Log card information to console and store for clipboard
    let outputText = "=== TAROKKA READING ===\n";

    cards.forEach((card, index) => {
      const guide = readingGuide[index];

      const sectionHeader = `\n${guide.name}`;
      const cardHeader = `Card ${index + 1}: ${card.name}`;

      outputText += sectionHeader + "\n";
      outputText += cardHeader + "\n";
      outputText += `Guide Flavor: ${guide.flavorText}\n`;
      outputText += `Guide Explanation: ${guide.explanation}\n`;

      // For normal mode, 4th card (index 3) shows enemy info
      if (!isStrahdMustDie && index === 3 && card.enemies) {
        if (card.enemies.length === 1) {
          const flavor = `Card Flavor: ${card.enemies[0].flavorText}`;
          const enemy = `Enemy: ${card.enemies[0].name}`;
          outputText += flavor + "\n" + enemy + "\n";
        } else if (card.enemies.length === 2) {
          outputText += "Pick one:\n";
          card.enemies.forEach((enemyOption, enemyIndex) => {
            const flavor = `Flavor: ${enemyOption.flavorText}`;
            const enemy = `Enemy: ${enemyOption.name}`;
            outputText += flavor + "\n" + enemy + "\n";
            if (enemyIndex == 0) {
              outputText += "--OR--" + "\n";
            }
          });
        }
      } else {
        const flavor = `Card Flavor: ${card.flavorText}`;
        const explanation = `Card Explanation: ${card.explanation}`;
        outputText += flavor + "\n" + explanation + "\n";
      }
    });

    outputText += "\n=======================";

    console.log(outputText);

    setReadingText(outputText);
    setDrawnCards(cards);
    setIsReading(true);
  };

  const handleReset = () => {
    setIsReading(false);
    setDrawnCards([]);
    setReadingText("");
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(readingText);
      console.log("Reading copied to clipboard!");
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
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
          <h1 className="title">Fortunes of Ravenloft</h1>
          <Coverflow cards={tarokkaDeck} />
          <div className="button-container">
            <motion.button
              className="draw-button"
              onClick={() => handleDrawCards(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Curse of Strahd
            </motion.button>
            <motion.button
              className="draw-button"
              onClick={() => handleDrawCards(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Strahd Must Die Tonight
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <>
          <CardSpread cards={drawnCards} />
          <div className="copy-button-container">
            <motion.button
              className="copy-button"
              onClick={handleCopyToClipboard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </motion.button>
            {showCopied && (
              <motion.div
                className="copy-confirmation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Copied
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
