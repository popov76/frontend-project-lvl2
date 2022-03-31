/* eslint-disable no-use-before-define */
import _ from 'lodash';

const indentSymbol = ' ';
const indentCount = 4;

const stylish = (object) => {
  const formatObject = (obj, indent = 0) => {
    let result = '{';
    Object.keys(obj).forEach((key) => {
      const keyDescription = _.get(obj, key);
      switch (keyDescription.action) {
        case 'wasRemoved':
          result += printKey(key, keyDescription.value1, indent, '-');
          break;
        case 'wasAdded':
          result += printKey(key, keyDescription.value2, indent, '+');
          break;
        case 'notChanged':
          result += printKey(key, keyDescription.value, indent, ' ');
          break;
        case 'wasUpdated':
          result += printKey(key, keyDescription.value1, indent, '-');
          result += printKey(key, keyDescription.value2, indent, '+');
          break;
        case 'complexValue':
          result = `${result}\n${indentString(indent + 1)}${key}: ${formatObject(keyDescription.value, indent + 1)}`;
          break;
        default:
          throw new Error(`Invalid description: ${keyDescription.action}`);
      }
    });
    return `${result}\n${indentString(indent)}}`;
  };
  return formatObject(object);
};

const indentString = (indent) => indentSymbol.repeat(indentCount * indent);

const printValue = (value, indent = 0) => {
  if (_.isObject(value)) {
    let res = '{';
    _.forOwn(value, (val, key) => {
      res = `${res}\n${indentString(indent + 1)}${key}: ${printValue(val, indent + 1)}`;
    });
    return `${res}\n${indentString(indent)}}`;
  }
  return value;
};

const printKey = (name, value, indent, prefix) => `\n${indentString(indent)}  ${prefix} ${name}: ${printValue(value, indent + 1)}`;

export default stylish;
