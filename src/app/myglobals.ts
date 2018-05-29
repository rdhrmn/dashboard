import { Injectable } from '@angular/core';
@Injectable()
export class MyGlobal {

  // public  requestedData: Array<Object> = [];
  public  requestedData: string;
  public  reqBody: any;


  public currentServiceName = 'CCI';
  public endPointURL = 'https://10.64.206.53:8550//retrieveCustomerConfiguration?';

  public isMessageContent = false;

  isCreateMessage = false;
  isShowTest = false;
  isShowDiff = false;
  isTestSuitView = '';

 }
