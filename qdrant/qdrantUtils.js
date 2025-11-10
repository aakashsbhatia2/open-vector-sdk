const qdrantExternalClient = require('@qdrant/js-client-rest');
const typeUtils = require('../commonUtils/typeUtils');
const qdrantValidationUtils = require('./qdrantValidationUtils');

async function createCollection(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

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

async function getCollections(config) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        return await client.getCollections();
    } catch(err) {
        throw err;
    }
}

async function getCollection(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

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

async function deleteCollection(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

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

async function upsertVector(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

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

async function deleteVectors(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

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

async function search(config, options) {
    try {
        qdrantValidationUtils.validateQdrantConfig(config);
        const { host, port } = config;

        qdrantValidationUtils.validateSearchOptions(options);

        const client = new qdrantExternalClient.QdrantClient({ 
            host, 
            port 
        });

        const topK = Math.min(options.topK || 10, 1000);

        return await client.search(options.collectionName, {
            vector: options.queryVector,
            limit: topK,
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
