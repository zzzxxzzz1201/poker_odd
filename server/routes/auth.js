const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "此 Email 已被註冊" });
    }

    await User.create({ username, email, password });
    res.status(201).json({ message: "註冊成功" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email 或密碼錯誤" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email 或密碼錯誤" });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "登入成功",
      token: "JWT " + token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
