require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const connection = require('./config/db');
const eventsRouter = require('./routes/eventsRoute');
const venuesRouter = require('./routes/venuesRoute');


app.use(cors());
app.use(bodyParser.json());
app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});