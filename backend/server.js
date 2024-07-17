const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const listRoutes = require('./routes/listRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', listRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
