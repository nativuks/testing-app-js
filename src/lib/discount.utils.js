import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  const { condition, quantity } = item;
  const { percentage, minimum } = condition != undefined ? condition : false;
  if (condition && percentage && quantity > minimum) {
    return amount.percentage(percentage);
  }
  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  debugger;
  const isEven = item.quantity % 2 === 0;
  if (item.condition?.quantity && item.quantity > item.condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({ amount: 0 });
};

export const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(cond => {
      if (cond.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      } else if (cond.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};
