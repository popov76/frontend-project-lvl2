import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const getObjectFromFile = (filePath) => {
  let fileName = filePath;
  if (!filePath.startsWith('/')) {
    fileName = path.resolve(process.cwd(), filePath);
  }
  const fileContent = readFileSync(fileName);
  const ext = path.extname(fileName);
  let parse;
  switch (ext) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yaml':
      parse = yaml.load;
      break;
    default:
      parse = JSON.parse;
  }
  return parse(fileContent);
};

const getPropertyCompareString = (property, obj1, obj2) => {
  const hasFirstObject = _.has(obj1, property);
  const hasSecondObject = _.has(obj2, property);

  let result;
  if (hasFirstObject && !hasSecondObject) {
    result = ` - ${property}: ${obj1[property]}`;
  } else if (!hasFirstObject && hasSecondObject) {
    result = ` + ${property}: ${obj2[property]}`;
  } else if (hasFirstObject && hasSecondObject) {
    if (obj1[property] === obj2[property]) {
      result = `   ${property}: ${obj1[property]}`;
    } else {
      result = ` - ${property}: ${obj1[property]}\n + ${property}: ${obj2[property]}`;
    }
  }
  return result;
};

const compareObjects = (obj1, obj2) => {
  const unitedKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const uniqKeys = _.uniq(unitedKeys);
  const sortedKeys = _.sortBy(uniqKeys);
  const result = sortedKeys.reduce((acc, property) => `${acc}\n${getPropertyCompareString(property, obj1, obj2)}`, '{');
  return `${result}\n}`;
};

const compareFiles = (file1, file2) => {
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);
  const result = compareObjects(obj1, obj2);
  return result;
};

export default compareFiles;
