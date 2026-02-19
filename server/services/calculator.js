/**
 * 德州撲克機率計算器
 * 使用 pokersolver 庫進行牌型評估，採用窮舉法/蒙特卡洛計算機率
 */

const { Hand } = require("pokersolver");

const MONTE_CARLO_SIMULATIONS = 50000;

// 所有牌面
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const SUITS = ["h", "d", "c", "s"];

// 牌型名稱對照表
const HAND_TYPE_MAP = {
  "Straight Flush": "straight_flush",
  "Four of a Kind": "four_kind",
  "Full House": "full_house",
  Flush: "flush",
  Straight: "straight",
  "Three of a Kind": "three_kind",
  "Two Pair": "two_pair",
  Pair: "one_pair",
  "High Card": "high_card",
};

// pokersolver 格式: "Ad" -> "Ad", "Th" -> "Th"  (直接相容)
// 但 pokersolver 的 solve 需要格式如 "As", "Kh" 等
// 我們的輸入格式: "Ah", "Ts" 等 — 需轉換 rank 到 pokersolver 格式
function toPSCard(card) {
  // 我們的格式: Ah, Ts, 2c 等
  // pokersolver 格式: Ah, Ts, 2c — 完全一致
  return card;
}

function buildFullDeck() {
  const deck = [];
  for (const r of RANKS) {
    for (const s of SUITS) {
      deck.push(r + s);
    }
  }
  return deck;
}

// Fisher-Yates shuffle 的部分版本：從 arr 中隨機取 n 張
function sampleCards(arr, n) {
  const copy = arr.slice();
  const result = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * (copy.length - i)) + i;
    [copy[i], copy[idx]] = [copy[idx], copy[i]];
    result.push(copy[i]);
  }
  return result;
}

// 獲取組合 C(arr, k)
function combinations(arr, k) {
  if (k === 0) return [[]];
  if (k === 1) return arr.map((x) => [x]);
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const rest = combinations(arr.slice(i + 1), k - 1);
    for (const combo of rest) {
      result.push([arr[i], ...combo]);
    }
  }
  return result;
}

// 檢測皇家同花順
function isRoyalFlush(allCards) {
  const suitMap = {};
  for (const card of allCards) {
    const rank = card[0];
    const suit = card.slice(1);
    if (!suitMap[suit]) suitMap[suit] = new Set();
    suitMap[suit].add(rank);
  }
  const royalRanks = new Set(["A", "K", "Q", "J", "T"]);
  for (const ranks of Object.values(suitMap)) {
    let hasAll = true;
    for (const r of royalRanks) {
      if (!ranks.has(r)) {
        hasAll = false;
        break;
      }
    }
    if (hasAll) return true;
  }
  return false;
}

// 獲取牌型名稱
function getHandType(allCards) {
  // 先用 pokersolver 判斷
  const hand = Hand.solve(allCards);
  const name = hand.name;

  // 特殊處理：pokersolver 的 Straight Flush 可能是 Royal Flush
  if (name === "Straight Flush" && isRoyalFlush(allCards)) {
    return "royal_flush";
  }

  return HAND_TYPE_MAP[name] || "high_card";
}

// 比較多位玩家的牌力，回傳 winners 陣列
function evaluatePlayers(playerHands, boardCards) {
  const hands = playerHands.map((hand) => {
    const allCards = [...hand, ...boardCards];
    return Hand.solve(allCards);
  });

  // 找出最強的手牌
  const winners = Hand.winners(hands);
  const winnerIndices = [];

  for (let i = 0; i < hands.length; i++) {
    if (winners.includes(hands[i])) {
      winnerIndices.push(i);
    }
  }

  return winnerIndices;
}

function createEmptyHandTypes() {
  return {
    high_card: 0,
    one_pair: 0,
    two_pair: 0,
    three_kind: 0,
    straight: 0,
    flush: 0,
    full_house: 0,
    four_kind: 0,
    straight_flush: 0,
    royal_flush: 0,
  };
}

function calculateOdds(hands, board = []) {
  const numPlayers = hands.length;
  const cardsNeeded = 5 - board.length;

  // 已使用的牌
  const usedCards = new Set();
  for (const hand of hands) {
    for (const card of hand) usedCards.add(card);
  }
  for (const card of board) usedCards.add(card);

  // 剩餘牌組
  const fullDeck = buildFullDeck();
  const remainingCards = fullDeck.filter((c) => !usedCards.has(c));

  // 統計數據
  const wins = new Array(numPlayers).fill(0);
  const ties = new Array(numPlayers).fill(0);
  const handTypeCounts = Array.from({ length: numPlayers }, () =>
    createEmptyHandTypes()
  );
  let totalSimulations = 0;

  if (cardsNeeded === 0) {
    // River: 直接比較
    const winners = evaluatePlayers(hands, board);

    if (winners.length === 1) {
      wins[winners[0]] = 1;
    } else {
      for (const w of winners) ties[w] = 1;
    }

    for (let i = 0; i < numPlayers; i++) {
      const allCards = [...hands[i], ...board];
      const handType = getHandType(allCards);
      handTypeCounts[i][handType] = 1;
    }

    totalSimulations = 1;
  } else if (cardsNeeded === 5) {
    // Preflop: 蒙特卡洛模擬
    for (let sim = 0; sim < MONTE_CARLO_SIMULATIONS; sim++) {
      const futureBoard = sampleCards(remainingCards, 5);
      const fullBoard = [...board, ...futureBoard];

      const winners = evaluatePlayers(hands, fullBoard);

      if (winners.length === 1) {
        wins[winners[0]]++;
      } else {
        for (const w of winners) ties[w]++;
      }

      for (let i = 0; i < numPlayers; i++) {
        const allCards = [...hands[i], ...fullBoard];
        const handType = getHandType(allCards);
        handTypeCounts[i][handType]++;
      }

      totalSimulations++;
    }
  } else {
    // Flop (2張) 或 Turn (1張): 窮舉
    const combos = combinations(remainingCards, cardsNeeded);

    for (const futureBoard of combos) {
      const fullBoard = [...board, ...futureBoard];

      const winners = evaluatePlayers(hands, fullBoard);

      if (winners.length === 1) {
        wins[winners[0]]++;
      } else {
        for (const w of winners) ties[w]++;
      }

      for (let i = 0; i < numPlayers; i++) {
        const allCards = [...hands[i], ...fullBoard];
        const handType = getHandType(allCards);
        handTypeCounts[i][handType]++;
      }

      totalSimulations++;
    }
  }

  // 計算百分比
  const results = [];
  for (let i = 0; i < numPlayers; i++) {
    const winRate = (wins[i] / totalSimulations) * 100;
    const tieRate = (ties[i] / totalSimulations) * 100;

    const handOdds = {};
    for (const [type, count] of Object.entries(handTypeCounts[i])) {
      handOdds[type] = Math.round((count / totalSimulations) * 10000) / 100;
    }

    results.push({
      player: i + 1,
      win_rate: Math.round(winRate * 100) / 100,
      tie_rate: Math.round(tieRate * 100) / 100,
      hand_odds: handOdds,
    });
  }

  return {
    results,
    simulations: totalSimulations,
  };
}

module.exports = { calculateOdds };
