const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'local';

router.use('/climberData', (req, res) => {
  let key = process.env.MP_KEY;

  if(env === 'local') {
    res.status(200).send({"id":"111277314","name":"Kellen Busby","memberSince":"2015-11-08","lastVisit":"2017-04-03","favoriteClimbs":"","otherInterests":"Skiing, Mtn Biking, Running (trail preferably)","postalCode":"03801","location":"Portsmouth, NH","url":"https://www.mountainproject.com/u/kellen-busby//111277314","personalText":"","styles":{"Trad":{"lead":"5.8","follow":"5.10c"},"Sport":{"lead":"5.10c","follow":"5.11c"},"Boulders":{"lead":"V3","follow":""},"Aid":{"lead":"","follow":""},"Ice":{"lead":"WI3","follow":"WI4"},"Mixed":{"lead":"","follow":""}},"avatar":"https://graph.facebook.com/v2.7/10153608101971210/picture?type=large","success":1});
  } else {
    request.get({
      url: `https://www.mountainproject.com/data/?action=getUser&email=kellenbusby@gmail.com&key=${key}`
    }, (err, response, body) => {
      if(err) {
        res.status(500).send('Something went wrong contacting Mountain Project.');
      }

      res.status(200).send(JSON.parse(body));
    });
  }
});

module.exports = router;
