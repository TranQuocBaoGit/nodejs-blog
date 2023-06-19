const path = require('path');
const express = require('express');
var handlebars = require('express-handlebars');
const morgan = require('morgan');
const db = require('./config/db/index');
const route = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

//Connect to database
db.connect();

//HTTP logger
// app.use(morgan('combined'));

//middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);

//set view, engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\view'));

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
