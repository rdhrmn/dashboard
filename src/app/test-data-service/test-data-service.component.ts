import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatatableComponent} from '../../NgxDatatable/components/datatable.component';
import {DataService} from '../rest-api/data.service';
import {RequestsService} from '../rest-api/requests.service';
import { ToastrService } from 'ngx-toastr';
import {diff} from 'just-diff';
import pluck from 'just-pluck-it';
import unique from 'just-unique';
import values from 'just-values';
// import * as x2js from 'xml2json';
import {MyGlobal} from '../myglobals';
declare var require: any;
const unique = require('just-unique');
const pluck = require('just-pluck-it');
const values = require('just-values');
const baseURL = 'http://localhost:3004' ;

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
  services = [];
  envs: Array<Object> = [];
  uniqueServiceAreas = [];
  uniqueEnvDivs = [];
  test = [];


  rows = [];
  loadingIndicator = true;
  reorderable = true;

  selected = [];

  filteredRows = [];

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;
  isSelected = false;
  activatedRow: any;

  editedRow = {};
  currData = {'row': null, 'env' : {'envName' : 'All Envs', 'envId' : null},
              'service' : {'name': 'All Servcies', 'operation' : 'All Operations', 'serviceId' : null},
              'uniqueServiceArea': null, 'uniqueEnvDiv': null};

  recordHighlightParam = 10;
  cellHighlightParam = 'female';

obj1 = {a: 4, b: 5};
obj2 = {a: 3, b: 5};
obj3 = {a: 4, c: 5};
newobj1 = {'myArray':[{'array':[1,2,3],'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},'string':'Hello World'},{'array':[1,2,3],'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},'string':'Hello World','newcomplexArray':[1,2,3]},{'array':[1,2,3],'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},'string':'Hello World','newcomplexArray':[1,2,3]}]}
newobj2 = {'myArray':[{'array':[1,2,3],'boolean':false,'null':null,'number2':123,'string':'Hello Mr','newcomplexArray':[1,2,3]},{'array':[1,2,3],'boolean':true,'null':null,'number':123,'object':{'a':'b','c':'d','e':'f'},'string':'Great World'},{'array':[10,2,3],'boolean':true,'null':null,'number':123,'object':{'a':'x','c':'d','e':'y'},'string':'Hello World','newcomplexArray':[5,7,3]}]}
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
    // private varGlobals: MyGlobal
  ) {
    console.log('My diff :', diff(this.obj2, this.obj3));
    console.log('New diff :', diff(this.newobj1, this.newobj2));

    this.toastrService.toastrConfig.maxOpened = 1; // only one toast at a time

    // Get initial static data
    this.requestsService.get(`http://localhost:3004/services?`).subscribe(data => { this.services = data;
        console.log('this.services :', this.services); // comment this line once things fine
        this.uniqueServiceAreas = unique(pluck(this.services, 'serviceArea'));
        console.log('uniqueServiceAreas :', this.uniqueServiceAreas);
        const myitem = this.services.find( item => item.id === '1');
        console.log('Test in Constructor 2 :', this.services.find( service => service.id === '1').name + '-' +
                                               this.services.find( service => service.id === '1').operation );
      },
    error => {console.log(error, 'Error'); }  );

    this.requestsService.get(`http://localhost:3004/envs?`).subscribe(data => { this.envs = data;

        console.log('this.envs :', this.envs,
                                      // 'arg :', this.envs[1]
                                    ); // comment this line once things fine
        this.uniqueEnvDivs = unique(pluck(this.envs, 'envDiv'));
        console.log('uniqueEnvDivs :', this.uniqueEnvDivs);

      },
    error => {console.log(error, 'Error'); }  );

    // New Table
    console.log('Test in Constructor :', this.services.find(item => item.id === 1));
    // console.log('Test in Constructor json2xml_str:', x2js.json2xml_str(this.newobj2));
    this.fetch((data) => {
      this.selected = [data[2]]; // for default selection
      // cache filtered list
      this.filteredRows = [...data];
      // --
      // console.log('this.services for data :', this.services);
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

  fetch(cb) {
  const req = new XMLHttpRequest();
  // req.open('GET', `assets/data/company.json`);
  req.open('GET', `http://localhost:3004/tests?`);

  req.onload = () => {
    cb(JSON.parse(req.response));
    // const fetchedRows = JSON.parse(req.response);
    // cb(fetchedRows.splice(0, 50));//to trancate data
  };

  req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.isSelected = true;
    console.log('isSelected', this.isSelected);
    // for multiple selection
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    // console.log('rcordHighlightParam :', this.recordHighlightParam);
  }

  onCellActivate(event) {
    console.log('Activate Cell Event', event);
  }

  onCellSelect({ selected }) {
    console.log('Select Cell Event', selected, this.selected);

  }

  onActivate(event) {
    console.log('Activate Event', event);
    // let isMouseEventActivated = false;
    // this.toastrService.toastrConfig.
    if (this.activatedRow) {
      if ( (event.type === 'mouseenter' ) && (this.activatedRow.id !== event.row.id) ) {
        this.toastrService.clear();
        this.toastrService.info('UseCaseName : ' + event.row.useCase, 'Service : ' + event.row.serviceId,
         {positionClass: 'toast-top-center', progressBar: true, extendedTimeOut: 1000});
      }
    } else { // 1st time
      this.activatedRow = event.row;
      this.toastrService.show('UseCaseName : ' + event.row.useCase, 'Service : ' + event.row.serviceId,
         {positionClass: 'toast-top-center', progressBar: true, extendedTimeOut: 1000});
    }
    this.activatedRow = event.row;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const displayedRows = this.filteredRows.filter(function(d) {
      //  console.log('displayed row', d);
      //  console.log('displayed row', d.name, d.gender);
      //  return d.age.toString().indexOf(val) !== -1 || !val;
      return d.useCase.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows due to filter
    this.rows = displayedRows;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;


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

  getRowClass(row) {
    // console.log('rcordHighlightParam :', this.recordHighlightParam);
    // console.log('row.responsetime :', row.ResponseTime , 'row.responsetime % 10 :', row.ResponseTime % 10);
    return {
      // 'resptime-is-ten': (row.responseTime % 10) === 0
      'resptime-less-hundred': (row.responseTime < 100) === true
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-test': value === 'test'
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

    this.requestsService.get
              (baseURL + '/envs/' + this.currData.env.envId + '/tests?serviceId=' + this.currData.service.serviceId).subscribe
              (data => { this.rows = data;
              console.log('TestDataFromEnvForService :', this.rows);

    },
    error => {console.log(error, 'Error'); }  );
  }

  getServcieOpsFromId (Id){


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

  ngOnInit() {
  }

}
