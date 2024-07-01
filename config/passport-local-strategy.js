const passport = require('passport');

const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ email : email })
        .then((userPresent)=>{
            console.log(userPresent);
            if (!userPresent) {
              req.flash("success", "Incorrect Username/Password");
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (password != userPresent.password) {
              req.flash("success", "Incorrect Username/Password");
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, userPresent);
            
        })
        .catch((err)=>{
            console.log(err);
            return done(err);
      });
      
      //   User.findOne({ email : email }, function (err, userPresent) {
      //       if (err) { return done(err); }
      //       if (!userPresent ) {
      //         req.flash("success", "Incorrect Username/Password");
      //         return done(null, false, { message: 'Incorrect username.' });
      //       }
      //       if (password != userPresent.password) {
      //         req.flash("success", "Incorrect Username/Password");
      //         return done(null, false, { message: 'Incorrect password.' });
      //       }
      //       return done(null, userPresent);
      // });
    }
  ));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    })
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

passport.checkAuthentication = function(req,res, next){
  //if the user is sign in pass on request to next function

    if(req.isAuthenticated()){
      // res.locals.user = req.
      
      return next();
    }
    //if the user is not signed in
    
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  
  next();
};

module.exports = passport;