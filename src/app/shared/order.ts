import {Author} from "./author";
import {Image} from "./image";
import {Book} from "./book";

export {Author} from './author';
export {Image} from './image';
export {Book} from './book';

export class Order {
  constructor(public id: number,
              public total_price: number,
              public state: number,
              public user_id: number,
              public books: Book[],
              public comment?: string
  ) {
  }

}

