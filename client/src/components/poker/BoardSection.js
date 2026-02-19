import React from "react";
import PokerCard from "./PokerCard";

const STAGES = [
  { key: "preflop", label: "Preflop (0\u5f35)" },
  { key: "flop", label: "Flop (3\u5f35)" },
  { key: "turn", label: "Turn (4\u5f35)" },
  { key: "river", label: "River (5\u5f35)" },
];

const BoardSection = ({ board, boardStage, onStageChange, onCardClick }) => {
  return (
    <section className="poker-section">
      <h2>公牌</h2>
      <div className="poker-board-stage-selector">
        {STAGES.map((s) => (
          <button
            key={s.key}
            className={`poker-stage-btn${boardStage === s.key ? " poker-stage-btn-active" : ""}`}
            onClick={() => onStageChange(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="poker-board-cards">
        {board.length === 0 ? (
          <p style={{ color: "#6b7280" }}>Preflop 階段無公牌</p>
        ) : (
          board.map((card, idx) => (
            <PokerCard
              key={idx}
              card={card}
              onClick={() => onCardClick("board", null, idx)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default BoardSection;
