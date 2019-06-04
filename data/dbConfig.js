const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename:'./data/lambda.db3'
    },
    useNullAsDefault: true
    // debug: true

}

const db = knex(knexConfig);

module.exports = db;