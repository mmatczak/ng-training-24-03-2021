import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import { Route, RouterModule } from '@angular/router';
import { BooksResolver } from './services/books.resolver';

const routes: Route[] = [
  {path: '', component: BookOverviewComponent},
  {path: 'details', redirectTo: '', pathMatch: 'full'},
  {path: 'details/:id', component: BookOverviewComponent , children: [
    {path: '', component: BookDetailsComponent, resolve: {book: BooksResolver}}
  ]},

]

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BookModule {
}
