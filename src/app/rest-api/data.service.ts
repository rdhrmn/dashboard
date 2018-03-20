import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RequestsService} from './requests.service';
import {DataPathUtils} from './utils/dataPath.utils';
import {UrlUtils} from './utils/url.utils';

@Injectable()
export class DataService {

public  queryParams: any = [];
public  data: Array<Object> = [];
public  rowData: Array<Object> = []; // rowdata and data can be same ...
  // url = null;
  constructor(private requestsService: RequestsService,
              private dataPathUtils: DataPathUtils,
              private urlUtils: UrlUtils,
              private toastrService: ToastrService
            ) { }

  public getRequest(url, queryParams = null, requestHeaders = null, dataPath = null) {
    this.requestsService.get(url, requestHeaders,
       queryParams || this.queryParams).subscribe(data => {
            this.data = this.dataPathUtils.extractDataFromResponse(data, dataPath);
            console.log('Got data after dataPath: ', this.data);
            }, error => {
            this.toastrService.error(error, 'Error');
            }
        );
  }

  public postRequest(data = {}, url, queryParams = null, requestHeaders = null, dataPath = null) {
    console.log('Making post request with data', data);
    this.requestsService.post(url, data, requestHeaders).subscribe(postRes => {
      this.toastrService.success('Successfully created an item', 'Success');
    }, error => {
      this.toastrService.error(error, 'Error');
    });
  }

  public putRequest(data = {}, url, queryParams = null, requestHeaders = null, dataPath = null) {
    console.log('Making put request with data', data);

    let putUrl = url;
    putUrl = this.urlUtils.getParsedUrl(putUrl, this.rowData, dataPath);

    this.requestsService.put(putUrl, data, requestHeaders).subscribe(putRes => {
      this.toastrService.success('Successfully updated item', 'Success');
    }, error => {
      this.toastrService.error(error, 'Error');
    });
  }

  protected deleteRecord(row, url, queryParams = null, requestHeaders = null, dataPath = null) {
    const reallyDelete = confirm('Are you sure you want to delete this item?');
    if (!reallyDelete) {
      return;
    }
    console.log('Delete url', url);
    this.requestsService.delete(url).subscribe(res => {
      this.toastrService.success('Successfully deleted item', 'Success');
      this.getRequest(url, queryParams, requestHeaders, dataPath);
    }, (error) => {
      this.toastrService.error(error, 'Error');
    });
  }


  private getQueryParamType(name = '') {
    if (!name || !this.queryParams || !this.queryParams.length) {
      return null;
    }

    for (const param of this.queryParams) {
      if (param.name === name) {
        return param.type || null;
      }
    }

    return null;
  }

  private getQueryParamsObj() {
    const obj = {};
    if (!this.queryParams) {
      return obj;
    }
    // for (const param of this.queryParams) {
    //   obj[param.name] = new FormControl(param.value || '');
    // }
    return obj;
  }

  public buildDataFromFields(fields) {
    let data = {};
    data = this.dataPathUtils.extractModelFromFields(fields);
    return data;
  }

  public buildFieldsFromForm() {
    const fields = [];
    // for (const param in this.myForm.controls) {
    //   const paramArr = param.split('.');
    //   const dataPath = paramArr.slice(0, -1).join('.');
    //   fields.push({
    //     name: paramArr[paramArr.length - 1],
    //     value: this.myForm.controls[param].value,
    //     dataPath
    //   });
    // }
    return fields;
  }

}
