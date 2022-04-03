import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const getFileData = (filePath) => {
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
export const parseData = (data, options = { dataType: 'json' }) => {
  switch (options.dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Unknown data type.');
  }
};
