/* eslint-disable no-use-before-define */
import _ from 'lodash';

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

export default compareObjects;
