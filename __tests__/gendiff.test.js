import { fileURLToPath } from 'url';
import path from 'path';
import compareFiles from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const correctResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('compare json', () => {
  expect(compareFiles(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(correctResult);
});

test('compare yaml', () => {
  expect(compareFiles(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yaml'),
  )).toBe(correctResult);
});
