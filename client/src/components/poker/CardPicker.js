import React from "react";
import { useTranslation } from "react-i18next";

const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const SUIT_LIST = [
  { code: "h", name: "hearts" },
  { code: "d", name: "diamonds" },
  { code: "c", name: "clubs" },
  { code: "s", name: "spades" },
];

const CardPicker = ({ show, usedCards, currentCard, onSelect, onClear, onClose }) => {
  const { t } = useTranslation();

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="poker-picker-overlay" onClick={handleOverlayClick}>
      <div className="poker-picker-modal">
        <div className="poker-picker-header">
          <h3>{t("poker.pickCard")}</h3>
          <button className="poker-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="poker-picker-body">
          {SUIT_LIST.map((suit) => (
            <div className="poker-suit-section" key={suit.code}>
              <div className={`poker-suit-label poker-suit-label-${suit.name}`}>
                {t(`poker.suits.${suit.name}`)}
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
            {t("poker.clearCard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPicker;
