import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined;

  @Output()
  bookChange: EventEmitter<Book> = new EventEmitter<Book>();

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
    this.bookChange.emit(updatedBook);
  }
}
