const _ = require('lodash');

function compareStrings(str1, str2) {
    const normalizedStr1 = _.toLower(_.replace(_.trim(str1), /\s+/g, ''));
    const normalizedStr2 = _.toLower(_.replace(_.trim(str2), /\s+/g, ''));

    return _.isEqual(normalizedStr1, normalizedStr2);
}

function containsString(str1, str2) {
    const normalizedStr1 = _.toLower(_.replace(_.trim(str1), /\s+/g, ''));
    const normalizedStr2 = _.toLower(_.replace(_.trim(str2), /\s+/g, ''));

    return _.includes(normalizedStr1, normalizedStr2);
}

module.exports = { compareStrings, containsString }
