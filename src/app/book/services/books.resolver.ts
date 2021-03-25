import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Book } from "../model/book";
import { BookService } from "./book.service";

@Injectable({
  providedIn: 'root'
})
export class BooksResolver implements Resolve<Observable<Book|undefined>> {

constructor(private booksService: BookService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book | undefined> | Observable<Observable<Book | undefined>> | Promise<Observable<Book | undefined>> {
    console.log('Hello from resolver!')
    const bookId = route.paramMap.get("id") || "";
    const book = this.booksService.getBookObservable(+bookId)
console.log("book from Resolver::", book);
return book;
  }


}
