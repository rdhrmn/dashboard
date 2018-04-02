import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {DatatableComponent} from '../../NgxDatatable/components/datatable.component';
import {DataService} from '../rest-api/data.service';
import {RequestsService} from '../rest-api/requests.service';
import {diff} from 'just-diff';
import pluck from 'just-pluck-it';
import {MyGlobal} from '../myglobals';

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

  // New Table
  newdata: any;

  rows = [];
  loadingIndicator = true;
  reorderable = true;

  selected = [];

  filteredRows = [];

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;

  editedRow = {};

  recordHighlightParam = 10;
  cellHighlightParam = 'female';

obj1 = {a: 4, b: 5};
obj2 = {a: 3, b: 5};
obj3 = {a: 4, c: 5};
test: any;
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
    public dataservice: DataService,
    private requestsService: RequestsService,
    private varGlobals: MyGlobal
  ) {
    console.log('My diff :', diff(this.obj2, this.obj3));
    console.log('New diff :', diff(this.newobj1, this.newobj2));
    this.fetch((data) => {
      this.selected = [data[2]]; // for default selection
      // cache filtered list
      this.filteredRows = [...data];
      // push our inital complete list
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
    // New Table
    // const req = new XMLHttpRequest();
    // req.open('GET', `http://localhost:3004/services?`);
    // req.onload = () => { this.newdata(JSON.parse(req.response)); };
    // this.newdata = this.dataservice.getRequest(`http://localhost:3004/services?`);
    this.dataservice.getRequest(`http://localhost:3004/services?`, this.test);
    console.log('from Test- response:', this.test);
    // this.newdata = this.requestsService.get(`http://localhost:3004/services?`).subscribe;
    // this.newdata = this.dataservice.data;
    // this.dataservice.response.
    //     subscribe(dat => { this.test = JSON.stringify(dat); console.log('Test var value :', this.test); },
    //     error => {console.log(error, 'Error'); }  )
    console.log('NewData :', this.dataservice.response);
    console.log('NewData2 :', this.dataservice.getData());
    console.log('NewData3 :', this.dataservice.varGlobals.reqBody);
    // New Table
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
  ngOnInit() {
  }

}
