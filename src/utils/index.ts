export const currencyFormat = (currency: Number) =>
  `R$ ${currency.toString().replace('.', ',')}`;
