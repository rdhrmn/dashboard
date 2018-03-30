import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {DatatableComponent} from '../../NgxDatatable/components/datatable.component';


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

  rows = [];
  loadingIndicator = true;
  reorderable = true;

  selected = [];

  filteredRows = [];

  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;

  editedRow = {};

  // columns = [];
  columns = {
    column: []
};
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
  constructor() {
    this.fetch((data) => {
      this.selected = [data[2]]; // for default selection
      // cache filtered list
      this.filteredRows = [...data];
      // push our inital complete list
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
      // rough work  ------ starts
      if (this.uniqueKeys.length === 0) {
          this.myOwnJSONDataWork();
      // this.uniqueKeys.forEach((columnName, index) => this.columns['name'] = columnName);
      // https://stackoverflow.com/questions/2250953/how-do-i-create-javascript-array-json-format-dynamically
      this.uniqueKeys.map((columnName) => this.columns.column.push({'name': columnName}));
      }
      // this.columns = this.uniqueKeys;
      console.log('columns :', this.columns);
      // rough work  ------ ends
    });
   }
  // rough work  ------ starts
  uniqueKeys = [];
  allValues = [];
  myOwnJSONDataWork() {
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (const key in row) {
        if ( row.hasOwnProperty(key)) {
          if ( !(key === this.uniqueKeys.find(uniqueKey => uniqueKey === key))) {
            this.uniqueKeys.push(key);
            this.allValues.push(row[key]);
            console.log('key - ', i , ':',  key);
            // console.log('value - ', i , ':',  row[key]);
          }

      }
      }
      /*
    for (const field of Object.keys(this.formErrors)) {
    ...}
    OR
    for (var field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
        ...
      }
    }
    */
    // console.log('key - ', i , ':',  row);
    }
    // console.log('rows :',  this.rows);
    console.log('uniqueKeys :', this.uniqueKeys);
  }
  //
  // rough work  ------ ends

  fetch(cb) {
  const req = new XMLHttpRequest();
  req.open('GET', `assets/data/company.json`);
  // req.open('GET', `assets/data/100k.json`);

  req.onload = () => {
    cb(JSON.parse(req.response));
    // below two lines  to be commeneted for all records
    const fetchedRows = JSON.parse(req.response);
    cb(fetchedRows.splice(0, 50));
  };



  req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    // for multiple selection
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
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
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows due to filter
    this.rows = displayedRows;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;


  }

  onTableContextMenu(contextMenuEvent) {
    console.log(contextMenuEvent);

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
    return {
      'age-is-ten': (row.age % 10) === 0
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
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
