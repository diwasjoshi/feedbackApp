var express = require('express');
var router = express.Router();
const userAuthenticationMiddle = require('../middlewares/userAuthentication');
const requireCreditsMiddle = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const User = require("mongoose").model('user');
const Survey = require("mongoose").model('survey');

router.post('/', userAuthenticationMiddle, requireCreditsMiddle, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
    })

    try{
        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
    } catch(err) {
        res.status(422).send(err);
    }
});

module.exports = router;
