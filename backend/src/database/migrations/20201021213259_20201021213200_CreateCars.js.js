
exports.up = function(knex) {
    return knex.schema.createTable('cars', function (table){
        table.bigIncrements('id').primary();
        table.string('placa').notNullable;
        table.string('marca').notNullable;
        table.string('modelo').notNullable;
        table.string('ano', 4).notNullable;
        table.string('cor').notNullable;
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('cars');
};
