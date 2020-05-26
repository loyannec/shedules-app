const DatabaseService = require('./DatabaseService');
const express = require('express');
const path = require("path");
const exphbs  = require('express-handlebars');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const publicDirectory = path.join(__dirname, 'public');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);
liveReloadServer.server.once("connection", () => {        // Listening the connection event just once to avoid entering in loop.
    setTimeout(() => {                                    // Execute on future time.
        liveReloadServer.refresh("/");
    }, 50);
});

const app = express();
const port = 3000;

app.use(connectLivereload());

const handlebars = exphbs.create({                        // Module that permits to render a template.
    helpers: {
        isDefined: (value) => value !== undefined         // Adding helper to verify if value is defined.
    }
});

// View engine setup
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded());
app.use(express.static(publicDirectory));


app.get('/', (req, res) => {
    var database = new DatabaseService();
    database.connect();
    database.retrieveSchedules((error, schedules) => {
        database.disconnect();
        res.render('home', { schedules: schedules });
    });
});
app.get('/new', (req, res) => res.render('form'));

// Forward to error handler
app.post('/new', (req, res) => {
    var database = new DatabaseService();
    database.connect();
    database.insertSchedule(req.body, (error) => {
        database.disconnect();
        res.render('form', {
            error: error ? error.code : null
        });
    });
});

// Testing if start server
console.log("Starting server");

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));