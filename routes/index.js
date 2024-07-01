const express = require('express');

const router = express.Router();
const home = require('../controllers/home_controller');
const profile = require('../controllers/users_controller');


console.log("router loaded");

// router.get('/:key', home.downloadAvatar);
router.get('/', home.homePage);
router.post('/search-user', home.searchUser );


router.use('/users', require('./users'));

router.use('/api', require('./api'));
module.exports = router;