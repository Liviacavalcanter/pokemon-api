const express = require('express');
const cors = require('cors');
const routes = require('./routes/pokemon.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api/pokemon', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
