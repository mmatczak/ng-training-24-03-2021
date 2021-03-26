import {ModuleWithProviders, NgModule} from '@angular/core';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {SharedModule} from '../shared/shared.module';
import {BookService} from './services/book.service';
import {BooksResolver} from './services/books.resolver';


@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookOverviewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BooksResolver]
    };
  }
}
