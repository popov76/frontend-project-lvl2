/* eslint-disable no-use-before-define */
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import getFormatter from './formatters/index.js';

const compareFiles = (file1, file2, format = 'stylish') => {
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);
  const diff = compareObjects(obj1, obj2);
  return getFormattedDiff(diff, format);
};

const getFormattedDiff = (diff, format) => {
  const formatter = getFormatter(format);
  return formatter(diff);
};

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
    case '.yml':
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
    const compareKeyResult = compareKeys(obj1, obj2, key);
    _.set(result, key, compareKeyResult);
  });
  return result;
};

const compareKeys = (obj1, obj2, key) => {
  const hasFirstObject = _.has(obj1, key);
  const hasSecondObject = _.has(obj2, key);
  let res;
  if (hasFirstObject && !hasSecondObject) {
    res = { action: 'wasRemoved', value1: _.get(obj1, key) };
  }
  if (!hasFirstObject && hasSecondObject) {
    res = { action: 'wasAdded', value2: _.get(obj2, key) };
  }
  if (hasFirstObject && hasSecondObject) {
    const value1 = _.get(obj1, key);
    const value2 = _.get(obj2, key);
    if (_.isObject(value1) && _.isObject(value2)) {
      res = { action: 'complexValue', value: compareObjects(value1, value2) };
    } else if (value1 === value2) {
      res = { action: 'notChanged', value: value1 };
    } else {
      res = { action: 'wasUpdated', value1, value2 };
    }
  }
  return res;
};

export default compareFiles;
