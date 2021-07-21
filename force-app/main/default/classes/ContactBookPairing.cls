/* @author Josh Cruz
* @date 07/14/21
* @test FavoriteBookTest (TODO)
* @description handles Contacts and BookPAiring
*/

public with sharing class ContactBookPairing  implements IBookPairer{
  //Finds Contact and sets their favorite book, returns success Message
    public string addBookToRecord(Id conId, Id bookId){
       Contact con = [Select Id, Name, Favorite_Book__c FROM contact WHERE Id=: conId LIMIT 1];
         try {
            con.Favorite_Book__c = bookId;
            update con;
            return 'updated ' + con.Name +'s Favorite book'; // returns message to display in BookSearch LWC
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}