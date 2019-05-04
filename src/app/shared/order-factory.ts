import {Order} from './order';

export class OrderFactory {

  static empty(): Order {
    //return new Book(null, '', '', [], new Date(), 0, '', [{id: 0, url: '', title: ''}], '');
    return new Order(null, null, null, null, [], '')
  }

  static fromObject(id, total_price, state, user_id, books, comment): Order {
    return new Order(
      id,
      total_price,
      state,
      user_id,
      books,
      comment
    );
  }
}
