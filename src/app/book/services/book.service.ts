import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../model/book';
import {delay} from 'rxjs/operators';

@Injectable()
export class BookService {
  private idSeq = 0;

  private readonly booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([{
    id: this.idSeq++,
    author: 'Marek Matczak',
    title: 'Angular for nerds'
  }, {
    id: this.idSeq++,
    author: 'Douglas Crockford',
    title: 'JavaScript. The Good Parts'
  }, {
    id: this.idSeq++,
    author: 'John Example',
    title: 'TypeScript for newbies'
  }]);

  books$ = this.booksSubject.asObservable();

  constructor() {
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject;
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${bookId} could not be found`);
      }
    }).pipe(delay(2000));
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      let updatedBook: Book;
      let updatedBooks: Book[];
      const currentBooks = this.booksSubject.getValue();
      if (bookToSaveOrUpdate.id != null) {
        updatedBook = {...bookToSaveOrUpdate};
        updatedBooks = currentBooks.map(book => book.id === updatedBook.id ? updatedBook : book);
      } else {
        updatedBook = {id: this.idSeq++, ...bookToSaveOrUpdate};
        updatedBooks = [...currentBooks, updatedBook];
      }
      this.booksSubject.next(updatedBooks);
      subscriber.next(updatedBook);
      subscriber.complete();
    });
  }
}
