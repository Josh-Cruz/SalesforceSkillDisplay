/* @author Josh Cruz
* @date 07/14/21
* @test FavoriteBookTest (TODO)
* @description logic for BookSearch LWC
*/

public with sharing class FavoriteBook {

//gets intial books and after searchKey changes gets updated books from DB
 @AuraEnabled (cacheable = true)
 public static List<Book__c> searchBooks(string searchKey) {
    String key = '%' + searchKey + '%';
     return [Select Id, Name, Author__c,Category__c, Inventory__c FROM Book__c  WHERE (Name LIKE :key OR Author__c LIKE :key) ORDER BY Inventory__c DESC  Limit 10];
 }
 
 //first determines what object recordID is affiliated with, 
 //then passes it to preferredBookFactory class which selects proper class per object type
 //tnen returns success or failure message
 @AuraEnabled
 public static string addPreferredBook(Id recordId, Id bookId) {
     try {
        String sObjectType = recordId.getSObjectType().getDescribe().getName();
        IBookPairer bookPairing = preferredBookFactory.getBookPairing(sObjectType);
        return bookPairing.addBookToRecord(recordId, bookId);
        
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
     }
 }
}