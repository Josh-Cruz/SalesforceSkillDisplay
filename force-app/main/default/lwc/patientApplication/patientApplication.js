import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import createApplication from "@salesforce/apex/PatientApplicationController.updatePatientApplication";

export default class PatientApplication extends LightningElement {
  applicantId;

  handleSuccess(event) {
    const payload = event.detail;
    console.log(JSON.stringify(payload));
    this.applicantId = event.detail.id;
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

  handleSubmit(event) {
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    // console.log("🚀 ~ file: PatientApplication.js ~ line 21 ~ PatientApplication ~ handleSubmit ~ fields", fields)

    this.template.querySelector('lightning-record-edit-form').submit(fields);
  }
  handleError(event) {
    const payload = event.detail;
    console.log(JSON.stringify(payload));
    this.showToastEvent("Error", "error", error);
  }
}