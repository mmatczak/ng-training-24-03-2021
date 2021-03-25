import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Book, ExtendedBook} from '../../model/book';
import { BookService } from '../../services/book.service';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit{

  books$: Observable<Book[]> | undefined;
  selectedBook: Book | undefined;


  constructor(private booksService: BookService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks()

    this.route.params.subscribe(params=>{
      console.log("params::",params)
      if(params.id){
        this.selectedBook = this.booksService.getBook(+params.id);
      }
    });
  }

  selectBook(book: Book): void {
    this.router.navigate(['books','details',book.id])
  }

  updateBook(updatedBook: Book): void {
    this.selectedBook = updatedBook;
  }


}
