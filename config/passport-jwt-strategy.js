const passport =require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;

const User=require('../model/Users');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "QkDwFen2ImhOJSk4eR8LmvggGVjozYEs"
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id,function(err,user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports=passport;