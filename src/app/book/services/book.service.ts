import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('/api/books');
    // return this.httpClient.get<Book[]>('/api/books', {
    //   params:{
    //     q: 'Marek'
    //   }
    // });
  }

  getOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`/api/books/${bookId}`);
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    if (bookToSaveOrUpdate.id != null) {
      return this.httpClient.put<Book>(`/api/books/${bookToSaveOrUpdate.id}`, bookToSaveOrUpdate);
    } else {
      return this.httpClient.post<Book>('/api/books', bookToSaveOrUpdate);
    }
  }
}
