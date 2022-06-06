var express = require('express');
const PasswordCard = require('../models/password-card');
var router = express.Router();

router.get('/', async function(req, res, next) {
  let cards = req.query.filter ?
                await PasswordCard.filterByName(req.query.filter) :
                await PasswordCard.all();

  res.send(cards);
});


router.post('/', async (req, res) => {
  if (req.body.id) {
    res.status(400).res({message: 'Id field is invalid'});
  }

  let card = new PasswordCard(null, req.body.url, req.body.name, req.body.username, req.body.password);
  await card.save();

  res.status(201).send(card);
});


router.put('/:id', async (req, res) => {
  let card = await PasswordCard.find(req.params.id);
  if (!card) {
    res.status(404).send({message: 'Not found'});
    return;
  }

  card.url = req.body.url;
  card.name = req.body.name;
  card.username = req.body.username;
  card.password = req.body.password;
  await card.save();

  res.status(202).send(card);
});


router.delete('/:id', async (req, res) => {
  let card = await PasswordCard.find(req.params.id);
  if (!card) {
    res.status(404).send({message: 'Not found'});
    return;
  }
  await card.remove();

  res.status(202).send();
});


module.exports = router;
