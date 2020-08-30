// Update with your config settings.

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: "./Database/Migrations"
        },
        seeds: {
            directory: "./Database/Seeding"
        }
    },
};
