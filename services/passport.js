const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("user");

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async (accessToken, profileToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if(existingUser){
                console.log(existingUser);
                return done(null, existingUser);
            }
            var newUser = await new User({ googleId: profile.id }).save();
            console.log(newUser);
            done(null, newUser);
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
