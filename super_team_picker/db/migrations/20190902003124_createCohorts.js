// Create Cohorts Table
exports.up = function(knex) {
  return knex.schema.createTable("cohorts", t => {
    t.bigIncrements("id");
    t.string("name");
    t.text("members");
    t.text("logoUrl");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("cohorts");
};
