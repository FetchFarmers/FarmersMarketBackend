require('dotenv').config();
const express = require('express');
const app = express();

app.listen(5000, () => {
  console.log("server has started on port 5000")
});

const client = require('./db/client');
client.connect();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors({
  origin: "*",
}))

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const apiRouter = require('./api');
app.use('/api', apiRouter);

module.exports = app;