import {Author} from "./author";
import {Image} from "./image";
import {Book} from "./book";
import {Order} from "./order";

export {Author} from './author';
export {Image} from './image';
export {Book} from './book';

export class Orderlog {
  constructor(public id: number,
              public state: number,
              public order_id: number
  ) {
  }

}
