import React from "react";
import PokerCard from "./PokerCard";

const PlayerSection = ({ players, onCardClick, onAddPlayer, onRemovePlayer }) => {
  return (
    <section className="poker-section">
      <div className="poker-section-header">
        <h2>玩家手牌</h2>
        <div className="poker-player-controls">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onRemovePlayer}
            disabled={players.length <= 2}
          >
            - 移除玩家
          </button>
          <span className="poker-player-count">{players.length} 位玩家</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onAddPlayer}
            disabled={players.length >= 6}
          >
            + 新增玩家
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
              <h3>玩家 {pIdx + 1}</h3>
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
