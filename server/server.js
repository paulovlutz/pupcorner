const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server running on ${port}`));