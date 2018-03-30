import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RequestsService} from './requests.service';
import {DataPathUtils} from './utils/dataPath.utils';
import {UrlUtils} from './utils/url.utils';
import { MyGlobal } from '../myglobals';
import clone from 'just-clone';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {

public  queryParams: any = [];
public  data: Array<Object> = [];
public  requestedData: any;
public  response: any;
public  rowData: Array<Object> = []; // rowdata and data can be same ...
  // url = null;
  // private dataPathUtils: DataPathUtils; //  removed injectable

  constructor(
              private requestsService: RequestsService,
              private dataPathUtils: DataPathUtils,
              private urlUtils: UrlUtils,
              private toastrService: ToastrService,
              public  varGlobals: MyGlobal,
              public http: Http
            ) { }
  public getData() {console.log('Test message: ', this.response); return this.response ; }
  // public getData(): any[] {console.log('Test message: ', this.response); return Observable.of(this.response) ; }

  public getRequest(url, response, queryParams = null, requestHeaders = null, dataPath = null) {

    // this.http.get(url)
    //   .map((res: Response) => res.json()).subscribe
    //   (dat => { this.response = JSON.stringify(dat); this.varGlobals.reqBody = this.response; return this.response; },

    this.http.get(url)
      .map((res: Response) => res.json()).subscribe
      (dat => {  this.response = JSON.stringify(dat); this.varGlobals.reqBody = this.response;
        response = this.response; return this.response; },
       error => {this.toastrService.error(error, 'Error'); } );
       console.log('this.response', this.response);
       console.log('from getRequest- response:', response);


  /*   this.requestsService.get(url, requestHeaders,
       queryParams || this.queryParams).subscribe(data => {
                  // this.data = this.dataPathUtils.extractDataFromResponse(data, dataPath);
                  // this.requestedData = JSON.parse(this.dataPathUtils.extractDataFromResponse(data, dataPath));
                  // this.data = JSON.parse(JSON.stringify(this.dataPathUtils.extractDataFromResponse(data, dataPath)));
                  // this.requestedData(JSON.parse(JSON.stringify(this.dataPathUtils.extractDataFromResponse(data, dataPath))));
            this.requestedData = JSON.stringify(data);
                //
                // this.data = clone(this.requestedData);
                // this.data = this.requestedData.map(x => x);
                // var dup_array = JSON.parse(JSON.stringify(original_array))
                // this.varGlobals.requestedData = this.data;
            console.log('Got data after dataPath: ', 'this.data :', this.data,
                                                      'this.requestedData :', this.requestedData,
                                                      'this.response :', this.response);
            return this.response;
            }, error => {
            this.toastrService.error(error, 'Error');
            }

        ); */
        console.log('Test again : ', 'this.data :', this.data, 'this.requestedData :', this.requestedData,
                                                                  'this.response :', this.response);
        // return this.data;
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
