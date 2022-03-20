import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const getObjectFromFile = (filePath) => {
  let fileName = filePath;
  if (!filePath.startsWith('/')) {
    fileName = path.resolve(process.cwd(), filePath);
  }
  const fileContent = readFileSync(fileName);
  const obj = JSON.parse(fileContent);
  return obj;
};

const compareObjects = (obj1, obj2) => {
  const unitedKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const uniqKeys = _.uniq(unitedKeys);
  const sortedKeys = _.sortBy(uniqKeys);
  const result = sortedKeys.reduce((acc, property) => {
    let str;
    if (_.has(obj1, property) && !_.has(obj2, property)) {
      str = ` - ${property}: ${obj1[property]}`;
    }
    if (!_.has(obj1, property) && _.has(obj2, property)) {
      str = ` + ${property}: ${obj2[property]}`;
    }
    if (_.has(obj1, property) && _.has(obj2, property)) {
      if (obj1[property] === obj2[property]) {
        str = `   ${property}: ${obj1[property]}`;
      } else {
        str = ` - ${property}: ${obj1[property]}\n + ${property}: ${obj2[property]}`;
      }
    }
    return `${acc}\n${str}`;
  }, '{');
  return `${result}\n}`;
};

const compareFiles = (file1, file2) => {
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);
  const result = compareObjects(obj1, obj2);
  return result;
};

export default compareFiles;
