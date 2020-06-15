const bookshelf = require("../bookshelf");

const Breed = bookshelf.model("Breed", {
    tableName: "breeds",
});

module.exports = Breed;