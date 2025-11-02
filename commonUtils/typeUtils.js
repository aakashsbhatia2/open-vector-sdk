function isNonEmptyString(str) {
    return typeof str === 'string' && str.length > 0;
}

function isPositiveInteger(num) {
    return Number.isInteger(num) && num > 0;
}

module.exports = {
    isNonEmptyString,
    isPositiveInteger
};
