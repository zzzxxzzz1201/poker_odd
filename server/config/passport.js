const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
require("dotenv").config();

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.PASSPORT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // 1. 查找已綁定 google_id 的使用者
          let user = await User.findOne({
            where: { google_id: profile.id },
          });
          if (user) return done(null, user);

          // 2. 查找同 email 的使用者，綁定 google_id
          const email = profile.emails[0].value;
          user = await User.findOne({ where: { email } });
          if (user) {
            user.google_id = profile.id;
            await user.save();
            return done(null, user);
          }

          // 3. 建立新使用者
          user = await User.create({
            username: profile.displayName,
            email,
            google_id: profile.id,
            password: null,
          });
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
