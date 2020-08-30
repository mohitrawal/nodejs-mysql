
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('user_id');
      table.string('user_first_name', 255).notNullable();
      table.string('user_last_name', 255).notNullable();
      table.string('user_username');
      table.string('user_email');
      table.string('user_password',255);
      table.enu('user_status', [1, 0]);
      table.timestamp('user_created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("users");
};
