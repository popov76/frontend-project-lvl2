import { readFileSync } from 'fs';
import path from 'path';
import compareDataSets from './index.js';

const getFileData = (filePath) => {
  const fileName = (!filePath.startsWith('/')) ? path.resolve(process.cwd(), filePath) : filePath;
  const fileContent = readFileSync(fileName);
  const ext = path.extname(fileName);
  if (ext.startsWith('.')) {
    return { data: fileContent, dataType: ext.slice(1) };
  }
  const msg = `Unknown file type:  ${ext}`;
  throw new Error(msg);
};

const genDiff = (file1, file2, format) => {
  const file1Data = getFileData(file1);
  const file2Data = getFileData(file2);
  return compareDataSets(file1Data, file2Data, format);
};

export default genDiff;
