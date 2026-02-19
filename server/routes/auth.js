const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
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

// Google OAuth - Initiates the OAuth flow by redirecting the user to Google's consent screen.
// Requests access to the user's profile and email.
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback - Google redirects here after the user grants/denies permission.
// Passport exchanges the authorization code for user profile data behind the scenes.
// On failure, redirects to the login page with an error query param.
// On success, generates a JWT and redirects to the frontend with token + user data in the URL.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login?error=google_failed",
  }),
  (req, res) => {
    // Create JWT payload with user id and email
    const payload = { id: req.user.id, email: req.user.email };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET, {
      expiresIn: "1d",
    });

    // Package token and user info as JSON to pass via URL query param
    const data = JSON.stringify({
      token: "JWT " + token,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });

    // Redirect to frontend OAuth callback page with encoded data
    res.redirect(
      `http://localhost:3000/oauth/callback?data=${encodeURIComponent(data)}`
    );
  }
);

module.exports = router;
