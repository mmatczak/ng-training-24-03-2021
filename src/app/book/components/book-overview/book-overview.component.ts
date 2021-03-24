import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | undefined;

  constructor() {
    this.books = [{
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
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  updateBook(updatedBook: Book): void {
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }
}
