const SUPPORTED_VECTOR_DBS = {
    QDRANT: 'qdrant',
    PG_VECTOR: 'pgvector',
};

const DB_UTILS_MAP = {
    [ SUPPORTED_VECTOR_DBS.QDRANT ]: require('../qdrant/qdrantUtils'),
    [ SUPPORTED_VECTOR_DBS.PG_VECTOR ]: require('../pgVector/pgVectorUtils'),
};

module.exports = {
    SUPPORTED_VECTOR_DBS,
    DB_UTILS_MAP
};
