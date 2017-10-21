const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

mongoose.connect(keys.dbURI);

//Middlewares
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

app.use("/auth/", accountsRoute);
app.use("/api/accounts/", accountsRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT);
