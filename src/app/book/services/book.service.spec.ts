import { TestBed } from '@angular/core/testing';
import { Book } from '../model/book';

import { BookService } from './book.service';
import { HelperService } from './helper.service';

describe('BookService', () => {
  let service: BookService;

  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HelperService',['getMeaningOfLife'])
    TestBed.configureTestingModule({
      providers: [{provide: HelperService, useValue: spy}]
    });
    service = TestBed.inject(BookService);
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of Books',()=>{
    const actualBooks = service.getBooksClassic();
    const expectedBooks: Book[] = [{
      id: 0,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    }, {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    }, {
      id: 2,
      author: 'John Example',
      title: 'TypeScript for newbies'
    }];

    expect(actualBooks).toEqual(expectedBooks);
    expect(helperServiceSpy.getMeaningOfLife.calls.count()).toBe(1);
    expect(helperServiceSpy.getMeaningOfLife.calls.mostRecent().args).toEqual([2]);
  })

  it('should update books',()=>{
    const updatedBook = {
      id: 2,
      author: 'Test author',
      title: 'Test title'
    };

    const expectedBooks = [
      {
        id: 0,
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      }, {
        id: 1,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      updatedBook
    ];

    service.updateBookClassic(updatedBook);
    const actualBooks = service.getBooksClassic();

    expect(actualBooks).toEqual(expectedBooks);
  })
});
