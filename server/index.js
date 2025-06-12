const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

const PORT = 9000;

const comparisons = {};

app.post('/comparison', (req, res) => {
  const { izquierda, derecha } = req.body;
  const ip = req.ip;
  const date = new Date();

  comparisons[ip] = { izquierda, derecha, date };
  res.status(201).json({ message: 'OK' });
});

app.get('/comparison', (req, res) => {
  const ip = req.ip;
  res.status(200).json(comparisons[ip] || {
    izquierda: 0, derecha: 0
  });
});

app.get('/stats', (req, res) => {
  const individualResults = [];
  for (const ip in comparisons) {
    if (comparisons.hasOwnProperty(ip)) {
      const { izquierda, derecha, date } = comparisons[ip];
      let result;
      if (izquierda > derecha) {
        result = 'izquierda gana';
      } else if (derecha > izquierda) {
        result = 'derecha gana';
      } else {
        result = 'empate';
      }
      individualResults.push({
        ip,
        izquierda,
        derecha,
        date: date.toISOString(),
        result,
      });
    }
  }
  res.status(200).json(individualResults);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
