const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID : env.google_client_ID,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_callback_URL
},

function(accessToken, refreshToken, profile, done){
    console.log(profile)
    
    User.findOne({email : profile.emails[0].value})
        .then((data)=>{
            console.log(data)
            if (!data) {
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')}) 
                    .then(result => { 
                        console.log(result) 
                    })
            }
            console.log("Result :",data);
            return done(null, data);
        })
        .catch((err)=>{
            console.log(err);
            return done(err);
    });

    // User.findOne({email : profile.emails[0].value}).exec(function(err, user){
    //     if(err){
    //         console.log("Error in google startegy passport", err);return;
    //     }
    //     if(user){
    //         return done(null, user);
    //     }else{
    //         User.create({
    //             name : profile.displayName,
    //             email : profile.emails[0].value,
    //             password : crypto.randomBytes(20).toString('hex')
    //         },function(err, user){
    //             if(err){
    //                 console.log("Error in creating google startegy passport", err);return;
    //             }else{
    //                 return done(null, user);
    //             }
    //         })
    //     }    
    // });
}
));


module.exports = passport;