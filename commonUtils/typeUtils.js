function isNonEmptyString(str) {
    return typeof str === 'string' && str.length > 0;
}

function isPositiveInteger(num) {
    return Number.isInteger(num) && num > 0;
}

function isNonEmptyArray(arr) {
    return Array.isArray(arr) && arr.length > 0;
}

function isObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

module.exports = {
    isNonEmptyString,
    isPositiveInteger,
    isNonEmptyArray,
    isObject
};
