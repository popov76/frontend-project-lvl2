import { readFileSync } from 'fs';
import path from 'path';
import compareDataSets from './index.js';

const getFileData = (filePath) => {
  const fileName = (!filePath.startsWith('/')) ? path.resolve(process.cwd(), filePath) : filePath;
  const fileContent = readFileSync(fileName);
  const ext = path.extname(fileName);
  switch (ext) {
    case '.json':
      return { data: fileContent, dataType: 'json' };
    case '.yaml':
    case '.yml':
      return { data: fileContent, dataType: 'yaml' };
    default:
      throw new Error('Unknown file type.');
  }
};

const genDiff = (file1, file2, format) => {
  const file1Data = getFileData(file1);
  const file2Data = getFileData(file2);
  return compareDataSets(file1Data, file2Data, format);
};

export default genDiff;
