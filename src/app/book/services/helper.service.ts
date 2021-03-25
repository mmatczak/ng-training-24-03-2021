import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getMeaningOfLife(test: number): number{
    return 42;
  }
}
