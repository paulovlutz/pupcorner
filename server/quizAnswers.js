const express = require('express');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({apiKey: "d88tWoXDhGqJnRvgYCRrwY0Drudlpeyvinjm1IG6wiGUITDll6", secret: "GteFtzSAfebyEsbmhGLiApKG7jk9EF9E80KaDLAC"});

let characteristics_api = ["size", "age"];
let characteristics_db = ["shedding", "energy_level"];

// let dogRanking = { jimmy: 5 };

// answers format selectedAnswers = { size: [a1, a2], age: [a4] }

router.post("/", (req, res) => {
    console.log(req.body);
    res.send("ABACATE DO SERVIDOR!");
    // console.log("Database POST test");
    // client.authenticate();

    // client.animal.search({
    //     type: "Dog",
    //     location_slug: "ca/ontario/toronto"
    // })
    // .then(result => {
    //     console.log(result.data.animals);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    // make a call to get the dogsFound from the API

    //......

    // "small"

    // ["small", "medium"]

    // put them in a variable dogsFound = dogs from the API
    // for (let i = 0; i < dogsFound.length; i++) {
    //     let dogAPI = dogsFound[i];

    //     for (let j = 0; j < characteristics_api.length; j++) {
    //         let characteristic = characteristics_api[j];

    //         if (selectedAnswer[characteristic].includes(dogAPI[characteristic])) {
    //             let singleDogId = dogAPI[id];

    //             if (dogRanking[singleDogId] === undefined) {
    //                 dogRanking[singleDogId] = 0;
    //             }
    //             dogRanking[singleDogId] += 1;
    //         }
    //     }
    // }
});

module.exports = router;