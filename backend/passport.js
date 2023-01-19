const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("./db.js");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const GOOGLE_CLIENT_ID =
  "239006538764-eufnpn6h5ko2rm8f18mpcidfhed5tq7r.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "1206036326952946";
const FACEBOOK_APP_SECRET = "c15cf4c9564b651478ef389d9a2a0e59";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const checkUserQ = "SELECT * FROM users WHERE email = ?";

      db.query(checkUserQ, [profile.emails[0].value], (err, user) => {
        if (err) return cb(err, false);
        if (user.length != 0) {
          return cb(null, user);
        }

        // If user does not exist in database, add them
        const addUserQ =
          "INSERT INTO users (`name`, `email`, `profileImg`) VALUES (?)";
        const values = [
          profile.displayName,
          profile.emails[0].value,
          profile.photos[0].value,
        ];
        db.query(addUserQ, [values], (err, userAdded) => {
          if (err) return cb(err, false);

          db.query(checkUserQ, [profile.emails[0].value], (err, user) => {
            return cb(null, user);
          });
        });
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      const q = "SELECT * FROM users WHERE email = ?";

      db.query(q, [email], (err, user) => {
        if (err) return cb(err, false);
        if (user.length == 0) {
          return cb(null, false);
        }
        bcrypt.compare(password, user[0].password, (err, res) => {
          if (res) return cb(null, user);
          return cb(null, false);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
