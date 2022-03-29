#!/usr/bin/env node

import { program } from 'commander';
import compareFiles from '../src/compare.js';

program
  .version('0.0.1')
  .description('Compares two configuraton files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .addHelpText('before', '\n')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const diff = compareFiles(filepath1, filepath2, options.format);
    console.log(diff); // eslint-disable-line no-console
  });
program.parse();
