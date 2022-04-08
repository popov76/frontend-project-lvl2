#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .version('0.5.0')
  .description('Compares two configuraton files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .addHelpText('before', '\n')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const formattedDiff = genDiff(filepath1, filepath2, options.format);
    console.log(formattedDiff); // eslint-disable-line no-console
  });
program.parse();
