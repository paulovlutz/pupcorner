const express = require('express');
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const Breed = require("./models/breed");

mapUnknownBreeds = (dogBreed) => {
    unknownBreedsMap = {
        "Pit Bull Terrier": "American Staffordshire Terrier",
        "English Bulldog": "Bulldog",
        "Black Labrador Retriever": "Labrador Retriever",
        "Jack Russell Terrier": "Russell Terrier",
        "Australian Cattle Dog / Blue Heeler": "Australian Cattle Dog"
    }

    if (unknownBreedsMap[dogBreed] !== undefined) {
        dogBreed = unknownBreedsMap[dogBreed]
    }

    return dogBreed;
}

router.get("/:id", (req, res) => {
    const client = new petfinder.Client({apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET});
    
    let dog = {};
    let dogId = req.params.id;

    client.animal.show(dogId)
    .then(result => {
        let dogResult = result.data.animal;
        let shelterID = dogResult.organization_id;
        let dogBreed = dogResult.breeds.primary;

        // map dog photos for carousel
        let dogAllPhotos = dogResult.photos.map((photo, _) => {
            return {original: photo.large, originalClass: "dogDetails__image-image"};
        })

        client.organization.show(shelterID)
            .then(result => {
                let organizationDetails = result.data.organization;

                dogBreed = mapUnknownBreeds(dogBreed);

                Breed.where("breed", "like", "%" + dogBreed + "%")
                .fetch()
                .then(result => {
                    let breedAttributes = result.attributes;
    
                    dog = {
                        id: dogResult.id,
                        photos: dogAllPhotos,
                        name: dogResult.name,
                        breed: dogBreed,
                        description: dogResult.description,
                        age: dogResult.age,
                        gender: dogResult.gender,
                        size: dogResult.size,
                        shedding: breedAttributes.shedding,
                        grooming: breedAttributes.grooming,
                        energy: breedAttributes.energy,
                        trainability: breedAttributes.trainability,
                        temperament: breedAttributes.temperament,
                        life_expectancy: breedAttributes.life_expectancy,
                        weight: breedAttributes.weight,
                        shelter: organizationDetails
                    }
                    return res.status(200).json({dog: dog});
                })
                .catch(err => {
                    // if breed not found in DB return only attributes from API
                    dog = {
                        id: dogResult.id,
                        photos: dogAllPhotos,
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
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json({
            "message": "Sorry, dog not found."
        });
    });
});

module.exports = router;