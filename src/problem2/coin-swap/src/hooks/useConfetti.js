import { useState } from "react";

const useConfetti = (initialPieces = 0, fadeOutStep = 20, fadeOutInterval = 100) => {
  const [numberOfPieces, setNumberOfPieces] = useState(initialPieces);

  const startConfetti = (pieces = 300, duration = 2000) => {
    setNumberOfPieces(pieces);

    setTimeout(() => {
      // Gradually reduce confetti pieces
      const interval = setInterval(() => {
        setNumberOfPieces((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - fadeOutStep; // Decrease the number of pieces
        });
      }, fadeOutInterval);
    }, duration); // Start fade-out after the specified duration
  };

  return { numberOfPieces, startConfetti };
};

export default useConfetti;
