import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BookService} from './book/services/book.service';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';
import {BooksResolver} from './book/services/books.resolver';
import {BookModule} from './book/book.module';

const routes: Route[] = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {
    path: 'books', children: [
      {path: '', component: BookOverviewComponent},
      {
        path: 'details', children: [
          {path: '', component: BookDetailsComponent},
          {path: ':id', component: BookDetailsComponent, resolve: {book: BooksResolver}}
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule.forRoot(),
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
