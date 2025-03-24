import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7700/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const email = profile?.emails[0]?.value;
        let createdUser;
        if (email === undefined) {
          throw new ApiError(
            501,
            "There is problem in fetching email id during authentication",
            []
          );
        }

        const user = await User.findOne({ email });

        if (!user) {
          try {
            const userObj = {
              name: profile.displayName,
              email,
              profilePhoto: profile?.photos[0]?.value,
            };

            createdUser = await User.create(userObj);
          } catch (error) {
            return cb(new Error(error), null);
          }
        }

        return cb(null, profile);
      } catch (error) {
        return cb(error,null)
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  return cb(null, {
    id: user.id,
  });
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});
