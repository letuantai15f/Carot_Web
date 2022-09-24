const express = require('express');

const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
app.use(express.static('resources'));
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('dangnhap');
});
app.get('/trangchu', (req, res) => {
    res.render('trangchu');
});
app.get('/message', (req, res) => {
    res.render('message');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})