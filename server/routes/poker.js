const router = require("express").Router();
const { pokerValidation } = require("../validation");
const { calculateOdds } = require("../services/calculator");

router.post("/calculate", (req, res) => {
  const { error } = pokerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { hands, board } = req.body;

  // 檢查重複牌
  const allCards = [...hands.flat(), ...board];
  if (new Set(allCards).size !== allCards.length) {
    return res.status(400).json({ message: "發現重複的牌" });
  }

  try {
    const result = calculateOdds(hands, board);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
