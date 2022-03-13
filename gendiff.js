import { program } from 'commander';
import compareFiles from './src/compare.js'

program
      .version( '0.0.1')
      .description('Compares two configuraton files and shows a difference')
      .argument('<filepath1>')
      .argument('<filepath2>')
      .helpOption('-h, --help', 'output usage information')
      .option('-f, --format <type>', 'output format')
      .addHelpText('before','\n')
      .action((filepath1, filepath2) => {
            compareFiles(filepath1, filepath2);
      });
      program.parse();
      

