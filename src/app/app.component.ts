import {Component} from '@angular/core';
import {ResolveEnd, ResolveStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router) {
    router.events.pipe(
      filter(event => event instanceof ResolveStart || event instanceof ResolveEnd)
    ).subscribe(event => console.log(event));
  }
}
