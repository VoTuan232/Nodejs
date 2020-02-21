const _ = require("lodash");

class ObjectUtil {
  convertKeyToCamelCase(data) {
    if (!data) {
      return data;
    } else if (Array.isArray(data)) {
      return _.map(data, item => this.convertKeyToCamelCase(item));
    } else if (data instanceof Object) {
      return _.mapValues(
        _.mapKeys(data, (value, key) => _.camelCase(key)),
        obj =>
          obj && obj instanceof Object ? this.convertKeyToCamelCase(obj) : obj
      );
    }

    return data;
  }

  convertKeyToSnakeCase(data, ignoreDigit) {
    if (!data) {
      return data;
    } else if (Array.isArray(data)) {
      return _.map(data, item => this.convertKeyToSnakeCase(item, ignoreDigit));
    } else if (data instanceof Object) {
      return _.mapValues(
        _.mapKeys(data, (value, key) => {
          let newKey = _.snakeCase(key);
          if (!ignoreDigit) {
            newKey = _.words(newKey).reduce(
              (result, word, index) =>
                `${result}${index && isNaN(+word.charAt(0)) ? "_" : ""}${word}`,
              ""
            );
          }

          return newKey;
        }),
        obj =>
          obj && obj instanceof Object
            ? this.convertKeyToSnakeCase(obj, ignoreDigit)
            : obj
      );
    }

    return data;
  }
}

module.exports = new ObjectUtil();
