/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, wire, api } from "lwc";

import { getRecord , getFieldValue} from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Quote__c.Name';
import START_FIELD from '@salesforce/schema/Quote__c.Start_Date__c';
import END_FIELD from '@salesforce/schema/Quote__c.EndDate__c';
import TOTAL_FIELD from '@salesforce/schema/Quote__c.TotalQuotedAmount__c';

import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class EditQuote extends LightningElement {
  @api recordId; readOnly = true; 

  @wire(getRecord, {recordId: "$recordId", fields: [NAME_FIELD, START_FIELD, END_FIELD,TOTAL_FIELD]})
  record;
  startField = START_FIELD;
  endField = END_FIELD;

  constructor(){
    super();
    this.template.addEventListener('adjustquote', this.editDetails);
  }

  get name(){
    return getFieldValue(this.record.data , NAME_FIELD);
  }

  @api
  editDetails(){
    this.readOnly = false;
  }

  handleSuccess(event) {
    this.readOnly = true;
    const toastEvent = new ShowToastEvent({
        title: 'Succes',
        message: 'Quote Updated successfully!',
        variant: 'success'
    });
    this.dispatchEvent(toastEvent);
    console.log('handleSuccess', event);
  }

  handleSubmit(event) {
    console.log('handleSubmit', event);
  }

  cancel() {
    const inputFields = this.template.querySelectorAll(
        'lightning-input-field'
    );
    if (inputFields) {
        inputFields.forEach(field => {
            field.reset();
        });
    }
    this.readOnly = true;
  }
}
