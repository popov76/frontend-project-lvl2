import _ from 'lodash';

const indentSymbol = ' ';
const indentCount = 4;

const indentString = (level) => indentSymbol.repeat(indentCount * level);

const addKeyValueToString = (value, level = 0) => {
  if (_.isObject(value)) {
    const res = _.reduce(value, (acc, val, key) => {
      const newAcc = `${acc}\n${indentString(level + 1)}${key}: ${addKeyValueToString(val, level + 1)}`;
      return newAcc;
    }, '{');
    return `${res}\n${indentString(level)}}`;
  }
  return value;
};

const buildString = (name, value, level, prefix) => `\n${indentString(level)}  ${prefix} ${name}: ${addKeyValueToString(value, level + 1)}`;

const stylish = (object) => {
  const formatObject = (obj, level) => {
    const result = Object.keys(obj).reduce((acc, key) => {
      const keyDescription = _.get(obj, key);
      // eslint-disable-next-line no-use-before-define
      return `${acc}${processKey(key, keyDescription, level)}`;
    }, '{');
    return `${result}\n${indentString(level)}}`;
  };
  const processKey = (key, keyDescription, level) => {
    switch (keyDescription.action) {
      case 'wasRemoved':
        return buildString(key, keyDescription.value1, level, '-');
      case 'wasAdded':
        return buildString(key, keyDescription.value2, level, '+');
      case 'notChanged':
        return buildString(key, keyDescription.value, level, ' ');
      case 'wasUpdated':
        return `${buildString(key, keyDescription.value1, level, '-')}${buildString(key, keyDescription.value2, level, '+')}`;
      case 'complexValue':
        return `\n${indentString(level + 1)}${key}: ${formatObject(keyDescription.value, level + 1)}`;
      default:
        throw new Error(`Invalid description: ${keyDescription.action}`);
    }
  };
  return formatObject(object, 0);
};

export default stylish;
