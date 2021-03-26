import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {Book} from '../model/book';
import {BookService} from './book.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksResolver implements Resolve<Observable<Book>> {

  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('id');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId)
          .pipe(catchError(err => {
            setTimeout(() => this.router.navigateByUrl('/books/details'));
            return throwError(err);
          }));
      }
    }
    setTimeout(() => this.router.navigateByUrl('/books/details'));
    return throwError(`Could not open a dialog for book with ID: ${bookIdAsString}`);
  }
}
