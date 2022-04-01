/* eslint-disable no-use-before-define */
import _ from 'lodash';

const indentSymbol = ' ';
const indentCount = 4;

const stylish = (object) => {
  const formatObject = (obj, indent = 0) => {
    const result = Object.keys(obj).reduce((acc, key) => {
      const keyDescription = _.get(obj, key);
      switch (keyDescription.action) {
        case 'wasRemoved':
          return `${acc}${printKey(key, keyDescription.value1, indent, '-')}`;
        case 'wasAdded':
          return `${acc}${printKey(key, keyDescription.value2, indent, '+')}`;
        case 'notChanged':
          return `${acc}${printKey(key, keyDescription.value, indent, ' ')}`;
        case 'wasUpdated':
          return `${acc}${printKey(key, keyDescription.value1, indent, '-')}${printKey(key, keyDescription.value2, indent, '+')}`;
        case 'complexValue':
          return `${acc}\n${indentString(indent + 1)}${key}: ${formatObject(keyDescription.value, indent + 1)}`;
        default:
          throw new Error(`Invalid description: ${keyDescription.action}`);
      }
    }, '{');
    return `${result}\n${indentString(indent)}}`;
  };
  return formatObject(object);
};

const indentString = (indent) => indentSymbol.repeat(indentCount * indent);

const printValue = (value, indent = 0) => {
  if (_.isObject(value)) {
    // let res = '{';
    // eslint-disable-next-line arrow-body-style
    const res = _.reduce(value, (acc, val, key) => {
      return `${acc}\n${indentString(indent + 1)}${key}: ${printValue(val, indent + 1)}`;
    }, '{');
    return `${res}\n${indentString(indent)}}`;
  }
  return value;
};

const printKey = (name, value, indent, prefix) => `\n${indentString(indent)}  ${prefix} ${name}: ${printValue(value, indent + 1)}`;

export default stylish;
