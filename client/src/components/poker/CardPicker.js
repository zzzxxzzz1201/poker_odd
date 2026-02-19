import React from "react";

const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const SUIT_LIST = [
  { code: "h", symbol: "\u2665", label: "\u2665 \u7d05\u5fc3", name: "hearts" },
  { code: "d", symbol: "\u2666", label: "\u2666 \u65b9\u584a", name: "diamonds" },
  { code: "c", symbol: "\u2663", label: "\u2663 \u6885\u82b1", name: "clubs" },
  { code: "s", symbol: "\u2660", label: "\u2660 \u9ed1\u6843", name: "spades" },
];

const CardPicker = ({ show, usedCards, currentCard, onSelect, onClear, onClose }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="poker-picker-overlay" onClick={handleOverlayClick}>
      <div className="poker-picker-modal">
        <div className="poker-picker-header">
          <h3>選擇一張牌</h3>
          <button className="poker-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="poker-picker-body">
          {SUIT_LIST.map((suit) => (
            <div className="poker-suit-section" key={suit.code}>
              <div className={`poker-suit-label poker-suit-label-${suit.name}`}>
                {suit.label}
              </div>
              <div className="poker-suit-cards">
                {RANKS.map((rank) => {
                  const cardCode = rank + suit.code;
                  const isUsed = usedCards.has(cardCode) && currentCard !== cardCode;
                  return (
                    <div
                      key={cardCode}
                      className={`poker-picker-card poker-picker-card-${suit.name}${isUsed ? " poker-picker-card-disabled" : ""}`}
                      onClick={() => !isUsed && onSelect(cardCode)}
                    >
                      {rank}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="poker-picker-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClear}>
            清除此牌
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPicker;
