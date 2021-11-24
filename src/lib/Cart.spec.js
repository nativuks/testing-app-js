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
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 5,
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

    it('should include formatted amount in the summary', () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });
      cart.summary();
      expect(cart.summary().formatted).toEqual('R$3,025.56');
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount when above is passed ', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });
      expect(cart.getTotal()).toEqual(74315);
    });

    it('should apply NOT apply percentage discount when quantity is below or equals minimum ', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });
      expect(cart.getTotal()).toEqual(70776);
    });

    it('should apply discount for even quantities ', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });
      expect(cart.getTotal()).toEqual(70776);
    });

    it('should NOT  apply discount for even quantities when condition is not met ', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(35388);
    });

    it('should apply quantity discount for odd quantities ', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });
      expect(cart.getTotal()).toEqual(106164);
    });

    it('should receive two or more conditions determine/ apply the best discount fisrt Case  ', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2, //40%,50%
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal()).toEqual(106164);
    });

    it('should receive two or more conditions determine/ apply the best discount Second Case  ', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2, //40%,50%
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal()).toEqual(35388);
    });
  });
});
