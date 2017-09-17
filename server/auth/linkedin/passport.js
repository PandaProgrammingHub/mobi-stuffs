import passport from 'passport';
import {Strategy as LinkedInStrategy} from 'passport-linkedin';

export function setup(User, config) {
  passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline'],
  },
  function(token, tokenSecret, profile, done) {
    profile._json.id = `${profile._json.id}`;
    profile.id = `${profile.id}`;
    profile._json.emailAddress = `${profile._json.emailAddress}`;
    User.findOne({email: profile._json.emailAddress}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }
        user = new User({
          email: profile._json.emailAddress,
          role: 'user',
          provider: 'linkedin',
          linkedin: profile._json
        });
        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
