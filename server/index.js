const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const { sequelize } = require("./models");
const authRoute = require("./routes/auth");
const pokerRoute = require("./routes/poker");
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api/user", authRoute);
app.use("/api/poker", passport.authenticate("jwt", { session: false }), pokerRoute);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });
