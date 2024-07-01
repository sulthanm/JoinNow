const express = require('express');

const router = express.Router();
const passport = require('passport');

const profile = require('../controllers/users_controller');
const post = require('../controllers/posts_controller');

const friend = require('../controllers/friends_controller');

const multer = require('multer');
const upload = multer({dest: 'uploads/users/ImagePosts'});
const uploadAvatar = multer({dest: 'uploads/users/avatars'});
const s3BucketJoinow = require('../config/s3');


router.get('/profile/:id', passport.checkAuthentication ,profile.profilePage);
router.get('/signup', profile.signupPage);
router.get('/signin', profile.signinPage);
router.post('/create', profile.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'},
), profile.createUserSession);

router.get('/signout', profile.destroySession);
router.get('/create-posts/:key',post.downloadPost);
router.post('/create-posts',upload.single('avatar'),passport.checkAuthentication, post.createPosts);
router.post('/create-comment',passport.checkAuthentication,post.createComment);
router.get('/delete-post/:id',passport.checkAuthentication, post.deletePost);
router.get('/delete-comment/:id',passport.checkAuthentication, post.deleteComment);

router.get('/profile/users/profile-updateavatar/:key',profile.downloadAvatar);
router.post('/profile-update/:id',uploadAvatar.single('avatar'),passport.checkAuthentication, profile.profieUpdate);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile', 'email']}))
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect : '/users/signin'}),
    
    profile.createUserSession);

router.post('/toggle', post.likePost);

router.get('/friend-req/:id', friend.addFriend);

router.get('/users&friends',passport.checkAuthentication, profile.userFriends);

module.exports = router;