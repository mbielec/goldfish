//Requiring dependencies - this allows us to use the files we brought in from node_modules.

//Express allows us to create an web app easily.
const express = require('express');

//Path allows us to reference files in our local system using the standard notation ex. "./config/database"
const path = require('path');

const cookieParser = require('cookie-parser');
//Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
//That way, when you submit a form, you can grab the data.
const bodyParser = require('body-parser');
//Authentication for Node.js: supports log-in using username and password, facebook, google and more.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Cors, or cross-origin resource sharing, allows javascript to interact with resources from different domains,
//rather than being limited to only resources from the same domain. We need this because our front and back end
//are on different ports while we develop.
const cors = require('cors');



//An object-document mapper to interact with MongoDB. Allows us to build schemas (the structure of a document, expected
// fields), //models(objects based on the schemas, instances of these are "documents" in the database),and methods to
// interact with the models.
const mongoose = require('mongoose');

const flash = require('connect-flash');

const session = require('express-session');
//---------------------------------------------------------------

//Creating the express app
const app = express();

//Choosing the port number
const port = 3000;

//Starts up a server on the chosen port and send a success message
app.listen(port, function() {
    console.log('Server started on port ' + port);
});

//Set static folder: now the browser will automatically search here for static files such as html pages, image files and
// css scripts.
app.use(express.static(path.join(__dirname, 'public')));

//Import other folders into the app so they can be used
const config = require("./config/database");
const paths = require('./routes/paths');

// view engine setup
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');


//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookieParser middleware
app.use(cookieParser());

app.use(session({secret:'keyboard cat'}));

//Connects to the routes which gives us different pages and their behaviour.
app.use('/', paths);

app.use(flash());

//Connect to database
mongoose.connect(config.database);

//Let us know when the connection is on
mongoose.connection.on('connected', function(){
    console.log("Connected to database: " + config.database);
});

//Check for database connection error
mongoose.connection.on('error', function(err){
    console.log("Database connection error: " + err);
});

module.exports=app;

//Cors middleware
app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Import the passport strategies
require('./config/passport')(passport);

//Use connect-flash


//Use session
//---------------------------------------------