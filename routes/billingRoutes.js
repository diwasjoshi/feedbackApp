var express = require('express');
var router = express.Router();
const userAuthenticationMiddle = require('../middlewares/userAuthentication');
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const User = require("mongoose").model('user');

router.post('/', userAuthenticationMiddle, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
});

module.exports = router;
