import { Component, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatatableComponent} from '../../NgxDatatable/components/datatable.component';
import {DataService} from '../rest-api/data.service';
import {RequestsService} from '../rest-api/requests.service';
import { ToastrService } from 'ngx-toastr';
import { TransformProvider } from '../../providers/transform';
import { JsonTree } from 'ng2-json-view';
import {diff} from 'just-diff';
import pluck from 'just-pluck-it';
import unique from 'just-unique';
import values from 'just-values';
import {MyGlobal} from '../myglobals';
declare var require: any;
const unique = require('just-unique');
const pluck = require('just-pluck-it');
const values = require('just-values');
// const diff = require('just-diff');
const baseURL = 'http://10.64.206.53:9080' ;
// const baseURL = 'http://localhost:8401' ;
@Component({
  selector: 'app-test-data-service',
  templateUrl: './test-data-service.component.html',
  styleUrls: ['./test-data-service.component.css',
  // '../../../node_modules/@swimlane/ngx-datatable/src/themes/material.scss',
  // '../../../node_modules/@swimlane/ngx-datatable/src/themes/dark.scss',
  // '../../../node_modules/@swimlane/ngx-datatable/src/themes/bootstrap.scss'
],
encapsulation: ViewEncapsulation.None
})
export class TestDataServiceComponent implements OnInit {

  // Initial static data
  useJsonServerForTest = false;
  services = [];
  envs = [];
  uniqueServiceAreas = [];
  uniqueEnvDivs = [];
  test = [];
  count = 0;
  diffStyle = ''; // ng-style failed sudenly all ng-* faliing ... this var is used in styleItemForDiff
  // testonly_deleteIt = 'This is a text';

  rows = [];
  loadingIndicator = true;
  reorderable = true;

  selected = [];
  checkboxselected = [];
  selectionType = 'multi';

  filteredRows = [];

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;
  isSelected = false;
  isuseCasesDiff = false;
  activatedRow: any;
  editedRow = {};
  recordHighlightParam = 10;
  cellHighlightParam = 'female';
  responseTime = 120;
  testDataType = 'test';

  clickTimer: any;
  singleModel = 1;
  responses = {firstId: 'NA', secondId: 'NA'};
  // toastrPopup: ToastrService;
  // request = {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null };
  // response = {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null };
  // workitem = {request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
  //               response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null }};
  // workitems = [{request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
  //                 response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null }}];
  // workdata = {alikeRequests: [{request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
  //                           response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null }}] ,
  //               unalikeRequests: [{request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
  //                           response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null }}]};
  workdata = {workitems:
    [{request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
      response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null, 'responseTime': null, 'dateTime': null},
      useCase: null, touchPoints: null,
      isUnlikeRequests: false, is1stSelect: false, is2ndSelect: false,
      changeDiffStyle: {'box-shadow': null, 'text-shadow':null,'background-color': null,
                        'border-color': null, 'animation': null, 'border-style': null },
      isCurrent: false, isPrevious: false}],
      theDiffData: null, theNewOne: null, theOldORBase: null, theReverseDiff: null,
      isDiffExist: {responses: {firstId: 'NA', secondId: 'NA'}, fullDiff: 'NA' , removedDiff: 'NA', replacedDiff: 'NA', addedDiff: 'NA'},
      testToStore: {'useCase': null, 'responseId': null, 'serviceId': null, 'touchPoints': null, 'envId': null,
      'requestId': null, 'testType': null, 'testdataType': null, 'id': null, 'responseTime': null, 'dateTime': null}};
  // workitems: [ request: {'id': null, 'requestMsg': null, '_servcieId': null, '_envId': null },
  //                         response: {'id': null, 'responseMsg': null, '_servcieId': null, '_envId': null }, isAlikeRequests: boolean};
  // theDiff = {removed:[], replaced:[], added:[]};

  currData = {'row': null,
              // 'queryParams': null,
              'requestParams' : [{'name': null, 'value': null}] ,
              'env' : {'envName' : 'All Envs', 'envId' : null, 'baseURL' : null},
              'service' : {'name': 'All Servcies', 'operation' : 'All Operations', 'serviceId' : null, 'apendURL': null, 'responseClass': null},
              'uniqueServiceArea': null, 'uniqueEnvDiv': null,
               touchPointsForDisplay: [{value: null}]};

  displayProp = {testsuit: false}; // not used
  isTestSuitView = 0;



