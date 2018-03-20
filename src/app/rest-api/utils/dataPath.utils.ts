import {Injectable} from '@angular/core';

@Injectable()
export class DataPathUtils {

  constructor() {
  }

  public extractDataFromResponse(data, dataPath, attr = null) {
    // !data may not be needed
    if (!data || !dataPath) {
      if (attr) {
        return data[attr];
      }
      return data;
    }

    let extractedData = data;
    const digProps = dataPath.split('.');

    for (const prop of digProps) {
      if (typeof extractedData[prop] !== 'undefined') {
        extractedData = extractedData[prop];
      } else {
        return null;
      }
    }

    if (attr) {
      return extractedData[attr];
    }
    return extractedData;
  }

  public getFieldValueInPath(field, dataPath, data) {
    if (!dataPath) {
      return data[field];
    }

    const dataObj = this.extractDataFromResponse(data, dataPath);
    return dataObj && dataObj[field] ? dataObj[field] : null;
  }

  public extractModelFromFields(fields) {
    let dataModel = {};

    if (!fields || !fields.length) {
      return dataModel;
    }

    for (const field of fields) {
      if (!field.hasOwnProperty('dataPath') || !field.dataPath) {
        dataModel[field.name] = field.value;
        continue;
      }

      const dataPathProps = field.dataPath.split('.');
      dataModel = this.buildJsonRecursively(dataModel, dataPathProps, field);
    }

    return dataModel;
  }

  public buildJsonRecursively(currentObj, propertiesArr, field) {
    if (!propertiesArr || !propertiesArr.length) {
      currentObj[field.name] = field.value;
      return currentObj;
    }

    const prop = propertiesArr[0];
    if (!currentObj.hasOwnProperty(prop) || typeof currentObj[prop] !== 'object') {
      currentObj[prop] = {};
    }

    this.buildJsonRecursively(currentObj[prop], propertiesArr.slice(1, propertiesArr.length), field);

    return currentObj;
  }

}
