import _ from 'lodash';

const addQuotesToString = (value) => {
  const newValue = _.isString(value) ? `'${value}'` : value;
  return newValue;
};

const plain = (diff) => {
  const dft = (obj, parent = '') => {
    let result = '';
    _.forOwn(obj, (keyValue, key) => {
      const path = (parent === '') ? key : `${parent}.${key}`;
      switch (keyValue.action) {
        case 'wasRemoved':
          result = `${result}Property '${path}' was removed\n`;
          break;
        case 'wasAdded':
          result = `${result}Property '${path}' was added with value: ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}\n`;
          break;
        case 'notChanged':
          break;
        case 'complexValue':
          result = `${result}${dft(keyValue.value, path)}`;
          break;
        case 'wasUpdated':
          result = `${result}Property '${path}' was updated. From ${_.isObject(keyValue.value1)
            ? '[complex value]' : addQuotesToString(keyValue.value1)} to ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}\n`;
          break;
        default:
          throw new Error('invalid diff');
      }
    });
    return result;
  };
  return dft(diff);
};

export default plain;
