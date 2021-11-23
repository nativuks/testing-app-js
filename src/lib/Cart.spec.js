import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88| R$ 383.88
  };

  let product2 = {
    title: 'Adidas running shoes - women',
    price: 41872, // 353.88| R$ 383.88
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is exceuted in a newly create cart instance  ', () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and receive total amount', () => {
      const item = {
        product,
        quantity: 2, // 70776
      };
      cart.add(item);
      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure non more than on product exist at time', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed ', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);
      expect(cart.getTotal()).toEqual(41872);
      //112.648
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and list of items when summary is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout is called', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.checkout();
      expect(cart.getTotal()).toEqual(0);
    });
  });
});
