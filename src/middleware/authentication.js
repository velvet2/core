import passport from 'passport';
import { Strategy } from 'passport-accesstoken';
import db from '../models';

passport.use(new Strategy({
        tokenHeader: "Authorization",
        tokenField: "Token"
    }, (token, done) => {
      db.SecurityToken.findOne({ where :  { token: token }, include: [db.User]}).then( (tok )=>{
          if ( tok && tok.User ){
              done(null, { id: tok.User.id});
          } else {
              done(null, false, { "error": "invalid token"});
          }
      });
  }
))
