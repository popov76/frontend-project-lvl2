import stylish from "./stylish.js";
import plain from "./plain.js";

const getFormatter = (format) => {
  let formatter;
  switch (format.trim()) {
    case 'stylish':
      formatter = stylish;
      break;
    case 'plain':
      formatter = plain;
      break;
    default:
      throw new Error('Unknown output format');
  }
  return formatter;
};

export default getFormatter;
