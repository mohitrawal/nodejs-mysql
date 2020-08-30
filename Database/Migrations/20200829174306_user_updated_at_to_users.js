
exports.up = function(knex) {
    knex.schema.alterTable('users', function(table) {
        table.timestamp('user_updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    knex.schema.alterTable('users', function(table) {
        table.dropColumn('user_updated_at');
    });
};
