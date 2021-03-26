import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

type BookFormModel = Partial<Omit<Book, 'id'>>;

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | undefined;
  readonly bookForm: FormGroup;
  private readonly unsubscribe = new Subject();

  constructor(private readonly books: BookService,
              private readonly router: Router,
              route: ActivatedRoute) {
    this.book = route.snapshot.data.book;
    this.bookForm = new FormGroup({
      author: new FormControl(this.book?.author, [Validators.required, Validators.maxLength(15)]),
      title: new FormControl(this.book?.title, Validators.required)
    });
  }

  save(): void {
    if (this.bookForm.valid) {
      const updatedBookValues = this.bookForm.value as BookFormModel;
      const title = updatedBookValues.author as string;
      const author = updatedBookValues.title as string;
      const updatedBook: Book = {
        id: this.book?.id,
        author,
        title
      };
      this.books.saveOrUpdate(updatedBook)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(() => this.router.navigateByUrl('/books'));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}
