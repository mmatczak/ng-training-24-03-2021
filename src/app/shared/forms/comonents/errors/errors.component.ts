import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ba-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent {
  @HostBinding('class.invalid-feedback')
  invalidFeedback = true;

  errors$: Observable<string[]> | undefined;

  @Input()
  set of(formControl: AbstractControl | undefined | null) {
    this.errors$ = formControl?.statusChanges
      .pipe(
        startWith(formControl?.status),
        map(status => {
          if (status === 'INVALID') {
            const errors = formControl?.errors;
            if (errors) {
              return Object.keys(errors)
                .map(errorCode => {
                  if (errorCode === 'required') {
                    return 'Please provide a value';
                  } else {
                    return 'Unknown error....';
                  }
                });
            }
          }
          return [];
        }));
  }
}

