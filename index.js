const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const {
  emailValidate,
  passwordValidate,
  nameValidate,
  ageValidate,

} = require('./validate/user');

const tokenValidate = require('./validate/token');
const talkValidate = require('./validate/talk');
const rateValidate = require('./validate/rate');
const watchedAtValidate = require('./validate/watchedAt');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const jsonTalken = './talker.json';

app.get('/talker', async (_req, res) => {
  const getTalker = await fs.readFile(jsonTalken, 'utf8');

  if (!getTalker) return res.status(HTTP_OK_STATUS).json(JSON.parse([]));

  return res.status(HTTP_OK_STATUS).json(JSON.parse(getTalker));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const getTalker = await fs.readFile(jsonTalken, 'utf8');
  const getTalkerId = JSON.parse(getTalker).find((element) => element.id === Number(id));

  if (!getTalkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(HTTP_OK_STATUS).json(getTalkerId);
});

app.post('/login', emailValidate, passwordValidate, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.post('/talker',
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  rateValidate,
  watchedAtValidate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(jsonTalken, 'utf8')
      .then((talker) => JSON.parse(talker));

    const addTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };

    await fs.writeFile(jsonTalken, JSON.stringify([...talkers, addTalker]));

    return res.status(201).json(addTalker);
});

app.put('/talker/:id',
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  rateValidate,
  watchedAtValidate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(jsonTalken, 'utf8')
      .then((talker) => JSON.parse(talker));
    const talkerId = talkers.find((t) => t.id === Number(id));
    talkerId.name = name;
    talkerId.age = age;
    talkerId.talk = talk;
  
    await fs.writeFile(jsonTalken, JSON.stringify(talkers));

    return res.status(200).json({ id: Number(id), name, age, talk });
});

app.delete('/talker/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(jsonTalken, 'utf8')
      .then((talker) => JSON.parse(talker));

  const deleteTalkerId = talkers.filter((element) => element.id !== Number(id));
  await fs.writeFile(jsonTalken, JSON.stringify(deleteTalkerId));

  return res.status(204).end();
});
