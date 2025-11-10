function validatePgVectorConfig(config) {
    if (!typeUtils.isNonEmptyString(config?.host)) throw 'Invalid or missing host in PG Vector config';
    if (!typeUtils.isPositiveInteger(config?.port)) throw 'Invalid or missing port in PG Vector config';
    if (!typeUtils.isNonEmptyString(config?.user)) throw 'Invalid or missing user in PG Vector config';
    if (!typeUtils.isNonEmptyString(config?.password)) throw 'Invalid or missing password in PG Vector config';
    if (!typeUtils.isNonEmptyString(config?.database)) throw 'Invalid or missing database name in PG Vector config';
}

module.exports = {
    validatePgVectorConfig
}
