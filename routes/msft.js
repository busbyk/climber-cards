const express = require('express');
const router = express.Router();
const request = require('request');

const base_url = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search';

router.use('/images/search', (req, res) => {
  let key = process.env.MSFT_COG_SERVICES_KEY,
      params = req.query,
      query = params.q;

  if(!query) {
    res.status(400).send('no query parameter captured');
  }

  request.get({
    url: `${base_url}/?q=${query}&count=10`,
    headers: {
      'Ocp-Apim-Subscription-Key':key
    }
  }, (err, response, body) => {
    if(err) {
      res.status(500).send('Something went wrong getting an image.');
    }

    let allImages = JSON.parse(body).value,
        resImages = [];

    allImages.forEach(imageObj => {
      resImages.push(imageObj.contentUrl);
    });

    res.status(200).send(resImages);
  });
});

module.exports = router;
