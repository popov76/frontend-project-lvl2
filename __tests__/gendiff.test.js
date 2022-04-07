import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'result_stylish.txt', 'stylish'],
  ['file1.yaml', 'file2.yaml', 'result_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'result_plain.txt', 'plain'],
  ['file1.yaml', 'file2.yaml', 'result_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'result_json.txt', 'json'],
  ['file1.yaml', 'file2.yaml', 'result_json.txt', 'json'],
])('file 1: %s file 2: %s result: %s formatter: %s', (file1, file2, result, formatter) => {
  const correctResult = readFileSync(getFixturePath(result), 'utf-8');
  expect(genDiff(
    getFixturePath(file1),
    getFixturePath(file2),
    formatter,
  )).toBe(correctResult);
});
