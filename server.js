require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const connection = require('./config/db');
const eventsRouter = require('./routes/eventsRoute');


app.use(cors());
app.use(bodyParser.json());
app.use('/events', eventsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});