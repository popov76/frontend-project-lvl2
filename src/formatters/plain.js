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
          result = `${result}\nProperty '${path}' was removed`;
          break;
        case 'wasAdded':
          result = `${result}\nProperty '${path}' was added with value: ${_.isObject(keyValue.value2)
            ? '[complex value]' : addQuotesToString(keyValue.value2)}`;
          break;
        case 'notChanged':
          break;
        case 'complexValue':
          result = `${result}${dft(keyValue.value, path)}`;
          break;
        case 'wasUpdated':
          result = `${result}\nProperty '${path}' was updated. From ${_.isObject(keyValue.value1)
            ? '[complex value]' : addQuotesToString(keyValue.value1)} to ${addQuotesToString(keyValue.value2)}`;
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
