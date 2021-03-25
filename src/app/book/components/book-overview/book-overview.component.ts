import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Book, ExtendedBook} from '../../model/book';
import { BookService } from '../../services/book.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit{

  books$: Observable<Book[]> | undefined;
  selectedBook: Book | undefined;


  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks()
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  updateBook(updatedBook: Book): void {
    this.selectedBook = updatedBook;
  }


}
