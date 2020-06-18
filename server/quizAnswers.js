const express = require('express');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const knex = require("knex");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const Breed = require("./models/breed");

const client = new petfinder.Client({apiKey: "d88tWoXDhGqJnRvgYCRrwY0Drudlpeyvinjm1IG6wiGUITDll6", secret: "GteFtzSAfebyEsbmhGLiApKG7jk9EF9E80KaDLAC"});

// chars tested: size, age, house_trained, gender
let characteristics_api = ["size", "age", "house_trained", "gender"];
// // chars tested: trainability, shedding, grooming, energy, temperament
let characteristics_db = ["trainability", "shedding", "grooming", "energy", "temperament"];

router.post("/", (req, res) => {
    let answerBody = req.body;
    // client.authenticate();

    let searchParams = {
        type: "Dog",
        location: "Toronto, Ontario, Canada",
        distance: 60,
        limit: 100
    }

    // Filter Dogs

    if (answerBody.children.includes("yes")) {
        searchParams["good_with_children"] = "true";
        console.log(searchParams);
    }

    if (answerBody.dogs.includes("yes")) {
        searchParams["good_with_dogs"] = "true";
        console.log(searchParams);
    }

    if (answerBody.cats.includes("yes")) {
        searchParams["good_with_cats"] = "true";
        console.log(searchParams);
    }

    // Ranking Dogs

    client.animal.search(searchParams)
    .then(result => {
        let dogsFound = result.data.animals;
        let dogRanking = {};

        for (let i = 0; i < dogsFound.length; i++) {
            let dogAPI = {
                id: dogsFound[i].id,
                size: dogsFound[i].size,
                age: dogsFound[i].age,
                house_trained: dogsFound[i].attributes.house_trained.toString(),
                gender: dogsFound[i].gender
            };

            let singleDogId = dogAPI.id;
    
            for (let j = 0; j < characteristics_api.length; j++) {
                let characteristic = characteristics_api[j];
    
                // ["small", "medium"].includes("small")
                if (dogAPI[characteristic] !== undefined && answerBody[characteristic].includes(dogAPI[characteristic].toLowerCase())) {
    
                    if (dogRanking[singleDogId] === undefined) {
                        dogRanking[singleDogId] = 0;
                    }
                    dogRanking[singleDogId] += 1;
                }
            }

            let dogFoundPrimaryBreed = dogsFound[i].breeds.primary;

            Breed.where("breed", "like", "%" + dogFoundPrimaryBreed + "%")
            .fetch()
            .then(breed => {                
                for (let d = 0; d < characteristics_db.length; d++) {
                    let characteristic = characteristics_db[d];

                    let breedDB = {
                        "Eager to Please": "eager",
                        "Easy Training": "easy",
                        "May be Stubborn": "stubborn",
                        "Occasional Bath/Brush": "occasional",
                        "Weekly Brushing": "weekly",
                        "2-3 Times a Week Brushing": "times",
                        "Daily Brushing": "daily",
                        "Specialty/Professional": "professional",
                        "Couch Potato": "couch",
                        "Regular Exercise": "regular",
                        "Needs Lots of Activity": "lots",
                        "Aloof/Wary": "wary",
                        "Reserved with Strangers": "reserved",
                        "Alert/Responsive": "alert"
                    }

                    let breedAttribute = breed.attributes[characteristic]

                    if (breedDB[breedAttribute] !== undefined) {
                        breedAttribute = breedDB[breedAttribute];
                    }

                    if (breedAttribute !== undefined && answerBody[characteristic].includes(breedAttribute.toLowerCase())) {
                        
                        if (dogRanking[singleDogId] === undefined) {
                            dogRanking[singleDogId] = 0;
                        }
                        dogRanking[singleDogId] += 1;
                    }
                }

            })
            .catch(err => {
                console.log("Could not find " + dogFoundPrimaryBreed);
            });
        }

        // Sort dogs
        let dogsSorted = Object.keys(dogRanking).sort(function(a,b){return dogRanking[b]-dogRanking[a]});
        let dogsArray = [];

        // pega os ids pra achars os dogjohnson
        for (let c = 0; c < dogsSorted.length; c++) {

            let singleDogFound = dogsFound.find(dog => {
                return dog.id == dogsSorted[c];
            });

            dogsArray.push(singleDogFound);
        }
        return res.status(200).json({dogsFound: dogsArray});
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;