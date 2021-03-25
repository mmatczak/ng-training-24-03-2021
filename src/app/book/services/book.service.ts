import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HelperService } from './helper.service';
import { Book } from '../model/book';
import { delay } from 'rxjs/operators';

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

  getBook(bookId: number): Book | undefined{
    return this.books.find(book=>book.id === bookId);
  }

  getBookObservable(bookId: number): Observable<Book | undefined>{
    return of(this.books.find(book=>book.id === bookId)).pipe(delay(3000));
  }

  updateBook(updatedBook: Book): void{
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
    this.booksSubject.next(this.books);
  }
}
