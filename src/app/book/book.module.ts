import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {Route, RouterModule} from '@angular/router';
import {BooksResolver} from './services/books.resolver';
import {SharedModule} from '../shared/shared.module';

const routes: Route[] = [
  {path: '', component: BookOverviewComponent},
  {
    path: 'details', children: [
      {path: '', component: BookDetailsComponent},
      {path: ':id', component: BookDetailsComponent, resolve: {book: BooksResolver}}
    ]
  }
];

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookOverviewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BookModule {
}
