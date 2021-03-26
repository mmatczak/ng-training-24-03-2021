import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | undefined;
  private readonly unsubscribe = new Subject();

  constructor(private readonly books: BookService,
              private readonly router: Router,
              route: ActivatedRoute) {
    this.book = route.snapshot.data.book;
  }

  save(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorInput = form.querySelector<HTMLInputElement>('input#author');
    const author = authorInput?.value || '';
    const titleInput = form.querySelector<HTMLInputElement>('input#title');
    const title = titleInput?.value || '';
    const updatedBook: Book = {
      id: this.book?.id,
      author, title
    };
    this.books.saveOrUpdate(updatedBook)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.router.navigateByUrl('/books'));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}
