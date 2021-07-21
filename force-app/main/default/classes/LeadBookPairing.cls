/* @author Josh Cruz
* @date 07/14/21
* @test FavoriteBookTest (TODO)
* @description handles Lead and BookPairing
*/
public with sharing class LeadBookPairing  implements IBookPairer {
     //Finds Lead and sets their Liked book, returns success Message

        public string addBookToRecord(Id leadId, Id bookId){
           Lead currentLead = [Select Id, Name, Liked_Book__c FROM Lead WHERE Id=: leadId];
             try {
                currentLead.Liked_Book__c = bookId;
                update currentLead;
                
            return 'updated ' + currentLead.Name +'s Favorite book';
                } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage());
                }
               }

}