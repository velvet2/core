import passport from 'passport';
import { Strategy } from 'passport-accesstoken';

passport.use(new Strategy({
        tokenHeader: "Authorization",
        tokenField: "Token"
    }, (token, done) => {
      console.log("token", token)
      return done(null, false);
    // findUser(username, function (err, user) {
    //   if (err) {
    //     return done(err)
    //   }
    //   if (!user) {
    //     return done(null, false)
    //   }
    //   if (password !== user.password  ) {
    //     return done(null, false)
    //   }
    //   return done(null, user)
    // })
  }
))
