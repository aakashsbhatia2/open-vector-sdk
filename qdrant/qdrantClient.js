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
}

module.exports = Qdrant;
