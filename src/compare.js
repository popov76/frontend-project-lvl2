import { readFileSync } from 'fs';
import  _ from 'lodash';
import path from 'path';

const getObjectFromFile = (filePath) => {
  let fileName = filePath;
  if (!filePath.startsWith('/')) { fileName = path.resolve(process.cwd(), filePath)} 
      const fileContent = readFileSync(fileName);
      const obj = JSON.parse(fileContent);
      return obj;
}

const compareFiles = (file1, file2) => {

      const obj1 = getObjectFromFile(file1);
      const obj2 = getObjectFromFile(file2);      

      const result = compareObjects(obj1, obj2);
      console.log(result);
}

const compareObjects = (obj1, obj2) => {
      const keys =_.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
      let result = keys.reduce((acc, property) => {
            if  (_.has(obj1, property) && !_.has(obj2, property)) {
                  acc += ` - ${property}:${obj1[property]}\n`;
            } else if (!_.has(obj1, property) && _.has(obj2, property)) {
                  acc += ` + ${property}:${obj2[property]}\n`;
            } else if (_.has(obj1, property) && _.has(obj2, property)) {
                  if (obj1[property] === obj2[property]) {
                        acc += `   ${property}:${obj1[property]}\n`
                  } else {
                        acc += ` - ${property}:${obj1[property]}\n`;
                        acc += ` + ${property}:${obj2[property]}\n`;
                  }
            }
            return acc;
      }, '{\n');
      return `${result}}`;
}
export default compareFiles;