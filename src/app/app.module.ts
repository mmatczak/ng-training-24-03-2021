import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import {AppComponent} from './app.component';
import { BookOverviewComponent } from './book/components/book-overview/book-overview.component';

const routes: Route[] = [
  {path: '', redirectTo: "books", pathMatch: 'full'},
  {path:'books', loadChildren: () => import('./book/book.module').then(m=>m.BookModule)}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
