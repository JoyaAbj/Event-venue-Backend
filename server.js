require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const connection = require('./config/db');


app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});