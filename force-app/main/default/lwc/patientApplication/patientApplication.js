/* @author Josh Cruz
* @date 07/21/21
* @description Display logic for Patient Application LWC
*/

import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import createApplication from "@salesforce/apex/PatientApplicationController.updatePatientApplication";

export default class PatientApplication extends LightningElement {
  applicantId;

  // on a success record creation we grab the recordID 
  //and assign it to a program specialist to match to a program
  handleSuccess(event) {
    const payload = event.detail;
    console.log(JSON.stringify(payload));
    this.applicantId = event.detail.id;
    //fires off to apex controller
    createApplication({ applicantId: this.applicantId })
      .then((data) => {
        console.log(JSON.stringify(data));
        this.showToastEvent("Record updated!", "success", data);
      }).catch((error) => {
        console.log(JSON.stringify(error));
        this.showToastEvent("Error", "error", error);
      });
  }

  //handles messaging to user
  showToastEvent(title, variant, message) {
    const event = new ShowToastEvent({
      "title": title,
      "variant": variant,
      "message": message
    });
    this.dispatchEvent(event);
  }

  // allows for us to manipulate data before database
  handleSubmit(event) {
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    // console.log("🚀 ~ file: PatientApplication.js ~ line 21 ~ PatientApplication ~ handleSubmit ~ fields", fields)
    this.template.querySelector('lightning-record-edit-form').submit(fields);
  }

  //fires off an error for the user to see
  handleError(event) {
    const payload = event.detail;
    console.log(JSON.stringify(payload));
    this.showToastEvent("Error", "error", error);
  }
}