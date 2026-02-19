import React from "react";
import { useTranslation } from "react-i18next";
import PokerCard from "./PokerCard";

const PlayerSection = ({ players, onCardClick, onAddPlayer, onRemovePlayer }) => {
  const { t } = useTranslation();

  return (
    <section className="poker-section">
      <div className="poker-section-header">
        <h2>{t("poker.playerHands")}</h2>
        <div className="poker-player-controls">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onRemovePlayer}
            disabled={players.length <= 2}
          >
            {t("poker.removePlayer")}
          </button>
          <span className="poker-player-count">{t("poker.playerCount", { count: players.length })}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onAddPlayer}
            disabled={players.length >= 6}
          >
            {t("poker.addPlayer")}
          </button>
        </div>
      </div>
      <div className="poker-players-container">
        {players.map((player, pIdx) => {
          const hasCards = player.cards.some((c) => c !== null);
          return (
            <div
              key={pIdx}
              className={`poker-player-card${hasCards ? " poker-player-card-active" : ""}`}
            >
              <h3>{t("poker.player", { number: pIdx + 1 })}</h3>
              <div className="poker-player-hand">
                {player.cards.map((card, cIdx) => (
                  <PokerCard
                    key={cIdx}
                    card={card}
                    onClick={() => onCardClick("player", pIdx, cIdx)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlayerSection;
