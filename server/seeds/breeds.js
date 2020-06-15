const akcData = require("../seed_data/akc-data.json");

exports.seed = function(knex) {
  return knex('breeds').del()
    .then(function () {
      return knex("breeds").insert(akcData);
    });
  };