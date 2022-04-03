import yaml from 'js-yaml';

const parseData = (dataSet) => {
  switch (dataSet.dataType) {
    case 'json':
      return JSON.parse(dataSet.data);
    case 'yaml':
      return yaml.load(dataSet.data);
    default:
      throw new Error('Unknown data type:');
  }
};

export default parseData;
