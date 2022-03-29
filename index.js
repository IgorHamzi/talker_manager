const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/talker', async (_req, res) => {
  const getTalker = await fs.readFile('./talker.json', 'utf8');

  if (!getTalker) return res.status(HTTP_OK_STATUS).json(JSON.parse([]));

  return res.status(HTTP_OK_STATUS).json(JSON.parse(getTalker));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const getTalker = await fs.readFile('./talker.json', 'utf8');
  const getTalkerId = JSON.parse(getTalker).find((element) => element.id === Number(id));

  if (!getTalkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(HTTP_OK_STATUS).json(getTalkerId);
});
