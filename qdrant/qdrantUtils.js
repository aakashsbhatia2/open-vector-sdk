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

async function deleteCollection(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateDeleteCollectionOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.deleteCollection(options.collectionName);
    } catch(err) {
        throw err;
    }
}

async function upsertVector(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateUpsertVectorOptions(options);
        
        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        const points = [];
        for (const vector of options.vectors) {
            points.push({
                id: vector.id,
                vector: vector.vector,
                payload: vector.metaData || {}
            });
        }

        return await client.upsert(options.collectionName, {
            wait: true,
            points
        });
    } catch(err) {
        throw err;
    }
}

async function deleteVectors(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateDeleteVectorsOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.delete(options.collectionName, {
            points: options.ids,
        });
    } catch(err) {
        throw err;
    }
}       

async function search(host, port, options) {
    try {
        if (!typeUtils.isNonEmptyString(host)) {
            throw 'Invalid host provided for Qdrant';
        }

        if (!typeUtils.isPositiveInteger(port)) {
            throw 'Invalid port provided for Qdrant';
        }

        qdrantValidationUtils.validateSearchOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        const topK = Math.min(options.topK || 10, 1000);

        return await client.search(options.collectionName, {
            vector: options.queryVector,
            limit: options.topK,
        });
    } catch(err) {
        throw err;
    }
}

module.exports = {
    createCollection,
    getCollections,
    getCollection,
    deleteCollection,
    upsertVector,
    deleteVectors,
    search
};
