const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const quizAnswers = require("./quizAnswers");

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/quizAnswers", quizAnswers);

app.listen(port, () => console.log(`Server running on ${port}`));