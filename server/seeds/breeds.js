const akcData = require("../seed_data/akc-data.json");

exports.seed = function(knex) {
  console.log("TESTE"); 
  return knex('breeds').del()
    .then(function () {
      return knex("breeds").insert(akcData);
    });
  };