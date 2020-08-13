const express = require('express');
const mongoose = require('mongoose');
const { json } = require('express');
const cors = require('cors');

const heroesRoute = require('./route/heroes')
const homeRoute = require('./route/home')
const userRoute = require('./route/users');
const authRoute = require('./route/auth');
const authenticator = require('./middleware/authenticator');
const mailer = require('./middleware/emailjob');


const app = express();// top level function of express [ similar to "costructor" in OOP ]
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to read POST or PUT request body as JSON

app.use(authenticator);
app.use(mailer);
app.use(cors())

app.use('/', homeRoute);
app.use('/api/heroes', heroesRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

mongoose
    // .connect("mongodb://localhost/herodb", { useNewUrlParser: true, useUnifiedTopology: true })
    .connect("mongodb+srv://user:user%40123@cluster0.ao88m.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB Successfully...! ")) //{} non necessary if arrow function only has one line
    .catch(err => console.log("Error error has occured whilw connecting to DB: ", err))

app.get('/*', (req, res) => {
    res.status(404).send("404 PFF.. Do you even API bro XD");
});

app.listen(PORT, () => {
    console.log("Listening on Port:" + PORT);
});
