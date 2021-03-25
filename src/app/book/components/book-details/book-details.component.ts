import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {Book} from '../../model/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book|undefined> | undefined;
  private bookId: number|undefined;

  constructor(private booksService: BookService, private route: ActivatedRoute){}

  ngOnInit(): void {
    // this.route.data.subscribe(data=>console.log('data::',data));
    this.book$ = this.route.data.pipe(map(data=>data.book)
    )
  }


  save(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorInput = form.querySelector<HTMLInputElement>('input#author');
    const author = authorInput?.value || '';
    const titleInput = form.querySelector<HTMLInputElement>('input#title');
    const title = titleInput?.value || '';
    const updatedBook: Book = {
      id: this.bookId,
      author, title
    };
    this.booksService.updateBook(updatedBook);
  }
}
