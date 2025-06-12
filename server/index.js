const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

const PORT = 9000;

// Array global para guardar todas las comparaciones con IP
const comparisons = [];

app.post('/comparison', (req, res) => {
  const { izquierda, derecha } = req.body;
  const ip = req.socket.remoteAddress;
  const date = new Date();

  comparisons.push({ ip, izquierda, derecha, date });
  res.status(201).json({ message: 'OK' });
});

app.get('/comparison', (req, res) => {
  const ip = req.socket.remoteAddress;

  const lastComparison = [...comparisons].reverse().find(c => c.ip === ip);

  if (lastComparison) {
    res.status(200).json({
      izquierda: lastComparison.izquierda,
      derecha: lastComparison.derecha,
    });
  } else {
    res.status(200).json({ izquierda: 0, derecha: 0 });
  }
});

app.get('/stats', (req, res) => {
  const resumen = {};

  for (const comp of comparisons) {
    const ip = comp.ip;

    let ganador = null;
    if (comp.izquierda > comp.derecha) {
      ganador = "izquierda";
    } else if (comp.derecha > comp.izquierda) {
      ganador = "derecha";
    }

    if (!ganador) continue;

    if (!resumen[ip]) {
      resumen[ip] = { izquierda: 0, derecha: 0 };
    }

    resumen[ip][ganador]++;
  }

  res.status(200).json(resumen);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
