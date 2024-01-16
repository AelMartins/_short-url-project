var express = require('express');
var router = express.Router();
const Urltable = require('../models/urltable');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'URL Shortener' });
});

// Algoritmo que encurta a URL:
function urlShortner() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234556789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// CREATE
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;

    if (!url) {
      return res.status(400).send('<script>alert("É necessário inserir uma URL para encurtar."); window.location="/";</script>');
    }

    const shortURL = urlShortner();

    const result = await Urltable.create({
      url,
      shortURL,
    });

    // Created
    res.status(201).render('delivery', result.dataValues);
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// UPDATE
router.put('/:shortURL', async (req, res, next) => {
  try {
    const shortURL = req.params.shortURL;
    const { url } = req.body;

    if (!url) {
      return res.status(400).send('A URL deve ser fornecida para a atualização.');
    }

    const result = await Urltable.findOne({ where: { shortURL } });

    if (!result) {
      return res.sendStatus(404); // Not Found
    }

    result.url = url;
    await result.save();

    res.sendStatus(200); // OK
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// DELETE
router.delete('/:shortURL', async (req, res, next) => {
  try {
    const shortURL = req.params.shortURL;
    const result = await Urltable.findOne({ where: { shortURL } });

    if (!result) {
      return res.sendStatus(404);
    }

    await result.destroy();

    res.sendStatus(202); // Accepted
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// READ todos os dados do banco
router.get('/all', async (req, res, next) => {
  try {
    const allData = await Urltable.findAll();
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// Get para a contagem de acessos e acessos
router.get('/:shortURL', async (req, res, next) => {
  try {
    const shortURL = req.params.shortURL;
    const result = await Urltable.findOne({ where: { shortURL } });

    if (!result) {
      return res.sendStatus(404);
    }

    result.hits++;
    await result.save();

    res.status(202).redirect(result.url);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//Get da pagina para visualizar a quantidade de acessos por esse link
router.get('/:shortURL/delivery', async (req, res, next) => {
  try {
    const shortURL = req.params.shortURL;
    const result = await Urltable.findOne({ where: { shortURL } });

    if (!result) {
      return res.sendStatus(404);
    }

    res.render('delivery', result.dataValues);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router;
