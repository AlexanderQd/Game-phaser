const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) =>{
    passport.serializeUser((user, done) => {        
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {       
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK 
        },
        (accesToken, refreshToken, profile, done) =>{            
            return done(null,{
                token: accesToken,
                profile: profile
            });
        }));
}

