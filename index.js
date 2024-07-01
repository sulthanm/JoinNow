const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
require('./config/view-helpers')(app);
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localSession = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const sassMiddleware = require('node-sass-middleware');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const passportJWT = require('./config/passport-jwt');

const env = require('./config/environment');
const logger = require('morgan');
const path = require('path');

const cors = require('cors');
app.use(cors());

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
const portChatServer = 8621;

chatServer.listen(portChatServer);
console.log("Chat server is listening on port",portChatServer);

if(env.name=='development'){
    app.use(sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        debug : true,
        outputStyle : 'extended',
        prefix : '/css'
    }));
}

app.use(express.urlencoded({ extended: true }));
app.use(cookie());

//make the uplads path available to user
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use(express.static(env.asset_path));


app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set("views" , "./views");

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'joinow',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (2000 * 60 * 1000)
    },
    store: new MongoStore({mongooseConnection : mongoose.connection})
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);

const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port :${port}`);
});

