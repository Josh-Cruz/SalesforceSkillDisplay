/* @author Josh Cruz
* @date 07/14/21
* @description implementing datatable and search for books in the organization
 depending on what object will set the preferred book
*/
import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import searchBooks from "@salesforce/apex/FavoriteBook.searchBooks";
import addPreferredBook from "@salesforce/apex/FavoriteBook.addPreferredBook";
import img from "@salesforce/resourceUrl/bookImg";


//columns for LWC
const bookColumns = [
  { label: 'Title', fieldName: 'Name' },
  { label: 'Author', fieldName: 'Author__c' },
  { label: 'Category', fieldName: 'Category__c' },
  { label: 'In Stock', fieldName: 'Inventory__c', type:'number' }
];

const DELAY = 300;
export default class BookSearch extends LightningElement {
  @api recordId;
  @track bookList;
  bookColumns = bookColumns;
  searchKey = '';
  bookSelected = false;
  bookId ='';
  bookImg = img;

  //gets initial books and search results
  @wire(searchBooks, {searchKey: '$searchKey' })
 wiredSearchBooks({error, data}) {
      if (error) {
        console.error(error);
      } else if (data) {
        console.log(data);
        this.bookList = data;
      }
  }

  handleKeyChange(event) {
    // Debouncing this method: Do not update the reactive property as long as this function is
    // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }
  
  //sets bookID on row selection and shows more info on selected book
  getSelectedRow(event) {
    let el = this.template.querySelector('lightning-datatable');
    let selected = el.getSelectedRows();
    this.bookId = selected[0].Id;
    this.bookSelected = true;
}
  //handles messaging to user
  showToastEvent(title, variant, message){
    const event = new ShowToastEvent({
      "title": title,
      "variant": variant,
      "message": message
  });
  this.dispatchEvent(event);
  }

//calls Apex method to attach preferred book to current record, then displays result
  setBookPreference() {
    addPreferredBook({ "recordId": this.recordId, "bookId": this.bookId })
    .then(result => {
      this.showToastEvent("Record updated!", "success", result);
    }).catch(error => {
      this.showToastEvent("Error", "error", error);
      console.error(error);
    });
  }


}