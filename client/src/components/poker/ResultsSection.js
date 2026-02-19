import React from "react";
import { SUITS } from "./PokerCard";

const HAND_TYPE_NAMES = {
  royal_flush: "皇家同花順",
  straight_flush: "同花順",
  four_kind: "四條",
  full_house: "葫蘆",
  flush: "同花",
  straight: "順子",
  three_kind: "三條",
  two_pair: "兩對",
  one_pair: "一對",
  high_card: "高牌",
};

const ResultsSection = ({ results, simulations, players }) => {
  if (!results) return null;

  return (
    <section className="poker-section">
      <h2>計算結果</h2>
      <div className="poker-results-info">
        共計算 {simulations.toLocaleString()} 種可能
      </div>
      <div className="poker-results-container">
        {results.map((result, index) => {
          const playerCards = players[index].cards;
          return (
            <div key={index} className="poker-result-card">
              <h4>
                玩家 {result.player}{" "}
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
                  <span className="poker-rate-label">勝率</span>
                  <span className="poker-rate-value poker-rate-win">
                    {result.win_rate}%
                  </span>
                </div>
                <div className="poker-rate-item">
                  <span className="poker-rate-label">平手</span>
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
                <h5>牌型機率</h5>
                <div className="poker-odds-grid">
                  {Object.entries(result.hand_odds)
                    .filter(([, v]) => v > 0)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, value]) => (
                      <div key={type} className="poker-odds-item">
                        <span className="poker-odds-name">
                          {HAND_TYPE_NAMES[type]}
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
