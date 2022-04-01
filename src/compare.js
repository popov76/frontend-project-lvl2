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
  const fileName = (!filePath.startsWith('/')) ? path.resolve(process.cwd(), filePath) : filePath;
  const fileContent = readFileSync(fileName);
  const ext = path.extname(fileName);
  switch (ext) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    default:
      throw new Error('Unknow file type.');
  }
};

const compareObjects = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);
  const result = sortedKeys.reduce((acc, key) => {
    const compareKeyResult = compareKeys(obj1, obj2, key);
    _.set(acc, key, compareKeyResult);
    return acc;
  }, {});
  return result;
};

const compareKeys = (obj1, obj2, key) => {
  const hasFirstObject = _.has(obj1, key);
  const hasSecondObject = _.has(obj2, key);
  if (hasFirstObject && !hasSecondObject) {
    return { action: 'wasRemoved', value1: _.get(obj1, key) };
  }
  if (!hasFirstObject && hasSecondObject) {
    return { action: 'wasAdded', value2: _.get(obj2, key) };
  }
  if (hasFirstObject && hasSecondObject) {
    const value1 = _.get(obj1, key);
    const value2 = _.get(obj2, key);
    if (_.isObject(value1) && _.isObject(value2)) {
      return { action: 'complexValue', value: compareObjects(value1, value2) };
    }
    if (value1 === value2) {
      return { action: 'notChanged', value: value1 };
    }
    return { action: 'wasUpdated', value1, value2 };
  }
  return {};
};

export default compareFiles;
