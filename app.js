const DatabaseService = require('./DatabaseService');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded());

app.get('/', (req, res) => {
    var database = new DatabaseService();
    database.connect();
    database.retrieveSchedules((schedules) => {
        database.disconnect();
        res.render('home', { schedules: schedules });
    });
});
app.get('/new', (req, res) => res.render('form'));

app.post('/new', (req, res) => {
    var database = new DatabaseService();
    database.connect();
    database.insertSchedule(req.body);
    database.disconnect();
    res.render('home');
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));