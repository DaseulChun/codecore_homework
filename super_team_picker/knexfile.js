// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "super_team_picker",
      username: "daseul",
      password: "password"

  },
  migration: {
    directory: "./db/migrations"
  }
  }
}
