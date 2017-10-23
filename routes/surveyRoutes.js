const _ = require('lodash');
const express = require('express');
const router = express.Router();
const pathParser = require('path-parser');
const { URL } = require('url');

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
        console.log('here');
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

router.post('/webhooks', (req, res) => {
    const p = new pathParser('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

      res.send({});
})


router.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
});

router.get('/', userAuthenticationMiddle, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
});

module.exports = router;
