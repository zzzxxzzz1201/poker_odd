import React from "react";
import { useTranslation } from "react-i18next";
import { SUITS } from "./PokerCard";

const ResultsSection = ({ results, simulations, players }) => {
  const { t } = useTranslation();

  if (!results) return null;

  return (
    <section className="poker-section">
      <h2>{t("poker.results")}</h2>
      <div className="poker-results-info">
        {t("poker.simulationCount", { count: simulations.toLocaleString() })}
      </div>
      <div className="poker-results-container">
        {results.map((result, index) => {
          const playerCards = players[index].cards;
          return (
            <div key={index} className="poker-result-card">
              <h4>
                {t("poker.player", { number: result.player })}{" "}
                {playerCards.map((c, i) => {
                  const suitInfo = SUITS[c[1]];
                  return (
                    <span key={i} className={`poker-card-${suitInfo.name}`}>
                      {c[0]}
                      {suitInfo.symbol}{" "}
                    </span>
                  );
                })}
              </h4>
              <div className="poker-rates-container">
                <div className="poker-rate-item">
                  <span className="poker-rate-label">{t("poker.winRate")}</span>
                  <span className="poker-rate-value poker-rate-win">
                    {result.win_rate}%
                  </span>
                </div>
                <div className="poker-rate-item">
                  <span className="poker-rate-label">{t("poker.tieRate")}</span>
                  <span className="poker-rate-value poker-rate-tie">
                    {result.tie_rate}%
                  </span>
                </div>
              </div>
              <div className="poker-win-bar">
                <div
                  className="poker-win-bar-fill"
                  style={{ width: `${result.win_rate}%` }}
                />
              </div>
              <div className="poker-hand-odds">
                <h5>{t("poker.handOdds")}</h5>
                <div className="poker-odds-grid">
                  {Object.entries(result.hand_odds)
                    .filter(([, v]) => v > 0)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, value]) => (
                      <div key={type} className="poker-odds-item">
                        <span className="poker-odds-name">
                          {t(`poker.hands.${type}`)}
                        </span>
                        <span
                          className={`poker-odds-value${value > 10 ? " poker-odds-highlight" : ""}`}
                        >
                          {value}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResultsSection;
