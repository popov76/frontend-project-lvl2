import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (format) => {
  let formatter;
  switch (format.trim()) {
    case 'stylish':
      formatter = stylish;
      break;
    case 'plain':
      formatter = plain;
      break;
    case 'json':
      formatter = json;
      break;
    default:
      throw new Error('Unknown output format');
  }
  return formatter;
};

export default getFormatter;
