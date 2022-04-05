import _ from 'lodash';

const addQuotesToString = (value) => {
  const newValue = _.isString(value) ? `'${value}'` : value;
  return newValue;
};

const plain = (diff) => {
  const dft = (obj, parent = '') => {
    const result = _.reduce(obj, (acc, keyValue, key) => {
      const path = (parent === '') ? key : `${parent}.${key}`;
      switch (keyValue.action) {
        case 'wasRemoved':
          return acc.concat(`Property '${path}' was removed`);
        case 'wasAdded':
          return acc.concat(`Property '${path}' was added with value: ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}`);
        case 'notChanged':
          return acc;
        case 'complexValue':
          return acc.concat(dft(keyValue.value, path));
        case 'wasUpdated':
          return acc.concat(`Property '${path}' was updated. From ${_.isObject(keyValue.value1)
            ? '[complex value]' : addQuotesToString(keyValue.value1)} to ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}`);
        default:
          throw new Error('Invalid diff node type: '.concat(keyValue.action));
      }
    }, []);
    return result;
  };
  return dft(diff).join('\n');
};

export default plain;
