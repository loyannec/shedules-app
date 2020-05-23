const DatabaseService = require('./DatabaseService');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3000;

const handlebars = exphbs.create({                        // Module that permits to render a template.
    helpers: {
        isDefined: (value) => value !== undefined         // Adding helper to verify if value is defined.
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded());

app.get('/', (req, res) => {
    var database = new DatabaseService();
    database.connect();
    database.retrieveSchedules((error, schedules) => {
        database.disconnect();
        res.render('home', { schedules: schedules });
    });
});
app.get('/new', (req, res) => res.render('form'));

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

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));