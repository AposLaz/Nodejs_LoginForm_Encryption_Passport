const express = require('express');
const connectDB = require('./config/db')
const loginAPI = require('./routes/login')
const passport = require('passport')
const LoginCheck = require('./auth/passport')
const session = require('express-session');
LoginCheck(passport)

const port = process.env.PORT || 3000;

//connected to DB
connectDB();

const app = express()
//set engine
app.set('view engine', 'ejs')

//BodyParsing
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(loginAPI)

app.listen(port, () => {
    console.log("Server is up on port "+ port)
})