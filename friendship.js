const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    from_user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
       
    },
    to_user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
        
},{
    timestamps : true
});

const Friend = mongoose.model('Friend', friendsSchema);

module.exports = Friend;