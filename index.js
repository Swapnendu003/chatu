/*const express = require('express');
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

module.exports = app;  // Export the Express app*/




/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sentimentRouter = require('./routes/sentimentRoutes');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

//app.use(express.static(path.join(__dirname, 'public')));

// Use the sentiment router
app.use('/api/sentiment', sentimentRouter);

app.all('/', (req, res) => {
  console.log("received request");
  res.send('Hello World');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/




/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sentimentRouter = require('./routes/sentimentRoutes');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Use the sentiment router
app.use('/api/sentiment', sentimentRouter);

app.all('/', (req, res) => {
  console.log('Received request');
  res.send('Hello World');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const sentimentRouter = require('./routes/sentimentRoutes');
const callRoutes = require('./routes/twilioRoutes');
const translateRoutes = require ('./routes/translateQuestionsRoutes');
const generateRoutes = require ('./routes/geminiRoutes');
const chatRoutes = require('./routes/chatRoutes');





const app = express();
app.use(bodyParser.json());


app.use(cors());


app.use('/api/sentiment', sentimentRouter);
app.use('/api/calls', callRoutes);
app.use ('/translate', translateRoutes);
app.use ('/generate', generateRoutes);
app.use ('/chat', chatRoutes);


app.all('/', (req, res) => {
  console.log("received request");
  res.send('Hello World');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;  