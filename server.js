const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

const app = express();

mongoose.connect(keys.dbURI);

//Middlewares
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
var accountsRoute = require("./routes/accounts");
var billingRoutes = require("./routes/billingRoutes");
var surveyRoutes = require("./routes/surveyRoutes");

app.use("/auth/", accountsRoute);
app.use("/api/accounts/", accountsRoute);
app.use("/api/stripe", billingRoutes);
app.use("/api/surveys", surveyRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
