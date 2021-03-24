import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  readonly book: Book;

  constructor() {
    this.book = {
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    };
  }

  save(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorInput = form.querySelector<HTMLInputElement>('input#author');
    const author = authorInput?.value || '';
    const titleInput = form.querySelector<HTMLInputElement>('input#title');
    const title = titleInput?.value || '';
    const updatedBook: Book = {
      author, title
    };
    console.log(updatedBook);
  }
}
