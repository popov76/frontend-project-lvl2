import { parseData } from './parse.js';
import compareObjects from './compare.js';
import getFormattedDiff from './formatters/index.js';

export const compareDataSets = (dataSet1, dataSet2, outputFormat = 'stylish') => {
  const obj1 = parseData(dataSet1.data, { dataType: dataSet1.dataType });
  const obj2 = parseData(dataSet2.data, { dataType: dataSet2.dataType });
  const diff = compareObjects(obj1, obj2);
  return getFormattedDiff(diff, outputFormat);
};

export default compareDataSets;
