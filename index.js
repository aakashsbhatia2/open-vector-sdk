const quadrantClient = require('./qdrant/qdrantClient');
const OpenVectorConstants = require('./openVector/openVectorConstants');

class OpenVector {
    constructor({ provider, config }) {
        this.provider = provider
        this.config = config;
        this.client = null;

        switch (provider) {
            case OpenVectorConstants.SUPPORTED_VECTOR_DBS.QDRANT:
                this.client = new quadrantClient(this.config);
                break;
            default:
                throw new Error(`Unsupported provider: ${provider}`);
            }
    }

    async createCollection(options) {
        try {
            return await this.client.createCollection(options);
        } catch(err) {
            throw err;
        }
    }

    async getCollections() {
        try {
            return await this.client.getCollections();
        } catch(err) {
            throw err;
        }
    }

    async getCollection(options) {
        try {
            return await this.client.getCollection(options);
        } catch(err) {
            throw err;
        }
    }

    async deleteCollection(options) {
        try {
            return await this.client.deleteCollection(options);
        } catch(err) {
            throw err;
        }
    }

    async upsertVector(options) {
        try {
            return await this.client.upsertVector(options);
        } catch(err) {
            throw err;
        }
    }

    async deleteVectors(options) {
        try {
            return await this.client.deleteVectors(options);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = OpenVector;
