import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (format) => {
  switch (format.trim()) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Unknown output format');
  }
};

export default getFormatter;
