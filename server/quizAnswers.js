const express = require('express');
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const Breed = require("./models/breed");

createFilterParams = (answerBody, searchParams) => {
    if (answerBody.children.includes("yes")) {
        searchParams["good_with_children"] = "true";
    }

    if (answerBody.dogs.includes("yes")) {
        searchParams["good_with_dogs"] = "true";
    }

    if (answerBody.cats.includes("yes")) {
        searchParams["good_with_cats"] = "true";
    }
}

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

rankDogsBasedOnApiCharacteristics = (dogAPI, answerBody, dogRanking) => {
    let characteristicsApi = ["size", "age", "house_trained", "gender"];
    for (let i = 0; i < characteristicsApi.length; i++) {
        let characteristic = characteristicsApi[i];

        if (dogAPI[characteristic] !== undefined && answerBody[characteristic].includes(dogAPI[characteristic].toLowerCase())) {
            addPointsToDog(dogRanking, dogAPI.id);
        }
    }
}

rankDogsBasedOnDBCharacteristics = (breed, answerBody, dogRanking, dogID) => {
    let characteristicsDb = ["trainability", "shedding", "grooming", "energy", "temperament"];

    let descriptionToDBKey = {
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

    for (let i = 0; i < characteristicsDb.length; i++) {
        let characteristic = characteristicsDb[i];

        let breedAttribute = breed.attributes[characteristic]

        if (descriptionToDBKey[breedAttribute] !== undefined) {
            breedAttribute = descriptionToDBKey[breedAttribute];
        }

        if (breedAttribute !== undefined && answerBody[characteristic].includes(breedAttribute.toLowerCase())) {
            addPointsToDog(dogRanking, dogID);
        }
    }
}

addPointsToDog = (dogRanking, singleDogId) => {
    if (dogRanking[singleDogId] === undefined) {
        dogRanking[singleDogId] = 0;
    }
    dogRanking[singleDogId] += 1;
}

sortDogs = (dogRanking, dogsFound) => {
    let dogsSorted = Object.keys(dogRanking).sort(function(a,b){return dogRanking[b]-dogRanking[a]});
    let dogsArray = [];

    for (let c = 0; c < dogsSorted.length; c++) {

        let singleDogFound = dogsFound.find(dog => {
            return dog.id == dogsSorted[c];
        });

        dogsArray.push(singleDogFound);
    }

    return dogsArray;
}

filterDuplicateDogs = (dogsArray, otherDogsFound) => {
    let dogArraysIDs = dogsArray.map(dog => {
        return (dog.id)
    })

    otherDogsFound = otherDogsFound.filter(dog => !dogArraysIDs.includes(dog.id));
}

router.post("/", (req, res) => {
    const client = new petfinder.Client({apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET});

    let answerBody = req.body.answers;
    let addressBody = req.body.address;

    let searchParams = {
        type: "Dog",
        location: `${addressBody.city}, ${addressBody.state}, ${addressBody.country}`,
        distance: 60,
        limit: 100
    }

    createFilterParams(answerBody, searchParams);

    client.animal.search(searchParams)
    .then(result => {
        let dogsFound = result.data.animals;
        let dogRanking = {};

        // Due to duplication in the API, I'm filtering out this dog for demonstration purposes
        dogsFound = dogsFound.filter(dog => dog.id !== 40668183);

        for (let i = 0; i < dogsFound.length; i++) {
            let dogAPI = {
                id: dogsFound[i].id,
                size: dogsFound[i].size,
                age: dogsFound[i].age,
                house_trained: dogsFound[i].attributes.house_trained.toString(),
                gender: dogsFound[i].gender
            };
    
            rankDogsBasedOnApiCharacteristics(dogAPI, answerBody, dogRanking);

            let dogFoundPrimaryBreed = dogsFound[i].breeds.primary;

            dogFoundPrimaryBreed = mapUnknownBreeds(dogFoundPrimaryBreed);

            Breed.where("breed", "like", "%" + dogFoundPrimaryBreed + "%")
            .fetch()
            .then(breed => {                
                rankDogsBasedOnDBCharacteristics(breed, answerBody, dogRanking, dogAPI.id);
            })
            .catch(err => {
                console.log("Could not find " + dogFoundPrimaryBreed);
                console.log(err);
            });
        }

        // Sort dogs
        
        let dogsArray = sortDogs(dogRanking, dogsFound);

        // Other Dogs
        let searchParamsOtherDogs = {
            type: "Dog",
            location: `${addressBody.city}, ${addressBody.state}, ${addressBody.country}`,
            distance: 40,
            limit: 100
        }

        client.animal.search(searchParamsOtherDogs)
        .then(result => {
            let otherDogsFound = result.data.animals;

            // Due to duplication in the API, I'm filtering out this dog for demonstration purposes
            otherDogsFound = otherDogsFound.filter(dog => dog.id !== 40668183);

            filterDuplicateDogs(dogsArray, otherDogsFound);
            
            return res.status(200).json({dogsFound: dogsArray, otherDogsFound: otherDogsFound});
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json({
            "message": "Sorry, dog not found."
        });
    })
});

module.exports = router;