const typeUtils = require('../commonUtils/typeUtils');
const qdrantConstants = require('./qdrantConstants');

function validateQdrantCreateCollectionsOptions(options) {
    if (!typeUtils.isNonEmptyString(options?.collectionName)) {
        throw 'Invalid or missing collectionName in qdrant collection options';
    }

    if (!typeUtils.isPositiveInteger(options?.vectorSize)) {
        throw 'Invalid or missing vectorSize in qdrant collection options';
    }

    if (!Object.values(qdrantConstants.DISTANCE_METRICS).includes(options?.distanceMetric)) {
        throw 'Invalid or missing distanceMetric in qdrant collection options';
    }
}

function validateGetCollectionOptions(options) {
    if (!typeUtils.isNonEmptyString(options?.collectionName)) {
        throw 'Invalid or missing collectionName in qdrant get collection options';
    }
}

function validateDeleteCollectionOptions(options) {
    if (!typeUtils.isNonEmptyString(options?.collectionName)) {
        throw 'Invalid or missing collectionName in qdrant delete collection options';
    }
}

function validateUpsertOptions(options) {
    if (!typeUtils.isNonEmptyString(options?.collectionName)) {
        throw 'Invalid or missing collectionName in qdrant upsert options';
    }

    if (!typeUtils.isNonEmptyArray(options?.vectors)) {
        throw 'Invalid or missing vectors array in qdrant upsert options';
    }

    for (const vector of options.vectors) {
        if (!vector.id) throw 'Missing id in one of the vectors in qdrant upsert options';

        if (!typeUtils.isNonEmptyArray(vector.vector)) {
            throw `Invalid or missing vector array for id: ${vector.id} in qdrant upsert options`;
        }

        if ('metaData' in vector && !typeUtils.isObject(vector.metaData)) {
            throw `Invalid metaData for id: ${vector.id} in qdrant upsert options`;
        }
    }
}

module.exports = {
    validateQdrantCreateCollectionsOptions,
    validateGetCollectionOptions,
    validateUpsertOptions,
    validateDeleteCollectionOptions
};
