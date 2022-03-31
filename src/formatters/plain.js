import _ from 'lodash';

const addQuotesToString = (value) => {
  const newValue = _.isString(value) ? `'${value}'` : value;
  return newValue;
};

const plain = (diff) => {
  const dft = (obj, parent = '') => {
    const result = [];
    _.forOwn(obj, (keyValue, key) => {
      const path = (parent === '') ? key : `${parent}.${key}`;
      switch (keyValue.action) {
        case 'wasRemoved':
          result.push(`Property '${path}' was removed`);
          break;
        case 'wasAdded':
          result.push(`Property '${path}' was added with value: ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}`);
          break;
        case 'notChanged':
          break;
        case 'complexValue':
          result.push(...dft(keyValue.value, path));
          break;
        case 'wasUpdated':
          result.push(`Property '${path}' was updated. From ${_.isObject(keyValue.value1)
            ? '[complex value]' : addQuotesToString(keyValue.value1)} to ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}`);
          break;
        default:
          throw new Error('invalid diff');
      }
    });
    return result;
  };
  return dft(diff).join('\n');
};

export default plain;
