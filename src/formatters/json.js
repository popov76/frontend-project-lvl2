import _ from 'lodash';

const json = (diff) => {
  const dft = (obj, parent = '') => {
    let messages = [];
    _.forOwn(obj, (keyValue, key) => {
      const path = (parent === '') ? key : `${parent}.${key}`;
      const action = _.get(keyValue, 'action');
      switch (action) {
        case 'wasRemoved':
          messages.push({
            property: path,
            action,
          });
          break;
        case 'wasAdded':
          messages.push({
            property: path,
            action,
            newValue: _.isObject(keyValue.value2) ? '[complex value]' : keyValue.value2,
          });
          break;
        case 'notChanged':
          break;
        case 'complexValue':
          messages = messages.concat(dft(keyValue.value, path));
          break;
        case 'wasUpdated':
          messages.push({
            property: path,
            action,
            oldValue: _.isObject(keyValue.value1) ? '[complex value]' : keyValue.value1,
            newValue: keyValue.value2,
          });
          break;
        default:
          throw new Error('invalid diff');
      }
    });
    return messages;
  };
  return JSON.stringify({ messages: dft(diff) });
};

export default json;
