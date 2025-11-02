const quadrantUtils = require('./qdrantUtils');

class Qdrant {
    constructor(config) {
        this.host = config?.host;
        this.port = config?.port;

        if (!this.host) {
            throw 'Missing or invalid host in Qdrant config';
        }

        if (!this.port) {
            throw 'Missing or invalid port in Qdrant config';
        }
    }

    async createCollection(options) {
        try {
            return await quadrantUtils.createCollection(
                this.host,
                this.port,
                options
            );
        } catch(err) {
            throw err;
        }
    }

    async getCollections() {
        try {
            return await quadrantUtils.getCollections(
                this.host,
                this.port
            );
        } catch(err) {
            throw err;
        }
    }

    async getCollection(options) {
        try {
            return await quadrantUtils.getCollection(
                this.host,
                this.port,
                options
            );
        } catch(err) {
            throw err;
        }
    }

    async deleteCollection(options) {
        try {
            return await quadrantUtils.deleteCollection(
                this.host,
                this.port,
                options
            );
        } catch(err) {
            throw err;
        }
    }

    async upsert(options) {
        try {
            return await quadrantUtils.upsert(
                this.host,
                this.port,
                options
            );
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Qdrant;
