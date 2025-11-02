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

        qdrantValidationUtils.validateQdrantCreateCollectionsOptions(options);

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

async function getCollections(host, port) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.getCollections();
    } catch(err) {
        throw err;
    }
}

async function getCollection(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateGetCollectionOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.getCollection(options.collectionName);
    } catch(err) {
        throw err;
    }
}

module.exports = {
    createCollection,
    getCollections,
    getCollection
};
