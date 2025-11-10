const Client = require('pg').Client;

const pgVectorValidationUtils = require('./pgVectorValidationUtils');

async function createCollection(config, options) {
    try {
        pgVectorValidationUtils.validatePgVectorConfig(config);
        const { host, port, user, password, database } = config;

        pgVectorValidationUtils.validatePgVectorCreateCollectionsOptions(options);
        const client = new Client({
            user,
            password,
            host,
            port,
            database,
        });

        await client.connect();
        await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
        await client.query(`
                CREATE TABLE IF NOT EXISTS ${options.collectionName} (
                id bigserial PRIMARY KEY,
                embedding vector(${options.vectorSize}),
                payload jsonb
            );
        `);

        await client.end();
        return;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    createCollection
}
