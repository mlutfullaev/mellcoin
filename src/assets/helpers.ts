export const formatCoin = (coin: number) => {
  return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}