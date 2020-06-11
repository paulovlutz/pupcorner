exports.up = knex => {
    return knex.schema.createTable("breeds", table => {
        table.increments("id").primary();
        table.string("breed").notNullable();
        table.text("about");
        table.string("height");
        table.string("weight");
        table.string("life_expectancy");
        table.string("group");
        table.string("grooming");
        table.string("shedding");
        table.string("energy");
        table.string("trainability");
        table.string("temperament");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
    return knex.schema.dropTable("breeds");
};