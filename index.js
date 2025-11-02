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
}

module.exports = OpenVector;
