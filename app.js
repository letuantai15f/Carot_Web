const express = require('express');

const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
app.use(express.static('resources'));
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('login');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/message', (req, res) => {
    res.render('message');
});
app.get('/modal', (req, res) => {
    res.render('modal');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

