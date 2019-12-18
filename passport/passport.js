const passport = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const user = require("../model/user");
const config = require("config");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= config.get("jwtSecret");
// module.exports = 
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        user.findOne({userName : jwt_payload.userName})
        .then(user => {
          if (user) {
              console.log("encontrado;");
            return done(null, user);
          }
          console.log("No encontrado");
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
);

/** Google auth */

passport.use(new GoogleStrategy({
  clientID: '466110328205-dhieh5l1bf3tc007c3f9nghma1k91hpk.apps.googleusercontent.com',
  clientSecret: 'jIpEJDqdQzod2adujB-GSgPZ',
  callbackURL: "http://www.example.com/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await user.findOne({ "google.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new user({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}
));