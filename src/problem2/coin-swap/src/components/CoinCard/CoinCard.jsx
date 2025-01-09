import React, { useState } from "react";
import "./CoinCard.css";

const CoinCard = ({ icon, title, id, onCoinSelect  }) => {
  const [hoverClass, setHoverClass] = useState("");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const cardWidth = rect.width;

    if (mouseX < cardWidth / 2) {
      setHoverClass("left-hover");
    } else {
      setHoverClass("right-hover");
    }
  };

  const handleMouseLeave = () => {
    setHoverClass("");
  };

  const handleClick = () => {
    if (hoverClass === "left-hover") {
      onCoinSelect("source", id); // Set source coin
    } else if (hoverClass === "right-hover") {
      onCoinSelect("destination", id); // Set destination coin
    }
  };

  return (
    <div
      className={`coin-card ${hoverClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
        <span className="coin-icon">{icon}</span>
        <span className="coin-title">{title}</span>
    </div>
  );
};

export default CoinCard;
