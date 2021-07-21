/* @author Josh Cruz
* @date 07/14/21
* @test FavoriteBookTest (TODO)
* @description Creates a template or type to pair prefferreed books to records
*/
public interface  IBookPairer {
  String addBookToRecord(Id recordId, Id bookId);
}