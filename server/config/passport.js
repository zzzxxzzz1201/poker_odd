const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.PASSPORT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
