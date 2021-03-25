export interface Book {
  id?: number;
  author: string;
  title: string;
}

export interface ExtendedBook extends Book{
  yearOfPublication: number;
}
