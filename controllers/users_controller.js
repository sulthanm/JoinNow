const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const passport = require('../config/passport-local-strategy');

module.exports.profilePage = async function (req,res){
    let user = await User.findById(req.params.id).populate({
        path:'friends',
        populate:{
         path:'from_user'   
        }
    }).populate({
        path:'friends',
        populate:'to_user'
    });

    let profileUserPosts = await Post.find({})
        .sort('-createdAt')
        .populate('userss')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    });
   
        return res.render('user_profile',{
            title: "Joinow || Profile_Page",
            profile_user: user,
            uPosts : profileUserPosts
        });
  
    
}

module.exports.signupPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title : "Joinow || Sign-Up"
    });
}

module.exports.signinPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {
        title : "Joinow || Sign-In"
    });
}

module.exports.createUser = function(req, res){
    // console.log("yess");
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email})
        .then((data)=>{
            console.log(data)
            if (!data) {
                User.create(req.body) 
                    .then(result => { 
                        return res.redirect('/users/signin');
                    })
            }else {
                req.flash("error", "User already exist");
                return res.redirect('back');
            }

        })
        .catch((err)=>{
            if(err){console.log('Error in creating user');return;}
            return res.redirect('/users/signin');
        });
    


    // User.findOne({email : req.body.email}, function(err, userPresent){
    //     if(err){console.log('Error in creating user');return;}
    //     if(!userPresent){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('Error in creating user');return;}
    //             return res.redirect('/users/signin');
    //         });
    //     }else{
    //         req.flash("error", "User already exist");
    //         return res.redirect('back');
    //     }
    // });

}

module.exports.createUserSession = function(req, res){

    req.flash('success', 'ThankYou for Signing In');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.flash('success', 'You have logged Out');
    req.logout();
    return res.redirect('/');
}

module.exports.profieUpdate = async function(req, res){
    let user = await User.findById(req.params.id);

        user.name = req.body.name;
        user.email = req.body.email;
        // console.log(req.file);
        let result;
        if(req.file){
            
            User.uploadedAvatar(req, res, function(err){
                if(err) console.log("Error in updating profile image", err);
               
                user.avatar = User.avatarPath + '/' + req.file.filename;
                console.log("hhhhhhhhhhhhhh", user.avatar);
                user.save();
            })
            
        }
  
        return res.redirect('back');


    
} 

module.exports.downloadAvatar = async function(req, res){
    console.log("meassadfjogfiojogi",req.params.key);
    const readStream = await s3BucketJoinow.downloadFile(req.params.key);
    readStream.pipe(res);
}

module.exports.userFriends = async function(req, res){
    
    try{
        
        let users = await User.find({}).populate({
            path:'friends',
            populate:{
             path:'from_user'   
            }
        }).populate({
            path:'friends',
            populate:'to_user'
        });
        
        
        return res.render('user_friends',{
            title: "Joinow || Users-Page",
            allUsers : users
        });

    }catch(err){
        console.log('Error in rendering homePage', err);
        return;
    }
  
}