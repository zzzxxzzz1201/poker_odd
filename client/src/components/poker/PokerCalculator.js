import React, { useState, useCallback } from "react";
import PlayerSection from "./PlayerSection";
import BoardSection from "./BoardSection";
import CardPicker from "./CardPicker";
import ResultsSection from "./ResultsSection";
import pokerService from "../../services/poker.service";
import "./poker.css";

function getCardCountForStage(stage) {
  switch (stage) {
    case "preflop": return 0;
    case "flop": return 3;
    case "turn": return 4;
    case "river": return 5;
    default: return 0;
  }
}

const PokerCalculator = () => {
  const [players, setPlayers] = useState([
    { cards: [null, null] },
    { cards: [null, null] },
  ]);
  const [board, setBoard] = useState([]);
  const [boardStage, setBoardStage] = useState("preflop");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [results, setResults] = useState(null);
  const [simulations, setSimulations] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 計算已使用的牌
  const getUsedCards = useCallback(() => {
    const used = new Set();
    players.forEach((p) => p.cards.forEach((c) => c && used.add(c)));
    board.forEach((c) => c && used.add(c));
    return used;
  }, [players, board]);

  // 取得目前選中的牌
  const getCurrentCard = () => {
    if (!selectedSlot) return null;
    if (selectedSlot.type === "player") {
      return players[selectedSlot.playerIndex].cards[selectedSlot.cardIndex];
    }
    return board[selectedSlot.cardIndex];
  };

  // 開啟選牌器
  const openPicker = (type, playerIndex, cardIndex) => {
    setSelectedSlot({ type, playerIndex, cardIndex });
    setPickerOpen(true);
  };

  // 選牌
  const handleSelectCard = (cardCode) => {
    if (!selectedSlot) return;
    const { type, playerIndex, cardIndex } = selectedSlot;

    if (type === "player") {
      setPlayers((prev) => {
        const next = prev.map((p) => ({ ...p, cards: [...p.cards] }));
        next[playerIndex].cards[cardIndex] = cardCode;
        return next;
      });
    } else {
      setBoard((prev) => {
        const next = [...prev];
        next[cardIndex] = cardCode;
        return next;
      });
    }

    setPickerOpen(false);
    setSelectedSlot(null);
  };

  // 清除選中的牌
  const handleClearCard = () => {
    if (!selectedSlot) return;
    const { type, playerIndex, cardIndex } = selectedSlot;

    if (type === "player") {
      setPlayers((prev) => {
        const next = prev.map((p) => ({ ...p, cards: [...p.cards] }));
        next[playerIndex].cards[cardIndex] = null;
        return next;
      });
    } else {
      setBoard((prev) => {
        const next = [...prev];
        next[cardIndex] = null;
        return next;
      });
    }

    setPickerOpen(false);
    setSelectedSlot(null);
  };

  // 切換公牌階段
  const handleStageChange = (stage) => {
    setBoardStage(stage);
    const count = getCardCountForStage(stage);
    setBoard((prev) => {
      const next = [...prev];
      while (next.length < count) next.push(null);
      while (next.length > count) next.pop();
      return next;
    });
  };

  // 新增玩家
  const handleAddPlayer = () => {
    if (players.length >= 6) return;
    setPlayers((prev) => [...prev, { cards: [null, null] }]);
  };

  // 移除玩家
  const handleRemovePlayer = () => {
    if (players.length <= 2) return;
    setPlayers((prev) => prev.slice(0, -1));
  };

  // 清除全部
  const handleClearAll = () => {
    setPlayers([{ cards: [null, null] }, { cards: [null, null] }]);
    setBoard([]);
    setBoardStage("preflop");
    setResults(null);
    setError("");
  };

  // 計算機率
  const handleCalculate = async () => {
    const incomplete = players.findIndex((p) => p.cards.some((c) => c === null));
    if (incomplete !== -1) {
      setError(`請為玩家 ${incomplete + 1} 選擇完整的手牌`);
      return;
    }

    const expectedCount = getCardCountForStage(boardStage);
    const filledBoard = board.filter((c) => c !== null);
    if (expectedCount > 0 && filledBoard.length !== expectedCount) {
      setError(`請選擇完整的公牌 (需要 ${expectedCount} 張)`);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await pokerService.calculate(
        players.map((p) => p.cards),
        filledBoard
      );
      setResults(response.data.results);
      setSimulations(response.data.simulations);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.statusText || err.message || "計算失敗";
      setError(`錯誤 (${err.response?.status || "network"}): ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="poker-container">
      <header className="poker-header">
        <h1>德州撲克機率計算器</h1>
        <p>計算勝率與牌型機率</p>
      </header>

      <PlayerSection
        players={players}
        onCardClick={openPicker}
        onAddPlayer={handleAddPlayer}
        onRemovePlayer={handleRemovePlayer}
      />

      <BoardSection
        board={board}
        boardStage={boardStage}
        onStageChange={handleStageChange}
        onCardClick={openPicker}
      />

      <div className="poker-calculate-section">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? "計算中..." : "計算機率"}
        </button>
        <button className="btn btn-secondary" onClick={handleClearAll}>
          清除所有
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mx-auto" style={{ maxWidth: 600 }}>
          {error}
        </div>
      )}

      <ResultsSection
        results={results}
        simulations={simulations}
        players={players}
      />

      <CardPicker
        show={pickerOpen}
        usedCards={getUsedCards()}
        currentCard={getCurrentCard()}
        onSelect={handleSelectCard}
        onClear={handleClearCard}
        onClose={() => {
          setPickerOpen(false);
          setSelectedSlot(null);
        }}
      />
    </div>
  );
};

export default PokerCalculator;
