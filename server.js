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

app.use("/auth/", accountsRoute);
app.use("/api/accounts/", accountsRoute);
app.use("/api/stripe", billingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
