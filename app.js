const express = require('express');
const { json } = require('express');

const heroesRoute = require('./route/heroes')
const homeRoute = require('./route/home')
const authenticator = require('./middleware/authenticator');
const mailer = require('./middleware/emailjob');

const app = express();// top level function of express [ similar to "costructor" in OOP ]
const PORT = 5000;

app.use(express.json()); //to read POST or PUT request body as JSON

app.use(authenticator);
app.use(mailer);

app.use('/', homeRoute);
app.use('/api/heroes', heroesRoute);

app.get('/*', (req, res) => {
    res.status(404).send("404 PFF.. Do you even API bro XD");
});

app.listen(PORT, () => {
    console.log("Listening on Port:" + PORT);
});
