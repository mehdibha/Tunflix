import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./index";
import User from "../models/user.model";

const JWToptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

const googleOptions = {
    clientID: config.googleIdClient,
    clientSecret: config.googleSecret,
    callbackURL: "http://localhost:4444/api/auth/google/callback",
};

passport.use(
    new JwtStrategy(JWToptions, async (paylaod, done) => {
        try {
            const user = await User.findById(paylaod.userId).select("-password");
            if (!user) {
                done(null, false);
            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                if (!user.googleId) {
                    user.googleId = profile.id;
                    user.avatar = profile.photos[0].value;
                    await user.save();
                }
                done(null, user);
            } else {
                user = new User({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    googleId: profile.id,
                    avatar: profile.picture,
                });
            }
            await user.save();
            done(null, user);
        } catch (error) {
            console.log(error);
        }
    })
);
