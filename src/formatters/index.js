import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedDiff = (diff, format) => {
  switch (format.trim()) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error('Unknown output format'.concat(format));
  }
};

export default getFormattedDiff;
