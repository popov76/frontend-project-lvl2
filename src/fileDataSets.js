import { readFileSync } from 'fs';
import path from 'path';
import compareDataSets from './compare.js';

const getFileData = (filePath) => {
  const fileContent = readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');
  const ext = path.extname(filePath);
  return { data: fileContent, dataType: ext.slice(1) };
};

const genDiff = (file1, file2, format) => {
  const file1Data = getFileData(file1);
  const file2Data = getFileData(file2);
  return compareDataSets(file1Data, file2Data, format);
};

export default genDiff;
