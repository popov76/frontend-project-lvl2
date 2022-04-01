import { fileURLToPath } from 'url';
import path from 'path';

import { readFileSync } from 'fs';
import compareFiles from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const correctAnswers = {};

beforeAll(() => {
  correctAnswers.correctResult1 = readFileSync(getFixturePath('result1.txt'), 'utf-8');
  correctAnswers.correctResult2 = readFileSync(getFixturePath('result2.txt'), 'utf-8');
  correctAnswers.correctResult3 = readFileSync(getFixturePath('result3.txt'), 'utf-8');
  correctAnswers.correctResult4 = readFileSync(getFixturePath('result4.txt'), 'utf-8');
});

test('compare json', () => {
  expect(compareFiles(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(correctAnswers.correctResult1);
});

test('compare yaml', () => {
  expect(compareFiles(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yaml'),
  )).toBe(correctAnswers.correctResult1);
});

test('compare json recurse', () => {
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
  )).toBe(correctAnswers.correctResult2);
});

test('compare yaml recurse', () => {
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
  )).toBe(correctAnswers.correctResult2);
});

test('compare json recurse plain format', () => {
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
    'plain',
  )).toBe(correctAnswers.correctResult3);
});

test('compare yaml recurse plain format', () => {
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
    'plain',
  )).toBe(correctAnswers.correctResult3);
});

test('compare json recurse json format', () => {
  expect(compareFiles(
    getFixturePath('file3.json'),
    getFixturePath('file4.json'),
    'json',
  )).toBe(correctAnswers.correctResult4);
});

test('compare yaml recurse json format', () => {
  expect(compareFiles(
    getFixturePath('file3.yaml'),
    getFixturePath('file4.yaml'),
    'json',
  )).toBe(correctAnswers.correctResult4);
});
