import parseData from './parse.js';
import compareObjects from './compare.js';
import getFormattedDiff from './formatters/index.js';

// dataSet = { data, dataType }
//  data: raw data
//  dataType: json or yaml
const compareDataSets = (dataSet1, dataSet2, outputFormat = 'stylish') => {
  const obj1 = parseData(dataSet1);
  const obj2 = parseData(dataSet2);
  const diff = compareObjects(obj1, obj2);
  return getFormattedDiff(diff, outputFormat);
};

export default compareDataSets;
