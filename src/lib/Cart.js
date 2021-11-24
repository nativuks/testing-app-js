import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';
import { calculateDiscount } from './discount.utils';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];
  getTotal() {
    const result = this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });
      if (item.condition) {
        discount = calculateDiscount(amount, item.quantity, item.condition);
      }
      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
    return result.getAmount();
  }

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;
    const formatted = Money({ amount: total }).toFormat('$0,0.00');
    return {
      total,
      formatted,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();
    this.items = [];
    return {
      total,
      items,
    };
  }
}

//Use

const cart = new Cart();

const product = {
  title: '',
  price: '',
};

const item = {
  quantity: 2,
  product,
};

cart.add(item);
cart.remove(product);
cart.getTotal();
cart.summary();
cart.checkout();
