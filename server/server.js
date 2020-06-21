const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const knex = require("./knexfile");
const bodyParser = require('body-parser');
const quizAnswers = require("./quizAnswers");
const dogDetail = require("./dogDetails");

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/quizAnswers", quizAnswers);
app.use("/dogDetails", dogDetail);

let connection;
//make connection
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection(knex.development);
}

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => console.log(`Server running on ${port}`));

connection.connect(err => {
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;