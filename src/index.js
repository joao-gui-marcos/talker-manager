const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const auth = require('./middlewares/auth');
const auth2 = require('./middlewares/auth2');
const validateFields = require('./middlewares/validateFields');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateTalk2 = require('./middlewares/validateTalk2');
const validateTalk3 = require('./middlewares/validateTalk3');
const validateTalkKeys = require('./middlewares/validateTalkKeys');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
//

app.get('/talker/search', auth2, async (req, res) => {
  const talkers = await fs.readFile(talker, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  console.log(response);
  const search = response.filter((e) => e.name.includes(req.query.q));
  res.status(200).json(search);
});

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(talker, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talker, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  const foundTalker = response.find((elem) => elem.id === Number(id));
  if (!foundTalker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(foundTalker);
});

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.post('/talker', auth, validateTalkKeys, validateAge, validateTalk2,
validateTalk, async (req, res) => {
  const talkers = await fs.readFile(talker, 'utf-8');
  const id = talkers ? JSON.parse(talkers).length + 1 : 0;
  const newTalker = { ...req.body, id };
  const newTalkerFile = [...JSON.parse(talkers), newTalker];
  await fs.writeFile(talker, JSON.stringify(newTalkerFile));
  res.status(201).json(newTalker);
});

app.post('/login', validateFields, (req, res) => {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  const token = generateToken();

  return res.status(200).json({ token });
});

app.put('/talker/:id', auth, validateTalk3, validateAge, validateTalkKeys, validateTalk2,
validateTalk, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talker, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  const newTalkersFile = response.map((e) => (e.id === Number(id) ? { id: e.id, ...req.body } : e));
  const newTalker = newTalkersFile[id - 1];
  await fs.writeFile(talker, JSON.stringify(newTalkersFile));
  res.status(200).json(newTalker);
});

app.delete('/talker/:id', auth2, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talker, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  
  const newTalkersFile = response.filter((e) => e.id !== Number(id));
  
  await fs.writeFile(talker, JSON.stringify(newTalkersFile));
  res.sendStatus(204);
});
