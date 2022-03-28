import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const indentSymbol = ' ';
const indentCount = 4;

const getObjectFromFile = (filePath) => {
  let fileName = filePath;
  if (!filePath.startsWith('/')) {
    fileName = path.resolve(process.cwd(), filePath);
  }
  const fileContent = readFileSync(fileName);
  const ext = path.extname(fileName);
  let parse;
  switch (ext) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yaml':
      parse = yaml.load;
      break;
    default:
      parse = JSON.parse;
  }
  return parse(fileContent);
};

const compareObjects = (obj1, obj2) => {
  const result = {};
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);
  sortedKeys.forEach((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      _.set(result, key, { has: 'firstOnly', value1: _.get(obj1, key) });
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      _.set(result, key, { has: 'secondOnly', value2: _.get(obj2, key) });
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const value1 = _.get(obj1, key);
      const value2 = _.get(obj2, key);
      if (_.isObject(value1) && _.isObject(value2)) {
        _.set(result, key, { has: 'bothObjects', value: compareObjects(value1, value2) });
      } else if (value1 === value2) {
        _.set(result, key, { has: 'bothEqual', value: value1 });
      } else {
        _.set(result, key, { has: 'bothNotEqual', value1, value2 });
      }
    }
  });
  return result;
};

const stylish = (object) => {
  const indentString = (indent) => indentSymbol.repeat(indentCount * indent);

  const addValue = (value, indent = 0) => {
    if (_.isObject(value)) {
      let res = '{';
      _.forOwn(value, (val, key) => {
        res = `${res}\n${indentString(indent + 1)}${key}: ${addValue(val, indent + 1)}`;
      });
      return `${res}\n${indentString(indent)}}`;
    }
    return value;
  };

  const addKey = (name, value, indent, prefix) => `\n${indentString(indent)}  ${prefix} ${name}: ${addValue(value, indent + 1)}`;

  const formatObject = (obj, indent = 0) => {
    let result = '{';
    Object.keys(obj).forEach((key) => {
      const keyDescription = _.get(obj, key);
      switch (keyDescription.has) {
        case 'firstOnly':
          result += addKey(key, keyDescription.value1, indent, '-');
          break;
        case 'secondOnly':
          result += addKey(key, keyDescription.value2, indent, '+');
          break;
        case 'bothEqual':
          result += addKey(key, keyDescription.value, indent, ' ');
          break;
        case 'bothNotEqual':
          result += addKey(key, keyDescription.value1, indent, '-');
          result += addKey(key, keyDescription.value2, indent, '+');
          break;
        case 'bothObjects':
          result = `${result}\n${indentString(indent + 1)}${key}: ${formatObject(keyDescription.value, indent + 1)}`;
          break;
        default:
          throw new Error(`unknoun description: ${keyDescription.has}`);
      }
    });
    return `${result}\n${indentString(indent)}}`;
  };
  return formatObject(object);
};

const compareFiles = (file1, file2) => {
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);
  const compareResult = compareObjects(obj1, obj2);
  return stylish(compareResult);
};

export default compareFiles;
