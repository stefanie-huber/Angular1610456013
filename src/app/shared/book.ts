import {Author} from "./author";
import {Image} from "./image";
import {Order} from "./order";

export {Author} from './author';
export {Image} from './image';
export {Order} from './order';
//das export mache ich, weil das buch mit author und image zusammenhängt
//wenn ich später das buch wo anders importiere, muss ich nicht Author und image noch
//dazu importieren, das wird durch export automatisch mitgegeben

export class Book {
  constructor(public id: number,
              public isbn: string,
              public  title: string,
              public authors: Author[],
              public published: Date,
              public user_id: number,
              public subtitle?: string,
              public rating?: number,
              public images?: Image[],
              public description?: string,
              public price?: number) {
  }

}

