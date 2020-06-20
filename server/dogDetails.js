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
        console.log("CADE AS FOTICA :", result.data.animal.photos)
        let dogResult = result.data.animal;
        let shelterID = dogResult.organization_id;
        let dogBreed = dogResult.breeds.primary;

        let dogAllPhotos = dogResult.photos.map((photo, _) => {
            return {original: photo.large, originalClass: "dogDetails__image-image"};
        })
        console.log("DOG PHOTOS!!!!!!!!! ", dogAllPhotos);

        // let dogPhoto = (dogResult.photos && dogResult.photos);

        client.organization.show(shelterID)
            .then(result => {
                console.log("SHELTER ID", result.data.organization);

                let organizationDetails = result.data.organization;

                dogOtherBreeds = {
                    "Pit Bull Terrier": "American Staffordshire Terrier",
                    "English Bulldog": "Bulldog",
                    "Black Labrador Retriever": "Labrador Retriever",
                    "Jack Russell Terrier": "Russell Terrier",
                    "Australian Cattle Dog / Blue Heeler": "Australian Cattle Dog"
                }
    
                if (dogOtherBreeds[dogBreed] !== undefined) {
                    dogBreed = dogOtherBreeds[dogBreed]
                }

                Breed.where("breed", "like", "%" + dogBreed + "%")
                .fetch()
                .then(result => {
                    let dogAttributeDB = result.attributes;
    
                    dog = {
                        id: dogResult.id,
                        photos: dogAllPhotos,
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
                        shelter: organizationDetails
                    }
                    console.log(dog);
                    return res.status(200).json({dog: dog});
                })
                .catch(err => {
                    dog = {
                        id: dogResult.id,
                        photo: dogPhoto,
                        name: dogResult.name,
                        breed: dogBreed,
                        description: dogResult.description,
                        age: dogResult.age,
                        gender: dogResult.gender,
                        size: dogResult.size,
                        shelter: organizationDetails
                    }
                    return res.status(200).json({dog: dog});
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log("Sorry, dog not found.");
        console.log(err);
    });
    // construir proprio objeto pra incluir os dois
    // mandar informaçao pro front-end
});

module.exports = router;