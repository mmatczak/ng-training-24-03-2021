import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
 private books: Book[] = [{
    id: 0,
    author: 'Marek Matczak',
    title: 'Angular for nerds'
  }, {
    id: 1,
    author: 'Douglas Crockford',
    title: 'JavaScript. The Good Parts'
  }, {
    id: 2,
    author: 'John Example',
    title: 'TypeScript for newbies'
  }];

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.books);

  constructor(private helperService: HelperService) { }

  getBooks() : Observable<Book[]>{
    return this.booksSubject;
  }

  updateBook(updatedBook: Book): void{
    this.booksSubject.next(this.books.map(book => book.id === updatedBook.id ? updatedBook : book));
  }

  getBooksClassic(): Book[]{
    const meaningOfLife = this.helperService.getMeaningOfLife(2);
    console.log(meaningOfLife);
    return this.books;
   }

  updateBookClassic(updatedBook: Book){
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
  }
}
