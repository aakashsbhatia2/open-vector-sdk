const typeUtils = require('../commonUtils/typeUtils');
const qdrantConstants = require('./qdrantConstants');

function validateQdrantCollectionsOptions(options) {
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

module.exports = {
    validateQdrantCollectionsOptions
};
