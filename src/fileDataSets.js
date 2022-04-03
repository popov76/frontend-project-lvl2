import { readFileSync } from 'fs';
import path from 'path';

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
export default getFileData;
