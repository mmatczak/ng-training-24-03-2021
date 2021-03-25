import {BookDetailsComponent} from './book-details.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Book} from '../../model/book';

describe('BookDetailsComponent', () => {
  describe('(class tests)', () => {
    it('fires bookChange event on save', () => {
      // given
      const eventMock: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string): any {
            return {
              value: selector === 'input#author' ? 'Test Author' : 'Test Title'
            };
          }
        }
      };
      const component = new BookDetailsComponent();
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(updatedBook.author).toBe('Test Author');
        expect(updatedBook.title).toBe('Test Title');
      });
      // when
      component.save(eventMock);
    });
  });

  describe('(DOM tests)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;
    let testBook: Book;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement as HTMLElement;
      testBook = {id: 0, title: 'Test Title', author: 'Test Author'};
    });

    it('renders author and title of input book', () => {
      // given
      component.book = testBook;
      // when
      fixture.detectChanges();
      // then
      const authorInput = element.querySelector<HTMLInputElement>('input#author');
      expect(authorInput?.value).toBe(testBook.author);
      const titleInput = element.querySelector<HTMLInputElement>('input#title');
      expect(titleInput?.value).toBe(testBook.title);
    });

    it('fires bookChange event on button click', () => {
      // given
      component.book = testBook;
      fixture.detectChanges();
      const button = element.querySelector<HTMLButtonElement>('button');
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(updatedBook.author).toBe(testBook.author);
        expect(updatedBook.title).toBe(testBook.title);
      });
      // when
      button?.click();
    });
  });
});
