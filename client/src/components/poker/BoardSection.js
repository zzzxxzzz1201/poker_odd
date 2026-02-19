import React from "react";
import { useTranslation } from "react-i18next";
import PokerCard from "./PokerCard";

const STAGE_KEYS = ["preflop", "flop", "turn", "river"];

const BoardSection = ({ board, boardStage, onStageChange, onCardClick }) => {
  const { t } = useTranslation();

  return (
    <section className="poker-section">
      <h2>{t("poker.board")}</h2>
      <div className="poker-board-stage-selector">
        {STAGE_KEYS.map((key) => (
          <button
            key={key}
            className={`poker-stage-btn${boardStage === key ? " poker-stage-btn-active" : ""}`}
            onClick={() => onStageChange(key)}
          >
            {t(`poker.stages.${key}`)}
          </button>
        ))}
      </div>
      <div className="poker-board-cards">
        {board.length === 0 ? (
          <p style={{ color: "#6b7280" }}>{t("poker.preflopNoBoard")}</p>
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
