const express = require('express');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const knex = require("knex");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const Breed = require("./models/breed");

const client = new petfinder.Client({apiKey: "d88tWoXDhGqJnRvgYCRrwY0Drudlpeyvinjm1IG6wiGUITDll6", secret: "GteFtzSAfebyEsbmhGLiApKG7jk9EF9E80KaDLAC"});

router.get("/:id", (req, res) => {
    // client.authenticate();
    // pegar o id do dog pelo api
    let dog = {};
    let dogId = req.params.id;
    // pegar o breed do cachorro e as caracteristicas
    client.animal.show(dogId)
    .then(result => {
        let dogResult = result.data.animal;
        let dogBreed = dogResult.breeds.primary;
        let dogPhoto = "";

        dogResult.photos.forEach(photo => {
            dogPhoto = photo.large;
        });

        Breed.where("breed", "like", "%" + dogBreed + "%")
            .fetch()
            .then(result => {
                let dogAttributeDB = result.attributes;

                dog = {
                    id: dogResult.id,
                    photo: dogPhoto,
                    name: dogResult.name,
                    breed: dogBreed,
                    description: dogResult.description,
                    age: dogResult.age,
                    gender: dogResult.gender,
                    size: dogResult.size,
                    shedding: dogAttributeDB.shedding,
                    grooming: dogAttributeDB.grooming,
                    energy: dogAttributeDB.energy,
                    trainability: dogAttributeDB.trainability,
                    temperament: dogAttributeDB.temperament,
                    life_expectancy: dogAttributeDB.life_expectancy,
                    weight: dogAttributeDB.weight,
                    shelter: dogResult.contact
                }
                console.log(dog);
                return res.status(200).json({dog: dog});
            })
    })
    .catch(err => {
        console.log("Sorry, dog not found.");
    });
    // construir proprio objeto pra incluir os dois
    // mandar informaçao pro front-end
});

module.exports = router;