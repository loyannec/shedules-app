const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded());

app.get('/', (req, res) => res.render('home'));
app.get('/new', (req, res) => res.render('form'));

app.post('/new', (req, res) => {
    res.render('home');
});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));