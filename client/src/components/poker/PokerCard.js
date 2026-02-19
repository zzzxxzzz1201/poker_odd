import React from "react";

const SUITS = {
  h: { symbol: "\u2665", name: "hearts" },
  d: { symbol: "\u2666", name: "diamonds" },
  c: { symbol: "\u2663", name: "clubs" },
  s: { symbol: "\u2660", name: "spades" },
};

const PokerCard = ({ card, onClick }) => {
  if (!card) {
    return (
      <div className="poker-card poker-card-empty" onClick={onClick}>
        +
      </div>
    );
  }

  const rank = card[0];
  const suit = card[1];
  const suitInfo = SUITS[suit];

  return (
    <div
      className={`poker-card poker-card-${suitInfo.name}`}
      onClick={onClick}
    >
      <span className="poker-card-rank">{rank}</span>
      <span className="poker-card-suit">{suitInfo.symbol}</span>
    </div>
  );
};

export { SUITS };
export default PokerCard;
