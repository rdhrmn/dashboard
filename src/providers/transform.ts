import { Injectable } from '@angular/core';
// import xml2js from 'xml2js';
declare var require: any;
const xml2js = require('xml2js');

@Injectable()
export class TransformProvider {

  public convertToJson(data: string): Object {

    let res;

    // setting the explicitArray option prevents a array structure
    // where every node/element is always wrapped inside an array
    // set it to true, and see for yourself what changes
    xml2js.parseString(data, { explicitArray: false }, (error, result) => {

      if (error) {
        throw new Error(error);
      } else {
        res = result;
      }

    });

    return res;

  }


  public convertToXml(rootObject:Object) {

    return new xml2js.Builder().buildObject(rootObject);

  }

}
