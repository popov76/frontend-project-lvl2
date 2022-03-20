// import { test, except } from 'jest';
import compareFiles from '../src/compare.js';

const correctResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('compare test', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.json',
  )).toBe(correctResult);
});
