const openVectorConstants = require('./openVector/openVectorConstants');
const qdrantValidationUtils = require('./qdrant/qdrantValidationUtils');
const pgVectorValidationUtils = require('./pgVector/pgVectorValidationUtils');

const typeUtils = require('./commonUtils/typeUtils');

class OpenVector {
    constructor(initConfig) {
        if (!typeUtils.isObject(initConfig)) throw 'Invalid Init Config';
        const { provider, config } = initConfig;

        if (!typeUtils.isNonEmptyString(provider) 
            || !Object.values(openVectorConstants.SUPPORTED_VECTOR_DBS).includes(provider)
        ) throw 'Invalid or unsupported provider';
    
        this.provider = provider
        this.config = config;
        this.db = null;

        switch (provider) {
            case openVectorConstants.SUPPORTED_VECTOR_DBS.QDRANT:
                qdrantValidationUtils.validateQdrantConfig(this.config);
                this.db = openVectorConstants.DB_UTILS_MAP[provider];
                break;
            case openVectorConstants.SUPPORTED_VECTOR_DBS.PG_VECTOR:
                pgVectorValidationUtils.validatePgVectorConfig(this.config);
                this.db = openVectorConstants.DB_UTILS_MAP[provider];
                break;
            default:
                throw new Error(`Unsupported provider: ${provider}`);
            }
    }

    async createCollection(options) {
        try {
            return await this.db.createCollection(this.config, options);
        } catch(err) {
            throw err;
        }
    }

    async getCollections() {
        try {
            return await this.db.getCollections(this.config);
        } catch(err) {
            throw err;
        }
    }

    async getCollection(options) {
        try {
            return await this.db.getCollection(this.config, options);
        } catch(err) {
            throw err;
        }
    }

    async deleteCollection(options) {
        try {
            return await this.db.deleteCollection(this.config, options);
        } catch(err) {
            throw err;
        }
    }

    async upsertVector(options) {
        try {
            return await this.db.upsertVector(this.config, options);
        } catch(err) {
            throw err;
        }
    }

    async deleteVectors(options) {
        try {
            return await this.db.deleteVectors(this.config, options);
        } catch(err) {
            throw err;
        }
    }

    async search(options) {
        try {
            return await this.db.search(this.config, options);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = OpenVector;
