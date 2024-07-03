export const formatCoin = (coin: number) => {
  return coin.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}