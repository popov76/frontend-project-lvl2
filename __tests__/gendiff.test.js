import { fileURLToPath } from 'url';
import path from 'path';

import { readFileSync } from 'fs';
import compareFiles from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('compare json', () => {
  const correctResult1 = readFileSync(getFixturePath('result1.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(correctResult1);
});

test('compare yaml', () => {
  const correctResult1 = readFileSync(getFixturePath('result1.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yaml'),
  )).toBe(correctResult1);
});

test('compare json recurse', () => {
  const correctResult2 = readFileSync(getFixturePath('result2.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
  )).toBe(correctResult2);
});

test('compare yaml recurse', () => {
  const correctResult2 = readFileSync(getFixturePath('result2.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
  )).toBe(correctResult2);
});

test('compare json recurse plain format', () => {
  const correctResult3 = readFileSync(getFixturePath('result3.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
    'plain',
  )).toBe(correctResult3);
});

test('compare yaml recurse plain format', () => {
  const correctResult3 = readFileSync(getFixturePath('result3.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
    'plain',
  )).toBe(correctResult3);
});

test('compare json recurse json format', () => {
  const correctResult4 = readFileSync(getFixturePath('result4.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
    'json',
  )).toBe(correctResult4);
});

test('compare yaml recurse json format', () => {
  const correctResult4 = readFileSync(getFixturePath('result4.txt'), 'utf-8');
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
    'json',
  )).toBe(correctResult4);
});
