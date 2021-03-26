import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {

  readonly books$: Observable<Book[]>;
  selectedBook: Book | undefined;


  constructor(private readonly books: BookService,
              private readonly router: Router) {
    this.books$ = books.books$;
  }

  selectBook(book: Book): void {
    this.router.navigate(['books', 'details', book.id]);
  }
}
