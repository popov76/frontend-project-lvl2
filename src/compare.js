import _ from 'lodash';
import parseData from './parse.js';
import getFormattedDiff from './formatters/index.js';

const compareObjects = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const result = sortedKeys.reduce((acc, key) => {
    // eslint-disable-next-line no-use-before-define
    const compareKeyResult = compareKeys(obj1, obj2, key);
    return { ...acc, [key]: compareKeyResult };
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

  const value1 = _.get(obj1, key);
  const value2 = _.get(obj2, key);
  if (_.isObject(value1) && _.isObject(value2)) {
    return { action: 'complexValue', value: compareObjects(value1, value2) };
  }
  if (value1 === value2) {
    return { action: 'notChanged', value: value1 };
  }
  return { action: 'wasUpdated', value1, value2 };
};

const compareDataSets = (dataSet1, dataSet2, outputFormat = 'stylish') => {
  const obj1 = parseData(dataSet1);
  const obj2 = parseData(dataSet2);

  const diff = compareObjects(obj1, obj2);
  return getFormattedDiff(diff, outputFormat);
};

export default compareDataSets;
