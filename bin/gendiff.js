#!/usr/bin/env node

import { program } from 'commander';
import { compareDataSets } from '../src/index.js';
import { getFileData } from '../src/parse.js';

program
  .version('0.25.0')
  .description('Compares two configuraton files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .addHelpText('before', '\n')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const file1Data = getFileData(filepath1);
    const file2Data = getFileData(filepath2);
    const formattedDiff = compareDataSets(file1Data, file2Data, options.format);
    console.log(formattedDiff); // eslint-disable-line no-console
  });
program.parse();
