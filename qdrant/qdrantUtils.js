const qdrantExternalClient = require('@qdrant/js-client-rest');
const typeUtils = require('../commonUtils/typeUtils');
const qdrantValidationUtils = require('./qdrantValidationUtils');

async function createCollection(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateQdrantCollectionsOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.createCollection(
            options.collectionName, 
            {
                vectors: { 
                    size: options.vectorSize, 
                    distance: options.distanceMetric
                },
            }
        );
    } catch(err) {
        throw err;
    }
}

module.exports = {
    createCollection,
};
