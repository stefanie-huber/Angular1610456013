import {Order} from './order';
import {Orderlog} from "./orderlog";

export class OrderlogFactory {

  static empty(): Orderlog {
    //return new Book(null, '', '', [], new Date(), 0, '', [{id: 0, url: '', title: ''}], '');
    return new Orderlog(0, 0, 0)
  }

  static fromObject(id, state, order_id): Orderlog {
    return new Orderlog(
      id,
      state,
      order_id
    );
  }
}
