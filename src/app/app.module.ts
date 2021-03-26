import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BookService} from './book/services/book.service';

const routes: Route[] = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', loadChildren: () => import('./book/book.module').then(m => m.BookModule)}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BookModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
