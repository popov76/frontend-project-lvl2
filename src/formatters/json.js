import _ from 'lodash';

const json = (diff) => {
  const diffTraversal = (obj, parent = '') => {
    // eslint-disable-next-line consistent-return
    const messages = _.reduce(obj, (acc, keyValue, key) => {
      const path = (parent === '') ? key : `${parent}.${key}`;
      const action = _.get(keyValue, 'action');
      switch (action) {
        case 'wasRemoved':
          return acc.concat({ property: path, action });
        case 'wasAdded':
          return acc.concat({ property: path, action, newValue: _.isObject(keyValue.value2) ? '[complex value]' : keyValue.value2 });
        case 'notChanged':
          return acc;
        case 'complexValue':
          return acc.concat(diffTraversal(keyValue.value, path));
        case 'wasUpdated':
          return acc.concat({
            property: path, action, oldValue: _.isObject(keyValue.value1) ? '[complex value]' : keyValue.value1, newValue: keyValue.value2,
          });
        default:
          throw new Error(`invalid diff action: ${action}`);
      }
    }, []);
    return messages;
  };
  return JSON.stringify({ messages: diffTraversal(diff) });
};

export default json;
