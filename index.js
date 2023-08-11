const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sentimentRouter = require('./routes/sentimentRoutes');

const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Use the sentiment router
app.use('/api/sentiment', sentimentRouter);

app.all('/', (req, res) => {
  console.log("received request");
  res.send('Hello World');
});

module.exports = app;  // Export the Express app
