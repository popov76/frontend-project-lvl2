import yaml from 'js-yaml';

const parseData = ({ data, dataType }) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown data type: ${dataType}`);
  }
};

export default parseData;