obj1 = {a: 4, b: 5};
obj2 = {a: 3, b: 5};
obj3 = {a: 4, c: 5}; // 'object':{'a':'book','animal':{'cat', 'dog', 'special_animal':{'bat','platypus'}}


  tempid1 = 1000;
  tempid2 = 2000;
  // touchPoints = [{value: 'CRM'}, {value: 'Billing'}, {value: 'touchPoint3'}, {value: ''}];
  // touchPointsForDisplay = [{value: 'CRM'}, {value: 'Billing'}, {value: 'touchPoint3'}];
  requestMsgDeletelater = 'partyId=P123&channelId=C123&serviceId=S123&subCatagory=abc&accountId=A12345';
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company', sortable: false }
  // ];

  // columns: any[] = [
  //   { prop: 'name'} ,
  //   { name: 'Company' },
  //   { name: 'Gender' }
  // ];
  // @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    // public dataservice: DataService,
    private requestsService: RequestsService,
    private toastrService: ToastrService,
    public transformProvider: TransformProvider
    // private varGlobals: MyGlobal
  ) {
    this.diffStyle = `width: 100%; display: inline-block; border-radius:10px;`; // ng-style failed sudenly all ng-* faliing ... this var is used in styleItemForDiff
    this.toastrService.toastrConfig.maxOpened = 1; // only one toast at a time

    this.workdata.theOldORBase = {};
    this.workdata.theNewOne = {};
    this.workdata.theDiffData = {};
    this.workdata.theReverseDiff = {};


    // Get initial static data
    this.requestsService.get(baseURL + `/services?`).subscribe(data => { this.services = data;
        console.log('this.services :', this.services); // comment this line once things fine
        this.uniqueServiceAreas = unique(pluck(this.services, 'serviceArea'));
        /*
        console.log('uniqueServiceAreas :', this.uniqueServiceAreas)
        // const myitem = this.services.find( item => item.id === '1');
        console.log('Test in Constructor 2 :', this.services.find( service => service.id === '1').name + '-' +
                                               this.services.find( service => service.id === '1').operation );
        */
      },
    error => {console.log(error, 'Error'); }  );

    this.requestsService.get(baseURL + `/envs?`).subscribe(data => { this.envs = data;

        console.log('this.envs :', this.envs,
                                      // 'arg :', this.envs[1]
                                    ); // comment this line once things fine
        this.uniqueEnvDivs = unique(pluck(this.envs, 'envDiv'));
        console.log('uniqueEnvDivs :', this.uniqueEnvDivs);
        this.currData.env.envName = this.envs[0]['envName'];
        this.currData.env.envId =    this.envs[0]['id'];
        this.currData.env.baseURL =    this.envs[5]['baseURL'];// a hack to use this baseURL for JSON_Server
      },
    error => {console.log(error, 'Error'); }  );

    this.fetch((data) => {
      this.selected = [data[2]]; // for default selection
      // cache filtered list
      this.filteredRows = [...data];
      // --
      console.log('this.services for data :', this.services);
       console.log('data :', data);
      for (let i = 0; i < data.length; i++) {
        const id = data[i].serviceId;
        // console.log('Log to be removed, the  data[i].serviceId :', data[i].serviceId);
        data[i].serviceId = this.services.find( service => service.id === id).name + '-' +
        this.services.find( service => service.id === id).operation;
      }
      // --
      // push our inital complete list
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    // this.modifyServiceIds();
   }

  fetch(cb) {
  const req = new XMLHttpRequest();
  // req.open('GET', `assets/data/company.json`);
  req.open('GET', baseURL + `/tests?`);

  req.onload = () => {
    cb(JSON.parse(req.response));
    // const fetchedRows = JSON.parse(req.response);
    // cb(fetchedRows.splice(0, 50));//to trancate data
  };

  req.send();
  }

  onSelect({ selected }) {

    console.log('Select Event with isTestSuitView =', this.isTestSuitView,
                ',From event, selected:->', selected, 'this.selected:->', this.selected);
    if(!Number(this.isTestSuitView)) {
      this.isSelected = true;
      console.log('isSelected', this.isSelected);
      this.currData.row = selected[0]; // should work if editing (wrt property ~ name) at page is good
      // this.currData.row = this.selected[0]; // this works
      const serviceOperation = selected[0].serviceId.split('-');
      // const serviceOperation = this.selected[0].serviceId.split('-'); // this works
      // const serviceOperation = this.currData.row.serviceId.split('-'); // this works
      console.log('this.currData.row:', this.currData.row, this.currData,
                  serviceOperation[0], serviceOperation[1]
                );
      // this.currData.useCase = this.currData.row.useCase;
      // const tempTouchPointsForDisplay = [{value: null }];
      // tempTouchPointsForDisplay.pop();
      // if (this.currData.row.touchPoints.length > 0) {
      //   for (let i = 0; i < this.currData.row.touchPoints.length; i ++) {
      //     tempTouchPointsForDisplay.push({value: this.currData.row.touchPoints[i]} );
      //   }
      // } else {tempTouchPointsForDisplay.push({value: 'touchPoint1'} );}
      // this.currData.touchPointsForDisplay = tempTouchPointsForDisplay;
      // Get Servcie details to know which query parameters to be populated
      this.requestsService.get(baseURL + '/services?name=' + serviceOperation[0] + '&&operation=' + serviceOperation[1] )
              .subscribe(data => { const service = data; // we can have a look up on this.services instead of service call
      // console.log(' service detail :', service); // comment this line once things fine
                  this.currData.service.name = service[0].name;
                  this.currData.service.operation = service[0].operation;
                  this.currData.service.serviceId = service[0].id;
                  this.currData.service.apendURL = service[0].apendURL;
                  this.currData.service.responseClass = service[0].responseClass;

                // // Get query params
                // this.requestsService.get(baseURL + '/queryparams?_serviceId=' + service[0].id)
                //         .subscribe(newdata => { const queryParams = newdata;
                // // console.log(' query detail :', queryParams); // comment this line once things fine
                // const temprequestParam = [];
                // for (let _i = 0; _i < queryParams[0].items.length; _i++) { // populate all names
                //     temprequestParam.push({'name': queryParams[0].items[_i], 'value': null});
                // }


                // const splitTheRequest = this.requestMsgDeletelater.split('&');
                // for(let it = 0; it < splitTheRequest.length; it++ ){
                //   const the2ndSplit = splitTheRequest[it].split('=');
                //   console.log('it:', it, ' the2ndSplit :', the2ndSplit, 'the2ndSplit[0]:', the2ndSplit[0],
                //   'the2ndSplit[1]:', the2ndSplit[1]);
                //   for (let _j = 0; _j < temprequestParam.length; _j++) { // for matched name in the request
                //     if (temprequestParam[_j].name === the2ndSplit[0]) {
                //       temprequestParam[_j].value = the2ndSplit[1];
                //       console.log('_j:',  _j, 'temprequestParam[_j].name :', temprequestParam[_j].name ,
                //                   'temprequestParam[_j].value', temprequestParam[_j].value);
                //     }
                //   }
                // }

                // this.currData.requestParams = temprequestParam;
                // console.log(' currData.requestParams detail :', this.currData.requestParams);
                // },
                // error => {console.log(error, 'Error'); }  );
    },
    error => {console.log(error, 'Error'); }  );
    console.log('this.currData on select :', this.currData);


      // for multiple selection
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      // console.log('rcordHighlightParam :', this.recordHighlightParam);

      // initial work data
      this.requestsService.get
      (baseURL + '/' + 'requests?id=' + this.currData.row.requestId).subscribe
      (data => {
        // console.log('POST on requests, returns :', data);
       const theRequest = data[0];
        // theRequest._servcieId = serviceName; // for workdata only not for table, display requires name
        // theRequest._envId = envName; // for workdata only not for table, display requires name
        console.log('theRequest for selected message:', theRequest);
        this.requestMsgDeletelater = theRequest.requestMsg;
        // --------------------------------------------------------------------
                        // Get query params
                        // this.requestsService.get(baseURL + '/queryparams?_serviceId=' + this.currData.service.serviceId)
                        this.requestsService.get(baseURL + '/queryparams?_serviceId=' + theRequest._servcieId)
                        .subscribe(newdata => { const queryParams = newdata;
                // console.log(' query detail :', queryParams); // comment this line once things fine
                const temprequestParam = [];
                for (let _i = 0; _i < queryParams[0].items.length; _i++) { // populate all names
                    temprequestParam.push({'name': queryParams[0].items[_i], 'value': null});
                }

                const splitTheRequest = this.requestMsgDeletelater.split('&');
                for(let it = 0; it < splitTheRequest.length; it++ ){
                  const the2ndSplit = splitTheRequest[it].split('=');
                  // console.log('it:', it, ' the2ndSplit :', the2ndSplit, 'the2ndSplit[0]:', the2ndSplit[0],
                  // 'the2ndSplit[1]:', the2ndSplit[1]);
                  for (let _j = 0; _j < temprequestParam.length; _j++) { // for matched name in the request
                    if (temprequestParam[_j].name === the2ndSplit[0]) {
                      temprequestParam[_j].value = the2ndSplit[1];
                      // console.log('_j:',  _j, 'temprequestParam[_j].name :', temprequestParam[_j].name ,
                      //             'temprequestParam[_j].value', temprequestParam[_j].value, 'the2ndSplit[1]', the2ndSplit[1]);
                    }
                  }
                }

                this.currData.requestParams = temprequestParam;
                console.log(' currData.requestParams detail :', this.currData.requestParams, 'temprequestParam:', temprequestParam);
                },
                error => {console.log(error, 'Error'); }  );
        // --------------------------------------------------------------------

                this.requestsService.get
                (baseURL + '/' + 'responses?requestId=' + this.currData.row.requestId).subscribe
                (data => { const theResponse = data;
                  // theResponse._servcieId = serviceName; // for workdata, display requires name,
                  // theResponse._envId = envName; // for workdata, display requires name
                  // console.log('theResponse :', theResponse);

                // if (this.workdata.workitems[0].request.id === null) { // If is not needed to be removed
                  this.workdata.workitems = [];
                  this.workdata.workitems[0] =
                      {request: theRequest, response: theResponse[0], isUnlikeRequests: false,
                          // useCase: 'usecase' + '-' + theRequest.id, touchPoints: '',
                           useCase: this.currData.row.useCase, touchPoints: this.currData.row.touchPoints,
                          is1stSelect: false, is2ndSelect: false,
                          changeDiffStyle:
                          {'box-shadow': '', 'text-shadow': '', 'background-color': '',
                                              'border-color': null, 'animation': null, 'border-style': null },
                          isCurrent: true, isPrevious: false}; // 1stTime isCurrest is set
                // }
                  if ( theResponse.length > 1) {
                    for(let k =1; k < theResponse.length; k++){
                      this.workdata.workitems.push({
                        request: theRequest, response: theResponse[k], isUnlikeRequests: false,
                          // useCase: 'usecase' + '-' + theRequest.id, touchPoints : '',
                          useCase: this.currData.row.useCase, touchPoints: this.currData.row.touchPoints,
                          is1stSelect: false, is2ndSelect: false,
                          changeDiffStyle: {'box-shadow': '', 'text-shadow': '', 'background-color': '',
                                            'border-color': null, 'animation': null, 'border-style': null },
                          isCurrent: false, isPrevious: false});
                    }
                  }
                console.log('The initial this.workdata on select:', this.workdata);

                },
                error => {console.log(error, 'Error'); }  );
        },
        error => {console.log(error, 'Error'); }  );

    } else {
      console.log('isTestSuitView:', this.isTestSuitView, ' for whileCheckBoxSelect'); // comment this log and else block later
      this.whileCheckBoxSelect(selected);
        }
  }

  onTest() {
    //
    const newobj1 = {'myArray':[{id:123, 'customer':{id:1,name:2,ph:3},
                            'boolean':true,'null':null,'number':123,
                                'object':{'a':'b','c':'d','e':'f'},'string':'Hello World'},
                                {id:123, 'customer':{id:2,name:3,ph:5},
                                'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},
                                'string':'Hello World',
                                'otherobj':{1:1,2:2,3:3}
                              },
                                {id:345, 'customer':{id:5,name:2,ph:5},
                                'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},
                                  'string':'Hello World',
                                  'otherobj':{1:1,2:2,3:3}}
                                ]}
    const newobj2 = {'myArray':[{id:123, 'customer':{id:1,name:2,ph:4,mo:4},'boolean':false,'null':null,'number2':1245,
                                'string':'Hello Earth','otherobj':{1:1,2:2,3:3}},
                                {id:123, 'customer':{id:1,ph:5,mo:6},'boolean':true,'null':null,
                                'object':{'a':'book','animal':{'domestic':'cat','wild':'lion',
                                            'special':{'sea':'platypus','tree':'bat'}},'e':'f'},'string':'Great World'},
                                {id:678, 'customer':{id:10,name:20,ph:5},'boolean':false,'null':null,'number':123,
                                                'object':{'a':'x','c':'d','e':'y'},'string':'Hello Earth','otherobj':{5:3, 7:4, 3:4}}
                              ]
                      }
        //
        let requestMsg = '';
        let responseMsg = null;
        const serviceName = this.currData.row.serviceId;
        const envName = this.currData.env.envName;

        let theRequest = {'id': null, 'requestMsg': requestMsg, '_servcieId': null, '_envId': null };
        let theResponse = {'id': null, 'responseMsg': responseMsg, '_servcieId': null, '_envId': null, 'requestId': null,
        'responseTime': null, 'dateTime': null};
        for ( let i = 0 ; i < this.currData.requestParams.length; i++) {
          // if (this.currData.requestParams[i].value !== null || this.currData.requestParams[i].value !== '') {
            if (this.currData.requestParams[i].value) {
            requestMsg = requestMsg + this.currData.requestParams[i].name + '=' + this.currData.requestParams[i].value + '&';
          }
        }
        // this.services.find( service => service.id === '1').name
        const requestURL = (this.useJsonServerForTest === true ?
        this.currData.env.baseURL : this.envs.find(env => env.id === this.currData.row.envId).baseURL) + '/'
        + this.currData.service.apendURL + '?' + requestMsg;
        console.log('requestURL :', requestURL);
        this.requestsService.get
                  (requestURL).subscribe
                  (data => {
                    if (this.useJsonServerForTest) { responseMsg = data[0].response;}
                    else {responseMsg = data;}
                    console.log('responseMsg :', responseMsg, 'data:', data);
                    if (!data.length && this.useJsonServerForTest) {
                      this.toastrService.warning('<b><i>No data returned for requestURL:</i><br/>' + requestURL,
                                    'No data !!!',
                              {positionClass: 'toast-bottom-right', progressBar: true, extendedTimeOut: 0, enableHtml: true});
                              return;
                    } else if (responseMsg [this.currData.service.responseClass]['CallStatus'] === 1) {
                      this.toastrService.error('<b><i>Servcie provider issue for requestURL:</i></b><br/>' + requestURL,
                      'Check Soap Service',
                      {positionClass: 'toast-bottom-right', progressBar: true, extendedTimeOut: 0, enableHtml: true});
                      return;
                    }
                    console.log('responseMsg Class :', responseMsg [this.currData.service.responseClass],
                    'Call status:', responseMsg [this.currData.service.responseClass]['CallStatus']);
        // },
        // error => {console.log(error, 'Error'); }  );

        theRequest = {'id': null, 'requestMsg': requestMsg, '_servcieId': this.currData.service.serviceId,
                          '_envId': this.currData.env.envId };
        theResponse = {'id': null, 'responseMsg': responseMsg, '_servcieId': this.currData.service.serviceId,
        '_envId': this.currData.env.envId, 'requestId': null,'responseTime': null, 'dateTime': new Date() };

      this.requestsService.get
      (baseURL + '/' + 'requests?').subscribe
      (data => {

       const allRequests = data;

       for(let i = 0; i < allRequests.length ; i++){
        if (allRequests[i]['requestMsg'].toLowerCase() === theRequest.requestMsg.toLowerCase()) {
          theRequest.id = allRequests[i].id;
          theResponse.requestId = theRequest.id;
          console.log('Old theRequest found :', theRequest);
        }
       }

       if (!theRequest.id) {

            this.requestsService.post
                      (this.currData.env.baseURL + '/' + 'requests', theRequest).subscribe
                      (data => {
                        // console.log('POST on requests, returns :', data);
                        theRequest = data;
                        theResponse.requestId = theRequest.id;
                        theRequest._servcieId = serviceName; // for workdata only not for table, display requires name
                        theRequest._envId = envName; // for workdata only not for table, display requires name
                        console.log('New theRequest :', theRequest);
                      },
                      error => {console.log(error, 'Error'); }  );}

                                this.requestsService.post
                                (this.currData.env.baseURL + '/' + 'responses', theResponse).subscribe
                                (data => { theResponse = data;
                                  theResponse._servcieId = serviceName; // for workdata, display requires name,
                                  theResponse._envId = envName; // for workdata, display requires name
                                  // for demo
                                  newobj1.myArray[0].id = this.tempid1++;
                                  newobj2.myArray[0].id = this.tempid2++;
                                  if(this.useJsonServerForTest){
                                  theResponse.responseMsg = (Math.round(Math.random() * Math.pow(10, 10)) % 2 === 0)
                                                              ? newobj1 : newobj2;
                                  }
                                  // console.log('theResponse :', theResponse);

                                if (this.workdata.workitems[0].request.id === null) {
                                  this.workdata.workitems[0] =
                                      {request: theRequest, response: theResponse, isUnlikeRequests: false,
                                          // useCase: 'usecase' + '-' + theRequest.id, touchPoints: '',
                                           useCase: this.currData.row.useCase, touchPoints: this.currData.row.touchPoints,
                                          is1stSelect: false, is2ndSelect: false,
                                          changeDiffStyle:
                                          {'box-shadow': '', 'text-shadow': '', 'background-color': '',
                                                              'border-color': null, 'animation': null, 'border-style': null },
                                          isCurrent: true, isPrevious: false}; // 1stTime isCurrest is set
                                } else {
                                  for(let i = 0; i < this.workdata.workitems.length ; i++) { // every next entry
                                    // 1. unset any privious (one current, none privious)
                                    // 2. unset current, set privious (none current, one privious)
                                    // 3. new entry will be current (one current , one previous)
                          if (this.workdata.workitems[i].isPrevious === true) {this.workdata.workitems[i].isPrevious = false; } // 1
                                    if (this.workdata.workitems[i].isCurrent === true) {
                                      this.workdata.workitems[i].isCurrent = false;
                                      this.workdata.workitems[i].isPrevious = true;
                                    } // 2
                                  }

                                this.workdata.workitems.push({
                                  request: theRequest, response: theResponse, isUnlikeRequests: false,
                                    // useCase: 'usecase' + '-' + theRequest.id, touchPoints : '',
                                    useCase: this.currData.row.useCase, touchPoints: this.currData.row.touchPoints,
                                    is1stSelect: false, is2ndSelect: false,
                                    changeDiffStyle: {'box-shadow': '', 'text-shadow': '', 'background-color': '',
                                                      'border-color': null, 'animation': null, 'border-style': null },
                                    isCurrent: true, isPrevious: false}); // 3
                                }
                                console.log('this.workdata :', this.workdata);
                                this.identifyTestToStore();
                              //      let theTest = {'id': null, 'serviceId': this.currData.service.serviceId, 'requestId': theRequest.id,
                              //           'responseId': theResponse.id, 'envId': this.currData.env.envId,
                              // 'useCase': '', 'testType': 'info', 'testdataType': '', 'responseTime': null, 'dateTime': new Date() };
                              //           this.requestsService.post
                              //           (baseURL + '/' + 'tests', theTest).subscribe
                              //           (data => { theTest = data;
                              //           console.log('theTest :', theTest);
                              //           },
                              //           error => {console.log(error, 'Error'); }  );
                                this.theDiffOnTest();
                                },
                                error => {console.log(error, 'Error'); }  );
            // },
            // error => {console.log(error, 'Error'); }  );
          },
          error => {console.log(error, 'Error'); }  );
      },
      error => {
      // const theError = error;
      console.log(error, 'Error');
      // this.toastrService.error(error, 'Returned error for request : ' + JSON.stringify(this.currData.requestParams),
      this.toastrService.error('<b><i>Error:</i></b><br/>' + error + '<br/><b><i>For request :</i></b><br/>' + requestURL, 'Returned error',
      {positionClass: 'toast-bottom-right', progressBar: true, extendedTimeOut: 0, closeButton: true, enableHtml: true}); }  );

        // ;

  }

  identifyTestToStore() {
    // ;
    let theTestToPost;
    let workItemToStore; // static testcase store else use observable

    if (+this.isTestSuitView) {
      console.log('==============================================');
    } else {
      let found2ndSelectToStore = false;
      for (let i = 0; i < this.workdata.workitems.length ; i++){
        if (this.workdata.workitems[i].is2ndSelect === true) {
          workItemToStore = this.workdata.workitems[i]; // static testcase store else use observable
          found2ndSelectToStore = true;
          console.log('2ndSelect', 'iteration, i:', i, 'this.workdata.workitems[i]:', this.workdata.workitems[i]);
          this.workdata.testToStore = {'useCase': this.workdata.workitems[i].useCase,
          'responseId': this.workdata.workitems[i].response.id, 'serviceId': this.workdata.workitems[i].response._servcieId,
           'touchPoints': this.workdata.workitems[i].touchPoints, 'envId': this.workdata.workitems[i].response._envId,
          'requestId': this.workdata.workitems[i].request.id,'testType': 'info', 'testdataType': '', 'id': null,
          'responseTime': this.workdata.workitems[i].response.responseTime, 'dateTime': this.workdata.workitems[i].response.dateTime};
          }

          const tempTouchPointsForDisplay = [{value: null }];
          tempTouchPointsForDisplay.pop();
          if (this.workdata.workitems[i].touchPoints.length > 0) {
            for (let j = 0; j < this.currData.row.touchPoints.length; j ++) {
              tempTouchPointsForDisplay.push({value: this.currData.row.touchPoints[j]} );
            }
          } else {tempTouchPointsForDisplay.push({value: 'touchPoint1'} );}
          this.currData.touchPointsForDisplay = tempTouchPointsForDisplay;
        }
        if (!found2ndSelectToStore) {
          for(let i = 0; i < this.workdata.workitems.length ; i++){
            if (this.workdata.workitems[i].isCurrent === true) {
              workItemToStore = this.workdata.workitems[i]; // static testcase store else use observable
              console.log('isCurrent', 'iteration, i:', i, 'this.workdata.workitems[i]:', this.workdata.workitems[i]);
              this.workdata.testToStore = {'useCase': this.workdata.workitems[i].useCase,
              'responseId': this.workdata.workitems[i].response.id, 'serviceId': this.workdata.workitems[0].response._servcieId,
               'touchPoints': this.workdata.workitems[i].touchPoints, 'envId': this.workdata.workitems[i].response._envId,
              'requestId': this.workdata.workitems[i].request.id,'testType': 'info', 'testdataType': '', 'id': null,
              'responseTime': this.workdata.workitems[i].response.responseTime, 'dateTime': this.workdata.workitems[i].response.dateTime};
              }

              const tempTouchPointsForDisplay = [{value: null }];
              tempTouchPointsForDisplay.pop();
              if (this.workdata.workitems[i].touchPoints.length > 0) {
                for (let j = 0; j < this.currData.row.touchPoints.length; j ++) {
                  tempTouchPointsForDisplay.push({value: this.currData.row.touchPoints[j]} );
                }
              } else {tempTouchPointsForDisplay.push({value: 'touchPoint1'} );}
              this.currData.touchPointsForDisplay = tempTouchPointsForDisplay;
            }
          }
      }
      // static testcase store else use observable
      theTestToPost = {'id': null, 'serviceId': workItemToStore.response._servcieId,
      'requestId': workItemToStore.request.id,   'responseId': workItemToStore.response.id,
      'envId': workItemToStore.response._envId, 'touchPoints': workItemToStore.touchPoints,
      'useCase': workItemToStore.useCase, 'testType': 'info', 'testdataType': '',
      'responseTime': workItemToStore.response.responseTime, 'dateTime': workItemToStore.response.dateTime };

    // blockes to use observable
    // this.workdata.testToStore = theTestToPost;
  }

  postTheTest() {
    const touchPoints = [];
    for( let i = 0; i < this.currData.touchPointsForDisplay.length; i++){
      touchPoints.push(this.currData.touchPointsForDisplay[i].value);
    }
    this.workdata.testToStore.touchPoints = touchPoints;
    this.workdata.testToStore.serviceId = this.currData.service.serviceId;
    this.requestsService.post
    (this.currData.env.baseURL + '/' + 'tests', this.workdata.testToStore).subscribe
    (data => {const theTest = data;
    console.log('theTest :', theTest);

    // need to populate test id whereever required
    },
    error => {console.log(error, 'Error'); }  );

    // this.getTestDataFromEnvForService(null, null, null);
    this.fetch((data) => {
      this.selected = [data[2]]; // for default selection
      // cache filtered list
      this.filteredRows = [...data];
      // --
      // console.log('this.services for data :', this.services);
       console.log('data :', data);
      for (let i = 0; i < data.length; i++) {
        const id = data[i].serviceId;
        data[i].serviceId = this.services.find( service => service.id === id).name + '-' +
        this.services.find( service => service.id === id).operation;
      }
      // --
      // push our inital complete list
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  theDiffOnTest() {
    // ;

     // let returnedArray: Array<Object>  = [];

     let isThere1stSelect = false; // 1st Select is base, doubleclick
     let isThere2ndSelect = false; // 2ndSelect blue is new, click
    //  let isThereUnlikeRequests = false; // like , unlike requested are ttreated same based on current and privious or 1st or 2nd select

     for ( let i = 0; i < this.workdata.workitems.length ; i++) {
      if ( this.workdata.workitems[i].is1stSelect === true) {isThere1stSelect = true;} // atleast one 1stSelect (actually one)
      if ( this.workdata.workitems[i].is2ndSelect === true) {isThere2ndSelect = true;} // atleast one 1stSelect (actually one)
     }
    console.log('isThere1stSelect:',isThere1stSelect, 'isThere2ndSelect:', isThere2ndSelect );

     if (isThere1stSelect === true && isThere2ndSelect === true){ // when both 1stSelect and 2ndSelect
        for ( let i = 0; i < this.workdata.workitems.length ; i++) {
          if (this.workdata.workitems[i].is2ndSelect === true) {
                    this.workdata.theNewOne = this.workdata.workitems[i].response.responseMsg;
                    this.responses.secondId = this.workdata.workitems[i].response.id; }
          if (this.workdata.workitems[i].is1stSelect === true) {
                    this.workdata.theOldORBase = this.workdata.workitems[i].response.responseMsg;
                    this.responses.firstId = this.workdata.workitems[i].response.id;}
        }
     } else if (isThere1stSelect !== true && isThere2ndSelect !== true) { // none selected
          for ( let i = 0; i < this.workdata.workitems.length ; i++) {
            if (this.workdata.workitems[i].isCurrent === true) {
                      this.workdata.theNewOne = this.workdata.workitems[i].response.responseMsg;
                      this.responses.secondId = this.workdata.workitems[i].response.id; }
            if (this.workdata.workitems[i].isPrevious === true) {
                      this.workdata.theOldORBase = this.workdata.workitems[i].response.responseMsg;
                      this.responses.firstId = this.workdata.workitems[i].response.id;}
          }
     } else if (isThere1stSelect === true || isThere2ndSelect === true) { // any of the select
       // any of the select event is there in the begining becomes new
       // whoever is current becomes oldbase,
       // next precedence is the 'previous' one becomes old base, situation happens when the selected one is current
       // next precedence as above si difficult to implement so give pop up when one is selcting current one
          for(let i = 0; i < this.workdata.workitems.length ; i++) {

             if (this.workdata.workitems[i].is1stSelect === true || this.workdata.workitems[i].is2ndSelect === true) {
               // and condition is already taaken care at top ,
               // this if statement is to identify the workitem, there only work item would be there,
               // if two seletcs are there then this is not needed

               this.workdata.theNewOne = this.workdata.workitems[i].response.responseMsg;
               this.responses.secondId = this.workdata.workitems[i].response.id;
               if (this.workdata.workitems[i].isCurrent === true) {
                 console.log ('Need to give a pop up as one is selecting the current one, no diff is selected, workdata:', this.workdata); }
              }
            if (this.workdata.workitems[i].isCurrent === true) { // choose the current one amonmg all, there shoudl be only one current
                this.workdata.theOldORBase = this.workdata.workitems[i].response.responseMsg;
                this.responses.firstId = this.workdata.workitems[i].response.id; }
          }
     }
     console.log('this.workdata.theOldORBase:', this.workdata.theOldORBase, 'this.workdata.theNewOne:', this.workdata.theNewOne ,
                'this.responses:', this.responses);
     if (this.workdata.theOldORBase != null) {
      this.workdata.theDiffData = this.doTheDiff(this.workdata.theOldORBase, this.workdata.theNewOne );
      this.workdata.theReverseDiff = this.doTheDiff(this.workdata.theNewOne, this.workdata.theOldORBase );
    } else {console.log ('Pop up or toastr as workdata.theOldORBase is null:', this.workdata.theOldORBase,
    'when workdata is:', this.workdata);} // remove else after implemetation

    // set style for current, previous and diff
    for(let i = 0; i < this.workdata.workitems.length ; i ++){
      if (this.workdata.workitems[i].isCurrent === true) {this.workdata.workitems[i].changeDiffStyle['animation'] = 'mymove 2s infinite';}
      if (this.workdata.workitems[i].isCurrent !== true) {this.workdata.workitems[i].changeDiffStyle['animation'] = '';}
      if (this.workdata.workitems[i].isPrevious === true){
        this.workdata.workitems[i].changeDiffStyle['border-style'] = 'ridge';
        // // unset the animation for current
        // this.workdata.workitems[i].changeDiffStyle['animation'] = '';
      }
      if (this.workdata.workitems[i].isPrevious !== true){this.workdata.workitems[i].changeDiffStyle['border-style'] = '';}
    }

    this.understandDiff(null);

/* // like , unlike requested are ttreated same based on current and privious or 1st or 2nd select
     // All the below cases will go by current and privious if any like request, return to theDiffTextLike else theDiffTextUnlike
       // when there is no select
       // -------if (isThere1stSelect === false && isThere2ndSelect === false)  {;}
       // when there is either 1st select or 2nd selct
       // -------if ((isThere1stSelect === false && isThere2ndSelect === true){;}
       // -------if (isThere1stSelect === true && isThere2ndSelect === false){;}
       if ( !isThereUnlikeRequests){
        for(let i = 0; i < this.workdata.workitems.length ; i++) {
            if (this.workdata.workitems[i].isCurrent === true) {theNewOne = this.workdata.workitems[i].response.responseMsg; }
            if (this.workdata.workitems[i].isPrevious === true) {theOldORBase = this.workdata.workitems[i].response.responseMsg; }
          }
          this.workdata.theDiffTextLike = doTheDiff(theNewOne, theOldORBase);
        } else {
          // Unlike + current
          // Unlike + previous
          // Unile + no current, no provious
          for(let i = 0; i < this.workdata.workitems.length ; i++) {
            if (this.workdata.workitems[i].isCurrent === true) {theNewOne = this.workdata.workitems[i].response.responseMsg; }
            if (this.workdata.workitems[i].isPrevious === true) {theOldORBase = this.workdata.workitems[i].response.responseMsg; }
          }
          this.workdata.theDiffTextUnlike = doTheDiff(theNewOne, theOldORBase);
        } */
  }

  doTheDiff(theOldORBase, theNewOne ){

    const theDiff = {removed:[], replaced:[], added:[]};
    const rawDiff = diff(theOldORBase, theNewOne);

    console.log('raw diff :', rawDiff);
    console.log('theOldORBase :', theOldORBase);
    console.log('theNewOne :', theNewOne);

    for (let i = 0; i < rawDiff.length; i++) {

      const path = rawDiff[i]['path'];
      const value = rawDiff[i]['value'];
      let newpath = '';
      let newvalue = '';
      for (let j = 0; j < path.length; j++){
      //  console.log('Test--------------------------------', Number( path[i]) , isNaN(path[i]) );
      if (isNaN(path[j])) { newpath += path[j] + '/'; } else {newpath += '[' + path[j] + ']' + '/'; }
      }
      // Converting an array into a kind of object as tree dispaly does not support raw array
      if (Array.isArray(value)) {
        newvalue = '{';
        for (let j = 0; j < value.length; j ++) {
        newvalue += value[j] + ',';
        }
        newvalue = newvalue.slice(0, -1);
        newvalue += '}';
      } else { newvalue = value; }



      switch (rawDiff[i]['op']) {
      case 'remove': theDiff.removed.push({'path': newpath}); break;
      case 'replace': theDiff.replaced.push({'path': newpath, 'value': newvalue}); break;
      case 'add': theDiff.added.push({'path': newpath, 'value': newvalue}); break;
      }


    }

    if ( theDiff.removed.length === 0) {theDiff.removed.push({'message': 'Nothing removed'}); }
    if ( theDiff.replaced.length === 0) {theDiff.replaced.push({'message': 'Nothing replaced'}); }
    if ( theDiff.added.length === 0) {theDiff.added.push({'message': 'Nothing added'}); }
    console.log(' returned theDiff : ', theDiff );
    return theDiff;

  }

  understandDiff(theDiff) {
    let theDiffData = {removed:[], replaced:[], added:[]};

    if (!theDiff) {theDiffData = this.workdata.theDiffData; } else {theDiffData = theDiff ; }

    let removedLength = theDiffData.removed.length;
    let replacedLength = theDiffData.replaced.length;
    let addedLength = theDiffData.added.length;

    if (this.workdata.workitems.length > 1){

      if( theDiffData.removed[0]['message']){removedLength = 0; }
      if( theDiffData.replaced[0]['message']){replacedLength = 0; }
      if( theDiffData.added[0]['message']){addedLength = 0; }

      this.workdata.isDiffExist =
            { responses: this.responses, fullDiff: String(removedLength + replacedLength + addedLength)  ,
              removedDiff: String(removedLength), replacedDiff: String(replacedLength), addedDiff: String(addedLength) };
    } else {this.workdata.isDiffExist =
      { responses: this.responses, fullDiff: 'NA' , removedDiff: 'NA' , replacedDiff: 'NA',addedDiff: 'NA' };}

  }

  select1st(responseId) {

    clearTimeout(this.clickTimer);
    for (let i = 0; i < this.workdata.workitems.length ; i++ ) {

      if(this.workdata.workitems[i].response.id !== responseId) {
        this.workdata.workitems[i].is1stSelect = false;
        // exclude 1st select workitem
        if (this.workdata.workitems[i].is2ndSelect !== true) {
        this.workdata.workitems[i].changeDiffStyle['box-shadow'] = '';
        this.workdata.workitems[i].changeDiffStyle['text-shadow'] = ''; }
      } else {
        this.obj1 = this.workdata.workitems[i].response.responseMsg;
        this.workdata.workitems[i].is1stSelect = true;
        this.workdata.workitems[i].is2ndSelect = false;
        this.workdata.workitems[i].changeDiffStyle['box-shadow'] = 'inset 0px -5px 30px 50px #777';
        this.workdata.workitems[i].changeDiffStyle['text-shadow'] = '1px 1px 1px #eee';
        this.workdata.workitems[i].changeDiffStyle['background-color'] = '';
        console.log('double click select1st-workitems :', this.workdata.workitems[i]);
      }
    }
    console.log('double click select1st-this.workdata :', this.workdata);
    this.theDiffOnTest();
    this.identifyTestToStore();

  // this.obj1 = this.workdata.workitems.find(workitem => workitem.response.id === responseId
  //   && workitem.isUnlikeRequests === isUnlikeRequests).response.responseMsg;
  }

  styleItemForDiff(workitem) { // styleItemForDiff is not use das ng-style did not work
    const secondSelect = `width: 100%; display: inline-block; background-color:dodgerblue;`;
    const firstSelect = `width: 100%; display: inline-block; border-radius:10px;
                        box-shadow: inset 0px -5px 30px 50px #777; border: 5px solid #bbb;
                        text-shadow: 1px 1px 1px #eee;`;
    const noneSelect = `width: 100%; display: inline-block; border-radius:10px;`;
    this.diffStyle = noneSelect;
    if ( workitem.is2ndSelect === true) {
      this.diffStyle = secondSelect;
    } else if (workitem.is1stSelect === true) {
      this.diffStyle = firstSelect;
    } // else {return noneSelect; }
  }

  select2nd(responseId) { // styleItemForDiff() is not use das ng-style did not work
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => {
        for (let i = 0; i < this.workdata.workitems.length ; i++ ) {

          if(this.workdata.workitems[i].response.id !== responseId) {
              this.workdata.workitems[i].is2ndSelect = false;

            // exclude 1st select workitem
            if (this.workdata.workitems[i].is1stSelect !== true) { this.workdata.workitems[i].changeDiffStyle['background-color'] = '';}
            } else {
              this.obj2 = this.workdata.workitems[i].response.responseMsg;
              this.workdata.workitems[i].is2ndSelect = true;
              this.workdata.workitems[i].is1stSelect = false; // once workitem selected for 2nd should be removed from 1st if it is already 1st select
              this.workdata.workitems[i].changeDiffStyle['background-color'] = 'dodgerblue';
              this.workdata.workitems[i].changeDiffStyle['box-shadow'] = '';
              this.workdata.workitems[i].changeDiffStyle['text-shadow'] = '';
              console.log('single click select2nd-workitems :', this.workdata.workitems[i]);
              this.identifyTestToStore();
            }
        }
        console.log('single click select1st-this.workdata :', this.workdata);
        this.theDiffOnTest();
        // this.obj1 = this.workdata.workitems.find(workitem => workitem.response.id === responseId
        //   && workitem.isUnlikeRequests === isUnlikeRequests).response.responseMsg;
      }, 300);
  }

  onCellActivate(event) {
    console.log('Activate Cell Event', event);
    this.isuseCasesDiff = true;
  }

  onCellSelect({ selected }) {
    console.log('Select Cell Event', selected, this.selected);


  }

  onActivate(event) {
/*     console.log('Activate Event', event);
    // let isMouseEventActivated = false;
    // this.toastrService.toastrConfig.
    if (this.activatedRow) {
      if ( (event.type === 'mouseenter' ) && (this.activatedRow.id !== event.row.id) ) {
        this.toastrService.clear();
        this.toastrService.info('UseCaseName : ' + event.row.useCase, 'Service : ' + event.row.serviceId,
         {positionClass: 'toast-top-center', progressBar: true, extendedTimeOut: 0});
      }
    } else { // 1st time
      this.activatedRow = event.row;
      this.toastrService.show('UseCaseName : ' + event.row.useCase, 'Service : ' + event.row.serviceId,
         {positionClass: 'toast-top-center', progressBar: true, extendedTimeOut: 0});
    }
    this.activatedRow = event.row; */
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const displayedRows = this.filteredRows.filter(function(d) {
    // console.log('displayedRows :', d);
    return d.useCase.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows due to filter
    this.rows = displayedRows;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;


  }

  updateResponseTime(event) {
    const val = event.target.value;
    // update the rows due to filter
    this.responseTime = Number(val);
  }

  updateTestDataType(event) {
    const val = event.target.value.toLowerCase();
    // update the rows due to filter
    this.testDataType = val;

  }

  onTableContextMenu(contextMenuEvent) {
    console.log('contextMenuEvent :', contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }

 /*  getRowClass(row) {
    // console.log('rcordHighlightParam :', this.recordHighlightParam);
    // console.log('row.responsetime :', row.ResponseTime , 'row.responsetime % 10 :', row.ResponseTime % 10);
    return {
      // 'resptime-is-ten': (row.responseTime % 10) === 0
      'resptime-less-hundred': (row.responseTime < 100) === true
    };
  } */

  getRowClass = (row) => {
    return {
      'resptime-less-hundred': (() => {
        return Number(row.responseTime) < this.responseTime; } )()
    };
  }

/*   getCellClass({ row, column, value }): any {
    return {
      'is-test': value === 'test'
    };
  } */

  getCellClass = ({ row, column, value }) => {
    return {
      'is-test': (() => {
        return value === this.testDataType; } )()
    };
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editedRow[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  getTestDataFromEnvForService(envName = null, serviceName = null, queryParams = null) {
    let serviceIdString = 'serviceId=' + this.currData.service.serviceId;
    if (this.currData.service.serviceId === '100') { serviceIdString = ''; }
    this.requestsService.get
              (this.currData.env.baseURL + '/envs/' + this.currData.env.envId + '/tests?' + serviceIdString).subscribe
              (data => {
                for (let i = 0; i < data.length; i++) {
                  const id = data[i].serviceId;
                  data[i].serviceId = this.services.find( service => service.id === id).name + '-' +
                  this.services.find( service => service.id === id).operation;
                }
                this.rows = data;
              console.log('TestDataFromEnvForService :', this.rows);

    },
    error => {console.log(error, 'Error'); }  );
  }


  modifyServiceIds() {

    this.requestsService.get
              (this.currData.env.baseURL + '/tests').subscribe
              (data => { this.rows = data;

                      for (let i = 0; i < data.length; i++) {
                      const id = data[i].serviceId;
                      data[i].serviceId = this.services.find( service => service.id === id).name + '-' +
                      this.services.find( service => service.id === id).operation;


                      this.requestsService.put
                      (this.currData.env.baseURL + '/' + 'tests' + '/' + data[i].id, data[i]).subscribe
                      (data => { const tempTest = data;
                      console.log('theTest :', tempTest);
                      },
                      error => {console.log(error, 'Error', 'data:', data); }  );

                      }
              console.log('modifyServiceIds :', this.rows);

    },
    error => {console.log(error, 'Error', ); }  );
  }


  getServiceIdFromServcieOps(serviceName, OpsName) {
    const sameServices = [];
    for (let i = 0; i < this.services.length; i++) {
      // const service = this.services[i];
      if (this.services[i].name === serviceName) {
        sameServices.push(this.services[i]);
      }}

    for (let i = 0; i < sameServices.length; i++) {
      // const service = this.services[i];
      if (sameServices[i].operation === OpsName) {
        console.log('the id for  :' , serviceName, 'with', OpsName, 'is :', sameServices[i].Id);
        return sameServices[i].Id;
      }}
  }

  addTouchPoints(newtouchPoint) {
    // ;
    newtouchPoint = '';
    this.currData.touchPointsForDisplay.push({value: newtouchPoint});
    console.log(' this.currData.touchPointsForDisplay:',  this.currData.touchPointsForDisplay);
    // this.identifyTestToStore();
    const touchPoints = [];
    for( let i = 0; i < this.currData.touchPointsForDisplay.length; i++){
      touchPoints.push(this.currData.touchPointsForDisplay[i].value);
    }
    this.workdata.testToStore.touchPoints = touchPoints;
  }
  updateTouchPoints() {
    const touchPoints = [];
    for( let i = 0; i < this.currData.touchPointsForDisplay.length; i++){
      touchPoints.push(this.currData.touchPointsForDisplay[i].value);
    }
    this.workdata.testToStore.touchPoints = touchPoints;
  }


  myDiff() {
    // ;
        // return diff(this.newobj1, this.newobj2);


    const theDiff = {returnDiffs:[]};
    // theDiff.returnDiffs = diff(this.newobj1, this.newobj2);

    return theDiff;
  }
  testMethod(){

    console.log('testMethod:', 'I am in testMethod');
    this.singleModel = this.singleModel + 1;
    console.log('singleModel:', this.singleModel, 'the variable name to be removed');
  }

  changeUIView() {
    if ( this.selectionType === 'multi') {
          this.selectionType = 'checkbox';
    } else {this.selectionType = 'multi'; }

  }

  ngOnInit() {
  }

  whileCheckBoxSelect({ selected }) {

        this.checkboxselected.splice(0, this.checkboxselected.length);

    this.checkboxselected.push(...selected);
    console.log('whileCheckBoxSelect:', 'selected', selected, 'this.checkboxselected' , this.checkboxselected);

  }



  onCheckBoxActivate(event) {

    console.log('CheckBoxActivate Event', event);
    const checkboxCellIndex = 1;
    if (event.type === 'checkbox') {
      // Stop event propagation and let onSelect() work
      console.log('onCheckBoxActivate: Checkbox Selected', event);
      event.event.stopPropagation();
    } else if (event.type === 'click' && event.cellIndex !== checkboxCellIndex) {
      // Do somethings when you click on row cell other than checkbox
      console.log('onCheckBoxActivate: Row Clicked', event.row); /// <--- object is in the event row variable
    }

  }



  add() {

    this.checkboxselected.push(this.rows[1], this.rows[3]);

  }



  update() {

    this.checkboxselected = [this.rows[1], this.rows[3]];

  }

  setColourOfDiffStyle() {

    if (Number(this.workdata.isDiffExist.removedDiff) > 0) {
        return {background: 'red'}; } else
    if (Number(this.workdata.isDiffExist.replacedDiff) > 0) {
        return {background: 'orange'}; } else
    if (Number(this.workdata.isDiffExist.addedDiff) > 0) {
        return {background: 'blue'}; } else
    if (Number(this.workdata.isDiffExist.fullDiff) === 0){
        return {background: 'green'};
    }

/*     this.currentStyles = {
      'font-style':  this.workdata.isDiffExist.addedDiff  ? 'italic' : 'normal',
      'color':       this.workdata.isDiffExist.removedDiff ? 'red'   : 'black',
      'font-size':   this.workdata.isDiffExist.replacedDiff ? '24px'   : '12px'
    };
    return this.currentStyles; */
  }



  remove() {

    this.checkboxselected = [];

  }

  checkSelectable(row, column, value) {

    console.log('Checking if selectable', row);
    // if (this.isTestSuitView) {
    //   console.log('in Test suit view: this.isTestSuitView', this.isTestSuitView);
    // return event.id !== event.id; } else {
    //   console.log('Case view: this.isTestSuitView', this.isTestSuitView);
    //   return true; }

    // if (isCheckBoxSelected) {
    //   console.log('in Test suit view: isCheckBoxSelected', isCheckBoxSelected);
    // return row.id !== row.id; } else {
    //   console.log('Case view: isCheckBoxSelected', isCheckBoxSelected);
    //   return true; }

  }

}
