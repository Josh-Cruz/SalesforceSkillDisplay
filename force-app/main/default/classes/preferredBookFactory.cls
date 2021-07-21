/* @author Josh Cruz
* @date 07/14/21
* @test FavoriteBookTest (TODO)
* @description Factory class which returns proper class to handle whatever Object Type is passed in
*/


public with sharing class preferredBookFactory {
    
    public static IBookPairer getBookPairing(string type){
        //set to null for exceptions
        IBookPairer bookPairing = null;
        
        switch on type { // returns proper class based on type passed in to method
            when 'Contact'  {
                return new contactBookPairing();
            }
            when 'Lead'  {
                return new leadBookPairing();
            }

        }
        return bookPairing;
    }
}