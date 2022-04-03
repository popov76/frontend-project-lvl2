import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

test.each([
  ['file3.json', 'file4.json', 'result2.txt', 'stylish'],
  ['file3.yaml', 'file4.yaml', 'result2.txt', 'stylish'],
  ['file3.json', 'file4.json', 'result3.txt', 'plain'],
  ['file3.yaml', 'file4.yaml', 'result3.txt', 'plain'],
  ['file3.json', 'file4.json', 'result4.txt', 'json'],
  ['file3.yaml', 'file4.yaml', 'result4.txt', 'json'],
])('file 1: %s file 2: %s result: %s formatter: %s', (file1, file2, result, formatter) => {
  const correctResult = readFileSync(getFixturePath(result), 'utf-8');
  expect(genDiff(
    getFixturePath(file1),
    getFixturePath(file2),
    formatter,
  )).toBe(correctResult);
});
