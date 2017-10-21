var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require("mongoose").model('user');
router.get(
    '/google/',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google'), function(req, res){
        res.redirect('/api/accounts/current_user');
    }
)

router.get('/current_user', function(req, res){
        res.send(req.user);
    }
)

module.exports = router;
